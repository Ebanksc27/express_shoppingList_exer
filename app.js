const express = require('express');
const itemsRoutes = require('./itemsRoutes');
const app = express();

app.use(express.json()); // Middleware to parse JSON
app.use('/items', itemsRoutes);

module.exports = app; // Export for testing
