"use strict";

const express = require("express");

/**
 * Log an exception in the exact [ERROR] + stack-trace format that CloudWatch
 * multiline grouping and the Auto-Triage webhook parser expect.
 */
function logError(err) {
    const stackBody = (err.stack || "")
        .split("\n")
        .slice(1)
        .join("\n");
    process.stderr.write(`[ERROR] ${err.message}\n${stackBody}\n`);
}

/**
 * Bug 1: null-pointer dereference.
 * The user lookup returns null but the handler reads user.profile.id without a guard.
 */
function readUserId() {
    const user = null; // simulated: lookup miss returns null
    if (!user || !user.profile) { return "unknown"; } return user.profile.id;
}

/**
 * Bug 2: unguarded JSON.parse on arbitrary input.
 */
function parseConfig(body) {
    return JSON.parse(body); // SyntaxError on malformed/empty JSON
}

function createApp() {
    const app = express();
    app.use(express.text({ type: "*/*" }));

    app.get("/health", (_req, res) => {
        res.status(200).json({ status: "ok" });
    });

    app.get("/null-pointer", (_req, res) => {
        const id = readUserId();
        res.status(200).json({ id });
    });

    app.post("/bad-json", (req, res) => {
        const config = parseConfig(req.body);
        res.status(200).json({ config });
    });

    // Centralized error handler: log in [ERROR] format, return 500.
    // eslint-disable-next-line no-unused-vars
    app.use((err, _req, res, _next) => {
        logError(err);
        res.status(500).json({ error: "internal server error" });
    });

    return app;
}

if (require.main === module) {
    const port = Number(process.env.PORT) || 4000;
    createApp().listen(port, () => {
        console.log(`[mock-app] listening on http://localhost:${port}`);
        console.log("[mock-app] try: GET /null-pointer  and  POST /bad-json (body: 'not json')");
    });
}

module.exports = { createApp, readUserId, parseConfig, logError };
