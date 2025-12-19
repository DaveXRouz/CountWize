# CountWize Design System

## Brand Identity

CountWize uses a **dark, modern, professional** design aesthetic with green accents that convey trust, technology, and financial security. The design employs glassmorphism effects, gradient text, and subtle animations.

---

## Color Palette

### Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Primary Green | `#34D399` | rgb(52, 211, 153) | CTAs, accents, glows |
| Accent Green | `#4ADE80` | rgb(74, 222, 128) | Secondary accents, gradients |
| Brand Green Light | `#a3dcad` | rgb(163, 220, 173) | Links, highlights, borders |
| Brand Green Medium | `#6b9071` | rgb(107, 144, 113) | Text accents |
| Brand Green Pale | `#aec3b0` | rgb(174, 195, 176) | Subtle highlights |
| Brand Green Cream | `#e3eed4` | rgb(227, 238, 212) | Heading gradients |

### Background Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Primary Dark | `#050505` | rgb(5, 5, 5) | Main backgrounds |
| Dark Black | `#090910` | rgb(9, 9, 16) | Section backgrounds |
| Dark Green-Black | `#0d2f27` | rgb(13, 47, 39) | Cards, overlays |
| Neutral Black 800 | `#121218` | rgb(18, 18, 24) | Footer background |
| Dark Olive | `#375534` | rgb(55, 85, 52) | Buttons, accents |

### Text Colors

| Name | Hex | Opacity | Usage |
|------|-----|---------|-------|
| White Primary | `#fcfcfc` | 100% | Headings, primary text |
| White Secondary | `#fffc` | 80% | Subheadings |
| Gray Text | `#b4b8c2` | 100% | Body text, descriptions |
| Muted Gray | `#61616b` | 100% | Secondary info |

### Utility Colors

| Name | Hex | Usage |
|------|-----|-------|
| Error Red | `#ff4d4f` | Error messages, validation |
| Error Background | `#e62231` | Error containers |
| Success Green | `#079c41` | Success states |
| Link Blue | `#0082f3` | Webflow default links |

### CSS Variables

```css
:root {
  /* Neutral Colors */
  --neutral--black-900: #090910;
  --neutral--black-800: #121218;
  --neutral--black-700: #272731;
  --neutral--white-0: #fcfcfc;
  --neutral--white-100: #fffc;
  --neutral--white-200: #b4b8c2;
  --neutral--white-300: #61616b;
  --neutral--gray-600: #45454f;

  /* Brand Colors */
  --stock-color: #0d2f27;
  --brand--brand-color-first: #0f2a1d;
  --brand--brand-color-second: #375534;
  --brand--brand-color-third: #6b9071;
  --brand--brand-color-4: #aec3b0;
  --brand--brand-color-5: #e3eed4;

  /* Animation Colors */
  --cw-primary: #34D399;
  --cw-primary-glow: rgba(52, 211, 153, 0.4);
  --cw-accent: #4ADE80;
  --cw-dark: #0D1117;
  --cw-glass: rgba(255, 255, 255, 0.05);
  --cw-border-glass: rgba(255, 255, 255, 0.1);
}
```

---

## Typography

### Font Families

| Font | Weights | Usage |
|------|---------|-------|
| **Be Vietnam Pro** | 400, 500, 600, 700 | Primary font for all text |
| **Poppins** | 300, 400, 500, 600, 700 | Secondary/accent font |

### Font Loading

```javascript
WebFont.load({
  google: {
    families: [
      "Be Vietnam Pro:regular,500,600,700",
      "Poppins:300,regular,500,600,700"
    ]
  }
});
```

### Heading Sizes

| Element | Size | Line Height | Weight |
|---------|------|-------------|--------|
| H1 | 3.875rem (62px) | 4.375rem (70px) | 600-700 |
| H2 | 2.625rem (42px) | 3.125rem (50px) | 600-700 |
| H3 | 2rem (32px) | 2.5rem (40px) | 600 |
| H4 | 1.75rem (28px) | 2.25rem (36px) | 600 |
| H5 | 1.5rem (24px) | 2rem (32px) | 600 |
| H6 | 1.125rem (18px) | 1.625rem (26px) | 600 |

### Body Text

| Type | Size | Line Height | Weight |
|------|------|-------------|--------|
| Regular | 1rem (16px) | 1.5rem (24px) | 400 |
| Large | 1.125rem (18px) | 1.7 | 400 |
| Small | 0.875rem (14px) | 1.25rem | 400-500 |

### Special Text Effects

**Gradient Text (Headings):**
```css
background-image: linear-gradient(180deg, #fcfcfc, #fffc);
-webkit-text-fill-color: transparent;
-webkit-background-clip: text;
background-clip: text;
```

**Brand Gradient Text:**
```css
background-image: linear-gradient(to bottom, #e3eed4, #e3eed4);
-webkit-text-stroke-color: #e3eed4;
```

---

## Spacing System

The design uses consistent spacing based on rem units:

| Size | Value | Usage |
|------|-------|-------|
| XS | 0.5rem (8px) | Inline spacing, icon gaps |
| SM | 0.75rem (12px) | Button padding, small gaps |
| MD | 1rem (16px) | Standard spacing |
| LG | 1.5rem (24px) | Section padding |
| XL | 2rem (32px) | Large section gaps |
| 2XL | 3rem (48px) | Major section breaks |
| 3XL | 4rem (64px) | Hero sections |

