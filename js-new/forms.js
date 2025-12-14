/**
 * CountWize Forms Module
 * Form validation, phone input, and submission handling
 */

(function() {
  'use strict';

  // Configuration
  const config = {
    phoneInputSelector: '#Phone, input[type="tel"], .phone-input',
    formSelector: '#contact-form, .contact-form, .w-form form',
    errorClass: 'error',
    successClass: 'success',
    telegramEndpoint: 'https://telegram-vercel-seven.vercel.app/api/telegram'
  };

  // Phone input instance
  let phoneInput = null;

  /**
   * Initialize all forms
   */
  function init() {
    initPhoneInput();
    initFormValidation();
    initFormSubmission();
    initCountrySelect();
  }

  /**
   * Initialize International Phone Input
   */
  function initPhoneInput() {
    const phoneInputEl = document.querySelector(config.phoneInputSelector);
    
    if (!phoneInputEl || typeof intlTelInput === 'undefined') return;

    // Get user's country from IP
    getUserCountry().then(countryCode => {
      phoneInput = intlTelInput(phoneInputEl, {
        initialCountry: countryCode || 'us',
        placeholderNumberType: 'FIXED_LINE',
        separateDialCode: true,
        preferredCountries: ['us', 'gb', 'ca', 'se', 'de'],
        utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.min.js'
      });

      // Store dial code in hidden field
      updateDialCode();
      phoneInputEl.addEventListener('countrychange', updateDialCode);
      phoneInputEl.addEventListener('input', updateDialCode);

      // Validation on blur
      phoneInputEl.addEventListener('blur', validatePhoneInput);

      // Only allow valid phone characters
      phoneInputEl.addEventListener('keypress', (e) => {
        const allowed = /[0-9\+\-\(\)\s]/;
        if (!allowed.test(e.key)) {
          e.preventDefault();
        }
      });
    });
  }

  /**
   * Get user's country from IP
   */
  async function getUserCountry() {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return data.country_code?.toLowerCase() || 'us';
    } catch (error) {
      console.warn('Could not detect country, defaulting to US');
      return 'us';
    }
  }

  /**
   * Update dial code hidden field
   */
  function updateDialCode() {
    if (!phoneInput) return;
    
    const dialCodeInput = document.querySelector('.dialCode, input[name="dialCode"]');
    if (dialCodeInput) {
      dialCodeInput.value = '+' + phoneInput.getSelectedCountryData().dialCode;
    }
  }

  /**
   * Validate phone input
   */
  function validatePhoneInput() {
    const phoneInputEl = document.querySelector(config.phoneInputSelector);
    const errorMsg = document.querySelector('#error-msg, .phone-error');
    
    if (!phoneInput || !phoneInputEl) return true;

    const errorMap = [
      'Invalid number',
      'Invalid country code',
      'Too short',
      'Too long',
      'Invalid number'
    ];

    // Reset validation state
    phoneInputEl.classList.remove(config.errorClass);
    if (errorMsg) {
      errorMsg.textContent = '';
      errorMsg.classList.add('hide');
    }

    // Validate if field has value
    if (phoneInputEl.value.trim() && !phoneInput.isValidNumber()) {
      phoneInputEl.classList.add(config.errorClass);
      
      if (errorMsg) {
        const errorCode = phoneInput.getValidationError();
        errorMsg.textContent = errorMap[errorCode] || 'Invalid number';
        errorMsg.classList.remove('hide');
      }
      
      return false;
    }

    return true;
  }

  /**
   * Initialize form validation
   */
  function initFormValidation() {
    const forms = document.querySelectorAll(config.formSelector);

    forms.forEach(form => {
      // Add novalidate to use custom validation
      form.setAttribute('novalidate', 'true');

      // Validate on input blur
      form.querySelectorAll('input, textarea, select').forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
          if (field.classList.contains(config.errorClass)) {
            validateField(field);
          }
        });
      });

      // Validate on submit
      form.addEventListener('submit', (e) => {
        if (!validateForm(form)) {
          e.preventDefault();
          e.stopImmediatePropagation();
        }
      });
    });
  }

  /**
   * Validate a single field
   */
  function validateField(field) {
    const errorEl = field.parentElement.querySelector('.form-error');
    
    // Reset state
    field.classList.remove(config.errorClass);
    if (errorEl) errorEl.textContent = '';

    // Required validation
    if (field.required && !field.value.trim()) {
      setFieldError(field, 'This field is required');
      return false;
    }

    // Email validation
    if (field.type === 'email' && field.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        setFieldError(field, 'Please enter a valid email address');
        return false;
      }
    }

    // Phone validation
    if (field.type === 'tel' && phoneInput) {
      return validatePhoneInput();
    }

    // Min length
    if (field.minLength > 0 && field.value.length < field.minLength) {
      setFieldError(field, `Minimum ${field.minLength} characters required`);
      return false;
    }

    return true;
  }

  /**
   * Set field error
   */
  function setFieldError(field, message) {
    field.classList.add(config.errorClass);
    
    let errorEl = field.parentElement.querySelector('.form-error');
    
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'form-error';
      field.parentElement.appendChild(errorEl);
    }
    
    errorEl.textContent = message;
  }

  /**
   * Validate entire form
   */
  function validateForm(form) {
    let isValid = true;
    
    form.querySelectorAll('input, textarea, select').forEach(field => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    // Additional phone validation
    if (phoneInput && !validatePhoneInput()) {
      isValid = false;
    }

    // Focus first error field
    if (!isValid) {
      const firstError = form.querySelector(`.${config.errorClass}`);
      if (firstError) {
        firstError.focus();
      }
    }

    return isValid;
  }

  /**
   * Initialize form submission
   */
  function initFormSubmission() {
    const forms = document.querySelectorAll(config.formSelector);

    forms.forEach(form => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate form
        if (!validateForm(form)) {
          return;
        }

        // Collect form data
        const formData = new FormData(form);
        const fields = Object.fromEntries(formData.entries());

        // Build message for Telegram
        const message = buildTelegramMessage(fields);

        // Handle file uploads if any
        const files = await collectFiles(formData);

        try {
          // Submit to Telegram
          const response = await fetch(config.telegramEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              message: message,
              files: files
            })
          });

          if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
          }

          // Show success message
          showFormSuccess(form);

        } catch (error) {
          console.error('Form submission error:', error);
          showFormError(form);
        }
      });
    });
  }

  /**
   * Build Telegram message from form fields
   */
  function buildTelegramMessage(fields) {
    // Get phone with dial code
    const dialCode = fields['dialCode'] || '';
    const phoneRaw = fields['Phone'] || '';
    const fullPhone = `${dialCode}${phoneRaw}`.replace(/\s+/g, '');

    // Get country flag
    const countryCode = getCountryFromPhone(fullPhone);
    const flag = countryCode ? countryCodeToFlag(countryCode) : '';

    // Fields to include in message
    const orderedFields = [
      { key: 'Full-Name', label: 'Name' },
      { key: 'Email', label: 'Email' },
      { key: 'Phone', label: 'Phone' },
      { key: 'Message-Subject', label: 'Subject' },
      { key: 'Country', label: 'Country' },
      { key: 'Town', label: 'City' },
      { key: 'Message', label: 'Message' }
    ];

    let message = `<b>📩 New Contact Form Submission ${flag}</b>\n\n`;

    for (const { key, label } of orderedFields) {
      if (!fields[key]) continue;
      
      let value = fields[key];
      
      // Use full phone number
      if (key === 'Phone') {
        value = fullPhone;
      }
      
      // Get text from select elements
      if (['Country', 'Town'].includes(key)) {
        const select = document.querySelector(`[name="${key}"]`);
        const selectedOption = select?.options?.[select.selectedIndex];
        value = selectedOption?.text || value;
      }

      message += `◾️ <b>${label}:</b> ${value}\n`;
    }

    return message;
  }

  /**
   * Get country code from phone number
   */
  function getCountryFromPhone(phone) {
    if (typeof libphonenumber === 'undefined') return null;
    
    try {
      const parsed = libphonenumber.parsePhoneNumber(phone);
      return parsed.country || null;
    } catch (e) {
      return null;
    }
  }

  /**
   * Convert country code to flag emoji
   */
  function countryCodeToFlag(code) {
    if (!code) return '';
    return [...code.toUpperCase()]
      .map(c => String.fromCodePoint(c.charCodeAt(0) + 127397))
      .join('');
  }

  /**
   * Collect files from form data
   */
  async function collectFiles(formData) {
    const files = [];
    
    for (const [key, value] of formData.entries()) {
      if (value instanceof File && value.size > 0) {
        const base64 = await toBase64(value);
        files.push({
          name: value.name,
          type: value.type,
          data: base64.split(',')[1]
        });
      }
    }
    
    return files;
  }

  /**
   * Convert file to base64
   */
  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /**
   * Show success message
   */
  function showFormSuccess(form) {
    form.style.display = 'none';
    
    const successEl = form.parentElement.querySelector('.w-form-done, .form-success');
    const errorEl = form.parentElement.querySelector('.w-form-fail, .form-error-message');
    
    if (successEl) successEl.style.display = 'block';
    if (errorEl) errorEl.style.display = 'none';
  }

  /**
   * Show error message
   */
  function showFormError(form) {
    const successEl = form.parentElement.querySelector('.w-form-done, .form-success');
    const errorEl = form.parentElement.querySelector('.w-form-fail, .form-error-message');
    
    if (successEl) successEl.style.display = 'none';
    if (errorEl) errorEl.style.display = 'block';
  }

  /**
   * Initialize country/city select
   */
  function initCountrySelect() {
    const countrySelect = document.querySelector('#country-input, [name="Country"]');
    const citySelect = document.querySelector('#town-input, [name="Town"]');

    if (!countrySelect) return;

    // Add default options
    addDefaultOption(countrySelect, 'Select country');
    if (citySelect) {
      addDefaultOption(citySelect, 'Select city');
      citySelect.disabled = true;
    }

    // Load countries
    loadCountries(countrySelect, citySelect);

    // Load cities on country change
    if (countrySelect && citySelect) {
      countrySelect.addEventListener('change', (e) => {
        loadCities(e.target.value, citySelect);
      });
    }
  }

  /**
   * Add default option to select
   */
  function addDefaultOption(select, text) {
    const option = document.createElement('option');
    option.className = 'optionContact';
    option.value = '';
    option.textContent = text;
    option.disabled = true;
    option.selected = true;
    select.appendChild(option);
  }

  /**
   * Load countries from API
   */
  async function loadCountries(countrySelect, citySelect) {
    try {
      const response = await fetch('https://countwiseapi.space/api/countries/');
      const countries = await response.json();
      
      countries.forEach(country => {
        const option = document.createElement('option');
        option.className = 'optionContact';
        option.value = country.id;
        option.textContent = country.name;
        countrySelect.appendChild(option);
      });
    } catch (error) {
      console.error('Error loading countries:', error);
    }
  }

  /**
   * Load cities for a country
   */
  async function loadCities(countryId, citySelect) {
    citySelect.innerHTML = '';
    addDefaultOption(citySelect, 'Select city');
    
    if (!countryId) {
      citySelect.disabled = true;
      return;
    }

    try {
      const response = await fetch(`https://countwiseapi.space/api/countries/${countryId}/cities/`);
      const cities = await response.json();
      
      cities.forEach(city => {
        const option = document.createElement('option');
        option.className = 'optionContact';
        option.value = city.id;
        option.textContent = city.name;
        citySelect.appendChild(option);
      });
      
      citySelect.disabled = false;
    } catch (error) {
      console.error('Error loading cities:', error);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export for use in other modules
  window.CountWizeForms = {
    init: init,
    validateForm: validateForm,
    validateField: validateField,
    validatePhoneInput: validatePhoneInput
  };

})();
