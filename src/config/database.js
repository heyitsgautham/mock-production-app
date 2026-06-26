"use strict";

/**
 * Database configuration — placeholder for realistic file structure.
 * In a real app this would connect to PostgreSQL/MongoDB.
 * For this demo, services use in-memory mock data.
 */

const DB_CONFIG = {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    name: process.env.DB_NAME || "orderflow_prod",
    pool: {
        min: 2,
        max: 10,
        idle: 30000,
    },
};

module.exports = { DB_CONFIG };
