/**
 * Initial Agricultural Dataset for Mitti Platform (In-Memory Database Seed)
 */

export const initialData = {
    soilAnalytics: {
        farmerName: "Shivangi",
        location: "Varanasi",
        ph: 7.1,
        yield: 4.1,
        moisture: 62,
        nitrogen: 264,
        trendMonths: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        phTrend: [6.4, 6.6, 6.7, 6.7, 6.9, 7.1],
        moistureTrend: [6.5, 6.4, 6.2, 44, 69, 70]
    },

    mandiRates: [
        { id: 1, crop: "Onion", mandi: "Lasalgaon, Maharashtra", current: 1450, yesterday: 1360, lastWeek: 1250, change: "+6.5%", trend: "up", msp: 1300, isMspBetter: false, highestBuyer: 1520, lowestBuyer: 1380, avg: 1430, unit: "quintal", cat: "vegetables" },
        { id: 2, crop: "Cotton (Kapas)", mandi: "Akola, Maharashtra", current: 7350, yesterday: 7130, lastWeek: 6900, change: "+3.1%", trend: "up", msp: 7020, isMspBetter: false, highestBuyer: 7500, lowestBuyer: 7100, avg: 7300, unit: "quintal", cat: "cashcrops" },
        { id: 3, crop: "Groundnut", mandi: "Rajkot, Gujarat", current: 6200, yesterday: 6250, lastWeek: 6400, change: "-0.8%", trend: "down", msp: 6375, isMspBetter: true, highestBuyer: 6300, lowestBuyer: 6050, avg: 6180, unit: "quintal", cat: "oilseeds" },
        { id: 4, crop: "Wheat", mandi: "Khanna, Punjab", current: 2275, yesterday: 2275, lastWeek: 2250, change: "+0.0%", trend: "neutral", msp: 2275, isMspBetter: false, highestBuyer: 2350, lowestBuyer: 2200, avg: 2260, unit: "quintal", cat: "grains" },
        { id: 5, crop: "Rice (Paddy)", mandi: "Karnal, Haryana", current: 2183, yesterday: 2150, lastWeek: 2100, change: "+1.5%", trend: "up", msp: 2183, isMspBetter: false, highestBuyer: 2280, lowestBuyer: 2120, avg: 2170, unit: "quintal", cat: "grains" },
        { id: 6, crop: "Tomato", mandi: "Kolar, Karnataka", current: 1800, yesterday: 1950, lastWeek: 2200, change: "-7.6%", trend: "down", msp: null, isMspBetter: false, highestBuyer: 1950, lowestBuyer: 1650, avg: 1780, unit: "quintal", cat: "vegetables" }
    ],

    shopProducts: [
        {
            id: 101,
            title: "Urea 46% N (Neem Coated)",
            category: "Fertilizer",
            vendor: "Ramesh Krishi Kendra",
            vendorLocation: "Varanasi, UP",
            price: 266.5,
            packSize: "45 kg bag",
            stockStatus: "In stock",
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=400&q=80"
        },
        {
            id: 102,
            title: "DAP 18:46:0",
            category: "Fertilizer",
            vendor: "Ramesh Krishi Kendra",
            vendorLocation: "Varanasi, UP",
            price: 1350,
            packSize: "50 kg bag",
            stockStatus: "In stock",
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80"
        },
        {
            id: 103,
            title: "Zinc Sulphate 33% (Micronutrient)",
            category: "Micronutrient",
            vendor: "Gupta Krishi Bhandar",
            vendorLocation: "Varanasi, UP",
            price: 480,
            packSize: "10 kg bag",
            stockStatus: "In stock",
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=400&q=80"
        },
        {
            id: 104,
            title: "Hybrid Wheat Seeds (HD-2967)",
            category: "Seeds",
            vendor: "National Seeds Agency",
            vendorLocation: "Varanasi, UP",
            price: 950,
            packSize: "40 kg bag",
            stockStatus: "In stock",
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80"
        }
    ],

    farmerListings: [
        {
            id: "CROP-201",
            farmerName: "Shivangi Singh",
            phone: "+91 98765 43210",
            location: "Varanasi, Uttar Pradesh",
            crop: "Wheat (Sharbati Quality)",
            quantity: 80,
            unit: "quintal",
            askingPrice: 2300,
            status: "Active",
            postedDate: "2026-08-04",
            image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80"
        },
        {
            id: "CROP-202",
            farmerName: "Ramcharan Patel",
            phone: "+91 98123 99887",
            location: "Chandauli, UP",
            crop: "Rice (Paddy 1509)",
            quantity: 120,
            unit: "quintal",
            askingPrice: 2220,
            status: "Active",
            postedDate: "2026-08-03",
            image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=400&q=80"
        }
    ],

    schemes: [
        {
            id: "SCH-01",
            title: "Agriculture Infrastructure Fund",
            description: "Interest subvention of 3% on loans up to Rs 2 crore for warehouses, cold storage and primary processing.",
            authority: "Govt. of India",
            category: "Infrastructure",
            icon: "building"
        },
        {
            id: "SCH-02",
            title: "e-NAM National Agriculture Market",
            description: "Sell your produce online across 1,000+ mandis with transparent bidding and direct bank payment.",
            authority: "Govt. of India",
            category: "Marketing",
            icon: "store"
        },
        {
            id: "SCH-03",
            title: "PM-KISAN Samman Nidhi",
            description: "Direct income support of ₹6,000 per year in 3 equal installments to eligible farmer families.",
            authority: "Govt. of India",
            category: "Financial Support",
            icon: "coins"
        }
    ],

    orders: [
        {
            orderId: "ORD-901",
            farmerName: "Shivangi Singh",
            phone: "+91 98765 43210",
            location: "Varanasi",
            items: [
                { title: "Urea 46% N (Neem Coated)", qty: 2, price: 266.5 },
                { title: "DAP 18:46:0", qty: 1, price: 1350 }
            ],
            totalAmount: 1883.0,
            vendor: "Ramesh Krishi Kendra",
            status: "Pending",
            createdDate: "2026-08-04 17:40"
        }
    ]
};
