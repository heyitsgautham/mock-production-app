"use strict";

const fs = require("fs");
const path = require("path");

const LOG_PATH = process.env.ERROR_LOG_PATH || "/var/log/mock-app-error.log";

/**
 * Writes an error in the exact format CloudWatch multiline pattern expects:
 * [ERROR] <message>
 *     at <frame> (<file>:<line>:<col>)
 *     ...
 */
function logError(err) {
    const stackBody = (err.stack || "")
        .split("\n")
        .slice(1)
        .join("\n");

    const logEntry = `[ERROR] ${err.message}\n${stackBody}\n`;

    // Write to the log file that CloudWatch Agent watches
    fs.appendFileSync(LOG_PATH, logEntry);

    // Also write to stderr for local debugging
    process.stderr.write(logEntry);
}

function info(message) {
    const timestamp = new Date().toISOString();
    const logEntry = `[INFO] ${timestamp} ${message}\n`;
    fs.appendFileSync(LOG_PATH, logEntry);
    process.stdout.write(logEntry);
}

function warn(message) {
    const timestamp = new Date().toISOString();
    const logEntry = `[WARN] ${timestamp} ${message}\n`;
    fs.appendFileSync(LOG_PATH, logEntry);
    process.stdout.write(logEntry);
}

module.exports = {
    logger: { error: logError, info, warn },
};
