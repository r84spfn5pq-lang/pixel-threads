# monopo.vn — Complete Site Reference

> **"Tokyo-born digitally-driven creative studio."**
> Creative direction · Brand experiences · Motion design · CGI · Film production
> Globally-cultivated. Japan-born. Vietnam-based.

---

## Table of Contents

1. [Studio Overview](#1-studio-overview)
2. [Awards & Recognition](#2-awards--recognition)
3. [Tech Stack](#3-tech-stack)
4. [Design System — Colors](#4-design-system--colors)
5. [Design System — Typography](#5-design-system--typography)
6. [Design System — Spacing & Layout](#6-design-system--spacing--layout)
7. [Design System — Shape & Elevation](#7-design-system--shape--elevation)
8. [Components](#8-components)
9. [Page Sections & Layout Architecture](#9-page-sections--layout-architecture)
10. [Animation & Interaction System](#10-animation--interaction-system)
11. [Design Rules (Do / Don't)](#11-design-rules-do--dont)
12. [Projects & Clients](#12-projects--clients)
13. [Team & Credits](#13-team--credits)
14. [Global Group Context](#14-global-group-context)
15. [Rebuild Cheat Sheet](#15-rebuild-cheat-sheet)

---

## 1. Studio Overview

| Field | Value |
|-------|-------|
| Studio | monopo saigon |
| URL | https://monopo.vn/ |
| Founded | 2021 |
| Origin | Tokyo, Japan |
| Based | Ho Chi Minh City (Saigon), Vietnam |
| Type | Digitally-driven creative studio |
| Disciplines | Creative direction, brand experiences, motion design, CGI, film production |
| Group | Part of global monopo network (Tokyo, London, New York, Paris, Saigon) |
| Tagline | "Globally-cultivated. Japan-born, Vietnam-based." |
| Sub-tagline | "Born in Asia, raised by the world, blurring boundaries of difference to create design that stands the test of time." |

---

## 2. Awards & Recognition

| Award | Date | Score |
|-------|------|-------|
| FWA — Favourite Website Award (FOTD) | January 19, 2022 | — |
| Awwwards — Site of the Day (SOTD) | February 1, 2022 | 7.66 / 10 |
| CSS Design Awards — Website of the Day | February 20, 2022 | 8.01 / 10 |

### Awwwards Score Breakdown

| Category | Score | Weight |
|----------|-------|--------|
| Design | 7.90 | 40% |
| Usability | 7.39 | 30% |
| Creativity | 7.71 | 20% |
| Content | 7.40 | 10% |

**Dev Award: 7.81 / 10**

| Dev Metric | Score |
|------------|-------|
| WPO (Performance) | 8.00 |
| Responsive Design | 7.60 |
| Semantics / SEO | 7.40 |
| Markup / Meta-data | 7.80 |
| **Animations / Transitions** | **8.80** |
| Accessibility | 7.20 |

**CSS Design Awards (19-judge panel)**

| Category | Score |
|----------|-------|
| UI Design | 8.11 / 10 |
| UX Design | 7.98 / 10 |
| Innovation | 7.92 / 10 |

> Animations and Transitions scored highest of any metric (8.80/10) — the clearest signal about what the site does best.

**Awwwards Community:** Pro/Chief users rated it 8.37 / 10 overall.

**Credits on awards:**
- monopo (studio) — 4 FWAs
- Tran Minh Villageois — 1 FWA
- Ibrahim Menzel — 1 FWA

---

## 3. Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | **Nuxt.js** (Vue 3 + SSR/SSG) |
| Language | **TypeScript** |
| Web server | **Nginx** |
| Runtime | **Node.js** |
| Animation | **GSAP** (GreenSock Animation Platform) |
| 3D / WebGL | **WebGL** (via Three.js or custom shaders) |
| Lottie | **Lottie** (JSON-based vector animations) |
| Carousel | **Swiper.js** |
| Meta | Open Graph tags |
| Possible | Angular (referenced in some trackers — may be a third-party script) |

### How the stack fits together

```
Nuxt.js (Vue 3)
  └── TypeScript components
       ├── GSAP ScrollTrigger  → scroll-linked animation timeline
       ├── GSAP core           → entrance/exit/page transition tweens
       ├── WebGL canvas        → hero 3D organic renders
       ├── Lottie              → lightweight vector micro-animations
       └── Swiper.js           → work gallery carousel
Nginx serves the built output
Node.js handles SSR / API routes if any
```

### Why this stack matters for recreation

- Nuxt.js gives SSR SEO + Vue 3 Composition API
- GSAP ScrollTrigger drives virtually all scroll-linked motion
- WebGL canvas is layered *behind* HTML content in the hero
- Swiper is standard for the work portfolio grid/slider
- Lottie handles any icon or loader animations without heavy video files

---

## 4. Design System — Colors

The system is **fundamentally monochrome**. Color appears only in 3D renders and brand films.

### Core Palette

| Name | Hex | Role |
|------|-----|------|
| Paper White | `#ffffff` | Primary canvas, card surfaces, text on dark frames |
| Ink Black | `#000000` | Primary text, dark surface backgrounds, icon strokes |
| Carbon | `#181818` | Footer, subtle borders, icon fills, secondary darks |
| Graphite | `#636363` | Utility button fills (cookie accept, dismiss buttons) |
| Ash | `#6d6d6d` | Muted body text, hairline borders, secondary metadata |
| Pewter | `#808080` | Mid-neutral utility backgrounds, dividers |
| Smoke | `#9a9a9a` | De-emphasised cards, placeholders, disabled states |

### Accent / Imagery Colors

| Name | Value | Role |
|------|-------|------|
| Mercury Flow | `linear-gradient(90deg, rgb(160,224,171), rgb(255,172,46) 50%, rgb(165,45,37))` | Hero 3D renders, brand film overlays only |
| Teal | `#49c5b6` | Accent (used sparingly, possibly in work thumbnails) |
| Gold | `#ECD06F` | Accent (used sparingly, work thumbnails or motion) |

### Color Logic

```
White sections  = editorial / informational / breathing room
Black sections  = immersive / cinematic / 3D showcase
Color           = reserved exclusively for imagery and renders — never UI chrome
```

The visual rhythm of the page is built by **alternating between** `#ffffff` editorial sections and `#000000` / `#181818` immersive frames. This creates the "page beat."

---

## 5. Design System — Typography

### Font Families

| Family | Weights | Role |
|--------|---------|------|
| **Roobert** | 300, 400, 600 | Sole display and UI typeface for every role |
| Raleway | 400 | Editorial subheads / pull-quotes only |
| system-ui | 400 | Cookie banners, legal micro-copy only |

**Fallback stack:** `Inter`, `DM Sans`, `Suisse Int'l`

Roobert is a custom geometric sans-serif. It runs from **9px micro-labels to 225px hero statements** — the extreme range is a deliberate design choice.

### Type Scale

| Role | Size | Weight | Line Height |
|------|------|--------|-------------|
| hero | 225px | 300 (Light) | 0.76 |
| display | 94px | 400 (Regular) | 1.10 |
| heading-lg | 78px | 300 (Light) | 1.10 |
| heading | 54px | 400 (Regular) | 1.21 |
| heading-sm | 45px | 400 (Regular) | 1.22 |
| subheading | 30px | 400 (Regular) | 1.25 |
| body-lg | 18px | 400 (Regular) | 1.36 |
| body | 16px | 400 (Regular) | 1.39 |
| micro / cookie | 9–12px | 400 (Regular) | 1.15–1.32 |

### Typography Rules

- Display text always uses **weight 300** — never bold
- Hero line-height **0.70–0.76** lets massive type stack tightly without losing density
- Body text **minimum 18px**, line-height **1.36–1.58** for readability at information density
- Raleway (`54px`) used only for editorial pull-quotes, nowhere else
- `system-ui` used only for legal/cookie text — never for creative content
- Text case: menu items UPPERCASE, headings mixed case

---

## 6. Design System — Spacing & Layout

### Base Unit

```
4px base grid — "spacious" density setting
```

### Spacing Tokens

| Token | Value |
|-------|-------|
| `--spacing-8` | 8px |
| `--spacing-12` | 12px |
| `--spacing-28` | 28px |
| `--spacing-40` | 40px |
| `--spacing-48` | 48px |
| `--spacing-64` | 64px |
| `--spacing-68` | 68px |
| `--spacing-152` | 152px |

### Layout Dimensions

| Property | Value |
|----------|-------|
| Max-width (content) | 1440px |
| Section vertical gap | 80–120px |
| Card inner padding | 32–40px |
| Element gap (inline) | 14–24px |

### Grid

- Centered layout within 1440px container
- Full-bleed sections break out of the container to edge-to-edge (hero, dark frames)
- No fixed column grid enforced everywhere — editorial sections use wide type blocks, work uses card grid

---

## 7. Design System — Shape & Elevation

### Border Radius

| Element | Radius |
|---------|--------|
| Buttons | 75px (pill) |
| Badges / Tags | 75px (pill) |
| Cards | 0px (sharp) |
| Inputs | 0px (sharp) |
| All other elements | 0px |

> **Rule:** Only two radius values exist in the entire system — **75px** (buttons/tags) and **0px** (everything else). No in-between.

### Elevation / Shadows

```
The system deliberately avoids ALL box-shadows and drop-shadows.
```

Depth comes entirely from **tonal contrast** — flat white surface against flat black surface. No blur, glow, or elevation layers exist in the UI.

---

## 8. Components

### Pill Button

```css
border-radius: 75px;
padding: 1px 6px;
background: #636363;      /* utility */  OR  #ffffff;  /* primary */
color: inverted;
font: 11–12px Roobert 400;
border: none;
box-shadow: none;
```

Two variants: **Utility** (`#636363` bg, white text) and **Primary** (`#ffffff` bg, black text).

### Ghost Navigation Link

```css
font: 11–12px Roobert 400;
text-transform: uppercase;   /* menu items */
color: #ffffff;              /* on dark */  OR  #181818;  /* on light */
background: none;
border: none;
gap: 15px between items;
```

Text-only links — no underline, no border, no background.

### Hero Centered Statement

```css
font-size: 225px;
font-weight: 300;
font-family: Roobert;
line-height: 0.76;
color: #ffffff;
text-align: center;
position: centered both axes over full-bleed dark imagery;
```

The headline that defines the hero section. Sits over WebGL/3D background imagery.

### Scroll Indicator

```
Text: "SCROLL TO EXPLORE"
Font: 9px system-ui
Color: #ffffff
Position: bottom-left, absolute
Style: circular text path (SVG text on path or CSS rotation)
```

Circular rotating text label in the bottom-left of the hero viewport.

### Cookie Banner

```
Background: #ffffff
Body text: 12px Roobert 400, color #181818
"Accept" button: Pill (#636363 background)
Dismiss: 'X' icon
```

### Dark Immersive Frame

```css
background: #000000 or #181818;
min-height: 100vh;           /* full viewport */
/* 3D renders / organic imagery */
/* white overlay text */
/* no card containers inside */
```

Full-viewport dark sections that house 3D WebGL renders or cinematic film content. All text inside is white.

### Editorial Section

```css
background: #ffffff;
padding: 80–120px 0;
max-width: 1440px;
margin: 0 auto;
/* headlines: 78–94px Roobert 300 */
/* body: 18px Roobert 400 */
```

White content sections between dark frames — used for about copy, service listings, and descriptive text.

### Work Gallery

- Swiper.js powered slider / grid
- Project cards: sharp corners (0px radius), dark thumbnail images
- Category tags: pill badges
- Hover: likely overlay reveal with project name and category

### Work Detail Page

- Full project case study view
- Client name, project description, services used, credits, year
- Large video/image showcase

---

## 9. Page Sections & Layout Architecture

The site is a **single-page application** (Nuxt.js) with client-side routing to project detail pages.

```
┌─────────────────────────────────────────────────────┐
│  LOADING SCREEN                                      │
│  "Loading..."  (Lottie or CSS animation)             │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  NAVIGATION (fixed)                                  │
│  Left: monopo logo / wordmark                        │
│  Right: ghost links — WORK · ABOUT · CONTACT         │
│  Language toggle (VI / EN)                           │
│  Color: #ffffff on dark / #181818 on light           │
│  Font: 11–12px Roobert 400 UPPERCASE                 │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  HERO SECTION  (Dark Immersive Frame)                │
│  Background: #000000 / #181818                       │
│  Content: WebGL 3D organic render / cinematic video  │
│  Text: 225px Roobert 300 white, centered             │
│  Sub-text: studio description / tagline              │
│  Bottom-left: "SCROLL TO EXPLORE" circular indicator │
│  min-height: 100vh                                   │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  EDITORIAL SECTION 1  (White)                        │
│  Studio philosophy / positioning statement           │
│  Large Roobert 78–94px headlines                     │
│  18px body copy                                      │
│  Generous 80–120px vertical padding                  │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  WORK SECTION  (Mixed / Dark)                        │
│  "WORK" label                                        │
│  Project grid / Swiper carousel                      │
│  Each card: thumbnail + client + category tags       │
│  Transitions: scroll-triggered reveals (GSAP)        │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  DARK IMMERSIVE FRAME 2                              │
│  3D render / brand film showcase                     │
│  Services / capabilities list in white type          │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  ABOUT / TEAM SECTION  (Dark or White)               │
│  Team photography (video element)                    │
│  Studio story — "Born in Asia, raised by the world"  │
│  Headcount / studio info                             │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  EDITORIAL SECTION 2  (White)                        │
│  Services listed: Creative Direction, Brand          │
│  Experiences, Motion Design, CGI, Film Production    │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  CONTACT / FOOTER  (Carbon #181818)                  │
│  Email / contact CTA                                 │
│  Social links: Instagram, LinkedIn, etc.             │
│  Copyright line                                      │
│  Cookie banner trigger                               │
└─────────────────────────────────────────────────────┘
```

---

## 10. Animation & Interaction System

The site scored **8.80 / 10** for Animations & Transitions on Awwwards — the standout metric.

### Loading Sequence

1. Site loads showing `"Loading..."` screen
2. Lottie or CSS animation plays during Nuxt hydration
3. Transition to hero (likely clip-path or opacity + scale reveal)

### Scroll-Triggered Animations (GSAP ScrollTrigger)

- Headlines enter from below or fade in as viewport hits them
- Dark immersive sections use parallax — background moves at different rate than foreground text
- Work cards stagger-reveal on scroll (staggered `gsap.from()` with `scrub` or `trigger`)
- Section transitions may use `pin` to hold a section while child elements animate

### Page Transitions (Nuxt transitions)

- Entering a project detail page: likely full-page overlay wipe or fade
- Returning to home: reverse animation
- Implemented via Nuxt's `<transition>` component + GSAP hooks (`onEnter`, `onLeave`)

### Hero 3D / WebGL

- WebGL canvas behind HTML content
- Organic 3D forms (blobs, fluid shapes, or abstract geometry)
- May use Three.js with custom GLSL shaders
- Mercury Flow gradient (`rgb(160,224,171)` → `rgb(255,172,46)` → `rgb(165,45,37)`) applied to renders
- Animation likely continuous (idle loop) + scroll-reactive

### Intro Entrance

- Text and UI elements fade/slide in after loading screen
- Hero text: likely large-scale clip-path or y-transform entrance
- Navigation items: stagger fade in from top

### Swiper (Work Gallery)

- Horizontal or grid layout
- Drag / swipe gesture support
- Keyboard navigation
- Possibly custom arrows styled to match the design system (no default Swiper chrome)

### Lottie

- Used for lightweight SVG-based micro-animations
- Possibly the loading animation, scroll indicator, or cursor effects
- JSON format loaded via `vue3-lottie` or `blottie` Nuxt module

### Cursor

- Likely a custom cursor (common in creative agency sites at this tier)
- Possible: enlarged dot that changes on hover over interactive elements

---

## 11. Design Rules (Do / Don't)

### DO

- Use **Roobert weight 300** for all display text (headlines)
- Apply **75px radius** exclusively to buttons and tags
- Alternate **white editorial** and **black immersive** sections for page rhythm
- Set display text **line-height 0.70–0.76** (tight stacking)
- Reserve **color** for hero imagery only — never for UI chrome
- Use **`#636363`** only for utility actions (cookie accept, dismiss)
- Maintain **18px minimum** body text with **1.36–1.58** line-height
- Keep **section gap 80–120px** vertical
- Center layout within **1440px max-width**
- Let **tonal contrast** (flat white vs. flat black) create all depth

### DON'T

- Introduce chromatic buttons or accent colors in UI
- Use border-radius values other than **75px or 0px**
- Apply **shadows, glows, or elevation** to any element
- Use Roobert **weight 600** for headlines (only for emphasis spans)
- Constrain hero text **below 94px**
- Fill the full viewport with white-on-white (always break with a dark frame)
- Color borders or status indicators
- Use more than 2 font families for creative content (Roobert + Raleway)

---

## 12. Projects & Clients

### Known Projects

| Project | Client | Disciplines |
|---------|--------|-------------|
| SKYLER Digital KOL | Garena FreeFire | Creative direction, character design, CGI |

**SKYLER Project Notes:** The challenge was making the in-game character SKYLER appear as real as the human version — Vietnamese pop star Sơn Tùng MTP — replicating facial expressions, gestures, and performance style while maintaining the duality of the character. CGI-heavy, motion design lead.

### Confirmed Clients (Saigon + Group)

**monopo Saigon clients:**
- Garena FreeFire
- Maserati
- Louis Vuitton
- Nike China
- IKEA
- MOAG
- Oppo
- Musiversal

**Global monopo group clients (cross-office):**
- Nike / Nike SB
- Louis Vuitton
- Adidas
- Cartier
- Onitsuka Tiger
- Canada Goose
- Mercari
- Shiseido
- Amazon Fashion
- Hypebeast
- Chupa Chups
- JAL (Japan Airlines)
- JETRO
- Yonex
- Toyota
- Sony
- Yamaha
- CFCL (Paris Fashion Week)
- Gap Japan
- BOSE
- UNIQLO

### Services Listed

- Creative Direction
- Brand Experiences
- Motion Design
- CGI (Computer Generated Imagery)
- Film Production

---

## 13. Team & Credits

| Person | Role |
|--------|------|
| Robin Saulet | Film Director, Creative Director (multi-disciplinary artist; international clients: Louis Vuitton, Adidas, Cartier, Onitsuka Tiger) |
| Vicki Dang | 3D Motion Designer / Director (self-taught, Saigon-based; clients: Maserati, LV, Nike China, IKEA, FreeFire) |
| Tran Minh Villageois | Front-end Developer (FWA credit) |
| Ibrahim Menzel | Front-end Developer (FWA credit) |

---

## 14. Global Group Context

monopo is a global creative agency born in Tokyo with studios in five cities:

| Studio | Founded | Location |
|--------|---------|----------|
| monopo Tokyo | Original | 2-2-8 Sendagaya, Shibuya-ku, Tokyo |
| monopo London | 2019 | London, UK |
| monopo New York | 2021 | New York, USA |
| monopo Saigon | 2021 | Ho Chi Minh City, Vietnam |
| monopo Paris | — | Paris, France |

**Tokyo group services:** Brand Design · Communication Design · Experience Design · Content Production

**Tokyo social:** Instagram · X (Twitter) · Facebook · LinkedIn · NOTE

**Copyright:** © MONOPO TOKYO 2024 ALL RIGHTS RESERVED

**Related entities:** Powered.byTokyo · Atelier studio

---

## 15. Rebuild Cheat Sheet

Use this section as a recipe when building something inspired by or similar to monopo.vn.

### Stack Setup

```bash
npx nuxi@latest init my-project
cd my-project
npm install gsap @vueuse/core swiper vue3-lottie three
```

### Nuxt Modules to Add

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/google-fonts', 'nuxt-swiper'],
  googleFonts: {
    families: { Roobert: [300, 400, 600] }  // or self-host
  }
})
```

### CSS Custom Properties (Design Tokens)

```css
:root {
  /* Colors */
  --color-white:    #ffffff;
  --color-black:    #000000;
  --color-carbon:   #181818;
  --color-graphite: #636363;
  --color-ash:      #6d6d6d;
  --color-pewter:   #808080;
  --color-smoke:    #9a9a9a;
  --color-teal:     #49c5b6;
  --color-gold:     #ecd06f;
  --gradient-hero: linear-gradient(90deg, rgb(160,224,171), rgb(255,172,46) 50%, rgb(165,45,37));

  /* Typography */
  --font-primary:   'Roobert', 'Inter', 'DM Sans', sans-serif;
  --font-editorial: 'Raleway', sans-serif;
  --font-utility:   system-ui, sans-serif;

  /* Type Scale */
  --text-hero:    225px;
  --text-display: 94px;
  --text-h1:      78px;
  --text-h2:      54px;
  --text-h3:      45px;
  --text-sub:     30px;
  --text-lg:      18px;
  --text-base:    16px;
  --text-micro:   11px;

  /* Line Heights */
  --lh-hero:    0.76;
  --lh-display: 1.10;
  --lh-body:    1.39;
  --lh-body-lg: 1.36;

  /* Spacing */
  --sp-8:   8px;
  --sp-12:  12px;
  --sp-28:  28px;
  --sp-40:  40px;
  --sp-48:  48px;
  --sp-64:  64px;
  --sp-68:  68px;
  --sp-152: 152px;

  /* Layout */
  --max-w:       1440px;
  --section-gap: 100px;
  --card-pad:    36px;

  /* Shape */
  --radius-pill: 75px;
  --radius-none: 0px;
}
```

### Pill Button Component

```html
<button class="btn-pill">Accept</button>

<style>
.btn-pill {
  border-radius: var(--radius-pill);
  padding: 1px 6px;
  background: var(--color-graphite);
  color: var(--color-white);
  font-family: var(--font-primary);
  font-size: 11px;
  font-weight: 400;
  border: none;
  cursor: pointer;
  box-shadow: none;
}
</style>
```

### Hero Section Pattern

```html
<section class="hero">
  <canvas id="webgl-canvas"></canvas>
  <div class="hero__text">
    <h1>monopo<br>saigon</h1>
  </div>
  <div class="hero__scroll-indicator">SCROLL TO EXPLORE</div>
</section>

<style>
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
#webgl-canvas {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.hero__text {
  position: relative;
  z-index: 1;
  text-align: center;
}
.hero__text h1 {
  font-family: var(--font-primary);
  font-size: var(--text-hero);
  font-weight: 300;
  line-height: var(--lh-hero);
  color: #fff;
}
.hero__scroll-indicator {
  position: absolute;
  bottom: 32px;
  left: 32px;
  font-size: 9px;
  color: #fff;
  font-family: var(--font-utility);
  /* circular text: use SVG textPath */
}
</style>
```

### Section Rhythm Pattern

```html
<!-- WHITE editorial section -->
<section class="section section--light">
  <div class="container">
    <h2>Creative direction<br>that connects.</h2>
    <p>Body copy here at 18px, line-height 1.36.</p>
  </div>
</section>

<!-- BLACK immersive section -->
<section class="section section--dark">
  <!-- full-bleed, WebGL or video background -->
</section>

<style>
.section {
  padding: var(--section-gap) 0;
}
.section--light { background: var(--color-white); }
.section--dark  { background: var(--color-black); min-height: 100vh; }
.container {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 0 40px;
}
</style>
```

### GSAP Scroll Animation Pattern

```js
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Stagger reveal for work cards
gsap.from('.work-card', {
  y: 60,
  opacity: 0,
  duration: 0.9,
  stagger: 0.12,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.work-section',
    start: 'top 80%',
  }
})

// Headline split text entrance
gsap.from('.hero h1', {
  y: 120,
  opacity: 0,
  duration: 1.4,
  ease: 'expo.out',
  delay: 0.3,
})
```

---

*Research compiled from: Awwwards SOTD, CSS Design Awards, Refero Design System, FWA, monopo.co.jp, web searches.*
*Last updated: 2026-06-25*
