"use strict";

const express = require("express");
const router = express.Router();
const { fetchRecentOrders } = require("../services/orderService");
const { logger } = require("../utils/logger");

/**
 * GET /api/orders
 * Fetches recent orders for the dashboard.
 */
router.get("/", (req, res, next) => {
    logger.info("GET /api/orders — fetching recent orders");
    try {
        const orders = fetchRecentOrders();
        logger.info(`GET /api/orders — returned ${orders.length} orders`);
        res.json({ success: true, data: orders });
    } catch (err) {
        next(err);
    }
});

/**
 * GET /api/orders/:id
 * Returns a single order — works fine.
 */
router.get("/:id", (req, res) => {
    res.json({
        success: true,
        data: {
            id: req.params.id,
            customer: "Jane Smith",
            total: 129.99,
            status: "shipped",
            items: [
                { sku: "WDG-441", name: "Wireless Charger", qty: 1, price: 49.99 },
                { sku: "CBL-220", name: "USB-C Cable 2m", qty: 2, price: 14.99 },
                { sku: "CSE-105", name: "Phone Case - Clear", qty: 1, price: 49.02 },
            ],
        },
    });
});

module.exports = router;
