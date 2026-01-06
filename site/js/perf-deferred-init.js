/**
 * Performance Deferred Initialization
 * Delays non-critical third-party widget initialization to after page load
 */
(function() {
  'use strict';

  var INIT_ATTR = 'data-cw-perf-init';

  // Prevent double initialization
  if (document.documentElement.hasAttribute(INIT_ATTR)) {
    return;
  }
  document.documentElement.setAttribute(INIT_ATTR, 'true');

  function initDeferredWidgets() {
    // Initialize LiveChat after page load
    if (window.LiveChatWidget && typeof window.LiveChatWidget.init === 'function') {
      try {
        window.LiveChatWidget.init();
      } catch (e) {
        // Silently fail - chat is non-critical
      }
    }
  }

  // Use requestIdleCallback for best performance, fallback to load event
  if (document.readyState === 'complete') {
    // Page already loaded
    if (window.requestIdleCallback) {
      requestIdleCallback(initDeferredWidgets, { timeout: 3000 });
    } else {
      setTimeout(initDeferredWidgets, 100);
    }
  } else {
    window.addEventListener('load', function() {
      if (window.requestIdleCallback) {
        requestIdleCallback(initDeferredWidgets, { timeout: 3000 });
      } else {
        setTimeout(initDeferredWidgets, 100);
      }
    });
  }
})();