---

## Border Radius

| Size | Value | Usage |
|------|-------|-------|
| Small | 6px | Input fields, small elements |
| Medium | 12px | Cards, containers |
| Large | 20px | Buttons, large cards |
| Pill | 3.75rem (60px) | CTAs, rounded buttons |
| Circle | 50% | Avatar, icons |

---

## Shadows

### Standard Shadows

```css
/* Card shadow */
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);

/* Card hover shadow */
box-shadow: 0 20px 40px rgba(52, 211, 153, 0.1);

/* Button glow */
box-shadow: 0 0 20px 5px rgba(174, 195, 176, 0.21);

/* Green glow effect */
box-shadow: 0 4px 12px rgba(163, 220, 173, 0.3);

/* Focus ring */
box-shadow: 0 0 0 4px rgba(163, 220, 173, 0.2);
```

---

## Glassmorphism

The design uses glassmorphism for cards and overlays:

```css
/* Glass card effect */
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.1);

/* Dark glass */
background: rgba(5, 11, 12, 0.6);
backdrop-filter: blur(8px);
border: 1px solid rgba(187, 238, 196, 0.2);
```

---

## Buttons

### Primary Button

```css
.button {
  font-size: 1rem;
  font-weight: 600;
  line-height: 0.875rem;
  color: var(--brand--brand-color-first); /* Dark green text */
  background: var(--brand--brand-color-third); /* Light green bg */
  border-radius: 3.75rem;
  padding: 0.8125rem 1.5rem;
  transition: transform 0.4s;
}

.button:hover {
  transform: scale(1.1) translate(0, -5px);
  color: #fff;
}
```

### CTA Button

```css
.cta-button {
  background: var(--_redesign-style---black-green);
  color: var(--_redesign-style---white);
  border: 1px solid #000;
  border-radius: 50px;
  padding: 16px 115px;
  font-size: 17px;
  font-weight: 500;
}

.cta-button:hover {
  background: transparent;
  color: var(--_redesign-style---black-green);
}
```

### Button Variants

| Type | Background | Text Color | Border |
|------|------------|------------|--------|
| Primary | `#6b9071` | `#0f2a1d` | None |
| Secondary | `#090910` | White | None |
| CTA | `#050b0c` | White | 1px solid #000 |
| Contact | `#6b9071` | `#0f2a1d` | None + glow |
| Accept | `#375534` | White | None |
| Decline | `#0d2f27` | White | None |

---

## Form Elements

### Input Fields

```css
.input-new {
  background: transparent;
  border: 1px solid rgba(187, 238, 196, 0.3);
  border-radius: 20px;
  padding: 15px 20px;
  color: #fff;
  font-size: 1rem;
}

.input-new:focus {
  border-color: rgba(187, 238, 196, 0.6);
  box-shadow: 0 0 0 3px rgba(163, 220, 173, 0.2);
}

.input-new::placeholder {
  color: rgba(255, 255, 255, 0.5);
}
```

### Select Dropdowns

```css
select {
  background-color: #3B4743;
  color: #aec3b0;
  border: none;
  border-radius: 12px;
}
```

### Radio Buttons (Custom)

```css
.w-form-formradioinput--inputType-custom {
  border: 1px solid #a3dcad;
  border-radius: 50%;
  width: 20px;
  height: 20px;
}

.w-form-formradioinput--inputType-custom.w--redirected-checked {
  background-color: #a3dcad;
  border-color: #a3dcad;
}
```

---

## Icons

### Icon Sizes

| Size | Dimensions | Usage |
|------|------------|-------|
| XS | 16x16px | Inline text icons |
| SM | 20x20px | Form icons, buttons |
| MD | 24x24px | Navigation, actions |
| LG | 32x32px | Feature icons |
| XL | 48x48px | Hero icons |

### Icon Colors

- Default: `#a3dcad` (brand green)
- On hover: `#34D399` (primary green)
- Muted: `#61616b` (gray)
- Active: `#fff` (white)

---

## Responsive Breakpoints

| Name | Width | Description |
|------|-------|-------------|
| Mobile | < 767px | Single column, stacked |
| Tablet | 768px - 991px | Two columns, adapted |
| Desktop | 992px - 1439px | Full layout |
| Large | 1440px - 1919px | Expanded layout |
| XL | 1920px+ | Maximum width containers |

---

## Z-Index Scale

| Layer | Z-Index | Usage |
|-------|---------|-------|
| Base | 0 | Default content |
| Dropdown | 100 | Dropdown menus |
| Sticky | 200 | Sticky headers |
| Modal Backdrop | 900 | Modal overlays |
| Modal | 1000 | Modal content |
| Tooltip | 1100 | Tooltips |
| Cookie Banner | 2000 | Cookie consent |
| Skip Link | 10000 | Accessibility skip link |

---

## Scrollbar Styling

```css
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #050505;
}

::-webkit-scrollbar-thumb {
  background: #A3DCAD;
  border-radius: 4px;
}
```
