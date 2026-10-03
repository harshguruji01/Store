/**
 * ============================================================================
 * WEBGURUJI STORE — PREMIUM NAVIGATION ENGINE
 * Dedicated Navigation Controller for store.webguruji.online & app.html
 * ============================================================================
 */

(function () {
  'use strict';

  const isStorePage = window.location.pathname.endsWith('store.html') || 
                      window.location.pathname.endsWith('/') || 
                      window.location.pathname.endsWith('index.html') ||
                      window.location.pathname === '';

  document.addEventListener('DOMContentLoaded', () => {
    initStoreNavigation();
    setupKeyboardShortcuts();
    setupAuthListener();
  });

  function initStoreNavigation() {
    // Clean up old navbars
    document.querySelectorAll('.store-nav-header, .store-bottom-dock, .store-sheet-overlay, .hg-header, #hg-global-navbar, #hg-bottom-bar, .premium-navbar').forEach(el => el.remove());

    const navHTML = `
      <!-- Desktop & Tablet Top Sticky Navigation -->
      <header class="store-nav-header" id="store-nav-header" role="banner" aria-label="Store Main Navigation">
        <div class="store-nav-container">
          
          <!-- Brand Logo & Store Identity -->
          <a href="${isStorePage ? '#top' : 'index.html'}" class="store-brand" aria-label="HarshGuruJi Store Home">
            <div class="store-brand-logo-wrap">
              <img src="logo.png" alt="HarshGuruJi Store" class="store-brand-logo" fetchpriority="high">
            </div>
            <div class="store-brand-text-wrap">
              <div class="store-brand-name">
                HarshGuruJi <span class="store-brand-badge">STORE</span>
              </div>
              <div class="store-brand-sub">Android APKs, PC &amp; Tools</div>
            </div>
          </a>

          <!-- Desktop Center Navigation Links -->
          <nav class="store-nav-center" aria-label="Desktop Navigation Links">
            <a href="index.html" class="store-nav-link ${isStorePage ? 'active' : ''}" id="snav-link-home">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span>Store</span>
            </a>

            <a href="app.html" class="store-nav-link ${window.location.pathname.includes('app.html') ? 'active' : ''}" id="snav-link-apps">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
              <span>All Apps</span>
            </a>

            <!-- Categories Dropdown -->
            <div class="store-dropdown-wrap" id="store-cat-dropdown-wrap">
              <button type="button" class="store-dropdown-btn" id="btn-cat-dropdown" aria-haspopup="true" aria-expanded="false">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <path d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
                <span>Platforms</span>
                <svg class="store-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>

              <div class="store-mega-menu" id="store-cat-mega-menu" role="menu">
                <div class="store-cat-grid">
                  <a href="app.html?category=Android" class="store-cat-card">
                    <span class="store-cat-icon">🤖</span>
                    <div class="store-cat-info">
                      <span class="store-cat-name">Android APKs</span>
                      <span class="store-cat-desc">Verified Mobile Packages</span>
                    </div>
                  </a>
                  <a href="app.html?category=Windows" class="store-cat-card">
                    <span class="store-cat-icon">🪟</span>
                    <div class="store-cat-info">
                      <span class="store-cat-name">Windows Software</span>
                      <span class="store-cat-desc">EXE &amp; MSI Installers</span>
                    </div>
                  </a>
                  <a href="app.html?category=Games" class="store-cat-card">
                    <span class="store-cat-icon">🎮</span>
                    <div class="store-cat-info">
                      <span class="store-cat-name">Games</span>
                      <span class="store-cat-desc">Chess &amp; Arcade Games</span>
                    </div>
                  </a>
                  <a href="app.html?category=Utilities" class="store-cat-card">
                    <span class="store-cat-icon">🛠️</span>
                    <div class="store-cat-info">
                      <span class="store-cat-name">Utilities &amp; Tools</span>
                      <span class="store-cat-desc">Productivity &amp; Media</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <!-- Books Subdomain Cross-Link -->
            <a href="https://books.webguruji.online" target="_blank" rel="noopener noreferrer" class="store-nav-link" title="NCERT Books Library">
              <span>📚 Books</span>
            </a>

            <!-- Chat Subdomain Cross-Link -->
            <a href="https://chat.webguruji.online" target="_blank" rel="noopener noreferrer" class="store-nav-link" title="ChatBase AI">
              <span>💬 Chat</span>
            </a>
          </nav>

          <!-- Right Side Actions: Search + Auth + Main Hub -->
          <div class="store-nav-right">
            <!-- Search Pill Button -->
            <button type="button" class="store-nav-search-trigger" id="btn-store-search" title="Search Store (Ctrl + K)" onclick="window.focusStoreSearch()">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span class="store-search-text">Search apps, APKs...</span>
              <kbd class="store-search-kbd">Ctrl K</kbd>
            </button>

            <!-- Auth Trigger Button (Dynamic) -->
            <a href="login.html" id="store-auth-btn" class="store-btn-auth">Login</a>
            
            <div id="store-user-menu" class="store-user-menu" style="display:none;">
              <a href="dashboard.html" title="User Dashboard">
                <img src="logo.png" alt="Profile" id="store-nav-avatar" class="store-user-avatar">
              </a>
            </div>

            <!-- Main Portal Link -->
            <a href="https://www.webguruji.online" target="_blank" rel="noopener noreferrer" class="store-portal-pill" title="Go to Main WebGuruJi Portal">
              <span>WebGuruJi Portal ↗</span>
            </a>
          </div>

        </div>
      </header>

      <!-- Mobile Floating Glass Dock (<= 1024px) -->
      <nav class="store-bottom-dock" id="store-bottom-dock" aria-label="Mobile Store Navigation">
        <a href="index.html" class="store-dock-item ${isStorePage ? 'active' : ''}">
          <span class="store-dock-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </span>
          <span class="store-dock-label">Store</span>
        </a>

        <!-- Center Apps Button -->
        <a href="app.html" class="store-dock-item store-dock-item-primary ${window.location.pathname.includes('app.html') ? 'active' : ''}">
          <span class="store-dock-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
          </span>
          <span class="store-dock-label">Apps</span>
        </a>

        <button type="button" class="store-dock-item" onclick="window.focusStoreSearch()">
          <span class="store-dock-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <span class="store-dock-label">Search</span>
        </button>

        <button type="button" class="store-dock-item" onclick="window.toggleStoreCategoriesSheet(true)">
          <span class="store-dock-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </span>
          <span class="store-dock-label">Platforms</span>
        </button>

        <a href="login.html" id="store-dock-auth-link" class="store-dock-item">
          <span class="store-dock-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </span>
          <span class="store-dock-label" id="store-dock-auth-label">Account</span>
        </a>
      </nav>

      <!-- Mobile Categories Bottom Sheet Modal -->
      <div class="store-sheet-overlay" id="store-sheet-overlay" onclick="if(event.target===this) window.toggleStoreCategoriesSheet(false)" aria-hidden="true">
        <div class="store-bottom-sheet" role="dialog" aria-modal="true" aria-label="Platforms Sheet">
          <div class="store-sheet-handle"></div>
          <div class="store-sheet-head">
            <div class="store-sheet-title">
              <span>🛍️</span> Explore Platforms
            </div>
            <button type="button" class="store-sheet-close" onclick="window.toggleStoreCategoriesSheet(false)">&times;</button>
          </div>

          <div style="display:flex; flex-direction:column; gap:8px;">
            <a href="app.html?category=Android" style="display:flex; align-items:center; gap:12px; padding:12px; border-radius:12px; background:rgba(255,255,255,0.04); color:#fff; text-decoration:none;">
              <span style="font-size:1.4rem;">🤖</span>
              <div><strong>Android APKs</strong><div style="font-size:0.75rem; color:#94a3b8;">Mobile Packages &amp; Games</div></div>
            </a>
            <a href="app.html?category=Windows" style="display:flex; align-items:center; gap:12px; padding:12px; border-radius:12px; background:rgba(255,255,255,0.04); color:#fff; text-decoration:none;">
              <span style="font-size:1.4rem;">🪟</span>
              <div><strong>Windows Software</strong><div style="font-size:0.75rem; color:#94a3b8;">PC Utilities &amp; Installers</div></div>
            </a>
            <a href="app.html?category=Games" style="display:flex; align-items:center; gap:12px; padding:12px; border-radius:12px; background:rgba(255,255,255,0.04); color:#fff; text-decoration:none;">
              <span style="font-size:1.4rem;">🎮</span>
              <div><strong>Games &amp; Play</strong><div style="font-size:0.75rem; color:#94a3b8;">Chess &amp; Casual Games</div></div>
            </a>
          </div>

          <div style="margin-top:14px; display:flex; gap:8px;">
            <a href="https://books.webguruji.online" target="_blank" style="flex:1; text-align:center; padding:10px; background:rgba(99,102,241,0.2); border-radius:10px; color:#a5b4fc; text-decoration:none; font-size:0.82rem; font-weight:600;">
              📚 Books Library ↗
            </a>
            <a href="https://chat.webguruji.online" target="_blank" style="flex:1; text-align:center; padding:10px; background:rgba(168,85,247,0.2); border-radius:10px; color:#d8b4fe; text-decoration:none; font-size:0.82rem; font-weight:600;">
              💬 ChatBase AI ↗
            </a>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('afterbegin', navHTML);

    // Scroll effect
    const header = document.getElementById('store-nav-header');
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 25) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
      }, { passive: true });
    }
  }

  window.focusStoreSearch = function () {
    const input = document.getElementById('search-input') || document.querySelector('.search-input');
    if (input) {
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => input.focus(), 250);
    } else {
      window.location.href = 'app.html?focus=search';
    }
  };

  window.toggleStoreCategoriesSheet = function (open) {
    const overlay = document.getElementById('store-sheet-overlay');
    if (!overlay) return;
    if (open) {
      overlay.classList.add('active');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    } else {
      overlay.classList.remove('active');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        window.focusStoreSearch();
      }
      if (e.key === 'Escape') {
        window.toggleStoreCategoriesSheet(false);
      }
    });
  }

  async function setupAuthListener() {
    try {
      const { supabase } = await import('./js/supabase.js');
      if (!supabase) return;

      const { data: { session } } = await supabase.auth.getSession();
      updateAuthUI(session?.user);

      supabase.auth.onAuthStateChange((_, newSession) => {
        updateAuthUI(newSession?.user);
      });
    } catch (e) {
      // Offline fallback
    }
  }

  function updateAuthUI(user) {
    const authBtn = document.getElementById('store-auth-btn');
    const userMenu = document.getElementById('store-user-menu');
    const dockLink = document.getElementById('store-dock-auth-link');
    const dockLabel = document.getElementById('store-dock-auth-label');

    if (user) {
      if (authBtn) authBtn.style.display = 'none';
      if (userMenu) userMenu.style.display = 'flex';
      if (dockLink) dockLink.href = 'dashboard.html';
      if (dockLabel) dockLabel.textContent = 'Dashboard';
    } else {
      if (authBtn) authBtn.style.display = 'inline-flex';
      if (userMenu) userMenu.style.display = 'none';
      if (dockLink) dockLink.href = 'login.html';
      if (dockLabel) dockLabel.textContent = 'Login';
    }
  }

})();
