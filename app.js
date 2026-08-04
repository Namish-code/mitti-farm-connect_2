/**
 * MITTI Main Application Entry Point (SIH 2026)
 */

window.onload = () => {
    lucide.createIcons();
    if (window.MITTI_MARKET) {
        window.MITTI_MARKET.init();
    }
    updateLanguageUI();
};

function switchMainView(viewId, btn) {
    document.querySelectorAll('.view').forEach(v => v.style.display = 'none');
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));

    const targetView = document.getElementById(`view-${viewId}`);
    if(targetView) targetView.style.display = 'block';
    if(btn) btn.classList.add('active');

    if (window.MITTI_ONBOARDING && window.MITTI_ONBOARDING.updateBottomNav) {
        window.MITTI_ONBOARDING.updateBottomNav();
    }

    if(viewId === 'market' && window.MITTI_MARKET) {
        window.MITTI_MARKET.renderMandiRates();
    } else if(viewId === 'analytics' && window.MITTI_FARMER) {
        window.MITTI_FARMER.renderAnalyticsView();
    } else if(viewId === 'shop' && window.MITTI_FARMER) {
        window.MITTI_FARMER.renderShopView();
    } else if(viewId === 'schemes' && window.MITTI_FARMER) {
        window.MITTI_FARMER.renderSchemesView();
    } else if(viewId === 'vendor' && window.MITTI_VENDOR) {
        window.MITTI_VENDOR.renderVendorView();
    }

    if (window.lucide) window.lucide.createIcons();
}

function openLangModal() {
    document.getElementById('langModal').style.display = 'flex';
}

function closeLangModal() {
    document.getElementById('langModal').style.display = 'none';
}

function setLang(code) {
    window.MITTI_STATE.language = code;
    localStorage.setItem('mitti_lang', code);
    document.getElementById('currentLangText').innerText = code;
    updateLanguageUI();
    closeLangModal();
    if (window.MITTI_MARKET) {
        window.MITTI_MARKET.renderMandiRates();
    }
}

function updateLanguageUI() {
    const s = window.MITTI_STATE;
    const title = document.getElementById('appTitleText');
    if(title) title.innerText = s.getText('appTitle');

    const updatedTag = document.getElementById('updatedTodayText');
    if(updatedTag) updatedTag.innerText = s.getText('updatedToday');

    const moversBtn = document.getElementById('filter-movers');
    if(moversBtn) moversBtn.innerText = s.getText('movers');

    const priceBtn = document.getElementById('filter-price');
    if(priceBtn) priceBtn.innerText = s.getText('price');

    const azBtn = document.getElementById('filter-az');
    if(azBtn) azBtn.innerText = s.getText('az');

    const searchInput = document.getElementById('searchInput');
    if(searchInput) searchInput.placeholder = s.getText('searchPlaceholder');

    // Header buttons
    const cartBtn = document.querySelector('button[onclick="openCart()"] span');
    if(cartBtn) cartBtn.innerText = s.getText('cart');

    const consultBtn = document.querySelector('button[onclick="openVendorConsultModal()"] span');
    if(consultBtn) consultBtn.innerText = s.getText('consult');

    const exitBtn = document.querySelector('button[onclick="MITTI_ONBOARDING.logout()"] span');
    if(exitBtn) exitBtn.innerText = s.getText('exit');

    // Bottom Navigation Tabs (Farmer Mode)
    const analyticsNav = document.getElementById('navAnalyticsText');
    if(analyticsNav) analyticsNav.innerText = s.getText('analytics');

    const marketNav = document.getElementById('navMarketText');
    if(marketNav) marketNav.innerText = s.getText('market');

    const shopNav = document.getElementById('navShopText');
    if(shopNav) shopNav.innerText = s.getText('shop');

    const schemesNav = document.getElementById('navSchemesText');
    if(schemesNav) schemesNav.innerText = s.getText('schemes');

    // Bottom Navigation Tabs (Vendor Mode)
    const vendSourcing = document.querySelector('#vendnav-sourcing span');
    if(vendSourcing) vendSourcing.innerText = s.getText('cropSourcing');

    const vendInventory = document.querySelector('#vendnav-inventory span');
    if(vendInventory) vendInventory.innerText = s.getText('myInventory');

    const vendOrders = document.querySelector('#vendnav-orders span');
    if(vendOrders) vendOrders.innerText = s.getText('farmerOrders');

    const vendIntel = document.querySelector('#vendnav-intelligence span');
    if(vendIntel) vendIntel.innerText = s.getText('marketIntelligence');

    // Vendor Workspace Subtab Buttons
    const subVendSourcing = document.getElementById('vendor-subtab-sourcing');
    if(subVendSourcing) subVendSourcing.innerHTML = `🌾 ${s.getText('cropSourcing')}`;

    const subVendInventory = document.getElementById('vendor-subtab-inventory');
    if(subVendInventory) subVendInventory.innerHTML = `🏪 ${s.getText('myInventory')}`;

    const subVendOrders = document.getElementById('vendor-subtab-orders');
    if(subVendOrders) subVendOrders.innerHTML = `📦 ${s.getText('farmerOrders')}`;

    const subVendIntel = document.getElementById('vendor-subtab-intelligence');
    if(subVendIntel) subVendIntel.innerHTML = `📈 ${s.getText('marketIntelligence')}`;

    const vendWorkspaceTag = document.getElementById('vendorWorkspaceTag');
    if(vendWorkspaceTag) vendWorkspaceTag.innerText = s.getText('verifiedVendorWorkspace');

    // Market Sub-Tabs
    const subRates = document.getElementById('subtab-rates');
    if(subRates) subRates.innerText = s.getText('mandiRates');

    const subBuyers = document.getElementById('subtab-buyers');
    if(subBuyers) subBuyers.innerText = s.getText('buyers');

    const subSell = document.getElementById('subtab-sell');
    if(subSell) subSell.innerText = "+ " + s.getText('sellProduce');

    const subListings = document.getElementById('subtab-listings');
    if(subListings) subListings.innerText = s.getText('myListings');

    const subOffers = document.getElementById('subtab-offers');
    if(subOffers) {
        const badgeCount = document.getElementById('offersCountBadge')?.innerText || '0';
        subOffers.innerHTML = `${s.getText('offers')} <span class="badge" id="offersCountBadge" style="display:inline-block; background:#ef4444; color:white; font-size:10px; padding:2px 5px; border-radius:10px;">${badgeCount}</span>`;
    }

    const subHistory = document.getElementById('subtab-history');
    if(subHistory) subHistory.innerText = s.getText('history');

    const subAnalytics = document.getElementById('subtab-analytics');
    if(subAnalytics) subAnalytics.innerText = s.getText('analytics');

    // Re-render active Vendor sub-view if in Vendor Mode
    if (window.MITTI_ONBOARDING && window.MITTI_ONBOARDING.currentRole === 'vendor' && window.MITTI_VENDOR) {
        window.MITTI_VENDOR.renderSubView();
    }
}

