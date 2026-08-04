/**
 * Mitti Vendor Portal Module (Phase 4)
 */

window.MITTI_VENDOR = {
    activeSubTab: 'sourcing',

    async init() {
        this.renderVendorView();
    },

    async renderVendorView() {
        const container = document.getElementById('view-vendor');
        if (!container) return;

        container.innerHTML = `
            <!-- Vendor Header Banner -->
            <div style="background: linear-gradient(135deg, #1E3A2B 0%, #2C5E3B 100%); border-radius: 20px; padding: 20px; color: white; margin-bottom: 20px; box-shadow: 0 4px 16px rgba(44,94,59,0.2);">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 46px; height: 46px; background: rgba(255,255,255,0.15); border-radius: 14px; display: flex; align-items: center; justify-content: center; color: #FFF;">
                        <i data-lucide="store" style="width: 24px; height: 24px;"></i>
                    </div>
                    <div>
                        <div style="font-size: 0.75rem; font-weight: 700; color: #A3B899; letter-spacing: 1px;">VERIFIED VENDOR WORKSPACE</div>
                        <h2 style="font-size: 1.4rem; font-weight: 800;">Ramesh Krishi Kendra</h2>
                        <div style="font-size: 0.8rem; color: #E5E7EB; display: flex; align-items: center; gap: 4px; margin-top: 2px;">
                            <i data-lucide="map-pin" style="width: 14px; height: 14px;"></i> Varanasi, Uttar Pradesh · License #VNS-8849
                        </div>
                    </div>
                </div>
            </div>

            <!-- Vendor Sub-Tab Navigation Bar -->
            <div class="market-subtabs" style="margin-bottom: 20px;">
                <button class="market-subtab ${this.activeSubTab === 'sourcing' ? 'active' : ''}" onclick="MITTI_VENDOR.switchSubTab('sourcing')">🌾 Crop Sourcing</button>
                <button class="market-subtab ${this.activeSubTab === 'inventory' ? 'active' : ''}" onclick="MITTI_VENDOR.switchSubTab('inventory')">🏪 My Inventory</button>
                <button class="market-subtab ${this.activeSubTab === 'orders' ? 'active' : ''}" onclick="MITTI_VENDOR.switchSubTab('orders')">📦 Farmer Orders</button>
                <button class="market-subtab ${this.activeSubTab === 'intelligence' ? 'active' : ''}" onclick="MITTI_VENDOR.switchSubTab('intelligence')">📈 Market Intelligence</button>
            </div>

            <!-- Sub-View Content Container -->
            <div id="vendorSubViewContent"></div>
        `;

        if (window.lucide) window.lucide.createIcons();
        this.renderActiveSubTab();
    },

    switchSubTab(tabName) {
        this.activeSubTab = tabName;

        // Sync bottom nav active button
        document.querySelectorAll('.bottom-nav .nav-item').forEach(btn => btn.classList.remove('active'));
        const activeNavBtn = document.getElementById(`vendnav-${tabName}`);
        if (activeNavBtn) activeNavBtn.classList.add('active');

        this.renderVendorView();
    },

    renderActiveSubTab() {
        const container = document.getElementById('vendorSubViewContent');
        if (!container) return;

        if (this.activeSubTab === 'sourcing') {
            this.renderSourcingTab(container);
        } else if (this.activeSubTab === 'inventory') {
            this.renderInventoryTab(container);
        } else if (this.activeSubTab === 'orders') {
            this.renderOrdersTab(container);
        } else if (this.activeSubTab === 'intelligence') {
            this.renderIntelligenceTab(container);
        }
    },

    // 1. Farmer Crop Sourcing Feed
    async renderSourcingTab(container) {
        let listings = [
            { id: "CROP-201", farmerName: "Shivangi Singh", phone: "+91 98765 43210", location: "Varanasi, UP", crop: "Wheat (Sharbati)", quantity: 80, unit: "quintal", askingPrice: 2300, image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80" },
            { id: "CROP-202", farmerName: "Ramcharan Patel", phone: "+91 98123 99887", location: "Chandauli, UP", crop: "Rice (Paddy 1509)", quantity: 120, unit: "quintal", askingPrice: 2220, image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=400&q=80" }
        ];

        try {
            const res = await fetch('http://localhost:5000/api/produce');
            const json = await res.json();
            if (json.success && json.data.length > 0) listings = json.data;
        } catch (e) {
            console.log("Using local crop listings fallback");
        }

        container.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                <div>
                    <h3 style="font-size: 1.2rem; font-weight: 800; color: #1F2937;">Farmer Crop Sourcing Feed</h3>
                    <p style="font-size: 0.85rem; color: var(--text-muted);">Buy freshly listed produce directly from local farmers</p>
                </div>
                <span style="background: #E8F3EB; color: #2C5E3B; font-weight: 700; font-size: 0.8rem; padding: 4px 10px; border-radius: 12px;">${listings.length} Active Listings</span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 16px;">
                ${listings.map(item => `
                    <div style="background: #FFFFFF; border-radius: 20px; padding: 16px; border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 4px 14px rgba(0,0,0,0.03); display: flex; gap: 14px;">
                        <img src="${item.image}" alt="${item.crop}" style="width: 100px; height: 100px; border-radius: 16px; object-fit: cover; flex-shrink: 0;">
                        
                        <div style="flex-grow: 1;">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                                <h4 style="font-size: 1.1rem; font-weight: 800; color: #1F2937;">${item.crop}</h4>
                                <span style="font-size: 1.15rem; font-weight: 800; color: #2C5E3B;">₹${item.askingPrice} <span style="font-size: 0.75rem; color: var(--text-muted);">/ ${item.unit}</span></span>
                            </div>

                            <div style="font-size: 0.85rem; font-weight: 600; color: #374151; margin: 4px 0;">🧑‍🌾 ${item.farmerName} · 📍 ${item.location}</div>
                            <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">Available Quantity: <strong>${item.quantity} ${item.unit}</strong></div>

                            <div style="display: flex; gap: 8px;">
                                <button style="background: #2C5E3B; color: white; border: none; font-weight: 700; font-size: 0.85rem; padding: 8px 14px; border-radius: 18px; cursor: pointer;" onclick="MITTI_VENDOR.makeBuyingOffer('${item.id}', '${item.crop}', ${item.quantity}, '${item.unit}', ${item.askingPrice}, '${item.farmerName}')">
                                    🤝 Make Buying Offer
                                </button>
                                <button style="background: #F3F4F6; color: #374151; border: none; font-weight: 700; font-size: 0.85rem; padding: 8px 14px; border-radius: 18px; cursor: pointer;" onclick="alert('Calling Farmer ${item.farmerName} at ${item.phone || '+91 98765 43210'}...')">
                                    📞 Call Farmer
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },

    async makeBuyingOffer(cropId, crop, quantity, unit, askingPrice, farmerName) {
        const offerVal = prompt(`Send Buying Offer to ${farmerName} for ${crop}\nAsking Price: ₹${askingPrice}/${unit}\nEnter your offer price (₹/${unit}):`, askingPrice);
        if (!offerVal) return;

        const offerPrice = Number(offerVal);
        try {
            await fetch('http://localhost:5000/api/offers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cropId,
                    crop,
                    quantity,
                    unit,
                    askingPrice,
                    offerPrice,
                    vendorName: "Ramesh Krishi Kendra"
                })
            });
        } catch (e) {
            console.log("Offer saved locally");
        }

        alert(`Buying offer of ₹${offerPrice}/${unit} sent to ${farmerName}! They can view and accept it in their Offers tab.`);
    },

    // 2. My Shop Inventory Manager
    async renderInventoryTab(container) {
        let products = [
            { id: 101, title: "Urea 46% N (Neem Coated)", category: "Fertilizer", price: 266.5, packSize: "45 kg bag", stockStatus: "In stock" },
            { id: 102, title: "DAP 18:46:0", category: "Fertilizer", price: 1350, packSize: "50 kg bag", stockStatus: "In stock" }
        ];

        try {
            const res = await fetch('http://localhost:5000/api/supplies');
            const json = await res.json();
            if (json.success && json.data.length > 0) products = json.data;
        } catch (e) {
            console.log("Using local inventory fallback");
        }

        container.innerHTML = `
            <!-- Add New Product Form Card -->
            <div style="background: #FFFFFF; border-radius: 20px; padding: 20px; border: 1px solid rgba(0,0,0,0.06); margin-bottom: 20px; box-shadow: 0 4px 14px rgba(0,0,0,0.03);">
                <h3 style="font-size: 1.15rem; font-weight: 800; color: #2C5E3B; margin-bottom: 12px;">➕ Add Product to Krishi Shop</h3>
                
                <form id="vendorAddProductForm" onsubmit="MITTI_VENDOR.handleAddProduct(event)">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
                        <div>
                            <label style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted);">Product Name</label>
                            <input type="text" class="form-control" id="vTitle" placeholder="e.g. NPK 19:19:19" required>
                        </div>
                        <div>
                            <label style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted);">Category</label>
                            <select class="form-control" id="vCategory">
                                <option value="Fertilizer">Fertilizer</option>
                                <option value="Micronutrient">Micronutrient</option>
                                <option value="Organic">Organic</option>
                                <option value="Seeds">Seeds</option>
                            </select>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
                        <div>
                            <label style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted);">Selling Price (₹)</label>
                            <input type="number" step="0.5" class="form-control" id="vPrice" placeholder="e.g. 450" required>
                        </div>
                        <div>
                            <label style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted);">Pack Size</label>
                            <input type="text" class="form-control" id="vPackSize" placeholder="e.g. 50 kg bag" value="50 kg bag">
                        </div>
                    </div>

                    <button type="submit" class="btn-green-large" style="padding: 12px;">Publish to Farmer Krishi Shop</button>
                </form>
            </div>

            <!-- Existing Products List -->
            <h3 style="font-size: 1.2rem; font-weight: 800; color: #1F2937; margin-bottom: 12px;">Current Shop Inventory</h3>
            <div style="display: flex; flex-direction: column; gap: 12px;">
                ${products.map(p => `
                    <div style="background: #FFFFFF; border-radius: 16px; padding: 14px 18px; border: 1px solid rgba(0,0,0,0.06); display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <span style="font-size: 0.7rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase;">${p.category}</span>
                            <h4 style="font-size: 1rem; font-weight: 800; color: #1F2937;">${p.title}</h4>
                            <div style="font-size: 0.85rem; color: #2C5E3B; font-weight: 700;">₹${p.price} / ${p.packSize || 'unit'}</div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <button style="background: #F3F4F6; border: none; font-size: 0.75rem; font-weight: 700; padding: 6px 10px; border-radius: 12px; cursor: pointer;" onclick="MITTI_VENDOR.editProductPrice(${p.id}, ${p.price})">✏️ Edit Price</button>
                            <button style="background: ${p.stockStatus === 'In stock' ? '#E8F3EB' : '#FEE2E2'}; color: ${p.stockStatus === 'In stock' ? '#2C5E3B' : '#DC2626'}; border: none; font-weight: 700; font-size: 0.75rem; padding: 6px 10px; border-radius: 12px; cursor: pointer;" onclick="MITTI_VENDOR.toggleStockStatus(${p.id}, '${p.stockStatus}')">${p.stockStatus || 'In stock'}</button>
                            <button style="background: #FEE2E2; color: #DC2626; border: none; font-size: 0.75rem; font-weight: 700; padding: 6px 10px; border-radius: 12px; cursor: pointer;" onclick="MITTI_VENDOR.deleteProduct(${p.id})">🗑️ Delete</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },

    async editProductPrice(id, currentPrice) {
        const newPrice = prompt(`Enter new selling price for product:`, currentPrice);
        if (!newPrice || isNaN(newPrice)) return;

        try {
            await fetch(`http://localhost:5000/api/supplies/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ price: Number(newPrice) })
            });
        } catch (e) {
            console.log("Price updated locally");
        }

        alert("Product price updated successfully!");
        this.renderInventoryTab(document.getElementById('vendorSubViewContent'));
    },

    async toggleStockStatus(id, currentStatus) {
        const newStatus = currentStatus === 'In stock' ? 'Out of stock' : 'In stock';
        try {
            await fetch(`http://localhost:5000/api/supplies/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ stockStatus: newStatus })
            });
        } catch (e) {
            console.log("Stock status updated locally");
        }

        this.renderInventoryTab(document.getElementById('vendorSubViewContent'));
    },

    async deleteProduct(id) {
        if (!confirm("Are you sure you want to delete this product from your Krishi Shop?")) return;

        try {
            await fetch(`http://localhost:5000/api/supplies/${id}`, {
                method: 'DELETE'
            });
        } catch (e) {
            console.log("Product deleted locally");
        }

        alert("Product deleted!");
        this.renderInventoryTab(document.getElementById('vendorSubViewContent'));
    },

    async handleAddProduct(event) {
        event.preventDefault();
        const title = document.getElementById('vTitle').value;
        const category = document.getElementById('vCategory').value;
        const price = document.getElementById('vPrice').value;
        const packSize = document.getElementById('vPackSize').value;

        try {
            await fetch('http://localhost:5000/api/supplies', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    category,
                    price: Number(price),
                    packSize,
                    vendor: "Ramesh Krishi Kendra",
                    vendorLocation: "Varanasi, UP",
                    stockStatus: "In stock"
                })
            });
        } catch (e) {
            console.log("Product saved locally");
        }

        alert(`Successfully added ${title} to Krishi Shop!`);
        this.renderInventoryTab(document.getElementById('vendorSubViewContent'));
    },

    // 3. Incoming Farmer Orders
    async renderOrdersTab(container) {
        const s = window.MITTI_STATE;
        let orders = [
            { orderId: "ORD-901", farmerName: "Shivangi Singh", phone: "+91 98765 43210", location: "Varanasi", items: [{ title: "Urea 46% N (Neem Coated)", qty: 2, price: 266.5 }, { title: "DAP 18:46:0", qty: 1, price: 1350 }], totalAmount: 1883.0, status: "Pending", createdDate: "2026-08-04 17:40" }
        ];

        try {
            const host = window.location.hostname || 'localhost';
            const res = await fetch(`http://${host}:5000/api/orders`);
            const json = await res.json();
            if (json.success && json.data.length > 0) orders = json.data;
        } catch (e) {
            console.log("Using local orders fallback");
        }

        container.innerHTML = `
            <h3 style="font-size: 1.2rem; font-weight: 800; color: #1F2937; margin-bottom: 16px;">${s ? s.getText('incomingOrdersTitle') : 'Incoming Farmer Store Orders'}</h3>
            
            <div style="display: flex; flex-direction: column; gap: 16px;">
                ${orders.map(o => {
                    const statusText = s ? (o.status === 'Fulfilled' ? s.getText('fulfilled') : s.getText('pending')) : o.status;
                    return `
                    <div style="background: #FFFFFF; border-radius: 20px; padding: 18px; border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 4px 14px rgba(0,0,0,0.03);">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                            <div>
                                <span style="font-size: 0.75rem; font-weight: 800; color: var(--text-muted);">${o.orderId} · ${o.createdDate}</span>
                                <h4 style="font-size: 1.1rem; font-weight: 800; color: #1F2937;">🧑‍🌾 ${o.farmerName}</h4>
                            </div>
                            <span style="background: ${o.status === 'Fulfilled' ? '#E8F3EB' : '#FFF4E5'}; color: ${o.status === 'Fulfilled' ? '#2C5E3B' : '#C06C1B'}; font-weight: 800; font-size: 0.8rem; padding: 4px 12px; border-radius: 12px;" id="order-badge-${o.orderId}">${statusText}</span>
                        </div>

                        <div style="background: #F9FAFB; border-radius: 12px; padding: 12px; margin-bottom: 14px;">
                            ${o.items.map(item => `
                                <div style="display: flex; justify-content: space-between; font-size: 0.9rem; color: #374151; margin-bottom: 4px;">
                                    <span>${item.qty} x ${item.title}</span>
                                    <strong>₹${item.price * item.qty}</strong>
                                </div>
                            `).join('')}
                            <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 8px 0;">
                            <div style="display: flex; justify-content: space-between; font-weight: 800; color: #2C5E3B; font-size: 1rem;">
                                <span>${s ? s.getText('totalAmount') : 'Total Amount'}</span>
                                <span>₹${o.totalAmount}</span>
                            </div>
                        </div>

                        <div style="display: flex; gap: 8px;">
                            <button style="background: ${o.status === 'Fulfilled' ? '#9CA3AF' : '#2C5E3B'}; color: white; border: none; font-weight: 700; font-size: 0.85rem; padding: 8px 16px; border-radius: 18px; cursor: pointer;" onclick="MITTI_VENDOR.fulfillOrder('${o.orderId}')">
                                ${o.status === 'Fulfilled' ? '✓ ' + (s ? s.getText('fulfilled') : 'Fulfilled') : '✓ Fulfill Order'}
                            </button>
                            <button style="background: #F3F4F6; color: #374151; border: none; font-weight: 700; font-size: 0.85rem; padding: 8px 14px; border-radius: 18px; cursor: pointer;" onclick="alert('Calling Farmer ${o.farmerName} at ${o.phone || '+91 98765 43210'}...')">
                                📞 Call Farmer
                            </button>
                        </div>
                    </div>
                    `;
                }).join('')}
            </div>
        `;
    },

    async fulfillOrder(orderId) {
        try {
            await fetch(`http://localhost:5000/api/orders/${orderId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'Fulfilled' })
            });
        } catch (e) {
            console.log("Order fulfilled locally");
        }

        const badge = document.getElementById(`order-badge-${orderId}`);
        if (badge) {
            badge.innerText = 'Fulfilled';
            badge.style.background = '#E8F3EB';
            badge.style.color = '#2C5E3B';
        }

        alert(`Order ${orderId} marked as Fulfilled & Ready for Delivery!`);
        this.renderOrdersTab(document.getElementById('vendorSubViewContent'));
    },

    // 4. Market Intelligence Analyzer
    async renderIntelligenceTab(container) {
        let rates = [
            { crop: "Onion", mandi: "Lasalgaon", current: 1450, change: "+6.5%", trend: "up", msp: 1300 },
            { crop: "Cotton", mandi: "Akola", current: 7350, change: "+3.1%", trend: "up", msp: 7020 },
            { crop: "Groundnut", mandi: "Rajkot", current: 6200, change: "-0.8%", trend: "down", msp: 6375 }
        ];

        container.innerHTML = `
            <div style="background: #FFFFFF; border-radius: 20px; padding: 20px; border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 4px 14px rgba(0,0,0,0.03);">
                <h3 style="font-size: 1.2rem; font-weight: 800; color: #1F2937; margin-bottom: 6px;">Mandi Price Buying Intelligence</h3>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 16px;">Analyze market price trends to determine optimal crop purchasing times</p>

                <div style="display: flex; flex-direction: column; gap: 12px;">
                    ${rates.map(r => `
                        <div style="display: flex; justify-content: space-between; align-items: center; background: #F9FAFB; border-radius: 16px; padding: 14px;">
                            <div>
                                <h4 style="font-size: 1rem; font-weight: 800; color: #1F2937;">${r.crop} (${r.mandi})</h4>
                                <div style="font-size: 0.8rem; color: var(--text-muted);">MSP Benchmark: ₹${r.msp || 'N/A'}</div>
                            </div>
                            <div style="text-align: right;">
                                <div style="font-size: 1.15rem; font-weight: 800; color: #2C5E3B;">₹${r.current}</div>
                                <span style="background: ${r.trend === 'up' ? '#E8F3EB' : '#FEE2E2'}; color: ${r.trend === 'up' ? '#2C5E3B' : '#DC2626'}; font-weight: 800; font-size: 0.75rem; padding: 2px 8px; border-radius: 10px;">${r.change}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
};
