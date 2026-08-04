/**
 * Main Express Application Server for Mitti Platform (In-Memory Mode)
 */

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { store } from './data/store.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static frontend files directly from parent folder
app.use(express.static(path.join(__dirname, '..')));

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: "OK", serverTime: new Date().toISOString() });
});

// Soil Analytics Endpoint
app.get('/api/analytics', (req, res) => {
    res.json({ success: true, data: store.getSoilAnalytics() });
});

// Mandi Rates Endpoint
app.get('/api/mandi-rates', (req, res) => {
    const { category, search, sort } = req.query;
    const rates = store.getMandiRates({ category, search, sort });
    res.json({ success: true, count: rates.length, data: rates });
});

// Farmer Produce Listings Endpoints
app.get('/api/produce', (req, res) => {
    res.json({ success: true, data: store.getFarmerListings() });
});

app.post('/api/produce', (req, res) => {
    const listing = req.body;
    if (!listing.crop || !listing.askingPrice) {
        return res.status(400).json({ success: false, message: "Crop name and asking price are required." });
    }
    const created = store.addFarmerListing(listing);
    res.status(201).json({ success: true, message: "Produce listing created successfully!", data: created });
});

// Krishi Shop & Vendor Inventory Endpoints
app.get('/api/supplies', (req, res) => {
    const { category } = req.query;
    res.json({ success: true, data: store.getShopProducts(category) });
});

app.post('/api/supplies', (req, res) => {
    const product = req.body;
    if (!product.title || !product.price) {
        return res.status(400).json({ success: false, message: "Product title and price are required." });
    }
    const created = store.addShopProduct(product);
    res.status(201).json({ success: true, message: "Shop product added successfully!", data: created });
});

app.put('/api/supplies/:id', (req, res) => {
    const updated = store.updateShopProduct(req.params.id, req.body);
    res.json({ success: true, data: updated });
});

app.delete('/api/supplies/:id', (req, res) => {
    store.deleteShopProduct(req.params.id);
    res.json({ success: true, message: "Product deleted successfully." });
});

// Vendor Buying Offers Endpoints
app.get('/api/offers', (req, res) => {
    res.json({ success: true, data: store.getOffers() });
});

app.post('/api/offers', (req, res) => {
    const offer = store.addOffer(req.body);
    res.status(201).json({ success: true, message: "Buying offer sent to farmer!", data: offer });
});

app.put('/api/offers/:id', (req, res) => {
    const { status } = req.body;
    const updated = store.updateOfferStatus(req.params.id, status);
    res.json({ success: true, data: updated });
});

// Government Schemes Endpoint
app.get('/api/schemes', (req, res) => {
    res.json({ success: true, data: store.getSchemes() });
});

// Orders & Checkout Endpoints
app.get('/api/orders', (req, res) => {
    res.json({ success: true, data: store.getOrders() });
});

app.post('/api/orders/checkout', (req, res) => {
    const orderData = req.body;
    if (!orderData.items || orderData.items.length === 0) {
        return res.status(400).json({ success: false, message: "Cart items cannot be empty." });
    }
    const created = store.createOrder(orderData);
    res.status(201).json({ success: true, message: "Order placed successfully!", data: created });
});

app.put('/api/orders/:id', (req, res) => {
    const { status } = req.body;
    const updated = store.updateOrderStatus(req.params.id, status);
    res.json({ success: true, data: updated });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌾 Mitti Backend Server is running on http://0.0.0.0:${PORT} (Network & Localhost Accessible)`);
});
