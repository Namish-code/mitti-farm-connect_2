// Initialize Lucide Icons
lucide.createIcons();

// State
let cart = [];

// Data Mocks
const products = [
    { id: 1, name: "Urea Fertilizer (50kg)", price: 266, cat: "Fertilizers", icon: "flask-conical" },
    { id: 2, name: "DAP Fertilizer (50kg)", price: 1350, cat: "Fertilizers", icon: "flask-round" },
    { id: 3, name: "Wheat Seeds (10kg)", price: 400, cat: "Seeds", icon: "wheat" },
    { id: 4, name: "Organic Compost", price: 150, cat: "Fertilizers", icon: "leaf" },
    { id: 5, name: "Hand Trowel", price: 200, cat: "Tools", icon: "shovel" },
    { id: 6, name: "Sprayer Pump", price: 1200, cat: "Tools", icon: "spray-can" }
];

const schemes = [
    { id: 1, name: "PM-KISAN", desc: "₹6,000 per year minimum income support to all farmer families." },
    { id: 2, name: "PM Fasal Bima Yojana", desc: "Crop insurance service for farmers for their yields." },
    { id: 3, name: "Kisan Credit Card", desc: "Credit provided to farmers on the basis of their holdings." },
    { id: 4, name: "Soil Health Card", desc: "Provides farmers with the nutrient status of their soil." }
];

const vendors = [
    { id: 1, name: "AgriCorp Buyers", price: "₹2,150/q", crop: "Wheat", trend: "up" },
    { id: 2, name: "Local Mandi", price: "₹2,100/q", crop: "Wheat", trend: "down" },
    { id: 3, name: "GreenTrade Network", price: "₹2,180/q", crop: "Wheat", trend: "up" }
];

// ─── INIT ───
window.onload = () => {
    initCharts();
    renderProducts('All');
    renderSchemes();
    renderVendors();
    autoPickLocation();
};

// ─── NAVIGATION ───
function switchView(viewId, btn) {
    // Hide all views
    document.querySelectorAll('.view').forEach(el => el.style.display = 'none');
    // Remove active class from nav buttons
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    
    // Show target view
    document.getElementById(`view-${viewId}`).style.display = 'block';
    btn.classList.add('active');
    
    // Refresh icons
    lucide.createIcons();
}

// ─── LOCATION ───
async function autoPickLocation() {
    const locEl = document.getElementById('userLocation');
    if(locEl) locEl.innerHTML = '<i data-lucide="loader" class="spin"></i> Detecting...';
    lucide.createIcons();

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            try {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
                const data = await res.json();
                let state = data.principalSubdivision || data.city || 'Unknown Location';
                if(locEl) {
                    locEl.innerHTML = `<i data-lucide="map-pin"></i> ${state}, India`;
                    locEl.style.color = 'var(--text-main)';
                }
            } catch(e) {
                if(locEl) locEl.innerHTML = `<i data-lucide="map-pin"></i> Location Error`;
            }
            lucide.createIcons();
        }, (error) => {
            if(locEl) locEl.innerHTML = `<i data-lucide="map-pin"></i> Permission Denied`;
            lucide.createIcons();
        });
    }
}

// ─── CHARTS (Dashboard) ───
function initCharts() {
    // Yield Chart
    const ctxYield = document.getElementById('yieldChart').getContext('2d');
    new Chart(ctxYield, {
        type: 'bar',
        data: {
            labels: ['2020', '2021', '2022', '2023', '2024'],
            datasets: [{
                label: 'Wheat Yield',
                data: [42, 45, 40, 50, 55],
                backgroundColor: 'rgba(16, 185, 129, 0.8)',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#94a3b8' } },
                x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
            }
        }
    });

    // Soil Chart
    const ctxSoil = document.getElementById('soilChart').getContext('2d');
    new Chart(ctxSoil, {
        type: 'doughnut',
        data: {
            labels: ['Nitrogen', 'Phosphorus', 'Potassium'],
            datasets: [{
                data: [40, 35, 25],
                backgroundColor: ['#10b981', '#3b82f6', '#f59e0b'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'right', labels: { color: '#f8fafc' } }
            },
            cutout: '70%'
        }
    });
}

// ─── MARKET ───
function renderVendors() {
    const container = document.getElementById('vendorList');
    container.innerHTML = vendors.map(v => `
        <div class="card glass-card vendor-card">
            <div class="vendor-info">
                <h4>${v.name}</h4>
                <p style="font-size: 0.8rem; color: var(--text-muted);">Buying: ${v.crop}</p>
            </div>
            <div class="vendor-price">
                <div class="price">
                    ${v.price}
                    <i data-lucide="trending-${v.trend}" style="width:16px; height:16px; color: ${v.trend==='up'?'var(--primary)':'#ef4444'}; vertical-align:middle;"></i>
                </div>
                <button class="btn-sell" onclick="alert('Sell order placed to ${v.name}!')">Sell Now</button>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

// ─── SHOP ───
document.querySelectorAll('.cat-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
        document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
        e.target.classList.add('active');
        renderProducts(e.target.innerText);
    });
});

function renderProducts(filter) {
    const container = document.getElementById('productsGrid');
    const filtered = filter === 'All' ? products : products.filter(p => p.cat === filter);
    
    container.innerHTML = filtered.map(p => `
        <div class="card glass-card product-card">
            <div class="product-icon"><i data-lucide="${p.icon}"></i></div>
            <h4>${p.name}</h4>
            <div class="product-price">₹${p.price}</div>
            <button class="btn-add" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
    `).join('');
    lucide.createIcons();
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if(product) {
        cart.push(product);
        updateCartBadge();
    }
}

function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    badge.innerText = cart.length;
    badge.style.display = cart.length > 0 ? 'block' : 'none';
}

function openCart() {
    document.getElementById('cartModal').style.display = 'flex';
    renderCart();
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

function renderCart() {
    const container = document.getElementById('cartItems');
    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
        document.getElementById('cartTotalAmt').innerText = '₹0';
        return;
    }
    
    let total = 0;
    container.innerHTML = cart.map((p, index) => {
        total += p.price;
        return `
            <div class="cart-item">
                <div>
                    <h4 style="font-size:0.9rem;">${p.name}</h4>
                    <span style="color:var(--primary); font-weight:bold;">₹${p.price}</span>
                </div>
                <button class="icon-btn" onclick="removeFromCart(${index})" style="color:#ef4444;"><i data-lucide="trash-2" style="width:18px;"></i></button>
            </div>
        `;
    }).join('');
    
    document.getElementById('cartTotalAmt').innerText = `₹${total}`;
    lucide.createIcons();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartBadge();
    renderCart();
}

function checkout() {
    if(cart.length === 0) return alert('Cart is empty!');
    alert('Checkout simulated successfully! Order placed.');
    cart = [];
    updateCartBadge();
    closeCart();
}

// ─── SCHEMES ───
function renderSchemes() {
    const container = document.getElementById('schemesList');
    container.innerHTML = schemes.map(s => `
        <div class="card glass-card scheme-card">
            <h4>${s.name}</h4>
            <p class="scheme-desc">${s.desc}</p>
            <button class="btn-apply" onclick="alert('Navigating to official portal for ${s.name}...')">Apply Now</button>
        </div>
    `).join('');
}
