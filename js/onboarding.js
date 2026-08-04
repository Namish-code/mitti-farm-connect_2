/**
 * Mitti Onboarding & Role Selection Module (Phase 2)
 */

window.MITTI_ONBOARDING = {
    currentRole: 'farmer', // 'farmer' or 'vendor'
    step: 1,

    init() {
        // Check if onboarding already done
        const savedRole = localStorage.getItem('mitti_user_role');
        const onboardingDone = localStorage.getItem('mitti_onboarding_done');

        if (savedRole) {
            this.currentRole = savedRole;
            this.updateFloatingRoleBadge();
        }

        if (!onboardingDone) {
            this.openLandingModal();
        }
    },

    openLandingModal() {
        document.getElementById('welcomeLandingModal').style.display = 'flex';
    },

    logout() {
        localStorage.removeItem('mitti_onboarding_done');
        localStorage.removeItem('mitti_user_role');
        document.getElementById('welcomeLandingModal').style.display = 'flex';
    },

    startOnboarding() {
        document.getElementById('welcomeLandingModal').style.display = 'none';
        document.getElementById('roleSelectModal').style.display = 'flex';
    },

    selectRole(role) {
        this.currentRole = role;
        document.querySelectorAll('.role-card-select').forEach(card => card.classList.remove('selected'));
        const selectedCard = document.getElementById(`role-card-${role}`);
        if (selectedCard) selectedCard.classList.add('selected');
    },

    proceedToStep2() {
        document.getElementById('roleSelectModal').style.display = 'none';
        document.getElementById('phoneVerifyModal').style.display = 'flex';
    },

    sendOtp() {
        const phone = document.getElementById('phoneInput').value || '+91 98765 43210';
        document.getElementById('phoneVerifyModal').style.display = 'none';
        document.getElementById('otpVerifyModal').style.display = 'flex';
    },

    completeOnboarding() {
        const name = document.getElementById('onboardNameInput').value || 'Shivangi';
        const loc = document.getElementById('onboardLocInput').value || 'Varanasi';

        localStorage.setItem('mitti_user_role', this.currentRole);
        localStorage.setItem('mitti_user_name', name);
        localStorage.setItem('mitti_loc', loc);
        localStorage.setItem('mitti_onboarding_done', 'true');

        if (window.MITTI_STATE) {
            window.MITTI_STATE.location = loc;
        }

        const locText = document.getElementById('userLocText');
        if (locText) locText.innerText = loc;

        document.getElementById('otpVerifyModal').style.display = 'none';
        this.updateFloatingRoleBadge();

        if (this.currentRole === 'vendor') {
            if (window.switchMainView) {
                window.switchMainView('vendor');
            }
        }
    },

    toggleRole() {
        const targetRole = this.currentRole === 'farmer' ? 'vendor' : 'farmer';
        this.openSwitchLoginModal(targetRole);
    },

    openSwitchLoginModal(targetRole) {
        this.pendingTargetRole = targetRole;
        const titleEl = document.getElementById('switchRoleTitle');
        const descEl = document.getElementById('switchRoleDesc');
        const phoneEl = document.getElementById('switchPhoneInput');

        if (targetRole === 'vendor') {
            if (titleEl) titleEl.innerHTML = `Login to <span>Vendor Workspace</span>`;
            if (descEl) descEl.innerText = `Verify Ramesh Krishi Kendra vendor credentials to proceed.`;
            if (phoneEl) phoneEl.value = `+91 98888 77711`;
        } else {
            if (titleEl) titleEl.innerHTML = `Login to <span>Farmer Account</span>`;
            if (descEl) descEl.innerText = `Verify Shivangi Singh farmer account credentials to proceed.`;
            if (phoneEl) phoneEl.value = `+91 98765 43210`;
        }

        const modal = document.getElementById('switchLoginModal');
        if (modal) modal.style.display = 'flex';
    },

    confirmSwitchRole() {
        if (!this.pendingTargetRole) this.pendingTargetRole = 'farmer';
        this.currentRole = this.pendingTargetRole;
        localStorage.setItem('mitti_user_role', this.currentRole);

        const modal = document.getElementById('switchLoginModal');
        if (modal) modal.style.display = 'none';

        this.updateRoleUI();
    },

    updateRoleUI() {
        this.updateFloatingRoleBadge();
        this.updateBottomNav();

        if (this.currentRole === 'vendor') {
            if (window.switchMainView) {
                window.switchMainView('vendor');
            }
        } else {
            if (window.switchMainView) {
                const marketBtn = document.getElementById('mainnav-market');
                window.switchMainView('market', marketBtn);
            }
        }
    },

    updateFloatingRoleBadge() {
        const badge = document.getElementById('floatingRoleBadge');
        if (badge) {
            if (this.currentRole === 'farmer') {
                badge.innerHTML = `<i data-lucide="headphones" style="width:16px;height:16px;"></i> Switch to Vendor`;
                badge.style.background = '#C06C1B';
            } else {
                badge.innerHTML = `<i data-lucide="sprout" style="width:16px;height:16px;"></i> Switch to Farmer`;
                badge.style.background = '#2C5E3B';
            }
            if (window.lucide) window.lucide.createIcons();
        }
    },

    updateBottomNav() {
        const nav = document.querySelector('.bottom-nav');
        if (!nav) return;

        if (this.currentRole === 'vendor') {
            nav.innerHTML = `
                <button class="nav-item active" id="vendnav-sourcing" onclick="MITTI_VENDOR.switchSubTab('sourcing', this)">
                    <i data-lucide="sprout"></i>
                    <span>Sourcing</span>
                </button>
                <button class="nav-item" id="vendnav-inventory" onclick="MITTI_VENDOR.switchSubTab('inventory', this)">
                    <i data-lucide="store"></i>
                    <span>Inventory</span>
                </button>
                <button class="nav-item" id="vendnav-orders" onclick="MITTI_VENDOR.switchSubTab('orders', this)">
                    <i data-lucide="package"></i>
                    <span>Orders</span>
                </button>
                <button class="nav-item" id="vendnav-intelligence" onclick="MITTI_VENDOR.switchSubTab('intelligence', this)">
                    <i data-lucide="trending-up"></i>
                    <span>Intelligence</span>
                </button>
            `;
        } else {
            nav.innerHTML = `
                <button class="nav-item" id="mainnav-analytics" onclick="switchMainView('analytics', this)">
                    <i data-lucide="bar-chart-3"></i>
                    <span id="navAnalyticsText">Analytics</span>
                </button>
                <button class="nav-item active" id="mainnav-market" onclick="switchMainView('market', this)">
                    <i data-lucide="store"></i>
                    <span id="navMarketText">Market</span>
                </button>
                <button class="nav-item" id="mainnav-shop" onclick="switchMainView('shop', this)">
                    <i data-lucide="shopping-bag"></i>
                    <span id="navShopText">Shop</span>
                </button>
                <button class="nav-item" id="mainnav-schemes" onclick="switchMainView('schemes', this)">
                    <i data-lucide="landmark"></i>
                    <span id="navSchemesText">Schemes</span>
                </button>
            `;
        }
        if (window.lucide) window.lucide.createIcons();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    window.MITTI_ONBOARDING.init();
});
