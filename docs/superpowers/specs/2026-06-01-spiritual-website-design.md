# Design Spec: Prem Murti Sanjay Krishn Mishra — Spiritual Website

**Date:** 2026-06-01  
**Status:** Approved  
**Reference Design:** Stitch project "Divine Katha Digital Presence" (ID: 2812461838658208399)  
**Reference HTML:** `stitch-design.html` (downloaded from Stitch screen `fb9f4183379749c59977c683abed078c`)  
**Inspired by:** iamjayakishori.com

---

## 1. Project Overview

A personal brand website for **Prem Murti Sanjay Krishn Mishra** — astrologer and katha wachak based in Tryambakeshwar (Nashik) and Jabalpur. The site recreates the structure and quality of iamjayakishori.com, adapted for a male spiritual authority figure who offers Katha, Astrology, and Puja services.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS (config from Stitch design system) |
| Fonts | Literata (headlines) + Manrope (body) via Google Fonts |
| Icons | Material Symbols Outlined |
| Language | Bilingual — Hindi + English (toggle in navbar) |
| Contact Form | Nodemailer or Resend API (email on submit) |
| Deployment | Vercel (free tier) |
| Images | Client-provided photos in `public/images/` |

---

## 3. Design System — "Sacred Radiance"

Source: Stitch project design MD.

### Colors (Tailwind tokens)
```
primary:            #8f4e00   (deep saffron)
primary-container:  #ff9933   (bright saffron, used in gradients)
secondary:          #735c00   (deep gold)
secondary-container:#fed65b   (light gold)
background:         #faf9f5   (warm cream)
surface:            #faf9f5
surface-container-low: #f4f4f0
on-surface:         #1b1c1a
on-surface-variant: #554336
outline:            #887364
outline-variant:    #dbc2b0
```

### Typography
- **Headlines:** Literata, weights 500–700
- **Body:** Manrope, weight 400, sizes 16–18px
- **Labels:** Manrope, weight 600, letter-spacing 0.05em
- **Display:** Literata 64px / 72px, weight 600, letter-spacing -0.02em

### Effects
- **Glass cards:** `rgba(252,251,247,0.8)` bg + `backdrop-filter: blur(20px)` + 1px gold border
- **Ethereal shadow:** `box-shadow: 0 25px 50px -12px rgba(233,195,73,0.08)`
- **Shimmer button:** animated light sweep on primary buttons
- **Scroll reveal:** `opacity:0 → 1`, `translateY(40px → 0)`, staggered delays
- **Parallax hero:** hero image scrolls at 0.15x rate
- **Card tilt:** mouse-move 3D perspective tilt on glass cards
- **Float animation:** 4s ease-in-out on decorative elements

---

## 4. Pages & Routes

| Route | Description |
|---|---|
| `/` | Full landing page (all sections) |
| `/gallery` | Full photo gallery (optional, can be modal on homepage) |
| `/contact` | Dedicated contact/booking page |

The main deliverable is a single-page experience (`/`) with smooth scroll anchors. Separate pages are optional extras.

---

## 5. Sections (Homepage)

### 5.1 Navbar
- Fixed, transparent → frosted glass on scroll
- Logo: "Sanjay Krishn Mishra" in Literata italic
- Links: About, Events, Media, Gallery, Astrology, Contact
- CTA: "Book Now" — saffron gradient, rounded-full, shimmer effect
- Language toggle: EN | हि  button (switches content lang)
- Mobile: hamburger menu

### 5.2 Hero
- Full-screen (`h-screen`)
- Background: client's photo (full-cover, parallax scroll effect)
- Gradient overlay: `from-surface/80 via-surface/40 to-transparent` (left to right)
- Content (left-aligned, max-w-2xl):
  - Label: "KATHA & ASTROLOGY" (saffron, uppercase, tracked)
  - Headline: "Spreading Wisdom Through Sacred Katha & Divine Astrology" (Literata 64px)
  - Sub: brief description (Manrope 18px)
  - Buttons: "Book a Katha" (saffron gradient, shimmer, float) + "Watch Pravachan" (ghost)
- Scroll-reveal animation on content

### 5.3 About / Bio
- Two-column: photo LEFT (600px tall, rounded-2xl, hover scale), text RIGHT
- Photo has gradient overlay at bottom with a Sanskrit quote in italic
- Text: label "हमारा परिचय / Our Journey", H2, 2 paragraphs (bilingual), stats grid
- Stats: 500+ Katha Events, 20+ Years Service, 10K+ Devotees, 2 Locations
- "Read More" button

