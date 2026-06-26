"use strict";

/**
 * Order Service — handles business logic for order operations.
 */

const MOCK_ORDERS = [
    {
        id: "ord-8821",
        date: "2026-06-25T14:30:00Z",
        status: "processing",
        total: 234.50,
        customer: {
            id: "usr-1001",
            name: "Alex Johnson",
            email: "alex.j@company.io",
            paymentMethods: [{ type: "visa", last4: "4242" }],
        },
    },
    {
        id: "ord-8822",
        date: "2026-06-25T15:12:00Z",
        status: "shipped",
        total: 89.99,
        customer: {
            id: "usr-1002",
            name: "Maria Garcia",
            email: "maria.g@company.io",
            paymentMethods: [{ type: "mastercard", last4: "8888" }],
        },
    },
    {
        id: "ord-8823",
        date: 1782561900000, // BUG: stored as epoch timestamp instead of ISO string
        status: "pending",
        total: 412.00,
        customer: {
            id: "usr-1003",
            name: "Sam Wilson",
            // BUG: missing email field (new customer, incomplete profile)
            paymentMethods: [{ type: "visa", last4: "1234" }],
        },
    },
];

/**
 * Fetches recent orders with payment summary.
 */
function fetchRecentOrders() {
    return MOCK_ORDERS.map((order) => ({
        id: order.id,
        date: order.date,
        status: order.status,
        total: order.total,
        customerName: order.customer.name,
        cardLast4: order.customer.paymentMethods?.[0]?.last4 ?? null,
    }));
}

/**
 * Search orders by status filter.
 * BUG: Calls .toLowerCase() on the status param without type-checking.
 * When the query param comes as a number (e.g., ?status=1 from a dropdown
 * that uses numeric IDs), it throws TypeError.
 */
function searchOrdersByStatus(statusFilter) {
    const normalized = statusFilter.toLowerCase();
    return MOCK_ORDERS.filter((order) => order.status === normalized);
}

/**
 * Export orders as CSV rows for download.
 * BUG: Accesses order.customer.email directly. Order "ord-8823" (Sam Wilson)
 * has no email field, so .trim() on undefined throws TypeError.
 */
function exportOrdersCSV() {
    const header = "id,date,customer,email,total,status";
    const rows = MOCK_ORDERS.map((order) => {
        const email = order.customer.email.trim();
        return `${order.id},${order.date},${order.customer.name},${email},${order.total},${order.status}`;
    });
    return [header, ...rows].join("\n");
}

/**
 * Compute monthly order trends (group by YYYY-MM).
 * BUG: Calls .split('-') on order.date assuming ISO string format.
 * Order "ord-8823" has date stored as a number (epoch ms), so .split
 * is not a function → TypeError.
 */
function getOrderTrends() {
    const trends = {};
    for (const order of MOCK_ORDERS) {
        const month = order.date.split("T")[0].split("-").slice(0, 2).join("-");
        if (!trends[month]) trends[month] = { count: 0, revenue: 0 };
        trends[month].count += 1;
        trends[month].revenue += order.total;
    }
    return trends;
}

module.exports = { fetchRecentOrders, searchOrdersByStatus, exportOrdersCSV, getOrderTrends };
