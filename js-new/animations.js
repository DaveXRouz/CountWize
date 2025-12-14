/**
 * CountWize Animations Module
 * Scroll-triggered animations using Intersection Observer
 */

(function() {
  'use strict';

  // Configuration
  const config = {
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1,
    once: true // Animate only once
  };

  /**
   * Initialize scroll animations
   */
  function initScrollAnimations() {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Show all elements immediately without animation
      document.querySelectorAll('[data-animate]').forEach(el => {
        el.classList.add('is-visible');
      });
      return;
    }

    // Create Intersection Observer
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add visible class to trigger animation
          entry.target.classList.add('is-visible');
          
          // Unobserve if animation should only happen once
          if (config.once) {
            observer.unobserve(entry.target);
          }
        } else if (!config.once) {
          // Remove class if element leaves viewport (for repeating animations)
          entry.target.classList.remove('is-visible');
        }
      });
    }, {
      rootMargin: config.rootMargin,
      threshold: config.threshold
    });

    // Observe all elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach(el => {
      observer.observe(el);
    });
  }

  /**
   * Initialize stagger animations for child elements
   */
  function initStaggerAnimations() {
    document.querySelectorAll('[data-animate-children]').forEach(container => {
      const children = container.children;
      const delay = parseFloat(container.dataset.animateDelay) || 0.1;
      
      Array.from(children).forEach((child, index) => {
        child.setAttribute('data-animate', container.dataset.animateChildren);
        child.setAttribute('data-animate-stagger', index + 1);
        child.style.transitionDelay = `${index * delay}s`;
      });
    });
  }

  /**
   * Counter animation for statistics
   */
  function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-counter]');
    
    if (counters.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }

  /**
   * Animate a single counter element
   */
  function animateCounter(element) {
    const target = parseInt(element.dataset.counter, 10);
    const duration = parseInt(element.dataset.counterDuration, 10) || 2000;
    const suffix = element.dataset.counterSuffix || '';
    const prefix = element.dataset.counterPrefix || '';
    const start = 0;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * easeProgress);
      
      element.textContent = prefix + current.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }

    requestAnimationFrame(updateCounter);
  }

  /**
   * Parallax effect for background elements
   */
  function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;

    let ticking = false;

    function updateParallax() {
      const scrollY = window.pageYOffset;

      parallaxElements.forEach(element => {
        const speed = parseFloat(element.dataset.parallax) || 0.5;
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const windowHeight = window.innerHeight;
        
        // Only animate when element is in view
        if (scrollY + windowHeight > elementTop && scrollY < elementTop + rect.height) {
          const yPos = (scrollY - elementTop) * speed;
          element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        }
      });

      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  /**
   * Smooth scroll for anchor links
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') return;
        
        const target = document.querySelector(href);
        
        if (target) {
          e.preventDefault();
          
          const navHeight = parseInt(getComputedStyle(document.documentElement)
            .getPropertyValue('--nav-height')) || 80;
          
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Update URL hash
          history.pushState(null, '', href);
        }
      });
    });
  }

  /**
   * Scroll progress indicator
   */
  function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    
    if (!progressBar) return;

    function updateProgress() {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
  }

  /**
   * Reveal text animation (character by character)
   */
  function initTextReveal() {
    document.querySelectorAll('[data-text-reveal]').forEach(element => {
      const text = element.textContent;
      element.textContent = '';
      element.style.visibility = 'visible';

      text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.opacity = '0';
        span.style.animation = `fade-in 0.1s ease forwards`;
        span.style.animationDelay = `${index * 0.03}s`;
        element.appendChild(span);
      });
    });
  }

  /**
   * Initialize all animation modules
   */
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initAllAnimations);
    } else {
      initAllAnimations();
    }
  }

  function initAllAnimations() {
    initStaggerAnimations();
    initScrollAnimations();
    initCounterAnimations();
    initParallax();
    initSmoothScroll();
    initScrollProgress();
    initTextReveal();

    // Remove loading class if present
    document.body.classList.remove('js-loading');
  }

  // Export for use in other modules
  window.CountWizeAnimations = {
    init: init,
    initScrollAnimations: initScrollAnimations,
    initCounterAnimations: initCounterAnimations,
    animateCounter: animateCounter
  };

  // Auto-initialize
  init();

})();
