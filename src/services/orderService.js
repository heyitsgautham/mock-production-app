"use strict";

/**
 * Order Service — handles business logic for order operations.
 *
 * BUG: fetchRecentOrders() iterates over orders and accesses
 * `order.customer.paymentMethods[0].last4` without checking if
 * paymentMethods exists. Customer "usr-1003" has a null paymentMethods
 * field (new customer, no card on file yet), causing a TypeError.
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
            paymentMethods: [{ type: "mastercard", last4: "8888" }],
        },
    },
    {
        id: "ord-8823",
        date: "2026-06-26T09:45:00Z",
        status: "pending",
        total: 412.00,
        customer: {
            id: "usr-1003",
            name: "Sam Wilson",
            paymentMethods: null, // BUG: new customer, no payment methods on file
        },
    },
];

/**
 * Fetches recent orders with payment summary.
 * BUG: Does not guard against null paymentMethods.
 */
function fetchRecentOrders() {
    return MOCK_ORDERS.map((order) => ({
        id: order.id,
        date: order.date,
        status: order.status,
        total: order.total,
        customerName: order.customer.name,
        // BUG: TypeError when paymentMethods is null
        cardLast4: order.customer.paymentMethods[0].last4,
    }));
}

module.exports = { fetchRecentOrders };
