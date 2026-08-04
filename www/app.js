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

    if(viewId === 'market') {
        window.MITTI_MARKET.renderMandiRates();
    }

    lucide.createIcons();
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
}

function openCart() {
    alert("Cart contains 0 items. Browse produce or supply store.");
}

function openLocationModal() {
    const newLoc = prompt("Enter your location/Mandi area:", window.MITTI_STATE.location);
    if(newLoc) {
        window.MITTI_STATE.location = newLoc;
        localStorage.setItem('mitti_loc', newLoc);
        document.getElementById('userLocText').innerText = newLoc;
    }
}
