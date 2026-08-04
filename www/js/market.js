/**
 * MITTI Marketplace - Core Logic & UI Controller (SIH 2026)
 */

window.MITTI_MARKET = {
    activeSubTab: 'rates',
    activeFilter: 'movers',
    activeCategory: 'all',
    priceChartInstance: null,
    cropPieChartInstance: null,
    monthlyBarChartInstance: null,
    uploadedImages: [],

    init() {
        this.renderCategoryChips();
        this.renderMandiRates();
        this.renderBuyers();
        this.renderMyListings();
        this.renderOffers();
        this.renderTransactions();
        this.renderAnalytics();
        this.setupFormHandlers();
        this.setupSearch();
        this.updateBadges();
    },

    // Sub tab navigation inside Market view
    switchSubTab(tabId) {
        this.activeSubTab = tabId;
        document.querySelectorAll('.market-subtab').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.market-subview').forEach(view => view.style.display = 'none');

        const activeBtn = document.getElementById(`subtab-${tabId}`);
        const activeView = document.getElementById(`subview-${tabId}`);
        if(activeBtn) activeBtn.classList.add('active');
        if(activeView) activeView.style.display = 'block';

        if(tabId === 'analytics') {
            this.renderAnalytics();
        }
        lucide.createIcons();
    },

    // Render Category Chips
    renderCategoryChips() {
        const container = document.getElementById('categoryChips');
        if(!container) return;
        
        container.innerHTML = window.MITTI_DATA.categories.map(cat => `
            <button class="cat-chip ${this.activeCategory === cat.id ? 'active' : ''}" onclick="MITTI_MARKET.setCategory('${cat.id}')">
                <i data-lucide="${cat.icon}" class="chip-icon"></i>
                <span>${cat.name}</span>
            </button>
        `).join('');
        lucide.createIcons();
    },

    setCategory(catId) {
        this.activeCategory = catId;
        this.renderCategoryChips();
        this.renderMandiRates();
    },

    setFilter(filterId) {
        this.activeFilter = filterId;
        document.querySelectorAll('.pill-chip').forEach(chip => chip.classList.remove('active'));
        const btn = document.getElementById(`filter-${filterId}`);
        if(btn) btn.classList.add('active');
        this.renderMandiRates();
    },

    // Render Mandi Rates matching exact reference photo
    renderMandiRates() {
        const container = document.getElementById('mandiRatesList');
        if(!container) return;

        let items = [...window.MITTI_DATA.marketPrices];

        // Apply category filter
        if(this.activeCategory !== 'all') {
            items = items.filter(i => i.cat === this.activeCategory);
        }

        // Apply search query
        const query = (document.getElementById('searchInput')?.value || '').toLowerCase();
        if(query) {
            items = items.filter(i => i.crop.toLowerCase().includes(query) || i.mandi.toLowerCase().includes(query));
        }

        // Apply sorting/pill filter
        if(this.activeFilter === 'movers') {
            items.sort((a,b) => Math.abs(parseFloat(b.change)) - Math.abs(parseFloat(a.change)));
        } else if(this.activeFilter === 'price') {
            items.sort((a,b) => b.current - a.current);
        } else if(this.activeFilter === 'az') {
            items.sort((a,b) => a.crop.localeCompare(b.crop));
        }

        if(items.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i data-lucide="sprout" class="empty-icon"></i>
                    <h3>No mandi rates found</h3>
                    <p>Try clearing filters or searching for another crop.</p>
                </div>
            `;
            lucide.createIcons();
            return;
        }

        container.innerHTML = items.map((item, index) => {
            const isUp = item.trend === 'up';
            const isDown = item.trend === 'down';
            const trendColor = isUp ? '#10b981' : (isDown ? '#ef4444' : '#94a3b8');
            const arrowIcon = isUp ? 'trending-up' : (isDown ? 'trending-down' : 'minus');

            return `
                <div class="mandi-card glass-card" onclick="MITTI_MARKET.openPriceDetail('${item.crop}')">
                    <div class="mandi-card-left">
                        <h4 class="crop-title">${item.crop}</h4>
                        <p class="mandi-subtitle">${item.mandi} · per ${item.unit}</p>
                    </div>
                    <div class="mandi-card-right">
                        ${index === 2 ? `
                            <button class="vendor-pill-btn" onclick="event.stopPropagation(); MITTI_MARKET.openVendorAction('${item.crop}')">
                                <i data-lucide="headphones" style="width:16px; height:16px;"></i>
                                <span>Vendor</span>
                            </button>
                        ` : `
                            <div class="price-val">₹${item.current.toLocaleString('en-IN')}</div>
                            <div class="price-trend" style="color: ${trendColor}">
                                <i data-lucide="${arrowIcon}" style="width:14px; height:14px; display:inline; vertical-align:middle;"></i>
                                <span>${item.change}</span>
                            </div>
                        `}
                    </div>
                </div>
            `;
        }).join('');

        lucide.createIcons();
    },

    // Open Price Detail & Chart Modal
    openPriceDetail(cropName) {
        const item = window.MITTI_DATA.marketPrices.find(p => p.crop === cropName);
        if(!item) return;

        document.getElementById('modalCropName').innerText = `${item.crop} - Rate Analysis`;
        document.getElementById('modalMandiName').innerText = item.mandi;
        document.getElementById('modalCurrentPrice').innerText = `₹${item.current.toLocaleString('en-IN')}`;
        document.getElementById('modalMspPrice').innerText = item.msp ? `₹${item.msp.toLocaleString('en-IN')}` : 'N/A';
        document.getElementById('modalHighPrice').innerText = `₹${item.highestBuyer.toLocaleString('en-IN')}`;
        document.getElementById('modalLowPrice').innerText = `₹${item.lowestBuyer.toLocaleString('en-IN')}`;
        document.getElementById('modalAvgPrice').innerText = `₹${item.avg.toLocaleString('en-IN')}`;

        document.getElementById('priceDetailModal').style.display = 'flex';

        // Render line chart
        const ctx = document.getElementById('priceTrendChart').getContext('2d');
        if(this.priceChartInstance) this.priceChartInstance.destroy();

        this.priceChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Last Week', 'Yesterday', 'Today'],
                datasets: [{
                    label: `${item.crop} Price (₹/quintal)`,
                    data: [item.lastWeek, item.yesterday, item.current],
                    borderColor: '#2E7D32',
                    backgroundColor: 'rgba(46, 125, 50, 0.1)',
                    fill: true,
                    tension: 0.3,
                    pointRadius: 6,
                    pointBackgroundColor: '#2E7D32'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { ticks: { color: '#64748b' } },
                    x: { ticks: { color: '#64748b' } }
                }
            }
        });
    },

    closePriceDetailModal() {
        document.getElementById('priceDetailModal').style.display = 'none';
    },

    // Render Buyers
    renderBuyers() {
        const container = document.getElementById('buyersList');
        if(!container) return;

        let buyers = [...window.MITTI_DATA.buyers];

        // Apply filters
        const search = (document.getElementById('buyerSearchInput')?.value || '').toLowerCase();
        if(search) {
            buyers = buyers.filter(b => b.name.toLowerCase().includes(search) || b.location.toLowerCase().includes(search));
        }

        const verifiedOnly = document.getElementById('filterVerified')?.checked;
        if(verifiedOnly) buyers = buyers.filter(b => b.verified);

        const pickupOnly = document.getElementById('filterPickup')?.checked;
        if(pickupOnly) buyers = buyers.filter(b => b.pickup);

        const organicOnly = document.getElementById('filterOrganic')?.checked;
        if(organicOnly) buyers = buyers.filter(b => b.organicOnly);

        // Sort
        const sortVal = document.getElementById('buyerSortSelect')?.value || 'nearest';
        if(sortVal === 'nearest') buyers.sort((a,b) => a.distance - b.distance);
        else if(sortVal === 'rating') buyers.sort((a,b) => b.rating - a.rating);

        container.innerHTML = buyers.map(b => {
            const isFav = window.MITTI_STATE.favorites.includes(b.id);
            const isCompared = window.MITTI_STATE.compareList.includes(b.id);

            return `
                <div class="buyer-card glass-card">
                    <div class="buyer-card-header">
                        <div class="buyer-info">
                            <span class="buyer-avatar">${b.avatar}</span>
                            <div>
                                <h4 class="buyer-title">
                                    ${b.name}
                                    ${b.verified ? `<i data-lucide="check-circle" class="verified-icon"></i>` : ''}
                                </h4>
                                <p class="buyer-sub">${b.location} · ${b.distance} km away</p>
                            </div>
                        </div>
                        <button class="icon-btn-fav ${isFav ? 'active' : ''}" onclick="MITTI_MARKET.toggleFavBuyer(${b.id})">
                            <i data-lucide="heart" fill="${isFav ? '#ef4444' : 'none'}"></i>
                        </button>
                    </div>

                    <div class="buyer-demand-chips">
                        ${b.cropsNeeded.map(c => `<span class="demand-chip">${c.crop}: ${c.qty}</span>`).join('')}
                    </div>

                    <div class="buyer-card-footer">
                        <div class="buyer-rating">
                            ⭐ <strong>${b.rating}</strong> (${b.reviewsCount} reviews)
                        </div>
                        <div class="buyer-actions">
                            <button class="btn-compare ${isCompared ? 'active' : ''}" onclick="MITTI_MARKET.toggleCompareBuyer(${b.id})">
                                ${isCompared ? 'Selected' : '+ Compare'}
                            </button>
                            <button class="btn-primary-sm" onclick="MITTI_MARKET.openBuyerProfile(${b.id})">View Profile</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        lucide.createIcons();
        this.updateCompareBar();
    },

    toggleFavBuyer(buyerId) {
        window.MITTI_STATE.toggleFavorite(buyerId);
        this.renderBuyers();
    },

    toggleCompareBuyer(buyerId) {
        window.MITTI_STATE.toggleCompare(buyerId);
        this.renderBuyers();
    },

    updateCompareBar() {
        const bar = document.getElementById('compareFloatingBar');
        if(!bar) return;
        const count = window.MITTI_STATE.compareList.length;
        if(count > 0) {
            bar.style.display = 'flex';
            document.getElementById('compareCountText').innerText = `Compare (${count}/3 Buyers)`;
        } else {
            bar.style.display = 'none';
        }
    },

    openCompareModal() {
        const container = document.getElementById('compareModalContent');
        const selectedBuyers = window.MITTI_DATA.buyers.filter(b => window.MITTI_STATE.compareList.includes(b.id));

        if(selectedBuyers.length === 0) return;

        container.innerHTML = `
            <table class="compare-table">
                <thead>
                    <tr>
                        <th>Feature</th>
                        ${selectedBuyers.map(b => `<th>${b.name}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Rating</td>
                        ${selectedBuyers.map(b => `<td>⭐ ${b.rating}</td>`).join('')}
                    </tr>
                    <tr>
                        <td>Distance</td>
                        ${selectedBuyers.map(b => `<td>${b.distance} km</td>`).join('')}
                    </tr>
                    <tr>
                        <td>Pickup</td>
                        ${selectedBuyers.map(b => `<td>${b.pickup ? '✅ Yes' : '❌ No'}</td>`).join('')}
                    </tr>
                    <tr>
                        <td>Verified</td>
                        ${selectedBuyers.map(b => `<td>${b.verified ? '✅ Verified' : '⚠️ Pending'}</td>`).join('')}
                    </tr>
                    <tr>
                        <td>Top Demand</td>
                        ${selectedBuyers.map(b => `<td>${b.cropsNeeded[0]?.crop || 'Any'}</td>`).join('')}
                    </tr>
                    <tr>
                        <td>Action</td>
                        ${selectedBuyers.map(b => `<td><button class="btn-primary-sm" onclick="MITTI_MARKET.openBuyerProfile(${b.id}); MITTI_MARKET.closeCompareModal();">Contact</button></td>`).join('')}
                    </tr>
                </tbody>
            </table>
        `;

        document.getElementById('compareModal').style.display = 'flex';
    },

    closeCompareModal() {
        document.getElementById('compareModal').style.display = 'none';
    },

    openBuyerProfile(buyerId) {
        const b = window.MITTI_DATA.buyers.find(x => x.id === buyerId);
        if(!b) return;

        document.getElementById('profileTitle').innerText = b.name;
        document.getElementById('profileOwner').innerText = `Owner: ${b.owner}`;
        document.getElementById('profilePhone').innerText = b.phone;
        document.getElementById('profileLocation').innerText = b.location;
        document.getElementById('profileRating').innerText = `⭐ ${b.rating} (${b.reviewsCount} reviews)`;
        document.getElementById('profileHours').innerText = b.workingHours;

        const demandContainer = document.getElementById('profileDemands');
        demandContainer.innerHTML = b.cropsNeeded.map(c => `
            <div class="demand-item">
                <span>🌾 ${c.crop}</span>
                <strong>Needed: ${c.qty}</strong>
            </div>
        `).join('');

        document.getElementById('buyerProfileModal').style.display = 'flex';
    },

    closeBuyerProfileModal() {
        document.getElementById('buyerProfileModal').style.display = 'none';
    },

    // Sell Form & Image Upload
    setupFormHandlers() {
        const form = document.getElementById('sellCropForm');
        if(!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSellFormSubmit();
        });
    },

    handleImageUpload(event) {
        const files = Array.from(event.target.files);
        if(this.uploadedImages.length + files.length > 3) {
            alert("Maximum 3 images allowed.");
            return;
        }

        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.uploadedImages.push(e.target.result);
                this.renderImagePreviews();
            };
            reader.readAsDataURL(file);
        });
    },

    renderImagePreviews() {
        const container = document.getElementById('imagePreviewContainer');
        if(!container) return;

        container.innerHTML = this.uploadedImages.map((src, i) => `
            <div class="img-preview-box">
                <img src="${src}" alt="Crop Photo">
                <button type="button" class="img-del-btn" onclick="MITTI_MARKET.removeImage(${i})">×</button>
            </div>
        `).join('');
    },

    removeImage(index) {
        this.uploadedImages.splice(index, 1);
        this.renderImagePreviews();
    },

    handleSellFormSubmit() {
        const crop = document.getElementById('formCropName').value;
        const qty = parseFloat(document.getElementById('formQuantity').value);
        const unit = document.getElementById('formUnit').value;
        const price = parseFloat(document.getElementById('formExpectedPrice').value) || 0;
        const quality = document.getElementById('formQuality').value;
        const location = document.getElementById('formLocation').value || 'Varanasi, UP';
        const isEmergency = document.getElementById('formEmergencyCheck').checked;
        const description = document.getElementById('formDesc').value;

        if(!crop || !qty) {
            alert("Please fill crop name and quantity.");
            return;
        }

        const newListing = {
            id: `LST-${Math.floor(1000 + Math.random() * 9000)}`,
            crop,
            category: "vegetables",
            quantity: qty,
            unit,
            expectedPrice: price,
            quality,
            location,
            harvestDate: new Date().toISOString().split('T')[0],
            status: "Active",
            statusColor: "#2E7D32",
            emergency: isEmergency,
            images: this.uploadedImages.length > 0 ? this.uploadedImages : ["https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80"],
            description: description || "Fresh harvest ready for sale.",
            dateCreated: new Date().toISOString().split('T')[0],
            offersCount: 0
        };

        window.MITTI_STATE.myListings.unshift(newListing);
        window.MITTI_STATE.saveListings();

        // Reset
        document.getElementById('sellCropForm').reset();
        this.uploadedImages = [];
        this.renderImagePreviews();

        this.showToast("Crop listed successfully!");
        this.switchSubTab('listings');
        this.renderMyListings();
    },

    // Render My Listings
    renderMyListings() {
        const container = document.getElementById('myListingsList');
        if(!container) return;

        const listings = window.MITTI_STATE.myListings;

        if(listings.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i data-lucide="package-open" class="empty-icon"></i>
                    <h3>No crops listed yet</h3>
                    <p>Let's sell your first harvest today!</p>
                    <button class="btn-primary" onclick="MITTI_MARKET.switchSubTab('sell')">+ Sell Produce</button>
                </div>
            `;
            lucide.createIcons();
            return;
        }

        container.innerHTML = listings.map(item => `
            <div class="listing-card glass-card">
                <div class="listing-top">
                    <img src="${item.images[0]}" alt="${item.crop}" class="listing-img">
                    <div class="listing-details">
                        <div class="listing-header">
                            <h4>${item.crop} ${item.emergency ? '<span class="emergency-tag">⚡ URGENT</span>' : ''}</h4>
                            <span class="status-badge" style="background: ${item.statusColor}15; color: ${item.statusColor}; border: 1px solid ${item.statusColor}">
                                ${item.status}
                            </span>
                        </div>
                        <p class="listing-meta">Quantity: <strong>${item.quantity} ${item.unit}</strong></p>
                        <p class="listing-meta">Expected: <strong>₹${item.expectedPrice}/${item.unit}</strong></p>
                        <p class="listing-meta">Quality: ${item.quality} · ${item.location}</p>
                    </div>
                </div>

                <div class="listing-bottom">
                    <button class="btn-action-sm" onclick="MITTI_MARKET.showQrCode('${item.id}', '${item.crop}')">
                        <i data-lucide="qr-code" style="width:14px;"></i> QR Code
                    </button>
                    <button class="btn-action-sm" onclick="MITTI_MARKET.deleteListing('${item.id}')" style="color:#ef4444;">
                        <i data-lucide="trash-2" style="width:14px;"></i> Delete
                    </button>
                </div>
            </div>
        `).join('');

        lucide.createIcons();
    },

    deleteListing(id) {
        if(confirm("Are you sure you want to delete this listing?")) {
            window.MITTI_STATE.myListings = window.MITTI_STATE.myListings.filter(l => l.id !== id);
            window.MITTI_STATE.saveListings();
            this.renderMyListings();
            this.showToast("Listing deleted.");
        }
    },

    showQrCode(id, cropName) {
        document.getElementById('qrModalTitle').innerText = `QR Code - ${cropName}`;
        document.getElementById('qrModalContent').innerHTML = `
            <div style="background:white; padding:1.5rem; border-radius:12px; display:inline-block;">
                <svg width="160" height="160" viewBox="0 0 100 100">
                    <rect width="100" height="100" fill="#ffffff" />
                    <path d="M10,10 h30 v30 h-30 z M15,15 v20 h20 v-20 z M20,20 h10 v10 h-10 z" fill="#1c1b1f" />
                    <path d="M60,10 h30 v30 h-30 z M65,15 v20 h20 v-20 z M70,20 h10 v10 h-10 z" fill="#1c1b1f" />
                    <path d="M10,60 h30 v30 h-30 z M15,65 v20 h20 v-20 z M20,70 h10 v10 h-10 z" fill="#1c1b1f" />
                    <rect x="45" y="45" width="10" height="10" fill="#2E7D32" />
                    <rect x="60" y="60" width="20" height="20" fill="#1c1b1f" />
                </svg>
            </div>
            <p style="margin-top:1rem; color:var(--text-muted); font-size:0.85rem;">Scan this QR code to view listing #${id} details on MITTI app.</p>
        `;
        document.getElementById('qrModal').style.display = 'flex';
    },

    closeQrModal() {
        document.getElementById('qrModal').style.display = 'none';
    },

    // Offers & Counter Offer
    renderOffers() {
        const container = document.getElementById('offersList');
        if(!container) return;

        const offers = window.MITTI_STATE.offers;

        if(offers.length === 0) {
            container.innerHTML = `<p class="empty-msg">No offers received yet.</p>`;
            return;
        }

        container.innerHTML = offers.map(o => `
            <div class="offer-card glass-card">
                <div class="offer-header">
                    <h4>${o.buyerName} ${o.verified ? '✅' : ''}</h4>
                    <span class="offer-price">₹${o.offeredPrice}/${o.unit}</span>
                </div>
                <p class="offer-meta">Crop: <strong>${o.crop}</strong> (${o.quantity})</p>
                <p class="offer-meta">Total Amount: <strong>₹${o.totalAmount.toLocaleString('en-IN')}</strong></p>
                <p class="offer-meta">Pickup Date: ${o.pickupDate} · ${o.location}</p>

                <div class="offer-actions">
                    <button class="btn-accept" onclick="MITTI_MARKET.acceptOffer('${o.id}')">Accept</button>
                    <button class="btn-counter" onclick="MITTI_MARKET.openCounterModal('${o.id}')">Counter Offer</button>
                    <button class="btn-reject" onclick="MITTI_MARKET.rejectOffer('${o.id}')">Reject</button>
                </div>
            </div>
        `).join('');
    },

    acceptOffer(offerId) {
        const offer = window.MITTI_STATE.offers.find(o => o.id === offerId);
        if(!offer) return;

        // Move to transactions
        const newTxn = {
            id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
            buyer: offer.buyerName,
            crop: offer.crop,
            quantity: offer.quantity,
            price: `₹${offer.offeredPrice}/q`,
            totalAmount: `₹${offer.totalAmount.toLocaleString('en-IN')}`,
            date: new Date().toISOString().split('T')[0],
            status: "Completed",
            paymentMode: "Direct Bank Transfer"
        };

        window.MITTI_STATE.transactions.unshift(newTxn);
        window.MITTI_STATE.saveTransactions();

        // Remove offer
        window.MITTI_STATE.offers = window.MITTI_STATE.offers.filter(o => o.id !== offerId);
        window.MITTI_STATE.saveOffers();

        this.renderOffers();
        this.renderTransactions();
        this.showToast("Offer Accepted! Transaction recorded.");
    },

    rejectOffer(offerId) {
        window.MITTI_STATE.offers = window.MITTI_STATE.offers.filter(o => o.id !== offerId);
        window.MITTI_STATE.saveOffers();
        this.renderOffers();
        this.showToast("Offer rejected.");
    },

    openCounterModal(offerId) {
        const offer = window.MITTI_STATE.offers.find(o => o.id === offerId);
        if(!offer) return;

        document.getElementById('counterOfferId').value = offerId;
        document.getElementById('counterCurrentPrice').innerText = `₹${offer.offeredPrice}/${offer.unit}`;
        document.getElementById('counterModal').style.display = 'flex';
    },

    closeCounterModal() {
        document.getElementById('counterModal').style.display = 'none';
    },

    submitCounterOffer() {
        const offerId = document.getElementById('counterOfferId').value;
        const newPrice = parseFloat(document.getElementById('counterNewPrice').value);

        if(!newPrice) return alert("Please enter valid counter price.");

        const offer = window.MITTI_STATE.offers.find(o => o.id === offerId);
        if(offer) {
            offer.offeredPrice = newPrice;
            offer.totalAmount = newPrice * 50; // simple calculation
            window.MITTI_STATE.saveOffers();
            this.renderOffers();
            this.closeCounterModal();
            this.showToast("Counter offer sent to buyer!");
        }
    },

    // Transactions & Receipt
    renderTransactions() {
        const container = document.getElementById('transactionsList');
        if(!container) return;

        const txns = window.MITTI_STATE.transactions;

        if(txns.length === 0) {
            container.innerHTML = `<p class="empty-msg">No completed transactions.</p>`;
            return;
        }

        container.innerHTML = txns.map(t => `
            <div class="txn-card glass-card">
                <div class="txn-header">
                    <div>
                        <h4>${t.buyer}</h4>
                        <p class="txn-meta">${t.crop} · ${t.quantity}</p>
                    </div>
                    <div class="txn-amount">${t.totalAmount}</div>
                </div>
                <div class="txn-footer">
                    <span class="txn-date">${t.date} · ${t.paymentMode}</span>
                    <button class="btn-receipt" onclick="MITTI_MARKET.downloadReceipt('${t.id}')">
                        <i data-lucide="file-text" style="width:14px;"></i> Receipt
                    </button>
                </div>
            </div>
        `).join('');
        lucide.createIcons();
    },

    downloadReceipt(txnId) {
        const t = window.MITTI_STATE.transactions.find(x => x.id === txnId);
        if(!t) return;

        document.getElementById('receiptModalContent').innerHTML = `
            <div class="receipt-box" id="printableReceipt">
                <div style="text-align:center; border-bottom: 2px dashed #cbd5e1; padding-bottom: 1rem; margin-bottom: 1rem;">
                    <h2 style="color:var(--primary); font-size:1.4rem;">🌱 MITTI MARKETPLACE RECEIPT</h2>
                    <p style="font-size:0.8rem; color:#64748b;">Transaction Ref: ${t.id}</p>
                    <p style="font-size:0.8rem; color:#64748b;">Date: ${t.date}</p>
                </div>
                <div style="line-height:1.8;">
                    <p><strong>Buyer:</strong> ${t.buyer}</p>
                    <p><strong>Produce:</strong> ${t.crop}</p>
                    <p><strong>Quantity:</strong> ${t.quantity}</p>
                    <p><strong>Agreed Price:</strong> ${t.price}</p>
                    <p><strong>Payment Mode:</strong> ${t.paymentMode}</p>
                    <hr style="margin:1rem 0; border:none; border-top:1px solid #e2e8f0;">
                    <h3 style="font-size:1.2rem; display:flex; justify-content:space-between;">
                        <span>Total Paid:</span>
                        <span style="color:var(--primary);">${t.totalAmount}</span>
                    </h3>
                </div>
                <div style="margin-top:1.5rem; text-align:center; font-size:0.75rem; color:#94a3b8;">
                    Verified & Stamp Certified by MITTI Smart Agriculture Platform.
                </div>
            </div>
        `;
        document.getElementById('receiptModal').style.display = 'flex';
    },

    closeReceiptModal() {
        document.getElementById('receiptModal').style.display = 'none';
    },

    printReceipt() {
        window.print();
    },

    // Analytics Charts
    renderAnalytics() {
        const pieCtx = document.getElementById('cropPieChart')?.getContext('2d');
        const barCtx = document.getElementById('monthlyBarChart')?.getContext('2d');

        if(pieCtx) {
            if(this.cropPieChartInstance) this.cropPieChartInstance.destroy();
            this.cropPieChartInstance = new Chart(pieCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Potato', 'Wheat', 'Mustard', 'Onion'],
                    datasets: [{
                        data: [100000, 225000, 192500, 74000],
                        backgroundColor: ['#2E7D32', '#3b82f6', '#f59e0b', '#8D6E63'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'bottom' } },
                    cutout: '65%'
                }
            });
        }

        if(barCtx) {
            if(this.monthlyBarChartInstance) this.monthlyBarChartInstance.destroy();
            this.monthlyBarChartInstance = new Chart(barCtx, {
                type: 'bar',
                data: {
                    labels: ['May', 'Jun', 'Jul', 'Aug'],
                    datasets: [{
                        label: 'Earnings (₹)',
                        data: [192500, 225000, 100000, 74000],
                        backgroundColor: '#2E7D32',
                        borderRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } }
                }
            });
        }
    },

    // Search Handler
    setupSearch() {
        const input = document.getElementById('searchInput');
        if(input) {
            input.addEventListener('input', () => this.renderMandiRates());
        }
    },

    // Update Badges & Notifications
    updateBadges() {
        const offersCount = window.MITTI_STATE.offers.length;
        const badge = document.getElementById('offersCountBadge');
        if(badge) {
            badge.innerText = offersCount;
            badge.style.display = offersCount > 0 ? 'inline-block' : 'none';
        }
    },

    // Voice Search Simulator
    startVoiceSearch() {
        this.showToast("🎤 Listening... Speak crop name (e.g. 'Wheat', 'Onion')");
        setTimeout(() => {
            const sampleCrops = ["Wheat", "Onion", "Tomato", "Cotton"];
            const chosen = sampleCrops[Math.floor(Math.random() * sampleCrops.length)];
            const searchInput = document.getElementById('searchInput');
            if(searchInput) {
                searchInput.value = chosen;
                this.renderMandiRates();
                this.showToast(`Voice detected: "${chosen}"`);
            }
        }, 2000);
    },

    // Toast Notifications
    showToast(message) {
        let toast = document.getElementById('mittiToast');
        if(!toast) {
            toast = document.createElement('div');
            toast.id = 'mittiToast';
            toast.className = 'toast-notification';
            document.body.appendChild(toast);
        }
        toast.innerText = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
};

window.MITTI_MARKET = window.MITTI_MARKET;
