/**
 * In-Memory Database Store for Mitti Platform
 */

import { initialData } from './initialData.js';

class DataStore {
    constructor() {
        this.soilAnalytics = { ...initialData.soilAnalytics };
        this.mandiRates = [...initialData.mandiRates];
        this.shopProducts = [...initialData.shopProducts];
        this.farmerListings = [...initialData.farmerListings];
        this.schemes = [...initialData.schemes];
        this.orders = [...initialData.orders];
        this.offers = [
            {
                id: "OFF-301",
                cropId: "CROP-201",
                crop: "Wheat (Sharbati Quality)",
                quantity: 80,
                unit: "quintal",
                askingPrice: 2300,
                offerPrice: 2250,
                vendorName: "Ramesh Krishi Kendra",
                vendorPhone: "+91 98888 77711",
                status: "Pending",
                date: "2026-08-04"
            }
        ];
    }

    // Soil Analytics
    getSoilAnalytics() {
        return this.soilAnalytics;
    }

    // Mandi Rates
    getMandiRates(query = {}) {
        let results = [...this.mandiRates];
        if (query.category && query.category !== 'all') {
            results = results.filter(item => item.cat === query.category);
        }
        if (query.search) {
            const term = query.search.toLowerCase();
            results = results.filter(item => 
                item.crop.toLowerCase().includes(term) || 
                item.mandi.toLowerCase().includes(term)
            );
        }
        if (query.sort === 'price') {
            results.sort((a, b) => b.current - a.current);
        } else if (query.sort === 'az') {
            results.sort((a, b) => a.crop.localeCompare(b.crop));
        }
        return results;
    }

    // Farmer Crop Listings (For Farmer & Vendor Sourcing Feed)
    getFarmerListings() {
        return this.farmerListings;
    }

    addFarmerListing(listing) {
        const newListing = {
            id: `CROP-${Date.now()}`,
            farmerName: listing.farmerName || "Shivangi Singh",
            phone: listing.phone || "+91 98765 43210",
            location: listing.location || "Varanasi, Uttar Pradesh",
            crop: listing.crop,
            quantity: Number(listing.quantity) || 10,
            unit: listing.unit || "quintal",
            askingPrice: Number(listing.askingPrice) || 2000,
            status: "Active",
            postedDate: new Date().toISOString().split('T')[0],
            image: listing.image || "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80"
        };
        this.farmerListings.unshift(newListing);
        return newListing;
    }

    // Krishi Shop Products (For Farmer Shop & Vendor Inventory Manager)
    getShopProducts(category = 'all') {
        if (category === 'all') return this.shopProducts;
        return this.shopProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    addShopProduct(product) {
        const newProduct = {
            id: Date.now(),
            title: product.title,
            category: product.category || "Fertilizer",
            vendor: product.vendor || "Ramesh Krishi Kendra",
            vendorLocation: product.vendorLocation || "Varanasi, UP",
            price: Number(product.price),
            packSize: product.packSize || "50 kg bag",
            stockStatus: product.stockStatus || "In stock",
            rating: 5.0,
            image: product.image || "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=400&q=80"
        };
        this.shopProducts.unshift(newProduct);
        return newProduct;
    }

    updateShopProduct(id, updates) {
        const product = this.shopProducts.find(p => String(p.id) === String(id));
        if (product) {
            if (updates.price !== undefined) product.price = Number(updates.price);
            if (updates.stockStatus !== undefined) product.stockStatus = updates.stockStatus;
        }
        return product;
    }

    deleteShopProduct(id) {
        this.shopProducts = this.shopProducts.filter(p => String(p.id) !== String(id));
        return true;
    }

    // Offers between Vendors and Farmers
    getOffers() {
        return this.offers;
    }

    addOffer(offerData) {
        const newOffer = {
            id: `OFF-${Date.now()}`,
            cropId: offerData.cropId,
            crop: offerData.crop,
            quantity: Number(offerData.quantity) || 1,
            unit: offerData.unit || "quintal",
            askingPrice: Number(offerData.askingPrice) || 0,
            offerPrice: Number(offerData.offerPrice) || Number(offerData.askingPrice) || 0,
            vendorName: offerData.vendorName || "Ramesh Krishi Kendra",
            vendorPhone: "+91 98888 77711",
            status: "Pending",
            date: new Date().toISOString().split('T')[0]
        };
        this.offers.unshift(newOffer);
        return newOffer;
    }

    updateOfferStatus(id, status) {
        const offer = this.offers.find(o => String(o.id) === String(id));
        if (offer) {
            offer.status = status;
        }
        return offer;
    }

    // Government Schemes
    getSchemes() {
        return this.schemes;
    }

    // Orders
    getOrders() {
        return this.orders;
    }

    createOrder(orderData) {
        const newOrder = {
            orderId: `ORD-${Math.floor(100 + Math.random() * 900)}`,
            farmerName: orderData.farmerName || "Shivangi Singh",
            phone: orderData.phone || "+91 98765 43210",
            location: orderData.location || "Varanasi",
            items: orderData.items || [],
            totalAmount: Number(orderData.totalAmount) || 0,
            vendor: orderData.vendor || "Ramesh Krishi Kendra",
            status: "Pending",
            createdDate: new Date().toLocaleString()
        };
        this.orders.unshift(newOrder);
        return newOrder;
    }

    updateOrderStatus(orderId, status) {
        const order = this.orders.find(o => String(o.orderId) === String(orderId));
        if (order) {
            order.status = status;
        }
        return order;
    }
}

export const store = new DataStore();