### 5.4 Services
- Three glass cards: **Katha Vachak**, **Astrology**, **Puja & Anusthan**
- Each: icon (Material Symbols), title (EN + HI), description, "Learn More" button
- Hover: lift with `-translate-y-2`

### 5.5 Upcoming Events
- 3 glass cards: dates, event name, location, "Register Now" button
- Initial placeholder content (client updates with real events)

### 5.6 Spiritual Quote
- Full-width section, `bg-surface-container-highest`
- Decorative divider + lotus float animation
- Large italic Literata blockquote in saffron
- Attribution line

### 5.7 Media / Videos
- Section heading + "View YouTube Channel →" link
- 2 large video thumbnails (16:9 aspect ratio, rounded-2xl)
- Play button overlay (frosted glass circle)
- Video title + subtitle at bottom (revealed on hover)
- Links to YouTube

### 5.8 Gallery
- Masonry 3-column grid (CSS columns)
- 6+ photos (client-provided, placed in `public/images/gallery/`)
- Hover: zoom (`scale-110`) transition
- "View All" button → full gallery modal or `/gallery` page

### 5.9 Booking / Contact
- Glass card, 2-column: contact info LEFT, form RIGHT
- Contact: email, phone (Nashik + Jabalpur), address
- Form fields: First Name, Last Name, Email, Phone, Service (Katha / Astrology / Puja), Message
- Submit: POST to `/api/contact` → sends email via Nodemailer/Resend
- Bilingual labels on form

### 5.10 Footer
- Brand name in Literata italic
- Links: About, Contact, Privacy Policy
- Social icons: Facebook, Instagram, YouTube (SVG)
- Spiritual closing quote in italic saffron
- Copyright line

---

## 6. Bilingual Implementation

- A `LanguageContext` (React Context) holds `lang: 'en' | 'hi'`
- All text content lives in a `content.ts` file:
  ```ts
  export const content = {
    hero: {
      label: { en: "Katha & Astrology", hi: "कथा और ज्योतिष" },
      headline: { en: "Spreading Wisdom...", hi: "पवित्र कथा..." },
      ...
    }
  }
  ```
- Components use `content.section.key[lang]`
- Toggle button in Navbar switches context

---

## 7. Content Placeholders

Client will provide:
- Hero photo (full-screen, landscape)
- About/bio photo (portrait, B&W or color)
- Gallery photos (6–12 images)
- YouTube video links (2 featured videos)
- Phone numbers, email address
- Real event dates/locations
- Bio text in Hindi and English

Until provided, use generic placeholder images from `public/images/placeholder.jpg`.

---

## 8. API Route

`/api/contact` (POST):
- Receives form data
- Sends email via Nodemailer (SMTP) or Resend
- Returns `{ success: true }` or error

---

## 9. Animations & Interactions

All from the Stitch design:
1. **Scroll reveal** — IntersectionObserver, `opacity + translateY`
2. **Parallax hero** — `scroll * 0.15` on hero image
3. **Shimmer buttons** — CSS `::after` sweep animation
4. **Float** — `translateY 0 → -8px → 0`, 4s loop
5. **Card tilt** — `mousemove` → `perspective(1000px) rotateX/Y`
6. **Navbar scroll** — transparent → frosted glass at `scrollY > 50`

Use a custom `useScrollReveal` hook or plain `useEffect` + `IntersectionObserver`.

---

## 10. File Structure

```
sanju_mama/
├── public/
│   └── images/
│       ├── hero.jpg          # client provides
│       ├── about.jpg         # client provides
│       └── gallery/          # client provides 6-12 images
├── src/
│   └── app/
│       ├── layout.tsx        # fonts, metadata, LanguageProvider
│       ├── page.tsx          # imports all sections
│       ├── globals.css       # Tailwind base + custom classes
│       └── api/
│           └── contact/
│               └── route.ts  # contact form email handler
├── src/components/
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── ServicesSection.tsx
│   ├── EventsSection.tsx
│   ├── QuoteSection.tsx
│   ├── MediaSection.tsx
│   ├── GallerySection.tsx
│   ├── ContactSection.tsx
│   └── Footer.tsx
├── src/lib/
│   ├── content.ts            # all bilingual text content
│   └── LanguageContext.tsx   # React context for EN/HI toggle
├── tailwind.config.ts        # Sacred Radiance tokens from Stitch
├── package.json
└── next.config.js
```
