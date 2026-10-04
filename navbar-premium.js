/**
 * ============================================================================
 * HARSHGURUJI STORE — PREMIUM NAVIGATION ENGINE
 * Dedicated Navigation Controller for store.webguruji.online & app.html
 * Fully unified with HarshGuruJi ecosystem & fixed mobile bottom navigation
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
    document.querySelectorAll('.store-nav-header, .store-bottom-dock, .store-sheet-overlay, .hg-header, #hg-global-navbar, #hg-bottom-bar, .hg-bottom-bar, .premium-navbar').forEach(el => el.remove());

    const navHTML = `
      <!-- Desktop & Tablet Top Fixed Navigation -->
      <header class="store-nav-header" id="store-nav-header" role="banner" aria-label="Store Main Navigation">
        <div class="store-nav-container">
          
          <!-- Brand Logo & Store Identity -->
          <a href="${isStorePage ? '#top' : 'index.html'}" class="store-brand" aria-label="HarshGuruJi Store Home">
            <div class="store-brand-logo-wrap">
              <img src="store.png" onerror="this.src='logo.png'" alt="HarshGuruJi Store" class="store-brand-logo" fetchpriority="high">
            </div>
            <div class="store-brand-text-wrap">
              <div class="store-brand-name">
                HarshGuruJi <span class="store-brand-badge">STORE</span>
              </div>
              <div class="store-brand-sub">Official Apps &amp; Software Store</div>
            </div>
          </a>

          <!-- Desktop Center Navigation Links -->
          <nav class="store-nav-center" aria-label="Store Desktop Navigation Links">
            <a href="index.html" class="store-nav-link ${isStorePage ? 'active' : ''}" id="snav-link-home">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span>Store Home</span>
            </a>

            <a href="app.html" class="store-nav-link ${window.location.pathname.includes('app.html') && !window.location.search ? 'active' : ''}" id="snav-link-apps">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
              <span>All Apps</span>
            </a>

            <!-- Direct Store Categories -->
            <a href="app.html?category=Android" class="store-nav-link ${window.location.search.includes('Android') ? 'active' : ''}">
              <span>🤖 Android</span>
            </a>

            <a href="app.html?category=Windows" class="store-nav-link ${window.location.search.includes('Windows') ? 'active' : ''}">
              <span>🪟 Windows</span>
            </a>

            <a href="app.html?category=Games" class="store-nav-link ${window.location.search.includes('Games') ? 'active' : ''}">
              <span>🎮 Games</span>
            </a>

            <!-- Books Subdomain Cross-Link -->
            <a href="https://books.webguruji.online" target="_blank" rel="noopener noreferrer" class="store-nav-link" title="HarshGuruJi NCERT Books Library">
              <span>📚 Books</span>
            </a>

            <!-- Chat Subdomain Cross-Link -->
            <a href="https://chat.webguruji.online" target="_blank" rel="noopener noreferrer" class="store-nav-link" title="HarshGuruJi ChatBase AI">
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
              <span class="store-search-text">Search store...</span>
              <kbd class="store-search-kbd">Ctrl K</kbd>
            </button>

            <!-- Auth Trigger Button (Dynamic) -->
            <a href="login.html" id="store-auth-btn" class="store-btn-auth">Login</a>
            
            <div id="store-user-menu" class="store-user-menu" style="display:none;">
              <a href="dashboard.html" title="User Dashboard">
                <img src="store.png" onerror="this.src='logo.png'" alt="Profile" id="store-nav-avatar" class="store-user-avatar">
              </a>
            </div>

            <!-- Main Portal Link -->
            <a href="https://www.webguruji.online" target="_blank" rel="noopener noreferrer" class="store-portal-pill" title="Go to Main HarshGuruJi Portal">
              <span>Main Portal ↗</span>
            </a>
          </div>

        </div>
      </header>

      <!-- Unified Mobile Bottom Navigation Bar (Identical to HarshGuruJi Ecosystem) -->
      <nav class="hg-bottom-bar" id="hg-bottom-bar" aria-label="Mobile Navigation">
        <a href="https://books.webguruji.online" class="hg-bottom-item" id="bottom-nav-books" title="NCERT Books" target="_blank" rel="noopener noreferrer">
          <span class="hg-bottom-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
          </span>
          <span class="hg-bottom-label">Books</span>
        </a>

        <a href="https://www.webguruji.online/daily-special.html" class="hg-bottom-item" id="bottom-nav-dailyspecial" title="Daily Special">
          <span class="hg-bottom-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </span>
          <span class="hg-bottom-label">Daily Special</span>
        </a>

        <a href="${isStorePage ? '#top' : 'index.html'}" class="hg-bottom-item active" id="bottom-nav-store" title="HarshGuruJi Store">
          <span class="hg-bottom-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </span>
          <span class="hg-bottom-label">Store</span>
        </a>

        <a href="https://www.webguruji.online/" class="hg-bottom-item hg-bottom-item-home" id="bottom-nav-home" title="Home">
          <span class="hg-bottom-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </span>
          <span class="hg-bottom-label">Home</span>
        </a>

        <a href="https://chat.webguruji.online" class="hg-bottom-item" id="bottom-nav-chat" target="_blank" rel="noopener noreferrer" title="Chat App">
          <span class="hg-bottom-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </span>
          <span class="hg-bottom-label">Chat</span>
        </a>

        <a href="https://www.webguruji.online/contributor.html" class="hg-bottom-item" id="bottom-nav-contributor" title="Contributors">
          <span class="hg-bottom-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </span>
          <span class="hg-bottom-label">Contributor</span>
        </a>

        <a href="login.html" class="hg-bottom-item" id="bottom-nav-auth" title="Profile / Account">
          <span class="hg-bottom-icon" id="bottom-auth-icon-wrap">
            <svg id="bottom-auth-default-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <img id="bottom-auth-avatar" src="store.png" onerror="this.src='logo.png'" alt="Profile" style="display:none;" />
          </span>
          <span class="hg-bottom-label" id="bottom-auth-label">Login</span>
        </a>
      </nav>
    `;

    document.body.insertAdjacentHTML('afterbegin', navHTML);

    // Scroll effect
    const header = document.getElementById('store-nav-header');
    if (header) {
      const handleScroll = () => {
        if (window.scrollY > 15) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    }
  }

  window.focusStoreSearch = function () {
    const input = document.getElementById('search-input') || document.querySelector('.search-input') || document.getElementById('global-search-input');
    if (input) {
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => input.focus(), 250);
    } else {
      window.location.href = 'app.html?focus=search';
    }
  };

  function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        window.focusStoreSearch();
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
    const bottomAuthItem = document.getElementById('bottom-nav-auth');
    const bottomAuthAvatar = document.getElementById('bottom-auth-avatar');
    const bottomAuthDefaultIcon = document.getElementById('bottom-auth-default-icon');
    const bottomAuthLabel = document.getElementById('bottom-auth-label');

    if (user) {
      if (authBtn) authBtn.style.display = 'none';
      if (userMenu) userMenu.style.display = 'flex';
      if (bottomAuthItem) bottomAuthItem.href = 'dashboard.html';
      if (bottomAuthLabel) bottomAuthLabel.textContent = 'Account';
      if (bottomAuthAvatar) {
        const meta = user.user_metadata || {};
        const avatarUrl = meta.avatar_url || meta.picture || 'store.png';
        bottomAuthAvatar.src = avatarUrl;
        bottomAuthAvatar.style.display = 'block';
        if (bottomAuthDefaultIcon) bottomAuthDefaultIcon.style.display = 'none';
      }
    } else {
      if (authBtn) authBtn.style.display = 'inline-flex';
      if (userMenu) userMenu.style.display = 'none';
      if (bottomAuthItem) bottomAuthItem.href = 'login.html';
      if (bottomAuthLabel) bottomAuthLabel.textContent = 'Login';
      if (bottomAuthAvatar) bottomAuthAvatar.style.display = 'none';
      if (bottomAuthDefaultIcon) bottomAuthDefaultIcon.style.display = 'block';
    }
  }

})();
