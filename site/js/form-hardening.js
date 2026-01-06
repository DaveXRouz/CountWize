/**
 * Form Hardening Module - Phase 4
 * Provides: double-submit protection, loading states, timeout handling, PII-safe errors
 *
 * Usage: Include this script before form submission handlers
 */

(function(window) {
  'use strict';

  const SUBMIT_TIMEOUT_MS = 30000; // 30 second timeout
  const LOADING_CLASS = 'cw-form-loading';
  const SUBMITTING_ATTR = 'data-cw-submitting';

  /**
   * Form submission guard - prevents double-submit
   * @param {HTMLFormElement} form
   * @returns {boolean} true if submission allowed, false if blocked
   */
  function canSubmit(form) {
    if (form.hasAttribute(SUBMITTING_ATTR)) {
      return false;
    }
    return true;
  }

  /**
   * Mark form as submitting (lock)
   * @param {HTMLFormElement} form
   * @param {HTMLButtonElement|HTMLInputElement} submitBtn
   */
  function lockForm(form, submitBtn) {
    form.setAttribute(SUBMITTING_ATTR, 'true');
    form.classList.add(LOADING_CLASS);

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.dataset.cwOriginalText = submitBtn.textContent || submitBtn.value;
      if (submitBtn.tagName === 'BUTTON') {
        submitBtn.textContent = 'Submitting...';
      } else if (submitBtn.tagName === 'INPUT') {
        submitBtn.value = 'Submitting...';
      }
    }
  }

  /**
   * Unlock form after submission completes
   * @param {HTMLFormElement} form
   * @param {HTMLButtonElement|HTMLInputElement} submitBtn
   */
  function unlockForm(form, submitBtn) {
    form.removeAttribute(SUBMITTING_ATTR);
    form.classList.remove(LOADING_CLASS);

    if (submitBtn && submitBtn.dataset.cwOriginalText) {
      if (submitBtn.tagName === 'BUTTON') {
        submitBtn.textContent = submitBtn.dataset.cwOriginalText;
      } else if (submitBtn.tagName === 'INPUT') {
        submitBtn.value = submitBtn.dataset.cwOriginalText;
      }
      submitBtn.disabled = false;
      delete submitBtn.dataset.cwOriginalText;
    }
  }

  /**
   * Fetch with timeout wrapper
   * @param {string} url
   * @param {RequestInit} options
   * @param {number} timeoutMs
   * @returns {Promise<Response>}
   */
  function fetchWithTimeout(url, options, timeoutMs = SUBMIT_TIMEOUT_MS) {
    return new Promise((resolve, reject) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
        reject(new Error('Request timeout'));
      }, timeoutMs);

      fetch(url, { ...options, signal: controller.signal })
        .then(response => {
          clearTimeout(timeoutId);
          resolve(response);
        })
        .catch(err => {
          clearTimeout(timeoutId);
          reject(err);
        });
    });
  }

  /**
   * PII-safe error logging - logs error type without sensitive data
   * @param {string} formId - Form identifier for logging
   * @param {Error} error - The error object
   */
  function logFormError(formId, error) {
    // Log only error type/name, not full message which may contain PII
    const safeMessage = error.name === 'AbortError'
      ? 'Request timeout'
      : error.name || 'Submission error';
    console.error('[Form ' + formId + '] ' + safeMessage);
  }

  /**
   * Show form success state
   * @param {HTMLFormElement} form
   */
  function showSuccess(form) {
    form.style.display = 'none';
    const container = form.parentElement;
    const success = container.querySelector('.w-form-done');
    const error = container.querySelector('.w-form-fail');
    if (success) success.style.display = 'block';
    if (error) error.style.display = 'none';
  }

  /**
   * Show form error state
   * @param {HTMLFormElement} form
   */
  function showError(form) {
    const container = form.parentElement;
    const success = container.querySelector('.w-form-done');
    const error = container.querySelector('.w-form-fail');
    if (success) success.style.display = 'none';
    if (error) error.style.display = 'block';
  }

  /**
   * Basic email validation
   * @param {string} email
   * @returns {boolean}
   */
  function isValidEmail(email) {
    if (!email || typeof email !== 'string') return false;
    // Basic email regex - not exhaustive but catches obvious errors
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }

  /**
   * Basic phone validation - checks minimum length after stripping non-digits
   * @param {string} phone
   * @param {string} dialCode
   * @returns {boolean}
   */
  function isValidPhone(phone, dialCode) {
    const fullPhone = ((dialCode || '') + (phone || '')).replace(/\D/g, '');
    // Minimum 7 digits for a valid phone number
    return fullPhone.length >= 7;
  }

  /**
   * Validate required fields before submission
   * @param {HTMLFormElement} form
   * @returns {{valid: boolean, errors: string[]}}
   */
  function validateRequired(form) {
    const errors = [];
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
      const value = field.value ? field.value.trim() : '';
      if (!value) {
        const label = field.getAttribute('aria-label') ||
                      field.getAttribute('placeholder') ||
                      field.name || 'Field';
        errors.push(label + ' is required');
      }
    });

    return { valid: errors.length === 0, errors };
  }

  /**
   * Validate email field before submission (AUDIT FIX PH4-001)
   * Blocks fetch if email is empty or invalid format
   * @param {HTMLFormElement} form
   * @param {HTMLButtonElement|HTMLInputElement} submitBtn - for unlocking on failure
   * @returns {boolean} true if valid or no email field, false if invalid (blocks submission)
   */
  function validateEmailField(form, submitBtn) {
    const emailInput = form.querySelector('input[type="email"]');

    // No email field = nothing to validate, allow submission
    if (!emailInput) {
      return true;
    }

    const email = (emailInput.value || '').trim();

    // Check if empty or invalid format
    if (!email || !isValidEmail(email)) {
      // Show error UI
      showError(form);
      // Unlock form for retry
      unlockForm(form, submitBtn);
      // Focus the email field for user convenience
      try { emailInput.focus(); } catch (e) { /* ignore focus errors */ }
      return false;
    }

    return true;
  }

  // Expose API
  window.CWFormHardening = {
    canSubmit: canSubmit,
    lockForm: lockForm,
    unlockForm: unlockForm,
    fetchWithTimeout: fetchWithTimeout,
    logFormError: logFormError,
    showSuccess: showSuccess,
    showError: showError,
    isValidEmail: isValidEmail,
    isValidPhone: isValidPhone,
    validateRequired: validateRequired,
    validateEmailField: validateEmailField,
    SUBMIT_TIMEOUT_MS: SUBMIT_TIMEOUT_MS
  };

})(window);
