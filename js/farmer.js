/**
 * Mitti Farmer Portal Module (Phase 3)
 */

window.MITTI_FARMER = {
    soilChart: null,
    cartItems: {},

    async init() {
        this.renderAnalyticsView();
        this.renderShopView();
        this.renderSchemesView();
    },

    // 1. Render Analytics Tab (Matching Screenshots 3 & 8)
    async renderAnalyticsView() {
        const container = document.getElementById('view-analytics');
        if (!container) return;

        let analyticsData = {
            farmerName: "Shivangi",
            ph: 7.1,
            yield: 4.1,
            moisture: 62,
            nitrogen: 264,
            trendMonths: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
            phTrend: [6.4, 6.6, 6.7, 6.7, 6.9, 7.1],
            moistureTrend: [6.5, 6.4, 6.2, 4.4, 6.9, 7.0]
        };

        try {
            const res = await fetch('http://localhost:5000/api/analytics');
            const json = await res.json();
            if (json.success) analyticsData = json.data;
        } catch (e) {
            console.log("Using local analytics fallback data");
        }

        container.innerHTML = `
            <!-- Farmer Hero Sprout Banner (Matching Photo 3) -->
            <div style="position: relative; height: 140px; border-radius: 20px; overflow: hidden; margin-bottom: 20px; background: url('https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80') center/cover no-repeat;">
                <div style="position: absolute; inset:0; background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%);"></div>
                <div style="position: relative; z-index: 2; padding: 16px; color: white;">
                    <div style="font-size: 0.75rem; font-weight: 700; letter-spacing: 1.5px; opacity: 0.9;">NAMASTE</div>
                    <div style="font-size: 1.8rem; font-weight: 800;">${analyticsData.farmerName || 'Shivangi'}</div>
                </div>
            </div>

            <!-- Soil Health Section -->
            <div style="font-size: 0.75rem; font-weight: 800; letter-spacing: 1.5px; color: var(--text-muted); text-transform: uppercase; margin-bottom: 4px;">THIS SEASON</div>
            <h1 style="font-size: 2.2rem; font-weight: 800; color: #1F2937; margin-bottom: 16px;">Soil <span style="color: #2C5E3B;">health</span></h1>

            <!-- 4 Metric Cards Grid (Matching Photo 3) -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 20px;">
                <div style="background: #FFFFFF; border-radius: 20px; padding: 16px; border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 2px 10px rgba(0,0,0,0.02);">
                    <div style="width: 36px; height: 36px; background: #E8F3EB; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #2C5E3B; margin-bottom: 10px;">
                        <i data-lucide="flask-conical" style="width: 20px; height: 20px;"></i>
                    </div>
                    <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); letter-spacing: 0.5px;">SOIL PH</div>
                    <div style="font-size: 1.7rem; font-weight: 800; color: #1F2937;">${analyticsData.ph} <span style="font-size: 0.9rem; font-weight: 600; color: var(--text-muted);">pH</span></div>
                </div>

                <div style="background: #FFFFFF; border-radius: 20px; padding: 16px; border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 2px 10px rgba(0,0,0,0.02);">
                    <div style="width: 36px; height: 36px; background: #E8F3EB; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #2C5E3B; margin-bottom: 10px;">
                        <i data-lucide="wheat" style="width: 20px; height: 20px;"></i>
                    </div>
                    <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); letter-spacing: 0.5px;">AVG YIELD</div>
                    <div style="font-size: 1.7rem; font-weight: 800; color: #1F2937;">${analyticsData.yield} <span style="font-size: 0.9rem; font-weight: 600; color: var(--text-muted);">t/acre</span></div>
                </div>

                <div style="background: #FFFFFF; border-radius: 20px; padding: 16px; border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 2px 10px rgba(0,0,0,0.02);">
                    <div style="width: 36px; height: 36px; background: #E8F3EB; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #2C5E3B; margin-bottom: 10px;">
                        <i data-lucide="droplet" style="width: 20px; height: 20px;"></i>
                    </div>
                    <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); letter-spacing: 0.5px;">MOISTURE</div>
                    <div style="font-size: 1.7rem; font-weight: 800; color: #1F2937;">${analyticsData.moisture} <span style="font-size: 0.9rem; font-weight: 600; color: var(--text-muted);">%</span></div>
                </div>

                <div style="background: #FFFFFF; border-radius: 20px; padding: 16px; border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 2px 10px rgba(0,0,0,0.02);">
                    <div style="width: 36px; height: 36px; background: #E8F3EB; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #2C5E3B; margin-bottom: 10px;">
                        <i data-lucide="activity" style="width: 20px; height: 20px;"></i>
                    </div>
                    <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); letter-spacing: 0.5px;">NITROGEN</div>
                    <div style="font-size: 1.7rem; font-weight: 800; color: #1F2937;">${analyticsData.nitrogen} <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-muted);">kg/ha</span></div>
                </div>
            </div>

            <!-- Six-Month Trend Chart Card (Matching Photo 8) -->
            <div style="background: #FFFFFF; border-radius: 24px; padding: 20px; border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 4px 16px rgba(0,0,0,0.03);">
                <h3 style="font-size: 1.3rem; font-weight: 800; color: #1F2937;">Six-month <span style="color: #C06C1B;">trend</span></h3>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 16px;">Soil pH (sage) against moisture % (terracotta)</p>

                <div style="position: relative; height: 220px;">
                    <canvas id="soilTrendChart"></canvas>
                </div>
            </div>
        `;

        if (window.lucide) window.lucide.createIcons();

        // Render Chart.js
        setTimeout(() => {
            const ctx = document.getElementById('soilTrendChart');
            if (ctx) {
                if (this.soilChart) this.soilChart.destroy();
                this.soilChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: analyticsData.trendMonths,
                        datasets: [
                            {
                                label: 'Soil pH',
                                data: analyticsData.phTrend,
                                borderColor: '#2C5E3B',
                                backgroundColor: '#2C5E3B',
                                borderWidth: 3,
                                tension: 0.3,
                                pointRadius: 5
                            },
                            {
                                label: 'Moisture %',
                                data: analyticsData.moistureTrend,
                                borderColor: '#C06C1B',
                                backgroundColor: '#C06C1B',
                                borderWidth: 3,
                                tension: 0.3,
                                pointRadius: 5
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false }
                        },
                        scales: {
                            y: {
                                grid: { color: '#F3F4F6' },
                                ticks: { font: { family: 'Outfit', size: 11 } }
                            },
                            x: {
                                grid: { display: false },
                                ticks: { font: { family: 'Outfit', size: 11 } }
                            }
                        }
                    }
                });
            }
        }, 100);
    },

    // 2. Render Shop Tab (`Krishi shop` - Matching Screenshot 6)
    async renderShopView(category = 'all') {
        const container = document.getElementById('view-shop');
        if (!container) return;

        let products = [
            { id: 101, title: "Urea 46% N (Neem Coated)", category: "Fertilizer", vendor: "Ramesh Krishi Kendra", price: 266.5, packSize: "45 kg bag", stockStatus: "In stock", image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=400&q=80" },
            { id: 102, title: "DAP 18:46:0", category: "Fertilizer", vendor: "Ramesh Krishi Kendra", price: 1350, packSize: "50 kg bag", stockStatus: "In stock", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80" }
        ];

        try {
            const res = await fetch(`http://localhost:5000/api/supplies${category !== 'all' ? '?category=' + category : ''}`);
            const json = await res.json();
            if (json.success && json.data.length > 0) products = json.data;
        } catch (e) {
            console.log("Using local shop products fallback");
        }

        container.innerHTML = `
            <!-- Shop Header -->
            <div style="font-size: 0.75rem; font-weight: 800; letter-spacing: 1.5px; color: var(--text-muted); text-transform: uppercase; margin-bottom: 4px;">VERIFIED VENDORS</div>
            <h1 style="font-size: 2.2rem; font-weight: 800; color: #1F2937; margin-bottom: 16px;">Krishi <span style="color: #2C5E3B;">shop</span></h1>

            <!-- Filter Pills Bar -->
            <div style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 12px; margin-bottom: 16px;">
                <button class="pill-chip ${category === 'all' ? 'active' : ''}" onclick="MITTI_FARMER.renderShopView('all')">All</button>
                <button class="pill-chip ${category === 'fertilizer' ? 'active' : ''}" onclick="MITTI_FARMER.renderShopView('fertilizer')">Fertilizer</button>
                <button class="pill-chip ${category === 'micronutrient' ? 'active' : ''}" onclick="MITTI_FARMER.renderShopView('micronutrient')">Micronutrient</button>
                <button class="pill-chip ${category === 'organic' ? 'active' : ''}" onclick="MITTI_FARMER.renderShopView('organic')">Organic</button>
                <button class="pill-chip ${category === 'seeds' ? 'active' : ''}" onclick="MITTI_FARMER.renderShopView('seeds')">Seeds</button>
            </div>

            <!-- Product Cards Grid (Matching Photo 6) -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
                ${products.map(p => {
                    const qty = this.cartItems[p.id] || 1;
                    return `
                    <div style="background: #FFFFFF; border-radius: 20px; overflow: hidden; border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 4px 14px rgba(0,0,0,0.03); display: flex; flex-direction: column;">
                        <!-- Product Image + Stock Badge -->
                        <div style="position: relative; height: 130px; background: #333;">
                            <img src="${p.image}" alt="${p.title}" style="width: 100%; height: 100%; object-fit: cover;">
                            <span style="position: absolute; top: 10px; left: 10px; background: #2C5E3B; color: white; font-size: 0.7rem; font-weight: 700; padding: 3px 8px; border-radius: 12px;">${p.stockStatus || 'In stock'}</span>
                        </div>

                        <!-- Product Info -->
                        <div style="padding: 14px; display: flex; flex-direction: column; flex-grow: 1;">
                            <div style="font-size: 0.7rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px;">${p.category}</div>
                            <div style="font-size: 0.95rem; font-weight: 800; color: #1F2937; margin: 4px 0 2px; line-height: 1.25; min-height: 38px;">${p.title}</div>
                            <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 8px;">${p.vendor}</div>

                            <div style="font-size: 1.15rem; font-weight: 800; color: #2C5E3B; margin-bottom: 12px;">
                                ₹${p.price} <span style="font-size: 0.75rem; font-weight: 500; color: var(--text-muted);">/ ${p.packSize}</span>
                            </div>

                            <!-- Quantity Counter Pill -->
                            <div style="display: flex; align-items: center; justify-content: space-between; background: #F9FAFB; border: 1.5px solid #E5E7EB; border-radius: 24px; padding: 4px 12px; margin-bottom: 10px;">
                                <button style="background: none; border: none; font-size: 1.1rem; font-weight: 700; cursor: pointer; color: #4B5563;" onclick="MITTI_FARMER.updateQty(${p.id}, -1)">-</button>
                                <span style="font-weight: 800; font-size: 0.95rem;" id="qty-${p.id}">${qty}</span>
                                <button style="background: none; border: none; font-size: 1.1rem; font-weight: 700; cursor: pointer; color: #4B5563;" onclick="MITTI_FARMER.updateQty(${p.id}, 1)">+</button>
                            </div>

                            <button class="btn-green-large" style="padding: 10px; font-size: 0.85rem; border-radius: 20px; margin-top: auto;" onclick="MITTI_FARMER.addToCart(${p.id}, '${p.title}', ${p.price})">
                                Add to cart
                            </button>
                        </div>
                    </div>
                    `;
                }).join('')}
            </div>
        `;

        if (window.lucide) window.lucide.createIcons();
    },

    updateQty(productId, delta) {
        let current = this.cartItems[productId] || 1;
        current = Math.max(1, current + delta);
        this.cartItems[productId] = current;
        const el = document.getElementById(`qty-${productId}`);
        if (el) el.innerText = current;
    },

    cartList: [],

    async addToCart(productId, title, price) {
        const qty = this.cartItems[productId] || 1;
        const existing = this.cartList.find(i => i.id === productId);

        if (existing) {
            existing.qty += qty;
        } else {
            this.cartList.push({ id: productId, title, price, qty });
        }

        if (window.renderCartModalItems) window.renderCartModalItems();
        alert(`Added ${qty} x ${title} to your Cart! Click 'Cart' in top header to view items or checkout.`);
    },

    // 3. Render Schemes Tab (`Yojana schemes` - Matching Screenshot 7)
    async renderSchemesView() {
        const container = document.getElementById('view-schemes');
        if (!container) return;

        let schemes = [
            { id: "SCH-01", title: "Agriculture Infrastructure Fund", description: "Interest subvention of 3% on loans up to Rs 2 crore for warehouses, cold storage and primary processing.", authority: "Govt. of India", category: "Infrastructure" },
            { id: "SCH-02", title: "e-NAM National Agriculture Market", description: "Sell your produce online across 1,000+ mandis with transparent bidding and direct bank payment.", authority: "Govt. of India", category: "Marketing" }
        ];

        try {
            const res = await fetch('http://localhost:5000/api/schemes');
            const json = await res.json();
            if (json.success && json.data.length > 0) schemes = json.data;
        } catch (e) {
            console.log("Using local schemes fallback");
        }

        container.innerHTML = `
            <!-- Schemes Header -->
            <div style="font-size: 0.75rem; font-weight: 800; letter-spacing: 1.5px; color: var(--text-muted); text-transform: uppercase; margin-bottom: 4px;">GOVERNMENT SUPPORT</div>
            <h1 style="font-size: 2.2rem; font-weight: 800; color: #1F2937; margin-bottom: 20px;">Yojana <span style="color: #2C5E3B;">schemes</span></h1>

            <!-- Scheme Cards List (Matching Photo 7) -->
            <div style="display: flex; flex-direction: column; gap: 16px;">
                ${schemes.map(s => `
                    <div style="background: #FFFFFF; border-radius: 20px; padding: 20px; border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 4px 16px rgba(0,0,0,0.03);">
                        <div style="display: flex; gap: 14px; margin-bottom: 12px;">
                            <div style="width: 44px; height: 44px; background: #FFF4E5; border-radius: 14px; display: flex; align-items: center; justify-content: center; color: #C06C1B; flex-shrink: 0;">
                                <i data-lucide="building" style="width: 22px; height: 22px;"></i>
                            </div>
                            <div>
                                <h3 style="font-size: 1.15rem; font-weight: 800; color: #C06C1B; line-height: 1.3;">${s.title}</h3>
                            </div>
                        </div>

                        <p style="font-size: 0.9rem; color: #4B5563; line-height: 1.5; margin-bottom: 16px;">${s.description}</p>

                        <div style="display: flex; align-items: center; justify-content: space-between;">
                            <span style="background: #F3F4F6; color: #4B5563; font-size: 0.75rem; font-weight: 600; padding: 4px 10px; border-radius: 12px;">
                                ✓ ${s.authority} · ${s.category}
                            </span>
                            <button style="background: none; border: 1.5px solid #2C5E3B; color: #2C5E3B; font-weight: 700; padding: 8px 18px; border-radius: 20px; cursor: pointer;" onclick="alert('Redirecting to official government portal for ${s.title}...')">
                                Apply Now
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        if (window.lucide) window.lucide.createIcons();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    window.MITTI_FARMER.init();
});
