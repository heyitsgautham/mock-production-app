"use strict";

const express = require("express");
const router = express.Router();
const { logger } = require("../utils/logger");

/**
 * POST /api/log-error
 * Receives frontend (client-side) errors from the React Error Boundary
 * and writes them in [ERROR] format to the log file for CloudWatch to pick up.
 */
router.post("/", (req, res) => {
    const { message, stack, componentStack, url } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Missing error message" });
    }

    // Construct an Error-like object so the logger formats it correctly
    const clientError = new Error(`[Client] ${message} (at ${url || "unknown"})`);
    clientError.stack = `Error: [Client] ${message}\n${stack || "    at UnknownComponent"}${componentStack ? "\n  Component Stack:" + componentStack : ""
        }`;

    logger.error(clientError);

    res.status(201).json({ received: true });
});

module.exports = router;
