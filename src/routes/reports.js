"use strict";

const express = require("express");
const router = express.Router();
const { generateWeeklySummary } = require("../services/reportService");

/**
 * GET /api/reports/weekly?week=2026-W26
 * Generates a weekly revenue summary.
 * BUG: crashes when requesting a week that has no data (e.g., future week).
 */
router.get("/weekly", (req, res, next) => {
    try {
        const week = req.query.week || "2026-W26"; // defaults to current week (no data!)
        const summary = generateWeeklySummary(week);
        res.json({ success: true, data: summary });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
