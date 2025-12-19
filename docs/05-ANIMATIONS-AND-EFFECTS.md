# CountWize Animations and Effects

This document details all animations, transitions, hover effects, and visual effects used throughout the website.

---

## CSS Animation Keyframes

### 1. Wave Animation (Hero Button)

**File:** `index.html` (inline)
**Purpose:** Pulsing opacity effect on hero button images

```css
@keyframes wave {
  0%   { opacity: 0.2; }
  33%  { opacity: 1; }
  66%  { opacity: 0.4; }
  100% { opacity: 0.2; }
}

.recovery-button-image {
  animation: wave 1.5s infinite ease-in-out;
}

/* Staggered delays for 3 images */
.recovery-button-image:nth-child(1) { animation-delay: 0s; }
.recovery-button-image:nth-child(2) { animation-delay: 0.4s; }
.recovery-button-image:nth-child(3) { animation-delay: 0.8s; }
```

### 2. Gradient Shift (CTA Button)

**File:** `index.html` (inline)
**Purpose:** Moving gradient background on buttons

```css
@keyframes gradientShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.hero-alternative-button {
  background: linear-gradient(90deg, #a3dcad, #d2ffda, #a3dcad);
  background-size: 200% 200%;
  animation: gradientShift 6s ease infinite;
}
```

### 3. Glow Effect (CTA Button)

**File:** `index.html` (inline)
**Purpose:** Pulsing glow and scale effect

```css
@keyframes glow {
  0% {
    box-shadow: 0 0 20px rgba(144, 238, 144, 0.5);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 40px rgba(144, 238, 144, 0.9);
    transform: scale(1.08);
  }
  100% {
    box-shadow: 0 0 20px rgba(144, 238, 144, 0.5);
    transform: scale(1);
  }
}

.hero-alternative-button {
  animation: glow 2s ease-in-out infinite;
}
```

### 4. Pulse Animation

**File:** `countwize-animations.css`
**Purpose:** Subtle pulsing glow on elements

```css
@keyframes cw-pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 var(--cw-primary-glow);
  }
  50% {
    box-shadow: 0 0 20px 10px transparent;
  }
}
```

### 5. Float Animation

**File:** `countwize-animations.css`
**Purpose:** Gentle vertical floating motion

```css
@keyframes cw-float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

._scroll-hint {
  animation: cw-float 2s ease-in-out infinite;
}
```

### 6. Breathe Animation

**File:** `countwize-animations.css`
**Purpose:** Breathing glow effect using drop-shadow

```css
@keyframes cw-breathe {
  0%, 100% {
    filter: drop-shadow(0 0 5px var(--cw-primary-glow));
  }
  50% {
    filter: drop-shadow(0 0 15px var(--cw-primary-glow));
  }
}
```

### 7. Reveal Up Animation

**File:** `countwize-animations.css`
**Purpose:** Scroll reveal with fade and slide

```css
@keyframes cw-reveal-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 8. Gradient Shift (CSS Variables)

**File:** `countwize-animations.css`
**Purpose:** Background gradient position animation

```css
@keyframes cw-gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
```

### 9. Shimmer Animation (Skeleton Loading)

**File:** `countwize-animations.css`
**Purpose:** Loading skeleton shimmer effect

```css
@keyframes cw-shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

._skeleton::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(52, 211, 153, 0.1),
    transparent
  );
  background-size: 200% 100%;
  animation: cw-shimmer 1.5s ease-in-out infinite;
}
```

### 10. Accent Line Animation

**File:** `countwize-animations.css`
**Purpose:** Line width animation with fade

```css
@keyframes cw-accent-line {
  0% {
    width: 0;
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    width: 100%;
    opacity: 1;
  }
}
```

### 11. Spin Animation (Loading)

**File:** `webflow.css`
**Purpose:** Loading spinner rotation

```css
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.w-loading-spinner {
  animation: spin 0.8s infinite linear;
}
```

---

## CSS Transitions

### Button Transitions

```css
/* Primary button */
.button {
  transition: transform 0.4s;
}

.button:hover {
  transform: scale(1.1) translate(0, -5px);
}

/* CTA button */
.cta-button {
  transition: background-color 0.2s, color 0.2s;
}

/* Navbar contact button */
.navbar-contact-button {
  transition: background-color 0.2s;
}

/* Submit button */
.submit-button-2 {
  transition: color 200ms ease;
}
```

### Card Transitions

```css
/* Media/Article cards */
._media-card,
._currency-card,
._article-card figure {
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              box-shadow 0.4s ease,
              border-color 0.4s ease;
}

