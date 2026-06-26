"use strict";

const express = require("express");
const router = express.Router();
const { getUserProfile } = require("../services/userService");
const { logger } = require("../utils/logger");

/**
 * GET /api/users/:id/profile
 * Fetches user profile data.
 */
router.get("/:id/profile", (req, res) => {
    logger.info(`GET /api/users/${req.params.id}/profile — fetching user profile`);
    const profile = getUserProfile(req.params.id);
    if (profile) {
        logger.info(`GET /api/users/${req.params.id}/profile — found user: ${profile.name}`);
    } else {
        logger.warn(`GET /api/users/${req.params.id}/profile — user not found`);
    }
    res.json({ success: true, data: profile });
});

/**
 * GET /api/users
 * Lists all users.
 */
router.get("/", (_req, res) => {
    logger.info("GET /api/users — listing all users");
    res.json({
        success: true,
        data: [
            { id: "usr-1001", name: "Alex Johnson", email: "alex.j@company.io", role: "admin" },
            { id: "usr-1002", name: "Maria Garcia", email: "maria.g@company.io", role: "manager" },
            { id: "usr-1003", name: "Sam Wilson", email: "sam.w@company.io", role: "viewer" },
        ],
    });
});

module.exports = router;
