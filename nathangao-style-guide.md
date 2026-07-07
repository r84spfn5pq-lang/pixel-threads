# Nathan Gao Style Portfolio — Website Recreation Guide

> Reference: [nathangao.xyz](https://nathangao.xyz/)  
> Style: Minimal, editorial, motion-precise portfolio  
> CSS Design Awards — Website of the Day (February 5, 2018)

---

## 1. Design Philosophy

This site's distinctiveness comes from restraint, not decoration. Every decision removes something unnecessary.

**Core rules:**
- Typography IS the design. No hero images, no decorative elements, no gradients on the current version.
- Whitespace is structural. Large section padding (140–220px) gives content room to breathe.
- No borders, dividers, or drop shadows anywhere (except a barely-visible nav shadow on scroll).
- `font-weight: 400` on ALL headings. Size and tracking carry visual weight — never bold.
- Every link uses the same `scaleX` underline wipe animation. One interaction pattern, applied consistently everywhere.

---

## 2. Color Palette

### Current (white) version
| Role | Value |
|---|---|
| Background | `#fff` or `#fafafa` |
| Body text | `#000` or `#111` |
| Accent | None — strictly monochrome |

### Original (dark) version
| Role | Value |
|---|---|
| Body background | `#000` |
| Body text | `#fff` |
| Background gradient center | `#1d1d1d` |
| Teal accent | `#1bcdcf` |
| Dark navy | `#010154` |
| Dark teal overlay | `#0d4368` |
| Mid-gray | `#999` |
| Light gray | `#c6c6c6` |
| Overlay dark | `rgba(0,0,0,0.3)` to `rgba(0,0,0,0.85)` |

**Dark background gradient:**
```css
background: radial-gradient(ellipse at center, #1d1d1d 0%, #000 100%);
```

---

## 3. Typography

### Fonts

**Primary (self-hosted, licensed):**
- `GraphikLCG` — geometric sans-serif, weights 400 + 500

**Free substitutes (Google Fonts):**
- [Inter](https://fonts.google.com/specimen/Inter) — closest match
- [DM Sans](https://fonts.google.com/specimen/DM+Sans) — slightly softer
- [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)

**Accent serif (self-hosted, licensed):**
- `Blacker Pro Display Italic` — high-contrast serif, used ONLY for project category labels

**Free substitute:**
- [Playfair Display Italic](https://fonts.google.com/specimen/Playfair+Display) — very close
- [Lora Italic](https://fonts.google.com/specimen/Lora)

**Google Fonts import (free stack):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Playfair+Display:ital,wght@1,500&display=swap" rel="stylesheet">
```

### Type Scale

| Element | Size | Line Height | Letter Spacing | Weight |
|---|---|---|---|---|
| `h1` hero | `6.5em` / `clamp(3rem, 8vw, 6.5rem)` | `1.15` | `-0.06em` | `400` |
| `h2` | `5.6em` | `1.22` | `-0.06em` | `400` |
| `h3` | `3.2em` | `1.3` | `-0.04em` | `400` |
| `h4` | `2.2em` | `1.5` | `-0.04em` | `400` |
| `h5` (category label) | `1.7em` | `1.5` | `-0.03em` | `500` — serif italic |
| `h6` | `1em` | `1.5` | `-0.02em` | `400` |
| `p` body | `1rem` | `1.8` | `-0.01em` | `400` |
| `p.lg` large body | `1.3em` | `1.7` | inherited | `400` |
| Nav links | `0.75em` | — | `+0.11em` | `500` uppercase |
| Social links | `0.75em` | — | `+0.12em` | `600` uppercase |

**Critical:** negative letter-spacing on large headings is essential — it gives the editorial, premium feel.

---

## 4. Layout System

### Container
```css
.container {
  width: min(92%, 1400px);
  margin: 0 auto;
  position: relative;
  z-index: 1;
  backface-visibility: hidden;
}

.sm-container {
  width: min(800px, 90%);
  margin: 0 auto;
}
```

### Grid (original float-based, 12-column)
```css
/* All columns: float: left; margin-right: 3%; */
/* Last child: margin-right: 0; */
.col1  { width: 5.5%;  }
.col2  { width: 14%;   }
.col3  { width: 22.5%; }
.col4  { width: 31%;   }
.col5  { width: 39.5%; }
.col6  { width: 48.5%; } /* half */
.col7  { width: 56.5%; }
.col8  { width: 65%;   }
.col9  { width: 73.5%; }
.col10 { width: 82%;   }
.col11 { width: 90.5%; }
.col12 { width: 100%;  }
```

Modern equivalent using CSS Grid:
```css
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 3%;
}
```

### Section Spacing
```css
.section         { padding: 140px 0; }
.section-sm      { padding: 100px 0; }
.section-hero    { padding: 200px 0 80px; }
.section-about   { padding: 220px 0; }
```

---

## 5. Navigation

```css
header {
  position: fixed; /* or absolute */
  top: 0;
  left: 0;
  width: 100%;
  padding: 24px 3% 0;
  z-index: 998;
}

/* Logo — left float */
.logo {
  float: left;
  width: 130px;
  height: 52px;
}

/* Nav — right float */
nav {
  float: right;
}

nav a {
  display: inline-block;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.11em;
  font-size: 0.75em;
  padding: 20px 0;
  margin-left: 32px;
  position: relative;
  transition: color 0.5s cubic-bezier(0.86, 0, 0.07, 1);
}

/* Animated underline — the signature effect */
nav a::after {
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  background: currentColor;
  position: absolute;
  left: 0;
  bottom: 10px;
  transform-origin: right center;
  transform: scaleX(0);
  transition: transform 0.5s cubic-bezier(0.86, 0, 0.07, 1);
}

nav a:hover::after {
  transform: scaleX(1);
  transform-origin: left center; /* flip origin creates wipe direction change */
}
```

**The `transform-origin` flip is the key trick:**
- At rest: origin is `right center` → wipe exits to the left (disappears rightward)
- On hover: origin is `left center` → wipe enters from the left

---

## 6. Work / Project Tiles

```css
.work-tile {
  display: block;
  color: #fff;
  width: 100%;
  position: relative;
  margin-bottom: 80px;
  text-decoration: none;
}

/* Square thumbnail via padding-bottom trick */
.work-tile-image {
  width: 100%;
  padding-bottom: 100%; /* 1:1 aspect ratio */
  overflow: hidden;
  border-radius: 12px;
  position: relative;
  backface-visibility: hidden;
}

/* Inner image — oversized for zoom headroom */
.work-tile-image-inner {
  height: 120%;
  position: absolute;
  top: -10%;
  width: 100%;
  background-size: cover;
  background-position: center;
  transform: scale(1) translate3d(0, 0, 0);
  transition: transform 1.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.work-tile:hover .work-tile-image-inner {
  transform: scale(1.05) translate3d(0, 0, 0);
}

/* Text card lifts up on hover */
.work-tile-content {
  padding: 20px;
  transform: translate3d(0, 0, 0);
  transition: transform 1s cubic-bezier(0.23, 1, 0.32, 1);
}

.work-tile:hover .work-tile-content {
  transform: translate3d(0, -35px, 0);
}

/* Category label uses serif italic font */
.work-tile-content .category {
  font-family: 'Playfair Display', serif;
  font-style: italic;
}
```

**Grid layout for tiles (2 columns):**
```css
.work-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3%;
}

@media (max-width: 640px) {
  .work-grid { grid-template-columns: 1fr; }
}
```

---

## 7. Inline Link Animation

Apply this to ANY inline text link throughout the page:
```css
.inline-link {
  display: inline-block;
  font-weight: 400;
  position: relative;
  text-decoration: none;
}

.inline-link::after {
  content: '';
  display: block;
  width: 100%;
  height: 2px;
  background: currentColor;
  position: absolute;
  left: 0;
  bottom: 0;
  transform-origin: right center;
  transform: scaleX(0);
  transition: transform 0.6s cubic-bezier(0.86, 0, 0.07, 1);
  backface-visibility: hidden;
}

.inline-link:hover::after {
  transform: scaleX(1);
  transform-origin: left center;
}
```

---

## 8. Easing Functions

These three bezier curves are the entire motion vocabulary of the site:

```css
/* Aggressive snap — used for nav, link underlines */
--ease-snap: cubic-bezier(0.86, 0, 0.07, 1);

/* Silky spring — used for work tile hover (image zoom + content lift) */
--ease-spring: cubic-bezier(0.23, 1, 0.32, 1);

/* Measured action — secondary interactions */
--ease-action: cubic-bezier(0.165, 0.84, 0.44, 1);
```

**Transition durations in use:**
| Duration | Usage |
|---|---|
| `0.1s` | Micro-interactions |
| `0.2s` | Fast state changes |
| `0.5s` | Nav link color + underline |
| `0.6s` | Inline link underline |
| `1s` | Work tile content lift |
| `1.4s` | Work tile image zoom |
| `4s` | Looping text animations |

---

## 9. Scroll / Reveal Animations

```css
/* Slide up on enter */
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1),
              transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

```js
// Intersection Observer for reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

**Looping scroll text animation:**
```css
@keyframes scroll-cycle {
  0%   { transform: translateY(-100%); }
  30%  { transform: translateY(0%); }
  70%  { transform: translateY(0%); }
  100% { transform: translateY(100%); }
}

.scroll-text {
  animation: scroll-cycle 4s cubic-bezier(0.86, 0, 0.07, 1) infinite;
}
```

---

## 10. WebGL Canvas Background (Original Version)

For the original dark site, a Three.js/WebGL canvas sits fixed behind everything:
```css
#canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  display: block;
  pointer-events: none;
}
```

Content sits at `z-index: 1+` above the canvas.

For a simpler recreation without WebGL: use the `radial-gradient` background instead.

---

## 11. Z-Index Stack

| z-index | Element |
|---|---|
| `0` | WebGL canvas background |
| `1` | Main content |
| `2` | App content layer |
| `9` | Foreground overlays |
| `997` | Scroll indicator |
| `998` | Header / navigation |
| `999` | Preloader |

---

## 12. Responsive Breakpoints

```css
/* Container width */
@media (min-width: 1680px) { .container { width: 85%; } }

/* Tablet */
@media (max-width: 1024px) { .sm-container { width: 90%; } }

/* Mobile nav (hamburger) */
@media (max-width: 640px) {
  nav { display: none; }
  .hamburger { display: block; }
}

/* Mobile profile image (about page) */
@media (max-width: 720px) {
  .profile-desktop { display: none; }
  .profile-mobile { display: block; }
}

/* Small mobile adjustments */
@media (max-width: 430px) { ... }
@media (max-width: 375px) { ... }
```

---

## 13. Page Structure (3 Pages)

| Page | Purpose | Priority |
|---|---|---|
| `/` | Hero statement + 3 featured projects | 1.00 |
| `/works` | Full portfolio grid (6 projects) | 0.80 |
| `/about` | Bio, books, latest callout | 0.80 |

**Navigation:** Logo (left) + `Work | About | email@domain.com` (right)  
**Footer:** `More Works | About | Email | LinkedIn`

---

## 14. About Page Layout

Two-column layout on desktop (col7 text + col5 fixed image), single-column on mobile:
```css
.about-section {
  padding: 220px 0;
}

.about-text {
  /* Takes up ~58% width */
  padding: 60px 0;
}

.about-image {
  /* Fixed right column, ~41% width */
  position: absolute;
  right: 0;
  height: 100%;
  overflow: hidden;
}

.about-image img {
  width: 100%;
  height: 800px;
  border-radius: 12px;
  object-fit: cover;
  object-position: center top;
}

@media (max-width: 720px) {
  .about-image { display: none; }
  .about-image-mobile {
    display: block;
    width: 100%;
    margin-bottom: 48px;
    border-radius: 12px;
  }
}
```

---

## 15. Preloader

```html
<div id="preloader">
  <!-- Logo or spinner -->
</div>
```

```css
#preloader {
  position: fixed;
  inset: 0;
  z-index: 999;
  background: #000; /* or #fff for light version */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.6s cubic-bezier(0.86, 0, 0.07, 1);
}

#preloader.hidden {
  opacity: 0;
  pointer-events: none;
}
```

```js
window.addEventListener('load', () => {
  document.getElementById('preloader').classList.add('hidden');
});
```

---

## 16. Full HTML Starter Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio — Your Name</title>
  
  <!-- Fonts: free substitutes for GraphikLCG + Blacker Pro -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@1,500&display=swap" rel="stylesheet">
  
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #fff;
      --fg: #000;
      --ease-snap: cubic-bezier(0.86, 0, 0.07, 1);
      --ease-spring: cubic-bezier(0.23, 1, 0.32, 1);
    }

    body {
      background: var(--bg);
      color: var(--fg);
      font-family: 'Inter', sans-serif;
      font-weight: 400;
      font-size: 16px;
      line-height: 1;
    }

    .container {
      width: min(92%, 1400px);
      margin: 0 auto;
    }

    /* ---- HEADER ---- */
    header {
      position: fixed;
      top: 0; left: 0;
      width: 100%;
      padding: 24px 4%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 998;
    }

    .logo { font-weight: 500; font-size: 1rem; text-decoration: none; color: inherit; }

    nav a {
      display: inline-block;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.11em;
      font-size: 0.75em;
      padding: 20px 0;
      margin-left: 32px;
      position: relative;
      text-decoration: none;
      color: inherit;
      transition: color 0.5s var(--ease-snap);
    }

    nav a::after {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background: currentColor;
      position: absolute;
      left: 0;
      bottom: 10px;
      transform-origin: right center;
      transform: scaleX(0);
      transition: transform 0.5s var(--ease-snap);
    }

    nav a:hover::after {
      transform: scaleX(1);
      transform-origin: left center;
    }

    /* ---- HERO ---- */
    .hero {
      padding: 200px 0 80px;
    }

    .hero h1 {
      font-size: clamp(3rem, 8vw, 6.5rem);
      font-weight: 400;
      line-height: 1.15;
      letter-spacing: -0.06em;
      max-width: 12ch;
    }

    /* ---- WORK GRID ---- */
    .work-section { padding: 140px 0; }

    .work-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 3%;
    }

    .work-tile {
      display: block;
      text-decoration: none;
      color: inherit;
      margin-bottom: 80px;
    }

    .work-tile-image {
      width: 100%;
      padding-bottom: 100%; /* square */
      overflow: hidden;
      border-radius: 12px;
      position: relative;
      backface-visibility: hidden;
    }

    .work-tile-image-inner {
      position: absolute;
      inset: -10% 0 0 0;
      height: 120%;
      background-size: cover;
      background-position: center;
      transform: scale(1) translate3d(0, 0, 0);
      transition: transform 1.4s var(--ease-spring);
    }

    .work-tile:hover .work-tile-image-inner {
      transform: scale(1.05) translate3d(0, 0, 0);
    }

    .work-tile-content {
      padding: 20px;
      transform: translate3d(0, 0, 0);
      transition: transform 1s var(--ease-spring);
    }

    .work-tile:hover .work-tile-content {
      transform: translate3d(0, -35px, 0);
    }

    .work-tile-content .category {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: 1.1em;
      display: block;
      margin-bottom: 8px;
    }

    .work-tile-content h3 {
      font-size: 1.5rem;
      font-weight: 400;
      letter-spacing: -0.03em;
    }

    /* ---- INLINE LINK ---- */
    .inline-link {
      display: inline-block;
      position: relative;
      text-decoration: none;
      color: inherit;
    }

    .inline-link::after {
      content: '';
      display: block;
      width: 100%;
      height: 2px;
      background: currentColor;
      position: absolute;
      left: 0;
      bottom: 0;
      transform-origin: right center;
      transform: scaleX(0);
      transition: transform 0.6s var(--ease-snap);
      backface-visibility: hidden;
    }

    .inline-link:hover::after {
      transform: scaleX(1);
      transform-origin: left center;
    }

    /* ---- REVEAL ON SCROLL ---- */
    .reveal {
      opacity: 0;
      transform: translateY(40px);
      transition: opacity 0.8s var(--ease-spring), transform 0.8s var(--ease-spring);
    }

    .reveal.is-visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* ---- FOOTER ---- */
    footer {
      padding: 80px 0;
      border-top: 1px solid rgba(0,0,0,0.1);
    }

    /* ---- RESPONSIVE ---- */
    @media (max-width: 640px) {
      nav { display: none; }
      .work-grid { grid-template-columns: 1fr; }
      .hero h1 { font-size: clamp(2.5rem, 10vw, 4rem); }
    }
  </style>
</head>
<body>

  <header>
    <a href="/" class="logo">Your Name</a>
    <nav>
      <a href="/work">Work</a>
      <a href="/about">About</a>
      <a href="mailto:hello@yourdomain.com">hello@yourdomain.com</a>
    </nav>
  </header>

  <main>
    <section class="hero container">
      <h1 class="reveal">I craft thoughtful digital products that deliver real results.</h1>
    </section>

    <section class="work-section container">
      <div class="work-grid">

        <a href="/work/project-one" class="work-tile reveal">
          <div class="work-tile-image">
            <div class="work-tile-image-inner" style="background-image: url('images/project-one.jpg');"></div>
          </div>
          <div class="work-tile-content">
            <span class="category">UX Design, Web</span>
            <h3>Project One</h3>
          </div>
        </a>

        <a href="/work/project-two" class="work-tile reveal">
          <div class="work-tile-image">
            <div class="work-tile-image-inner" style="background-image: url('images/project-two.jpg');"></div>
          </div>
          <div class="work-tile-content">
            <span class="category">Art Direction</span>
            <h3>Project Two</h3>
          </div>
        </a>

      </div>
    </section>
  </main>

  <footer class="container">
    <a href="/work" class="inline-link">More Works</a> &nbsp;·&nbsp;
    <a href="/about" class="inline-link">About Me</a> &nbsp;·&nbsp;
    <a href="https://linkedin.com/in/yourprofile" class="inline-link">LinkedIn</a>
  </footer>

  <script>
    // Scroll reveal
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  </script>

</body>
</html>
```

