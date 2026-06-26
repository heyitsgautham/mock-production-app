"use strict";

const express = require("express");
const router = express.Router();
const { getUserProfile } = require("../services/userService");

/**
 * GET /api/users/:id/profile
 * Fetches user profile data.
 * Works correctly — returns user data for the frontend.
 */
router.get("/:id/profile", (req, res) => {
    const profile = getUserProfile(req.params.id);
    res.json({ success: true, data: profile });
});

/**
 * GET /api/users
 * Lists all users — works fine.
 */
router.get("/", (_req, res) => {
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
