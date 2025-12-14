/**
 * CountWize Main JavaScript
 * Entry point that initializes all modules
 * 
 * Modules:
 * - navigation.js - Sticky nav, mobile menu, dropdowns
 * - animations.js - Scroll-triggered animations
 * - forms.js - Form validation and submission
 * - components.js - Tabs, accordions, modals
 * - integrations.js - LiveChat, Analytics, Cookies
 */

(function() {
  'use strict';

  // Application state
  const state = {
    initialized: false,
    currentPage: '',
    isMobile: false
  };

  /**
   * Initialize the application
   */
  function init() {
    if (state.initialized) return;
    
    // Add loading class for initial animation control
    document.body.classList.add('js-loading');

    // Detect device
    detectDevice();

    // Initialize core functionality
    initializeDOMContentLoaded();

    // Mark as initialized
    state.initialized = true;
  }

  /**
   * Detect device type
   */
  function detectDevice() {
    state.isMobile = window.innerWidth < 768;
    
    window.addEventListener('resize', () => {
      state.isMobile = window.innerWidth < 768;
    });

    // Add device class to body
    document.body.classList.toggle('is-mobile', state.isMobile);
    document.body.classList.toggle('is-desktop', !state.isMobile);
  }

  /**
   * Initialize when DOM is ready
   */
  function initializeDOMContentLoaded() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', onDOMReady);
    } else {
      onDOMReady();
    }
  }

  /**
   * Called when DOM is ready
   */
  function onDOMReady() {
    // Get current page
    state.currentPage = document.body.dataset.page || 
                        window.location.pathname.split('/').pop().replace('.html', '') || 
                        'home';

    // Initialize all modules
    initModules();

    // Initialize page-specific code
    initPageSpecific();

    // Remove loading class
    requestAnimationFrame(() => {
      document.body.classList.remove('js-loading');
      document.body.classList.add('js-loaded');
    });

    // Fire ready event
    document.dispatchEvent(new CustomEvent('countwize:ready', {
      detail: { page: state.currentPage }
    }));
  }

  /**
   * Initialize all modules
   */
  function initModules() {
    // Navigation (if module exists)
    if (window.CountWizeNavigation) {
      window.CountWizeNavigation.init();
    }

    // Animations (if module exists)
    if (window.CountWizeAnimations) {
      window.CountWizeAnimations.init();
    }

    // Forms (if module exists)
    if (window.CountWizeForms) {
      window.CountWizeForms.init();
    }

    // Components (if module exists)
    if (window.CountWizeComponents) {
      window.CountWizeComponents.init();
    }

    // Integrations (if module exists)
    if (window.CountWizeIntegrations) {
      window.CountWizeIntegrations.init();
    }
  }

  /**
   * Initialize page-specific functionality
   */
  function initPageSpecific() {
    switch (state.currentPage) {
      case 'home':
      case 'index':
        initHomePage();
        break;
      case 'recovery':
        initRecoveryPage();
        break;
      case 'team':
        initTeamPage();
        break;
      case 'contact':
      case 'contact-us':
        initContactPage();
        break;
      case 'faq':
        initFaqPage();
        break;
      case 'blog':
        initBlogPage();
        break;
    }
  }

  /**
   * Home page specific initialization
   */
  function initHomePage() {
    // Initialize hero animations
    const hero = document.querySelector('.hero');
    if (hero) {
      setTimeout(() => {
        hero.classList.add('hero-loaded');
      }, 100);
    }

    // Initialize any home-specific counters
    const counters = document.querySelectorAll('[data-counter]');
    if (counters.length && window.CountWizeAnimations) {
      // Counters are auto-initialized by animations module
    }
  }

  /**
   * Recovery page specific initialization
   */
  function initRecoveryPage() {
    // Initialize pricing tabs if present
    const pricingTabs = document.querySelector('[data-pricing-tabs]');
    if (pricingTabs) {
      // Custom pricing tab logic
    }
  }

  /**
   * Team page specific initialization
   */
  function initTeamPage() {
    // Initialize team member modals
    const teamCards = document.querySelectorAll('.card-team');
    
    teamCards.forEach(card => {
      card.addEventListener('click', () => {
        const memberId = card.dataset.member;
        if (memberId && window.CountWizeComponents) {
          window.CountWizeComponents.openModal(memberId);
        }
      });
    });
  }

  /**
   * Contact page specific initialization
   */
  function initContactPage() {
    // Form is auto-initialized by forms module
    // Any contact-specific functionality here
  }

  /**
   * FAQ page specific initialization
   */
  function initFaqPage() {
    // FAQ search functionality
    const searchInput = document.querySelector('.faq-search');
    const faqItems = document.querySelectorAll('.faq-item');

    if (searchInput && faqItems.length) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();

        faqItems.forEach(item => {
          const question = item.querySelector('.faq-question')?.textContent.toLowerCase() || '';
          const answer = item.querySelector('.faq-answer-content')?.textContent.toLowerCase() || '';
          
          const matches = question.includes(query) || answer.includes(query);
          item.style.display = matches ? 'block' : 'none';
        });
      });
    }
  }

  /**
   * Blog page specific initialization
   */
  function initBlogPage() {
    // Category filtering
    const categoryButtons = document.querySelectorAll('[data-category]');
    const articles = document.querySelectorAll('[data-article-category]');

    categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        const category = button.dataset.category;

        // Update active button
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter articles
        articles.forEach(article => {
          if (category === 'all' || article.dataset.articleCategory === category) {
            article.style.display = 'block';
          } else {
            article.style.display = 'none';
          }
        });
      });
    });
  }

  /**
   * Utility: Debounce function
   */
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Utility: Throttle function
   */
  function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * Utility: Format currency
   */
  function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  /**
   * Utility: Format date
   */
  function formatDate(date, options = {}) {
    const defaultOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Intl.DateTimeFormat('en-US', { ...defaultOptions, ...options }).format(new Date(date));
  }

  // Initialize the application
  init();

  // Export for global use
  window.CountWize = {
    state: state,
    init: init,
    debounce: debounce,
    throttle: throttle,
    formatCurrency: formatCurrency,
    formatDate: formatDate,
    // Module references
    navigation: window.CountWizeNavigation,
    animations: window.CountWizeAnimations,
    forms: window.CountWizeForms,
    components: window.CountWizeComponents,
    integrations: window.CountWizeIntegrations
  };

})();

// ============================================
// LEGACY COMPATIBILITY
// Keep old functions working during transition
// ============================================

// Expose phone validation globally for inline handlers
window.validatePhone = function() {
  if (window.CountWizeForms) {
    return window.CountWizeForms.validatePhoneInput();
  }
  return true;
};

// Expose form validation globally
window.validateForm = function(form) {
  if (window.CountWizeForms) {
    return window.CountWizeForms.validateForm(form);
  }
  return true;
};

// Expose modal functions globally
window.openModal = function(id) {
  if (window.CountWizeComponents) {
    window.CountWizeComponents.openModal(id);
  }
};

window.closeModal = function(id) {
  if (window.CountWizeComponents) {
    window.CountWizeComponents.closeModal(id);
  }
};

// Expose toast notifications globally
window.showToast = function(message, type, duration) {
  if (window.CountWizeComponents) {
    window.CountWizeComponents.showToast(message, type, duration);
  }
};

// Expose analytics tracking globally
window.trackEvent = function(name, params) {
  if (window.CountWizeIntegrations) {
    window.CountWizeIntegrations.trackEvent(name, params);
  }
};
