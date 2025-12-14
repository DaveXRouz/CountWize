/**
 * CountWize Integrations Module
 * LiveChat, Analytics, Cookie Consent
 */

(function() {
  'use strict';

  // Configuration
  const config = {
    liveChatLicense: 18977943,
    googleAnalyticsId: 'G-0NX03W5PQR',
    googleAdsId: 'AW-447543988',
    euCountries: [
      'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR',
      'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK',
      'SI', 'ES', 'SE', 'IS', 'NO', 'LI'
    ]
  };

  /**
   * Initialize all integrations
   */
  function init() {
    initGoogleConsent();
    initCookieBanner();
    initLiveChat();
  }

  /**
   * Initialize Google Consent Mode
   */
  function initGoogleConsent() {
    window.dataLayer = window.dataLayer || [];
    
    function gtag() {
      dataLayer.push(arguments);
    }
    
    // Set default consent to denied
    gtag('consent', 'default', {
      'ad_storage': 'denied',
      'analytics_storage': 'denied',
      'functionality_storage': 'denied',
      'personalization_storage': 'denied',
      'security_storage': 'granted'
    });

    // Make gtag available globally
    window.gtag = gtag;
  }

  /**
   * Update consent settings
   */
  function updateConsent(settings) {
    if (typeof gtag !== 'function') return;
    
    gtag('consent', 'update', {
      'ad_storage': settings.ads ? 'granted' : 'denied',
      'analytics_storage': settings.analytics ? 'granted' : 'denied'
    });
  }

  /**
   * Initialize Cookie Banner
   */
  function initCookieBanner() {
    // Check if consent already given
    if (localStorage.getItem('cookie-consent')) {
      applyStoredConsent();
      return;
    }

    // Detect user location and show appropriate banner
    detectUserLocation().then(isEU => {
      if (isEU) {
        showAdvancedBanner();
      } else {
        showSimpleBanner();
      }
    });
  }

  /**
   * Detect if user is in EU
   */
  async function detectUserLocation() {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return config.euCountries.includes(data.country);
    } catch (error) {
      console.warn('Could not detect location, showing simple banner');
      return false;
    }
  }

  /**
   * Show advanced cookie banner (for EU users)
   */
  function showAdvancedBanner() {
    const banner = document.getElementById('cookie-banner-advanced');
    if (!banner) return;

    showElement(banner);

    // Accept all button
    const acceptAllBtn = document.getElementById('accept-all');
    if (acceptAllBtn) {
      acceptAllBtn.addEventListener('click', () => {
        updateConsent({ ads: true, analytics: true });
        localStorage.setItem('cookie-consent', 'all');
        hideElement(banner);
      });
    }

    // Reject all button
    const rejectAllBtn = document.getElementById('reject-all');
    if (rejectAllBtn) {
      rejectAllBtn.addEventListener('click', () => {
        updateConsent({ ads: false, analytics: false });
        localStorage.setItem('cookie-consent', 'none');
        hideElement(banner);
      });
    }

    // Customize button
    const customizeBtn = document.getElementById('customize');
    const categoriesSection = document.getElementById('cookie-categories');
    
    if (customizeBtn && categoriesSection) {
      customizeBtn.addEventListener('click', () => {
        if (categoriesSection.style.display === 'none') {
          categoriesSection.style.display = 'block';
          customizeBtn.textContent = 'Save';
        } else {
          // Save custom preferences
          const analyticsConsent = document.getElementById('analytics-consent')?.checked ?? false;
          const adsConsent = document.getElementById('ads-consent')?.checked ?? false;
          
          updateConsent({ ads: adsConsent, analytics: analyticsConsent });
          localStorage.setItem('cookie-consent', JSON.stringify({ 
            analytics: analyticsConsent, 
            ads: adsConsent 
          }));
          hideElement(banner);
        }
      });
    }
  }

  /**
   * Show simple cookie banner (for non-EU users)
   */
  function showSimpleBanner() {
    const banner = document.getElementById('cookie-banner-simple');
    if (!banner) return;

    showElement(banner);

    const okBtn = document.getElementById('ok-simple');
    if (okBtn) {
      okBtn.addEventListener('click', () => {
        localStorage.setItem('cookie-consent', 'simple-ok');
        hideElement(banner);
      });
    }
  }

  /**
   * Apply stored consent settings
   */
  function applyStoredConsent() {
    const consent = localStorage.getItem('cookie-consent');
    
    if (consent === 'all') {
      updateConsent({ ads: true, analytics: true });
    } else if (consent === 'none') {
      updateConsent({ ads: false, analytics: false });
    } else if (consent === 'simple-ok') {
      // Simple consent implies acceptance
      updateConsent({ ads: true, analytics: true });
    } else {
      try {
        const parsed = JSON.parse(consent);
        updateConsent({ 
          ads: parsed.ads ?? false, 
          analytics: parsed.analytics ?? false 
        });
      } catch (e) {
        // Invalid consent, request again
        localStorage.removeItem('cookie-consent');
        initCookieBanner();
      }
    }
  }

  /**
   * Show element with animation
   */
  function showElement(el) {
    el.style.setProperty('display', 'block', 'important');
    requestAnimationFrame(() => {
      el.style.setProperty('opacity', '1', 'important');
    });
  }

  /**
   * Hide element with animation
   */
  function hideElement(el) {
    el.style.setProperty('opacity', '0', 'important');
    setTimeout(() => {
      el.style.setProperty('display', 'none', 'important');
    }, 300);
  }

  /**
   * Initialize LiveChat
   */
  function initLiveChat() {
    window.__lc = window.__lc || {};
    window.__lc.license = config.liveChatLicense;
    window.__lc.integration_name = 'manual_channels';
    window.__lc.product_name = 'livechat';

    (function(n, t, c) {
      function i(n) {
        return e._h ? e._h.apply(null, n) : e._q.push(n);
      }
      var e = {
        _q: [],
        _h: null,
        _v: '2.0',
        on: function() { i(['on', c.call(arguments)]); },
        once: function() { i(['once', c.call(arguments)]); },
        off: function() { i(['off', c.call(arguments)]); },
        get: function() {
          if (!e._h) throw new Error("[LiveChatWidget] You can't use getters before load.");
          return i(['get', c.call(arguments)]);
        },
        call: function() { i(['call', c.call(arguments)]); },
        init: function() {
          var n = t.createElement('script');
          n.async = true;
          n.type = 'text/javascript';
          n.src = 'https://cdn.livechatinc.com/tracking.js';
          t.head.appendChild(n);
        }
      };
      if (!n.__lc.asyncInit) e.init();
      n.LiveChatWidget = n.LiveChatWidget || e;
    })(window, document, [].slice);
  }

  /**
   * Track custom event in analytics
   */
  function trackEvent(eventName, eventParams = {}) {
    if (typeof gtag !== 'function') return;
    
    gtag('event', eventName, eventParams);
  }

  /**
   * Track page view
   */
  function trackPageView(pagePath, pageTitle) {
    if (typeof gtag !== 'function') return;
    
    gtag('event', 'page_view', {
      page_path: pagePath || window.location.pathname,
      page_title: pageTitle || document.title
    });
  }

  /**
   * Open LiveChat
   */
  function openLiveChat() {
    if (window.LiveChatWidget) {
      window.LiveChatWidget.call('maximize');
    }
  }

  /**
   * Close LiveChat
   */
  function closeLiveChat() {
    if (window.LiveChatWidget) {
      window.LiveChatWidget.call('minimize');
    }
  }

  /**
   * Reset consent (for testing/privacy settings page)
   */
  function resetConsent() {
    localStorage.removeItem('cookie-consent');
    window.location.reload();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export for use in other modules
  window.CountWizeIntegrations = {
    init: init,
    trackEvent: trackEvent,
    trackPageView: trackPageView,
    updateConsent: updateConsent,
    resetConsent: resetConsent,
    openLiveChat: openLiveChat,
    closeLiveChat: closeLiveChat
  };

})();
