/**
 * MITTI Marketplace - State Management & i18n
 */

window.MITTI_STATE = {
    language: localStorage.getItem('mitti_lang') || 'EN',
    location: localStorage.getItem('mitti_loc') || 'Varanasi',
    darkMode: localStorage.getItem('mitti_dark') === 'true',
    favorites: JSON.parse(localStorage.getItem('mitti_favs') || '[]'),
    compareList: [],
    myListings: JSON.parse(localStorage.getItem('mitti_listings') || 'null') || window.MITTI_DATA.myListings,
    offers: JSON.parse(localStorage.getItem('mitti_offers') || 'null') || window.MITTI_DATA.offers,
    transactions: JSON.parse(localStorage.getItem('mitti_txns') || 'null') || window.MITTI_DATA.transactions,
    cart: JSON.parse(localStorage.getItem('mitti_cart') || '[]'),

    translations: {
        EN: {
            appTitle: "Mitti",
            consult: "Consult",
            cart: "Cart",
            exit: "Exit",
            mandiRates: "Mandi rates",
            updatedToday: "UPDATED TODAY",
            movers: "Movers",
            price: "Price",
            az: "A-Z",
            sellProduce: "Sell Produce",
            market: "Market",
            buyers: "Buyers",
            myListings: "My Listings",
            offers: "Offers",
            history: "History",
            analytics: "Analytics",
            schemes: "Schemes",
            shop: "Shop",
            vendorBtn: "Vendor",
            sellBtn: "Sell",
            quickSell: "Emergency Sell",
            weatherAlert: "Weather Alert",
            aiAdvice: "AI Market Advice",
            govMsp: "Govt MSP",
            compareBuyers: "Compare Buyers",
            searchPlaceholder: "Search crop, mandi, or buyer...",
            verifiedVendorWorkspace: "VERIFIED VENDOR WORKSPACE",
            cropSourcing: "Crop Sourcing",
            myInventory: "My Inventory",
            farmerOrders: "Farmer Orders",
            marketIntelligence: "Market Intelligence",
            incomingOrdersTitle: "Incoming Farmer Store Orders",
            sourcingFeedTitle: "Farmer Crop Sourcing Feed",
            currentInventoryTitle: "Current Shop Inventory",
            totalAmount: "Total Amount",
            fulfilled: "Fulfilled",
            pending: "Pending"
        },
        HI: {
            appTitle: "मिट्टी",
            consult: "सलाह लें",
            cart: "कार्ट",
            exit: "बाहर निकलें",
            mandiRates: "मंडी भाव",
            updatedToday: "आज अद्यतन",
            movers: "तेज बदलाव",
            price: "मूल्य",
            az: "अ-ज्ञ",
            sellProduce: "फसल बेचें",
            market: "मंडी",
            buyers: "खरीदार",
            myListings: "मेरी फसलें",
            offers: "प्रस्ताव",
            history: "लेन-देन इतिहास",
            analytics: "विश्लेषण",
            schemes: "सरकारी योजनाएं",
            shop: "दुकान",
            vendorBtn: "विक्रेता",
            sellBtn: "बेचें",
            quickSell: "आपातकालीन बिक्री",
            weatherAlert: "मौसम अलर्ट",
            aiAdvice: "एआई सलाह",
            govMsp: "एमएसपी",
            compareBuyers: "तुलना करें",
            searchPlaceholder: "फसल, मंडी या खरीदार खोजें...",
            verifiedVendorWorkspace: "सत्यापित विक्रेता कार्यक्षेत्र",
            cropSourcing: "फसल खरीद",
            myInventory: "मेरा स्टॉक",
            farmerOrders: "किसान ऑर्डर",
            marketIntelligence: "मंडी विश्लेषण",
            incomingOrdersTitle: "किसानों के प्राप्त स्टोर ऑर्डर",
            sourcingFeedTitle: "किसान फसल खरीद फ़ीड",
            currentInventoryTitle: "वर्तमान दुकान स्टॉक",
            totalAmount: "कुल राशि",
            fulfilled: "पूरा हुआ",
            pending: "लंबित"
        },
        TA: {
            appTitle: "மிட்டி",
            consult: "ஆலோசனை",
            cart: "வண்டி",
            exit: "வெளியேறு",
            mandiRates: "சந்தை விலை",
            updatedToday: "இன்று புதுப்பிக்கப்பட்டது",
            movers: "முக்கிய மாற்றங்கள்",
            price: "விலை",
            az: "அ-ஹ",
            sellProduce: "பயிர் விற்க",
            market: "சந்தை",
            buyers: "கொள்முதல் செய்வோர்",
            myListings: "என் பயிர்கள்",
            offers: "சலுகைகள்",
            history: "வரலாறு",
            analytics: "பகுப்பாய்வு",
            schemes: "அரசு திட்டங்கள்",
            shop: "கடை",
            vendorBtn: "வியாபாரி",
            sellBtn: "விற்க",
            quickSell: "அவசர விற்பனை",
            weatherAlert: "வானிலை எச்சரிக்கை",
            aiAdvice: "AI ஆலோசனை",
            govMsp: "அரசு MSP",
            compareBuyers: "ஒப்பிடுக",
            searchPlaceholder: "பயிர் அல்லது சந்தை தேடுக...",
            verifiedVendorWorkspace: "சரிபார்க்கப்பட்ட விற்பனையாளர் தளம்",
            cropSourcing: "பயிர் கொள்முதல்",
            myInventory: "என் சரக்கு",
            farmerOrders: "விவசாயி ஆர்டர்கள்",
            marketIntelligence: "சந்தை நுண்ணறிவு",
            incomingOrdersTitle: "விவசாயி கடை ஆர்டர்கள்",
            sourcingFeedTitle: "பயிர் கொள்முதல் ஊட்டம்",
            currentInventoryTitle: "தற்போதைய கடை சரக்கு",
            totalAmount: "மொத்த தொகை",
            fulfilled: "நிறைவேற்றப்பட்டது",
            pending: "நிலுவையில் உள்ளது"
        }
    },

    saveListings() {
        localStorage.setItem('mitti_listings', JSON.stringify(this.myListings));
    },

    saveOffers() {
        localStorage.setItem('mitti_offers', JSON.stringify(this.offers));
    },

    saveTransactions() {
        localStorage.setItem('mitti_txns', JSON.stringify(this.transactions));
    },

    toggleFavorite(buyerId) {
        const index = this.favorites.indexOf(buyerId);
        if (index > -1) {
            this.favorites.splice(index, 1);
        } else {
            this.favorites.push(buyerId);
        }
        localStorage.setItem('mitti_favs', JSON.stringify(this.favorites));
    },

    toggleCompare(buyerId) {
        const index = this.compareList.indexOf(buyerId);
        if (index > -1) {
            this.compareList.splice(index, 1);
        } else {
            if (this.compareList.length >= 3) {
                alert("You can compare maximum 3 buyers at a time.");
                return false;
            }
            this.compareList.push(buyerId);
        }
        return true;
    },

    getText(key) {
        const langDict = this.translations[this.language] || this.translations.EN;
        return langDict[key] || this.translations.EN[key] || key;
    },

    getApiBaseUrl() {
        const host = window.location.hostname || 'localhost';
        return `http://${host}:5000`;
    }
};
