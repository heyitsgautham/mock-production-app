"use strict";

/**
 * User Service — handles user profile lookups.
 * This service works correctly. The frontend bug is in the React component
 * that consumes this data (tries to access nested fields on initial null state).
 */

const MOCK_USERS = {
    "usr-1001": {
        id: "usr-1001",
        name: "Alex Johnson",
        email: "alex.j@company.io",
        role: "admin",
        avatar: "https://i.pravatar.cc/150?u=alex",
        preferences: {
            theme: "dark",
            notifications: true,
            language: "en",
        },
        recentActivity: [
            { action: "Updated billing info", timestamp: "2026-06-25T10:30:00Z" },
            { action: "Changed password", timestamp: "2026-06-24T16:00:00Z" },
        ],
    },
    "usr-1002": {
        id: "usr-1002",
        name: "Maria Garcia",
        email: "maria.g@company.io",
        role: "manager",
        avatar: "https://i.pravatar.cc/150?u=maria",
        preferences: {
            theme: "light",
            notifications: true,
            language: "es",
        },
        recentActivity: [
            { action: "Approved order #8822", timestamp: "2026-06-25T15:00:00Z" },
        ],
    },
};

function getUserProfile(userId) {
    return MOCK_USERS[userId] || null;
}

module.exports = { getUserProfile };
