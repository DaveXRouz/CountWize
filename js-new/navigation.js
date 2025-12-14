/**
 * CountWize Navigation Module
 * Handles sticky nav, mobile menu, and dropdowns
 */

(function() {
  'use strict';

  // DOM Elements
  let navbar = null;
  let mobileToggle = null;
  let mobileMenu = null;
  let dropdowns = [];

  // State
  let isMenuOpen = false;
  let lastScrollY = 0;
  let isScrollingDown = false;

  /**
   * Initialize navigation
   */
  function init() {
    navbar = document.querySelector('.navbar, .navbar-2');
    mobileToggle = document.querySelector('.navbar-mobile-toggle, .navbar-menu-button');
    mobileMenu = document.querySelector('.navbar-mobile-menu, .navbar-menu');
    dropdowns = document.querySelectorAll('.navbar-dropdown, .w-dropdown');

    if (!navbar) return;

    initStickyNav();
    initMobileMenu();
    initDropdowns();
    initScrollBehavior();
  }

  /**
   * Sticky navigation on scroll
   */
  function initStickyNav() {
    let ticking = false;

    function updateNav() {
      const scrollY = window.pageYOffset;
      
      // Add scrolled class when scrolled past threshold
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // Track scroll direction
      isScrollingDown = scrollY > lastScrollY;
      lastScrollY = scrollY;

      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateNav);
        ticking = true;
      }
    }, { passive: true });
  }

  /**
   * Mobile menu toggle
   */
  function initMobileMenu() {
    if (!mobileToggle || !mobileMenu) return;

    mobileToggle.addEventListener('click', toggleMobileMenu);

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (isMenuOpen && 
          !mobileMenu.contains(e.target) && 
          !mobileToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMobileMenu();
      }
    });

    // Close menu on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024 && isMenuOpen) {
        closeMobileMenu();
      }
    });

    // Close menu when clicking on a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        // Small delay to allow navigation
        setTimeout(closeMobileMenu, 100);
      });
    });
  }

  function toggleMobileMenu() {
    if (isMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  function openMobileMenu() {
    isMenuOpen = true;
    mobileToggle.classList.add('active', 'w--open');
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    // Focus first link for accessibility
    const firstLink = mobileMenu.querySelector('a');
    if (firstLink) {
      setTimeout(() => firstLink.focus(), 300);
    }
  }

  function closeMobileMenu() {
    isMenuOpen = false;
    mobileToggle.classList.remove('active', 'w--open');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }

  /**
   * Dropdown menus
   */
  function initDropdowns() {
    dropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector('.navbar-dropdown-toggle, .w-dropdown-toggle');
      const menu = dropdown.querySelector('.navbar-dropdown-menu, .w-dropdown-list');
      
      if (!toggle || !menu) return;

      // For desktop: hover behavior
      if (window.innerWidth >= 1024) {
        dropdown.addEventListener('mouseenter', () => {
          menu.classList.add('open');
        });

        dropdown.addEventListener('mouseleave', () => {
          menu.classList.remove('open');
        });
      }

      // For all: click behavior
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Close other dropdowns
        dropdowns.forEach(other => {
          if (other !== dropdown) {
            other.querySelector('.navbar-dropdown-menu, .w-dropdown-list')
              ?.classList.remove('open');
          }
        });

        menu.classList.toggle('open');
      });

      // Close on click outside
      document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
          menu.classList.remove('open');
        }
      });

      // Keyboard navigation
      toggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          menu.classList.toggle('open');
        }
        if (e.key === 'Escape') {
          menu.classList.remove('open');
        }
      });
    });
  }

  /**
   * Scroll behavior - hide/show nav on scroll
   * (Optional feature, disabled by default)
   */
  function initScrollBehavior() {
    // Uncomment below to enable hide-on-scroll behavior
    /*
    let lastScrollY = 0;
    let ticking = false;

    function updateNavVisibility() {
      const scrollY = window.pageYOffset;
      
      if (scrollY > lastScrollY && scrollY > 100) {
        // Scrolling down - hide nav
        navbar.style.transform = 'translateY(-100%)';
      } else {
        // Scrolling up - show nav
        navbar.style.transform = 'translateY(0)';
      }
      
      lastScrollY = scrollY;
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateNavVisibility);
        ticking = true;
      }
    }, { passive: true });
    */
  }

  /**
   * Update active navigation link based on current page
   */
  function updateActiveLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-link, .nav-link');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      
      // Remove all active classes first
      link.classList.remove('active', 'w--current');
      
      // Check if this link matches current page
      if (href) {
        const linkPath = new URL(href, window.location.origin).pathname;
        if (linkPath === currentPath || 
            (currentPath === '/' && (href === 'index.html' || href === '/'))) {
          link.classList.add('active', 'w--current');
        }
      }
    });
  }

  /**
   * Scroll spy - update active link based on scroll position
   */
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-link[href^="#"]');

    if (sections.length === 0 || navLinks.length === 0) return;

    function updateActiveSection() {
      const scrollY = window.pageYOffset;
      const navHeight = navbar ? navbar.offsetHeight : 80;

      sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollY >= sectionTop && scrollY < sectionBottom) {
          const id = section.getAttribute('id');
          
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }

    window.addEventListener('scroll', updateActiveSection, { passive: true });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      init();
      updateActiveLink();
      initScrollSpy();
    });
  } else {
    init();
    updateActiveLink();
    initScrollSpy();
  }

  // Export for use in other modules
  window.CountWizeNavigation = {
    init: init,
    openMobileMenu: openMobileMenu,
    closeMobileMenu: closeMobileMenu,
    toggleMobileMenu: toggleMobileMenu,
    updateActiveLink: updateActiveLink
  };

})();
