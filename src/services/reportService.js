"use strict";

/**
 * Report Service — generates summary reports from order data.
 *
 * BUG: generateWeeklySummary() calls .reduce() on the result of
 * getOrdersForWeek() which returns undefined when no orders exist
 * for the requested week (e.g., future dates). The missing null-check
 * causes a TypeError: Cannot read properties of undefined (reading 'reduce').
 */

const WEEKLY_ORDERS = {
    "2026-W25": [
        { id: "ord-8821", total: 234.50, status: "processing" },
        { id: "ord-8822", total: 89.99, status: "shipped" },
        { id: "ord-8823", total: 412.00, status: "pending" },
    ],
    "2026-W24": [
        { id: "ord-8810", total: 156.00, status: "delivered" },
        { id: "ord-8811", total: 78.50, status: "delivered" },
    ],
};

/**
 * Returns orders for a given ISO week key, or undefined if not found.
 */
function getOrdersForWeek(weekKey) {
    return WEEKLY_ORDERS[weekKey];
}

/**
 * Generate a weekly revenue summary.
 * BUG: Does not guard against undefined return from getOrdersForWeek.
 */
function generateWeeklySummary(weekKey) {
    const orders = getOrdersForWeek(weekKey) || [];

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const orderCount = orders.length;

    return {
        week: weekKey,
        totalRevenue,
        orderCount,
        avgOrderValue: totalRevenue / orderCount,
    };
}

module.exports = { generateWeeklySummary, getOrdersForWeek };