/* Platform logo cards */
.supported-platform-logo-card {
  transition: all 0.3s ease;
}

/* Service cards */
.service-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Partnership cards */
._partnership-card {
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}
```

### Form Element Transitions

```css
/* Input focus */
._input input,
._input textarea {
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

/* Form field border */
.input-new {
  transition: border-color 0.3s ease;
}
```

### General Transitions

```css
/* All interactive elements */
._button,
[data-button] {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Section transitions */
section,
[class*="Hero"],
[class*="Section"] {
  transition: opacity 0.6s ease, transform 0.6s ease;
}

/* Menu overlay */
._menu[data-variant="overlay"] .menu-overlay {
  transition: opacity 0.4s ease, backdrop-filter 0.4s ease;
}
```

---

## Hover Effects

### Button Hover

```css
/* Scale and lift */
.button:hover {
  transform: scale(1.1) translate(0, -5px);
  color: #fff;
}

/* Lift only */
.hero-alternative-button:hover,
.navbar-contact-button:hover,
.pricing-card-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(163, 220, 173, 0.3);
}

/* Active press */
.hero-alternative-button:active,
.pricing-card-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(163, 220, 173, 0.2);
}
```

### Card Hover

```css
/* Media cards - lift and glow */
._media-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(52, 211, 153, 0.1);
  border-color: var(--cw-primary-glow);
}

/* Partnership cards - higher lift */
._partnership-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

/* Platform logo cards - lift and scale */
.supported-platform-logo-card:hover {
  transform: translateY(-4px) scale(1.05);
  border-color: rgba(163, 220, 173, 0.6);
  box-shadow: 0 8px 24px rgba(163, 220, 173, 0.2);
  background: rgba(5, 11, 12, 0.8);
}

/* Service cards */
.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(163, 220, 173, 0.15);
}
```

### Icon Hover

```css
/* Button icon slide */
._button:hover ._icon {
  transform: translateX(3px);
}

/* Circle button scale */
._circle-button:hover {
  transform: scale(1.1);
  box-shadow: 0 0 20px var(--cw-primary-glow);
}

/* Avatar glow */
._avatar:hover {
  box-shadow: 0 0 15px var(--cw-primary-glow);
}

/* Wordmark glow */
._wordmark:hover svg {
  filter: drop-shadow(0 0 8px var(--cw-primary-glow));
}
```

### Menu Link Underline Animation

```css
._menu-link::after,
._menu-button::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, var(--cw-primary), var(--cw-accent));
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

._menu-link:hover::after,
._menu-button:hover::after {
  transform: translateX(0);
}
```

---

## Button Glow Effect

```css
/* Glow pseudo-element */
._button::before,
[data-button]::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    var(--cw-primary),
    var(--cw-accent)
  );
  border-radius: inherit;
  filter: blur(12px);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: -1;
}

._button:hover::before,
[data-button]:hover::before {
  opacity: 0.5;
}
```

---

## Focus States

```css
/* Basic focus */
a:focus,
button:focus,
input:focus,
textarea:focus,
select:focus {
  outline: 2px solid rgba(163, 220, 173, 0.6) !important;
  outline-offset: 2px !important;
}

/* Enhanced focus-visible */
a:focus-visible,
button:focus-visible,
input:focus-visible,
textarea:focus-visible {
  outline: 2px solid rgba(163, 220, 173, 0.8) !important;
  outline-offset: 2px !important;
  box-shadow: 0 0 0 4px rgba(163, 220, 173, 0.2) !important;
}

/* Input focus glow */
._input input:focus,
._input textarea:focus {
  box-shadow: 0 0 0 3px var(--cw-primary-glow);
  border-color: var(--cw-primary);
}
```

---

## Glassmorphism Effects

```css
/* Standard glass card */
._media-card,
._currency-card {
  background: var(--cw-glass); /* rgba(255, 255, 255, 0.05) */
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--cw-border-glass); /* rgba(255, 255, 255, 0.1) */
}

/* Platform logo glass */
.supported-platform-logo-card {
  background: rgba(5, 11, 12, 0.6);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(187, 238, 196, 0.2);
}

/* Dark mode glass adjustment */
@media (prefers-color-scheme: dark) {
  :root {
    --cw-glass: rgba(0, 0, 0, 0.3);
    --cw-border-glass: rgba(255, 255, 255, 0.15);
  }
}
```

---

## JavaScript Animations

### Bezier Curve Particle Animation (Hero Button)

```javascript
const button = document.getElementById("start-recovery-button");
const targetButton = document.getElementById("start-recovery-finish");
const images = ["animation-image-1.webp", "animation-image-2.webp", "animation-image-3.webp"];

