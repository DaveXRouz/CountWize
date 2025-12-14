/**
 * CountWize Components Module
 * Tabs, Accordions, Sliders, and other UI components
 */

(function() {
  'use strict';

  /**
   * Initialize all components
   */
  function init() {
    initTabs();
    initAccordions();
    initModals();
    initTooltips();
    initCopyButtons();
    initSliders();
  }

  /**
   * Initialize Tabs
   */
  function initTabs() {
    const tabContainers = document.querySelectorAll('[data-tabs]');

    tabContainers.forEach(container => {
      const tabButtons = container.querySelectorAll('[data-tab]');
      const tabPanels = container.querySelectorAll('[data-tab-panel]');

      tabButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
          const tabId = button.dataset.tab;

          // Remove active class from all buttons and panels
          tabButtons.forEach(btn => btn.classList.remove('active'));
          tabPanels.forEach(panel => {
            panel.classList.remove('active');
            panel.style.display = 'none';
          });

          // Add active class to clicked button
          button.classList.add('active');

          // Show corresponding panel
          const targetPanel = container.querySelector(`[data-tab-panel="${tabId}"]`);
          if (targetPanel) {
            targetPanel.classList.add('active');
            targetPanel.style.display = 'block';
          }
        });

        // Keyboard navigation
        button.addEventListener('keydown', (e) => {
          let targetIndex = index;

          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            targetIndex = (index + 1) % tabButtons.length;
          } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            targetIndex = (index - 1 + tabButtons.length) % tabButtons.length;
          } else if (e.key === 'Home') {
            e.preventDefault();
            targetIndex = 0;
          } else if (e.key === 'End') {
            e.preventDefault();
            targetIndex = tabButtons.length - 1;
          }

          if (targetIndex !== index) {
            tabButtons[targetIndex].click();
            tabButtons[targetIndex].focus();
          }
        });
      });

      // Initialize first tab as active
      if (tabButtons.length > 0 && !container.querySelector('[data-tab].active')) {
        tabButtons[0].click();
      }
    });
  }

  /**
   * Initialize Accordions
   */
  function initAccordions() {
    const accordionItems = document.querySelectorAll('.faq-item, .accordion-item, [data-accordion]');

    accordionItems.forEach(item => {
      const trigger = item.querySelector('.faq-question, .accordion-trigger, [data-accordion-trigger]');
      const content = item.querySelector('.faq-answer, .accordion-content, [data-accordion-content]');
      const icon = item.querySelector('.faq-icon, .accordion-icon');

      if (!trigger || !content) return;

      // Set initial state
      if (!item.classList.contains('active')) {
        content.style.maxHeight = '0px';
        content.style.overflow = 'hidden';
      }

      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Close all other accordions if single-open mode
        if (item.closest('[data-accordion-single]')) {
          accordionItems.forEach(other => {
            if (other !== item) {
              other.classList.remove('active');
              const otherContent = other.querySelector('.faq-answer, .accordion-content, [data-accordion-content]');
              if (otherContent) {
                otherContent.style.maxHeight = '0px';
              }
            }
          });
        }

        // Toggle current accordion
        if (isOpen) {
          item.classList.remove('active');
          content.style.maxHeight = '0px';
        } else {
          item.classList.add('active');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });

      // Keyboard accessibility
      trigger.setAttribute('role', 'button');
      trigger.setAttribute('tabindex', '0');
      trigger.setAttribute('aria-expanded', 'false');
      content.setAttribute('aria-hidden', 'true');

      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          trigger.click();
        }
      });
    });
  }

  /**
   * Initialize Modals
   */
  function initModals() {
    // Modal triggers
    document.querySelectorAll('[data-modal-trigger]').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = trigger.dataset.modalTrigger;
        openModal(modalId);
      });
    });

    // Close buttons
    document.querySelectorAll('[data-modal-close]').forEach(closeBtn => {
      closeBtn.addEventListener('click', () => {
        const modal = closeBtn.closest('[data-modal]');
        if (modal) {
          closeModal(modal.dataset.modal);
        }
      });
    });

    // Close on backdrop click
    document.querySelectorAll('[data-modal]').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(modal.dataset.modal);
        }
      });
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const openModal = document.querySelector('[data-modal].open');
        if (openModal) {
          closeModal(openModal.dataset.modal);
        }
      }
    });
  }

  /**
   * Open modal by ID
   */
  function openModal(modalId) {
    const modal = document.querySelector(`[data-modal="${modalId}"]`);
    if (!modal) return;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Focus first focusable element
    const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable.length) {
      focusable[0].focus();
    }

    // Trap focus inside modal
    trapFocus(modal);
  }

  /**
   * Close modal by ID
   */
  function closeModal(modalId) {
    const modal = document.querySelector(`[data-modal="${modalId}"]`);
    if (!modal) return;

    modal.classList.remove('open');
    document.body.style.overflow = '';

    // Return focus to trigger
    const trigger = document.querySelector(`[data-modal-trigger="${modalId}"]`);
    if (trigger) {
      trigger.focus();
    }
  }

  /**
   * Trap focus inside element
   */
  function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function trap(e) {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }

      // Remove trap when modal closes
      if (!element.classList.contains('open')) {
        element.removeEventListener('keydown', trap);
      }
    });
  }

  /**
   * Initialize Tooltips
   */
  function initTooltips() {
    document.querySelectorAll('[data-tooltip]').forEach(element => {
      const text = element.dataset.tooltip;
      const position = element.dataset.tooltipPosition || 'top';

      // Create tooltip element
      const tooltip = document.createElement('div');
      tooltip.className = `tooltip tooltip-${position}`;
      tooltip.textContent = text;
      tooltip.style.cssText = `
        position: absolute;
        padding: 8px 12px;
        background: var(--color-bg-elevated);
        border: 1px solid var(--color-border-primary);
        border-radius: var(--radius-md);
        font-size: var(--text-sm);
        color: var(--color-text-primary);
        white-space: nowrap;
        z-index: var(--z-tooltip);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s ease;
      `;

      element.style.position = 'relative';
      element.appendChild(tooltip);

      element.addEventListener('mouseenter', () => {
        tooltip.style.opacity = '1';
      });

      element.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
      });
    });
  }

  /**
   * Initialize Copy Buttons
   */
  function initCopyButtons() {
    document.querySelectorAll('[data-copy]').forEach(button => {
      button.addEventListener('click', async () => {
        const target = button.dataset.copy;
        const textElement = document.querySelector(target);
        
        if (!textElement) return;

        const text = textElement.textContent || textElement.value;

        try {
          await navigator.clipboard.writeText(text);
          
          // Show success feedback
          const originalText = button.textContent;
          button.textContent = 'Copied!';
          button.classList.add('copied');
          
          setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
          }, 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      });
    });
  }

  /**
   * Initialize Simple Sliders/Carousels
   */
  function initSliders() {
    document.querySelectorAll('[data-slider]').forEach(slider => {
      const track = slider.querySelector('[data-slider-track]');
      const slides = slider.querySelectorAll('[data-slider-slide]');
      const prevBtn = slider.querySelector('[data-slider-prev]');
      const nextBtn = slider.querySelector('[data-slider-next]');
      const dots = slider.querySelector('[data-slider-dots]');

      if (!track || slides.length === 0) return;

      let currentIndex = 0;
      const slideCount = slides.length;
      const autoplay = slider.dataset.sliderAutoplay;
      let autoplayInterval = null;

      // Create dots
      if (dots) {
        slides.forEach((_, index) => {
          const dot = document.createElement('button');
          dot.className = 'slider-dot' + (index === 0 ? ' active' : '');
          dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
          dot.addEventListener('click', () => goToSlide(index));
          dots.appendChild(dot);
        });
      }

      // Navigation buttons
      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          goToSlide(currentIndex - 1);
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          goToSlide(currentIndex + 1);
        });
      }

      // Go to specific slide
      function goToSlide(index) {
        // Handle wrapping
        if (index < 0) index = slideCount - 1;
        if (index >= slideCount) index = 0;

        currentIndex = index;

        // Move track
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update dots
        if (dots) {
          dots.querySelectorAll('.slider-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
          });
        }

        // Update slides
        slides.forEach((slide, i) => {
          slide.classList.toggle('active', i === currentIndex);
          slide.setAttribute('aria-hidden', i !== currentIndex);
        });
      }

      // Autoplay
      if (autoplay) {
        const interval = parseInt(autoplay) || 5000;
        
        autoplayInterval = setInterval(() => {
          goToSlide(currentIndex + 1);
        }, interval);

        // Pause on hover
        slider.addEventListener('mouseenter', () => {
          clearInterval(autoplayInterval);
        });

        slider.addEventListener('mouseleave', () => {
          autoplayInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
          }, interval);
        });
      }

      // Touch support
      let touchStartX = 0;
      let touchEndX = 0;

      track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, { passive: true });

      function handleSwipe() {
        const threshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > threshold) {
          if (diff > 0) {
            goToSlide(currentIndex + 1);
          } else {
            goToSlide(currentIndex - 1);
          }
        }
      }

      // Keyboard navigation
      slider.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          goToSlide(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
          goToSlide(currentIndex + 1);
        }
      });

      // Initialize first slide
      goToSlide(0);
    });
  }

  /**
   * Show toast notification
   */
  function showToast(message, type = 'info', duration = 3000) {
    const container = getOrCreateToastContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type} toast-enter`;
    toast.innerHTML = `
      <span class="toast-message">${message}</span>
      <button class="toast-close" aria-label="Close">&times;</button>
    `;

    container.appendChild(toast);

    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
      removeToast(toast);
    });

    // Auto remove
    setTimeout(() => {
      removeToast(toast);
    }, duration);
  }

  function getOrCreateToastContainer() {
    let container = document.querySelector('.toast-container');
    
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: var(--z-toast);
        display: flex;
        flex-direction: column;
        gap: 10px;
      `;
      document.body.appendChild(container);
    }
    
    return container;
  }

  function removeToast(toast) {
    toast.classList.remove('toast-enter');
    toast.classList.add('toast-exit');
    
    setTimeout(() => {
      toast.remove();
    }, 300);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export for use in other modules
  window.CountWizeComponents = {
    init: init,
    openModal: openModal,
    closeModal: closeModal,
    showToast: showToast
  };

})();
