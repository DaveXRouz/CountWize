/**
 * Accessibility Hardening Module
 * Provides: Skip links, landmarks, ARIA attributes, keyboard nav, focus management
 *
 * Usage: Include this script in all pages before </body>
 */

(function(window, document) {
  'use strict';

  const A11Y_INITIALIZED_ATTR = 'data-cw-a11y-init';

  /**
   * Inject skip link if not present
   */
  function injectSkipLink() {
    // Check if skip link already exists
    if (document.querySelector('.skip-link, a[href="#main-content"]')) {
      return;
    }

    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';

    // Insert as first child of body
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  /**
   * Ensure main-content target exists
   */
  function ensureMainContentTarget() {
    // Check if target already exists
    if (document.getElementById('main-content')) {
      return;
    }

    // Try to find main content area in order of preference
    const candidates = [
      '.section:first-of-type',          // First section after nav
      'main',                             // Semantic main element
      '[role="main"]',                    // ARIA main role
      '.hero-wrapper',                    // Hero section
      '.w-container:first-of-type',       // First Webflow container
      '.wrapper-page > *:nth-child(3)'    // Third child (after nav and line)
    ];

    for (const selector of candidates) {
      const el = document.querySelector(selector);
      if (el && !el.closest('nav, header, footer, .navbar-2')) {
        el.id = 'main-content';
        // Also add tabindex for keyboard focus
        if (!el.hasAttribute('tabindex')) {
          el.setAttribute('tabindex', '-1');
        }
        return;
      }
    }

    // Fallback: create a target before first section-like element
    const firstSection = document.querySelector('section, .section, .hero-wrapper');
    if (firstSection) {
      const anchor = document.createElement('div');
      anchor.id = 'main-content';
      anchor.setAttribute('tabindex', '-1');
      firstSection.parentNode.insertBefore(anchor, firstSection);
    }
  }

  /**
   * Add landmark roles where missing
   */
  function ensureLandmarks() {
    // Add role="navigation" to nav elements without it
    document.querySelectorAll('nav:not([role])').forEach(nav => {
      nav.setAttribute('role', 'navigation');
    });

    // Add role="main" to main content area
    const mainContent = document.getElementById('main-content');
    if (mainContent && !mainContent.hasAttribute('role')) {
      mainContent.setAttribute('role', 'main');
    }

    // Add role="contentinfo" to footer
    const footer = document.querySelector('footer, .footer-section');
    if (footer && !footer.hasAttribute('role')) {
      footer.setAttribute('role', 'contentinfo');
    }

    // Ensure banner role on header/navbar container
    const navbar = document.querySelector('.navbar-2.w-nav');
    if (navbar && navbar.getAttribute('role') !== 'banner') {
      navbar.setAttribute('role', 'banner');
    }
  }

  /**
   * Webflow navigation accessibility
   */
  function enhanceNavAccessibility() {
    // Find menu button (hamburger)
    const menuButton = document.querySelector('.navbar-menu-button.w-nav-button, .w-nav-button');
    const navMenu = document.querySelector('.navbar-menu.w-nav-menu, .w-nav-menu');

    if (menuButton) {
      // Add aria-label if missing
      if (!menuButton.hasAttribute('aria-label')) {
        menuButton.setAttribute('aria-label', 'Toggle navigation menu');
      }

      // Add aria-expanded (initial state)
      const isOpen = menuButton.classList.contains('w--open');
      menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

      // Add aria-controls if nav menu has ID
      if (navMenu) {
        if (!navMenu.id) {
          navMenu.id = 'cw-nav-menu';
        }
        menuButton.setAttribute('aria-controls', navMenu.id);
      }

      // Watch for Webflow's class changes (MutationObserver)
      const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (mutation.attributeName === 'class') {
            const nowOpen = menuButton.classList.contains('w--open');
            menuButton.setAttribute('aria-expanded', nowOpen ? 'true' : 'false');
          }
        });
      });
      observer.observe(menuButton, { attributes: true });

      // ESC key closes mobile menu
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menuButton.classList.contains('w--open')) {
          menuButton.click(); // Trigger Webflow's close mechanism
          menuButton.focus(); // Return focus to button
        }
      });
    }

    // Enhance dropdown toggles
    document.querySelectorAll('.w-dropdown-toggle').forEach(toggle => {
      if (!toggle.hasAttribute('aria-haspopup')) {
        toggle.setAttribute('aria-haspopup', 'true');
      }

      const isOpen = toggle.closest('.w-dropdown')?.classList.contains('w--open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

      // Watch for dropdown state changes
      const dropdown = toggle.closest('.w-dropdown');
      if (dropdown) {
        const dropObserver = new MutationObserver(() => {
          const nowOpen = dropdown.classList.contains('w--open');
          toggle.setAttribute('aria-expanded', nowOpen ? 'true' : 'false');
        });
        dropObserver.observe(dropdown, { attributes: true });
      }
    });
  }

  /**
   * Add aria-live to form success/error regions
   */
  function enhanceFormRegions() {
    // Success messages
    document.querySelectorAll('.w-form-done').forEach(el => {
      if (!el.hasAttribute('aria-live')) {
        el.setAttribute('aria-live', 'polite');
        el.setAttribute('role', 'status');
      }
    });

    // Error messages
    document.querySelectorAll('.w-form-fail').forEach(el => {
      if (!el.hasAttribute('aria-live')) {
        el.setAttribute('aria-live', 'assertive');
        el.setAttribute('role', 'alert');
      }
    });
  }

  /**
   * Add aria-required to required fields
   */
  function enhanceRequiredFields() {
    document.querySelectorAll('[required]').forEach(field => {
      if (!field.hasAttribute('aria-required')) {
        field.setAttribute('aria-required', 'true');
      }
    });
  }

  /**
   * Add autocomplete attributes to known field types
   */
  function addAutocomplete() {
    const autocompleteMap = {
      'email': 'email',
      'name': 'name',
      'Name': 'name',
      'first-name': 'given-name',
      'firstname': 'given-name',
      'last-name': 'family-name',
      'lastname': 'family-name',
      'phone': 'tel',
      'telephone': 'tel',
      'tel': 'tel',
      'company': 'organization',
      'organization': 'organization',
      'country': 'country-name',
      'city': 'address-level2',
      'address': 'street-address',
      'zip': 'postal-code',
      'postal': 'postal-code'
    };

    document.querySelectorAll('input, select, textarea').forEach(field => {
      // Skip if autocomplete already set
      if (field.hasAttribute('autocomplete')) {
        return;
      }

      // Check by type
      if (field.type === 'email') {
        field.setAttribute('autocomplete', 'email');
        return;
      }
      if (field.type === 'tel') {
        field.setAttribute('autocomplete', 'tel');
        return;
      }

      // Check by name/id
      const identifier = (field.name || field.id || '').toLowerCase();
      for (const [key, value] of Object.entries(autocompleteMap)) {
        if (identifier.includes(key.toLowerCase())) {
          field.setAttribute('autocomplete', value);
          return;
        }
      }
    });
  }

  /**
   * Sync aria-invalid with validation state
   * Called by form-hardening.js when validation occurs
   */
  function syncAriaInvalid(field, isInvalid) {
    if (isInvalid) {
      field.setAttribute('aria-invalid', 'true');
    } else {
      field.removeAttribute('aria-invalid');
    }
  }

  /**
   * Add aria-label to icon-only links
   */
  function labelIconLinks() {
    document.querySelectorAll('a').forEach(link => {
      // Skip if already has accessible name
      if (link.hasAttribute('aria-label') || link.textContent.trim()) {
        return;
      }

      // Check for img with alt text
      const img = link.querySelector('img[alt]');
      if (img && img.alt) {
        link.setAttribute('aria-label', img.alt);
        return;
      }

      // Check for social link patterns
      const href = link.href || '';
      const socialPatterns = {
        'instagram': 'Instagram',
        'linkedin': 'LinkedIn',
        'facebook': 'Facebook',
        'twitter': 'Twitter',
        'youtube': 'YouTube',
        'tiktok': 'TikTok'
      };

      for (const [pattern, label] of Object.entries(socialPatterns)) {
        if (href.toLowerCase().includes(pattern)) {
          link.setAttribute('aria-label', label);
          return;
        }
      }
    });
  }

  /**
   * Add rel="noopener noreferrer" to external links
   */
  function secureExternalLinks() {
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
      const rel = link.getAttribute('rel') || '';
      const parts = rel.split(' ').filter(Boolean);

      if (!parts.includes('noopener')) {
        parts.push('noopener');
      }
      if (!parts.includes('noreferrer')) {
        parts.push('noreferrer');
      }

      link.setAttribute('rel', parts.join(' '));
    });
  }

  /**
   * Focus visible outline enhancement
   */
  function enhanceFocusIndicators() {
    // Add class to track keyboard vs mouse navigation
    let usingKeyboard = false;

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        usingKeyboard = true;
        document.body.classList.add('cw-keyboard-nav');
      }
    });

    document.addEventListener('mousedown', function() {
      usingKeyboard = false;
      document.body.classList.remove('cw-keyboard-nav');
    });
  }

  /**
   * Initialize all accessibility enhancements
   */
  function init() {
    // Prevent double initialization
    if (document.documentElement.hasAttribute(A11Y_INITIALIZED_ATTR)) {
      return;
    }
    document.documentElement.setAttribute(A11Y_INITIALIZED_ATTR, 'true');

    // Run all enhancements
    injectSkipLink();
    ensureMainContentTarget();
    ensureLandmarks();
    enhanceNavAccessibility();
    enhanceFormRegions();
    enhanceRequiredFields();
    addAutocomplete();
    labelIconLinks();
    secureExternalLinks();
    enhanceFocusIndicators();
  }

  // Run on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose API for form-hardening.js integration
  window.CWA11y = {
    syncAriaInvalid: syncAriaInvalid,
    enhanceRequiredFields: enhanceRequiredFields,
    init: init
  };

})(window, document);