button.addEventListener("click", (e) => {
  e.preventDefault();

  const startRect = button.getBoundingClientRect();
  const startX = startRect.left + startRect.width / 2;
  const startY = startRect.top + startRect.height / 2;

  const endRect = targetButton.getBoundingClientRect();
  const endX = endRect.left + endRect.width / 2;
  const endY = endRect.top + endRect.height / 2;

  // Control point for curve
  const cpX = (startX + endX) / 2;
  const cpY = Math.min(startY, endY) - 150;

  images.forEach((src, i) => {
    setTimeout(() => {
      const img = document.createElement("img");
      img.src = "images/" + src;
      img.style.cssText = `
        position: fixed;
        width: 60px;
        z-index: 9999;
        pointer-events: none;
      `;
      document.body.appendChild(img);

      animateBezier(img, startX, startY, cpX, cpY, endX, endY, () => {
        img.remove();
        if (i === images.length - 1) {
          triggerGradientFlash(targetButton);
        }
      });
    }, i * 200);
  });
});

function animateBezier(elem, x0, y0, cx, cy, x1, y1, callback) {
  const duration = 1500;
  const startTime = performance.now();

  function frame(now) {
    const t = Math.min((now - startTime) / duration, 1);

    // Quadratic Bezier interpolation
    const x = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * cx + t * t * x1;
    const y = (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * cy + t * t * y1;

    elem.style.left = `${x - 30}px`;
    elem.style.top = `${y - 30}px`;

    if (t < 1) {
      requestAnimationFrame(frame);
    } else {
      callback();
    }
  }

  requestAnimationFrame(frame);
}
```

### Gradient Flash Effect

```javascript
function triggerGradientFlash(targetElement, callback) {
  const rect = targetElement.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const circle = document.createElement("div");
  circle.style.cssText = `
    position: fixed;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    left: ${centerX}px;
    top: ${centerY}px;
    transform: translate(-50%, -50%) scale(0);
    background: linear-gradient(90deg, #a3dcad 0%, #d2ffda 50%, #a3dcad 100%);
    opacity: 0;
    z-index: 10000;
    pointer-events: none;
    transition: transform 0.9s ease-in-out, opacity 0.4s ease;
  `;

  document.body.appendChild(circle);

  requestAnimationFrame(() => {
    circle.style.transform = "translate(-50%, -50%) scale(60)";
    circle.style.opacity = "1";
  });

  setTimeout(() => {
    circle.style.opacity = "0";
    setTimeout(() => {
      circle.remove();
      if (callback) callback();
    }, 400);
  }, 700);
}
```

### Step Transition Animation

```javascript
function showStep(index) {
  const currentStep = steps[currentStepIndex];
  const nextStep = steps[index];

  // Exit animation
  currentStep.style.transition = "opacity 0.4s ease, transform 0.4s ease";
  currentStep.style.opacity = "0";
  currentStep.style.transform = "translateY(20px)";

  setTimeout(() => {
    currentStep.style.display = "none";

    // Entry animation
    nextStep.style.display = "block";
    nextStep.style.opacity = "0";
    nextStep.style.transform = "translateY(40px)";

    requestAnimationFrame(() => {
      nextStep.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      nextStep.style.opacity = "1";
      nextStep.style.transform = "translateY(0)";
    });

    currentStepIndex = index;
  }, 400);
}
```

---

## Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Webflow Interaction Triggers

Elements with `data-w-id` attributes are controlled by Webflow's interaction engine. Common patterns:

### Initial Hidden State

```html
<div data-w-id="abc123" style="opacity:0">
  <!-- Element reveals on scroll or load -->
</div>
```

### Scroll-Triggered Reveal

Elements in `<style>` tags:

```css
@media (min-width:992px) {
  html.w-mod-js:not(.w-mod-ix) [data-w-id="element-id"] {
    opacity: 0;
  }
}
```

### Slider Configuration

```html
<div
  data-delay="4000"
  data-animation="slide"
  data-autoplay="false"
  data-easing="ease"
  data-duration="500"
  data-infinite="false"
  class="w-slider">
</div>
```

---

## Performance Optimizations

### GPU Acceleration

```css
/* Force GPU layer */
img {
  will-change: transform;
}
```

### Smooth Scrolling

```css
html {
  scroll-behavior: smooth !important;
}
```

### Font Smoothing

```css
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```
