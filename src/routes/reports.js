"use strict";

const express = require("express");
const router = express.Router();
const { generateWeeklySummary } = require("../services/reportService");
const { logger } = require("../utils/logger");

/**
 * GET /api/reports/weekly?week=2026-W26
 * Generates a weekly revenue summary.
 * BUG: crashes when requesting a week that has no data (e.g., future week).
 */
router.get("/weekly", (req, res, next) => {
    const week = req.query.week || "2026-W26";
    logger.info(`GET /api/reports/weekly — generating summary for week ${week}`);
    try {
        const summary = generateWeeklySummary(week);
        logger.info(`GET /api/reports/weekly — summary generated: revenue=$${summary.totalRevenue}`);
        res.json({ success: true, data: summary });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
