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

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.text({ type: "text/plain" }));

// Health check
app.get("/health", (_req, res) => {
    res.status(200).json({ status: "healthy", service: "orderflow-api", version: "2.1.0" });
});

// Routes
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/log-error", errorLogRoutes);

// Centralized error handler — writes [ERROR] to log file
app.use(errorHandler);

module.exports = app;