function openCart() {
    renderCartModalItems();
    document.getElementById('cartModal').style.display = 'flex';
}

function closeCartModal() {
    document.getElementById('cartModal').style.display = 'none';
}

function renderCartModalItems() {
    const container = document.getElementById('cartModalContent');
    const totalEl = document.getElementById('cartTotalPrice');
    const badge = document.getElementById('headerCartBadge');

    if (!window.MITTI_FARMER || !window.MITTI_FARMER.cartList || window.MITTI_FARMER.cartList.length === 0) {
        if (container) container.innerHTML = `<p style="text-align: center; color: var(--text-muted); padding: 20px;">Your cart is empty. Add fertilizers/seeds from Krishi Shop!</p>`;
        if (totalEl) totalEl.innerText = `₹0`;
        if (badge) badge.style.display = 'none';
        return;
    }

    const items = window.MITTI_FARMER.cartList;
    let total = 0;

    if (container) {
        container.innerHTML = items.map((item, idx) => {
            total += item.price * item.qty;
            return `
                <div style="display: flex; justify-content: space-between; align-items: center; background: #F9FAFB; border-radius: 14px; padding: 12px 14px; margin-bottom: 10px;">
                    <div>
                        <h4 style="font-size: 0.95rem; font-weight: 800; color: #1F2937;">${item.title}</h4>
                        <div style="font-size: 0.8rem; color: var(--text-muted);">${item.qty} x ₹${item.price}</div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="font-weight: 800; color: #2C5E3B;">₹${item.price * item.qty}</span>
                        <button style="background: #FEE2E2; color: #DC2626; border: none; font-size: 0.8rem; padding: 4px 8px; border-radius: 8px; cursor: pointer;" onclick="removeCartItem(${idx})">✕</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    if (totalEl) totalEl.innerText = `₹${total}`;
    if (badge) {
        badge.innerText = items.length;
        badge.style.display = 'inline-block';
    }
}

function removeCartItem(idx) {
    if (window.MITTI_FARMER && window.MITTI_FARMER.cartList) {
        window.MITTI_FARMER.cartList.splice(idx, 1);
        renderCartModalItems();
    }
}

async function checkoutCart() {
    if (!window.MITTI_FARMER || !window.MITTI_FARMER.cartList || window.MITTI_FARMER.cartList.length === 0) {
        alert("Cart is empty!");
        return;
    }

    const items = window.MITTI_FARMER.cartList;
    let total = 0;
    items.forEach(i => total += i.price * i.qty);

    try {
        await fetch('http://localhost:5000/api/orders/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                farmerName: localStorage.getItem('mitti_user_name') || "Shivangi Singh",
                phone: "+91 98765 43210",
                location: localStorage.getItem('mitti_loc') || "Varanasi",
                items: items,
                totalAmount: total,
                vendor: "Ramesh Krishi Kendra"
            })
        });
    } catch (e) {
        console.log("Order saved locally");
    }

    alert(`Order placed successfully! Total ₹${total}. Sent to Ramesh Krishi Kendra for fulfillment.`);
    window.MITTI_FARMER.cartList = [];
    renderCartModalItems();
    closeCartModal();
}

function openLocationModal() {
    document.getElementById('locationModal').style.display = 'flex';
}

function closeLocationModal() {
    document.getElementById('locationModal').style.display = 'none';
}

function selectLocation(newLoc) {
    if(window.MITTI_STATE) window.MITTI_STATE.location = newLoc;
    localStorage.setItem('mitti_loc', newLoc);
    const textEl = document.getElementById('userLocText');
    if(textEl) textEl.innerText = newLoc;
    closeLocationModal();
    if(window.MITTI_MARKET) window.MITTI_MARKET.renderMandiRates();
}

// Vendor Consult & Live Call Room Logic
let callTimerInterval = null;
let callSeconds = 0;
let isMuted = false;
let isVideoOff = false;

function openVendorConsultModal() {
    document.getElementById('vendorConsultModal').style.display = 'flex';
    if (window.lucide) window.lucide.createIcons();
}

function closeVendorConsultModal() {
    document.getElementById('vendorConsultModal').style.display = 'none';
}

function startLiveCall(vendorName, vendorTitle, avatarUrl) {
    closeVendorConsultModal();
    document.getElementById('callVendorName').innerText = vendorName;
    document.getElementById('callVendorTitle').innerText = vendorTitle;
    document.getElementById('callAvatar').src = avatarUrl;
    document.getElementById('liveCallOverlay').style.display = 'flex';

    callSeconds = 0;
    document.getElementById('callTimerText').innerText = "00:01";
    if (callTimerInterval) clearInterval(callTimerInterval);

    callTimerInterval = setInterval(() => {
        callSeconds++;
        const mins = String(Math.floor(callSeconds / 60)).padStart(2, '0');
        const secs = String(callSeconds % 60).padStart(2, '0');
        const timerEl = document.getElementById('callTimerText');
        if (timerEl) timerEl.innerText = `${mins}:${secs}`;
    }, 1000);

    if (window.lucide) window.lucide.createIcons();
}

function toggleMute() {
    isMuted = !isMuted;
    const btn = document.getElementById('btnMuteMic');
    if (btn) {
        if (isMuted) {
            btn.classList.add('muted');
            btn.innerHTML = `<i data-lucide="mic-off"></i>`;
        } else {
            btn.classList.remove('muted');
            btn.innerHTML = `<i data-lucide="mic"></i>`;
        }
        if (window.lucide) window.lucide.createIcons();
    }
}

function toggleVideo() {
    isVideoOff = !isVideoOff;
    const btn = document.getElementById('btnToggleVideo');
    if (btn) {
        if (isVideoOff) {
            btn.classList.add('muted');
            btn.innerHTML = `<i data-lucide="video-off"></i>`;
        } else {
            btn.classList.remove('muted');
            btn.innerHTML = `<i data-lucide="video"></i>`;
        }
        if (window.lucide) window.lucide.createIcons();
    }
}

function endLiveCall() {
    if (callTimerInterval) clearInterval(callTimerInterval);
    document.getElementById('liveCallOverlay').style.display = 'none';
    isMuted = false;
    isVideoOff = false;
}

// Live Vendor Chat Logic
let currentChatVendor = { name: '', title: '', avatar: '' };

function startVendorChat(name, title, avatar) {
    currentChatVendor = { name, title, avatar };
    closeVendorConsultModal();
    document.getElementById('chatVendorName').innerText = name;
    document.getElementById('chatVendorTitle').innerText = title;
    document.getElementById('chatAvatar').src = avatar;

    const list = document.getElementById('chatMessagesList');
    list.innerHTML = `
        <div style="text-align: center; margin: 8px 0;">
            <span style="background: #E6E1D8; color: #6E6A5F; font-size: 0.72rem; font-weight: 700; padding: 3px 10px; border-radius: 10px;">Verified Consultation Session Started</span>
        </div>
        <div class="chat-bubble vendor">
            🙏 Namaste! I am the lead specialist at <strong>${name}</strong>. How can I help you with fertilizers, soil health, seeds, or crop protection today?
        </div>
    `;

    document.getElementById('vendorChatModal').style.display = 'flex';
}

function closeVendorChat() {
    document.getElementById('vendorChatModal').style.display = 'none';
}

function switchToCallFromChat() {
    closeVendorChat();
    startLiveCall(currentChatVendor.name, currentChatVendor.title, currentChatVendor.avatar);
}

function sendVendorChatMessage() {
    const input = document.getElementById('chatInput');
    const msg = input.value.trim();
    if (!msg) return;

    const list = document.getElementById('chatMessagesList');
    list.innerHTML += `<div class="chat-bubble user">${msg}</div>`;
    input.value = '';
    list.scrollTop = list.scrollHeight;

    // Simulated Expert AI Reply after 1 sec
    setTimeout(() => {
        let reply = `Thank you for asking! For optimal yield with ${msg.toLowerCase().includes('wheat') ? 'wheat crop' : 'your crop'}, we recommend applying balanced NPK (12:32:16) along with organic vermicompost. Would you like us to arrange a doorstep delivery quote?`;
        list.innerHTML += `<div class="chat-bubble vendor">${reply}</div>`;
        list.scrollTop = list.scrollHeight;
    }, 1000);
}