---

## 17. Quick Checklist (When Building a Site Like This)

- [ ] Set all headings to `font-weight: 400`
- [ ] Apply negative `letter-spacing` to all large text (at minimum `-0.04em` on h3+)
- [ ] Use `clamp()` for responsive hero font size
- [ ] Add `::after` + `scaleX` underline animation to every link
- [ ] Section padding minimum `100px` top and bottom — more is better
- [ ] Project thumbnails are perfect squares (`padding-bottom: 100%`)
- [ ] Image hover: `scale(1.05)` over `1.4s` with spring easing
- [ ] Text card lifts `-35px` on tile hover
- [ ] No decorative borders or shadows anywhere except subtle nav shadow on scroll
- [ ] Dual font system: geometric sans for body/headings, serif italic for category labels only
- [ ] Use `cubic-bezier(0.86, 0, 0.07, 1)` for link animations, `cubic-bezier(0.23, 1, 0.32, 1)` for spatial animations
- [ ] `backface-visibility: hidden` on all animated elements for GPU compositing
- [ ] Nav: logo left, links right, all uppercase `letter-spacing: 0.11em`
- [ ] Footer: flat horizontal link list with inline-link animation
- [ ] 3 pages max: home, works, about

---

*Guide compiled from nathangao.xyz — June 2026*
