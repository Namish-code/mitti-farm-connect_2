/**
 * MITTI Marketplace - SIH 2026 Production Mock Data
 * Comprehensive realistic dataset for Indian agriculture marketplace.
 */

window.MITTI_DATA = {
    categories: [
        { id: "all", name: "All Produce", icon: "layout-grid", count: 30 },
        { id: "grains", name: "Grains", icon: "wheat", count: 6 },
        { id: "vegetables", name: "Vegetables", icon: "carrot", count: 8 },
        { id: "fruits", name: "Fruits", icon: "apple", count: 4 },
        { id: "pulses", name: "Pulses", icon: "bean", count: 4 },
        { id: "oilseeds", name: "Oil Seeds", icon: "droplet", count: 3 },
        { id: "spices", name: "Spices", icon: "flame", count: 2 },
        { id: "flowers", name: "Flowers", icon: "flower-2", count: 1 },
        { id: "cashcrops", name: "Cash Crops", icon: "coins", count: 2 }
    ],

    cropOptions: [
        "Wheat", "Rice (Paddy)", "Tomato", "Onion", "Cotton (Kapas)", 
        "Potato", "Maize", "Groundnut", "Mustard", "Sugarcane", 
        "Soybean", "Turmeric", "Green Gram (Moong)", "Black Gram (Urad)",
        "Chickpea (Chana)", "Banana", "Mango", "Garlic", "Chilli", "Marigold"
    ],

    marketPrices: [
        { crop: "Onion", mandi: "Lasalgaon, Maharashtra", current: 1450, yesterday: 1360, lastWeek: 1250, change: "+6.5%", trend: "up", msp: 1300, isMspBetter: false, highestBuyer: 1520, lowestBuyer: 1380, avg: 1430, unit: "quintal", cat: "vegetables" },
        { crop: "Cotton (Kapas)", mandi: "Akola, Maharashtra", current: 7350, yesterday: 7130, lastWeek: 6900, change: "+3.1%", trend: "up", msp: 7020, isMspBetter: false, highestBuyer: 7500, lowestBuyer: 7100, avg: 7300, unit: "quintal", cat: "cashcrops" },
        { crop: "Groundnut", mandi: "Rajkot, Gujarat", current: 6200, yesterday: 6250, lastWeek: 6400, change: "-0.8%", trend: "down", msp: 6375, isMspBetter: true, highestBuyer: 6300, lowestBuyer: 6050, avg: 6180, unit: "quintal", cat: "oilseeds" },
        { crop: "Wheat", mandi: "Khanna, Punjab", current: 2275, yesterday: 2275, lastWeek: 2250, change: "+0.0%", trend: "neutral", msp: 2275, isMspBetter: false, highestBuyer: 2350, lowestBuyer: 2200, avg: 2260, unit: "quintal", cat: "grains" },
        { crop: "Rice (Paddy)", mandi: "Karnal, Haryana", current: 2183, yesterday: 2150, lastWeek: 2100, change: "+1.5%", trend: "up", msp: 2183, isMspBetter: false, highestBuyer: 2280, lowestBuyer: 2120, avg: 2170, unit: "quintal", cat: "grains" },
        { crop: "Tomato", mandi: "Kolar, Karnataka", current: 1800, yesterday: 1950, lastWeek: 2200, change: "-7.6%", trend: "down", msp: null, isMspBetter: false, highestBuyer: 1950, lowestBuyer: 1650, avg: 1780, unit: "quintal", cat: "vegetables" },
        { crop: "Potato", mandi: "Agra, Uttar Pradesh", current: 1250, yesterday: 1200, lastWeek: 1150, change: "+4.1%", trend: "up", msp: null, isMspBetter: false, highestBuyer: 1320, lowestBuyer: 1180, avg: 1240, unit: "quintal", cat: "vegetables" },
        { crop: "Mustard", mandi: "Bharatpur, Rajasthan", current: 5650, yesterday: 5600, lastWeek: 5500, change: "+0.9%", trend: "up", msp: 5650, isMspBetter: false, highestBuyer: 5800, lowestBuyer: 5500, avg: 5620, unit: "quintal", cat: "oilseeds" },
        { crop: "Soybean", mandi: "Indore, Madhya Pradesh", current: 4890, yesterday: 4920, lastWeek: 5000, change: "-0.6%", trend: "down", msp: 4600, isMspBetter: false, highestBuyer: 5050, lowestBuyer: 4750, avg: 4870, unit: "quintal", cat: "oilseeds" },
        { crop: "Maize", mandi: "Davanagere, Karnataka", current: 2090, yesterday: 2050, lastWeek: 2000, change: "+1.9%", trend: "up", msp: 2090, isMspBetter: false, highestBuyer: 2180, lowestBuyer: 2010, avg: 2075, unit: "quintal", cat: "grains" }
    ],

    buyers: [
        {
            id: 101,
            name: "AgriCorp Pvt Ltd",
            owner: "Ramesh Sharma",
            phone: "+91 98765 43210",
            location: "Varanasi, Uttar Pradesh",
            distance: 4.2,
            rating: 4.8,
            reviewsCount: 42,
            verified: true,
            pickup: true,
            organicOnly: false,
            buyingSince: "2018",
            priceOffered: "₹1,500/quintal",
            cropsNeeded: [
                { crop: "Onion", qty: "1000 kg" },
                { crop: "Wheat", qty: "5000 kg" },
                { crop: "Tomato", qty: "800 kg" }
            ],
            workingHours: "8:00 AM - 7:00 PM (Mon-Sat)",
            avatar: "🏢"
        },
        {
            id: 102,
            name: "Kisan Mandi Traders",
            owner: "Suresh Patel",
            phone: "+91 98123 45678",
            location: "Ghazipur, Uttar Pradesh",
            distance: 12.5,
            rating: 4.6,
            reviewsCount: 28,
            verified: true,
            pickup: true,
            organicOnly: false,
            buyingSince: "2015",
            priceOffered: "₹7,400/quintal",
            cropsNeeded: [
                { crop: "Cotton (Kapas)", qty: "2000 kg" },
                { crop: "Groundnut", qty: "1500 kg" }
            ],
            workingHours: "7:00 AM - 6:00 PM (Daily)",
            avatar: "🏬"
        },
        {
            id: 103,
            name: "Jaivik Organic Foods",
            owner: "Dr. Ananya Roy",
            phone: "+91 97111 22334",
            location: "Mirzapur, Uttar Pradesh",
            distance: 18.0,
            rating: 4.9,
            reviewsCount: 65,
            verified: true,
            pickup: true,
            organicOnly: true,
            buyingSince: "2020",
            priceOffered: "₹2,400/quintal",
            cropsNeeded: [
                { crop: "Organic Wheat", qty: "3000 kg" },
                { crop: "Organic Tomato", qty: "1200 kg" }
            ],
            workingHours: "9:00 AM - 5:00 PM (Mon-Fri)",
            avatar: "🌱"
        },
        {
            id: 104,
            name: "Purvanchal Agro Buyers",
            owner: "Mahesh Kumar",
            phone: "+91 94500 11223",
            location: "Chandauli, Uttar Pradesh",
            distance: 8.7,
            rating: 4.3,
            reviewsCount: 19,
            verified: false,
            pickup: false,
            organicOnly: false,
            buyingSince: "2021",
            priceOffered: "₹1,420/quintal",
            cropsNeeded: [
                { crop: "Rice (Paddy)", qty: "4000 kg" },
                { crop: "Potato", qty: "2500 kg" }
            ],
            workingHours: "8:30 AM - 6:30 PM (Mon-Sat)",
            avatar: "🌾"
        },
        {
            id: 105,
            name: "Bhartiya Grain Exports",
            owner: "Vikram Singh",
            phone: "+91 93350 44556",
            location: "Jaunpur, Uttar Pradesh",
            distance: 24.1,
            rating: 4.7,
            reviewsCount: 51,
            verified: true,
            pickup: true,
            organicOnly: false,
            buyingSince: "2014",
            priceOffered: "₹2,310/quintal",
            cropsNeeded: [
                { crop: "Wheat", qty: "10000 kg" },
                { crop: "Maize", qty: "5000 kg" }
            ],
            workingHours: "8:00 AM - 8:00 PM (Daily)",
            avatar: "🚛"
        }
    ],

    myListings: [
        {
            id: "LST-1001",
            crop: "Onion",
            category: "vegetables",
            quantity: 50,
            unit: "quintal",
            expectedPrice: 1500,
            quality: "Good",
            location: "Varanasi, UP",
            harvestDate: "2026-07-28",
            status: "Offer Received",
            statusColor: "#d97706",
            emergency: false,
            images: ["https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=400&q=80"],
            description: "Freshly harvested red onions from organic certified field.",
            dateCreated: "2026-07-30",
            offersCount: 2
        },
        {
            id: "LST-1002",
            crop: "Wheat",
            category: "grains",
            quantity: 120,
            unit: "quintal",
            expectedPrice: 2300,
            quality: "Excellent",
            location: "Varanasi, UP",
            harvestDate: "2026-07-20",
            status: "Active",
            statusColor: "#2E7D32",
            emergency: false,
            images: ["https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80"],
            description: "Sharbati variety wheat, cleaned and bag packed.",
            dateCreated: "2026-07-25",
            offersCount: 0
        },
        {
            id: "LST-1003",
            crop: "Tomato",
            category: "vegetables",
            quantity: 15,
            unit: "quintal",
            expectedPrice: 1850,
            quality: "Average",
            location: "Varanasi, UP",
            harvestDate: "2026-08-01",
            status: "Active",
            statusColor: "#2E7D32",
            emergency: true,
            images: ["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80"],
            description: "Urgent sell needed due to rain forecast! High quality ripe tomatoes.",
            dateCreated: "2026-08-01",
            offersCount: 1
        },
        {
            id: "LST-1004",
            crop: "Potato",
            category: "vegetables",
            quantity: 80,
            unit: "quintal",
            expectedPrice: 1250,
            quality: "Good",
            location: "Varanasi, UP",
            harvestDate: "2026-06-15",
            status: "Sold",
            statusColor: "#2563eb",
            emergency: false,
            images: ["https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80"],
            description: "Kufri Jyoti potatoes, dry cold storage stored.",
            dateCreated: "2026-06-20",
            offersCount: 3
        }
    ],

    offers: [
        {
            id: "OFF-501",
            listingId: "LST-1001",
            buyerId: 101,
            buyerName: "AgriCorp Pvt Ltd",
            crop: "Onion",
            quantity: "50 quintal",
            offeredPrice: 1480,
            unit: "quintal",
            totalAmount: 74000,
            pickupDate: "2026-08-04",
            status: "Pending",
            verified: true,
            location: "Varanasi, UP"
        },
        {
            id: "OFF-502",
            listingId: "LST-1001",
            buyerId: 102,
            buyerName: "Kisan Mandi Traders",
            crop: "Onion",
            quantity: "50 quintal",
            offeredPrice: 1460,
            unit: "quintal",
            totalAmount: 73000,
            pickupDate: "2026-08-05",
            status: "Pending",
            verified: true,
            location: "Ghazipur, UP"
        },
        {
            id: "OFF-503",
            listingId: "LST-1003",
            buyerId: 103,
            buyerName: "Jaivik Organic Foods",
            crop: "Tomato",
            quantity: "15 quintal",
            offeredPrice: 1800,
            unit: "quintal",
            totalAmount: 27000,
            pickupDate: "2026-08-03",
            status: "Pending",
            verified: true,
            location: "Mirzapur, UP"
        }
    ],

    transactions: [
        {
            id: "TXN-9081",
            buyer: "AgriCorp Pvt Ltd",
            crop: "Potato",
            quantity: "80 quintal",
            price: "₹1,250/q",
            totalAmount: "₹1,00,000",
            date: "2026-07-10",
            status: "Completed",
            paymentMode: "Direct Bank Transfer"
        },
        {
            id: "TXN-9042",
            buyer: "Bhartiya Grain Exports",
            crop: "Wheat",
            quantity: "100 quintal",
            price: "₹2,250/q",
            totalAmount: "₹2,25,000",
            date: "2026-06-02",
            status: "Completed",
            paymentMode: "Cash on Pickup"
        },
        {
            id: "TXN-8990",
            buyer: "Kisan Mandi Traders",
            crop: "Mustard",
            quantity: "35 quintal",
            price: "₹5,500/q",
            totalAmount: "₹1,92,500",
            date: "2026-05-18",
            status: "Completed",
            paymentMode: "UPI / Bank"
        }
    ],

    notifications: [
        { id: 1, text: "AgriCorp Pvt Ltd sent an offer of ₹1,480/q for your Onion harvest.", time: "10 mins ago", unread: true, type: "offer" },
        { id: 2, text: "Weather Alert: Heavy rainfall predicted tomorrow in Varanasi region. Harvest early!", time: "1 hour ago", unread: true, type: "weather" },
        { id: 3, text: "Onion prices increased by +6.5% today in Lasalgaon Mandi.", time: "3 hours ago", unread: false, type: "price" },
        { id: 4, text: "Govt MSP for Wheat updated to ₹2,275 per quintal.", time: "1 day ago", unread: false, type: "msp" }
    ],

    weatherAlert: {
        active: true,
        title: "Rain Expected Tomorrow in Varanasi",
        message: "Consider early harvesting and store produce in dry shelter.",
        impact: "high"
    },

    aiSuggestions: [
        {
            crop: "Onion",
            advice: "Current onion prices are rising (+6.5%). Holding for 3 days could increase your profits by ~₹80/quintal.",
            type: "hold"
        },
        {
            crop: "Tomato",
            advice: "Tomato prices are falling in regional mandis. Early selling is recommended before expected rain.",
            type: "sell"
        }
    ]
};
