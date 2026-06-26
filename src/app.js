"use strict";

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const orderRoutes = require("./routes/orders");
const userRoutes = require("./routes/users");
const reportRoutes = require("./routes/reports");
const errorLogRoutes = require("./routes/errorLog");
const { errorHandler } = require("./middleware/errorHandler");
const { logger } = require("./utils/logger");

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.text({ type: "text/plain" }));

// Health / page-visit endpoints
app.get("/health", (_req, res) => {
    logger.info("/health — API health check");
    res.status(200).json({ status: "healthy", service: "orderflow-api", version: "2.1.0" });
});

app.get("/api/dashboard", (_req, res) => {
    logger.info("/dashboard — User visited dashboard");
    res.status(200).json({
        success: true,
        data: { totalOrders: 1247, revenueMTD: 48392, activeUsers: 312 },
    });
});

app.get("/api/profile", (_req, res) => {
    logger.info("/profile — User visited profile page");
    res.status(200).json({ success: true });
});

// Routes
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/log-error", errorLogRoutes);

// Centralized error handler — writes [ERROR] to log file
app.use(errorHandler);

module.exports = app;
