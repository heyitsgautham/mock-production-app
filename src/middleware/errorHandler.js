"use strict";

const { logger } = require("../utils/logger");

/**
 * Centralized Express error handler.
 * Logs the error in [ERROR] format and returns a generic 500.
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, _req, res, _next) {
    logger.error(err);

    res.status(500).json({
        error: "Internal Server Error",
        message: "Something went wrong. Please try again later.",
        requestId: require("uuid").v4(),
    });
}

module.exports = { errorHandler };
