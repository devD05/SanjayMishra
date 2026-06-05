# Spiritual Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready bilingual (EN/HI) spiritual website for Prem Murti Sanjay Krishn Mishra using Next.js 14 + Tailwind CSS, based on the Stitch "Sacred Radiance" design system.

**Architecture:** Single-page Next.js 14 App Router site with 10 scroll-anchored sections. All text lives in `src/lib/content.ts` and is toggled by a `LanguageContext`. Animations (scroll reveal, parallax, card tilt, shimmer) are implemented in `globals.css` + React hooks, matching the Stitch reference design in `stitch-design.html`.

**Tech Stack:** Next.js 14, Tailwind CSS, TypeScript, Nodemailer (contact form), Google Fonts (Literata + Manrope), Material Symbols Outlined

---

## File Map

| File | Responsibility |
|---|---|
| `package.json` | Dependencies |
| `tailwind.config.ts` | Sacred Radiance color/font/spacing tokens |
| `src/app/globals.css` | Tailwind base + shimmer, reveal, float, glass-card CSS |
| `src/lib/content.ts` | All bilingual text (EN + HI) |
| `src/lib/LanguageContext.tsx` | React context + toggle hook |
| `src/app/layout.tsx` | Fonts, metadata, LanguageProvider wrap |
| `src/app/page.tsx` | Assembles all sections |
| `src/components/Navbar.tsx` | Fixed nav, scroll glass effect, lang toggle, mobile menu |
| `src/components/HeroSection.tsx` | Full-screen hero, parallax, shimmer buttons |
| `src/components/AboutSection.tsx` | 2-col bio, stats grid |
| `src/components/ServicesSection.tsx` | 3 glass-card services |
| `src/components/EventsSection.tsx` | 3 event cards |
| `src/components/QuoteSection.tsx` | Full-width quote with float lotus |
| `src/components/MediaSection.tsx` | 2 video thumbnails with play overlay |
| `src/components/GallerySection.tsx` | Masonry gallery grid |
| `src/components/ContactSection.tsx` | Booking form + contact info |
| `src/components/Footer.tsx` | Brand, links, social icons |
| `src/app/api/contact/route.ts` | POST handler — sends email via Nodemailer |
| `public/images/placeholder.jpg` | Placeholder until client provides photos |

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `next.config.js`
- Create: `tsconfig.json`
- Create: `postcss.config.js`

- [ ] **Step 1: Create the project directory and package.json**

Run from `c:/dev/freelancing/sanju_mama`:
```bash
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git
```
Answer prompts: accept all defaults.

- [ ] **Step 2: Install additional dependencies**
```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

- [ ] **Step 3: Verify dev server starts**
```bash
npm run dev
```
Expected: `ready - started server on 0.0.0.0:3000` in terminal. Open http://localhost:3000 — default Next.js page loads.

- [ ] **Step 4: Add placeholder image**

Download any free 1200×800 image and save as `public/images/placeholder.jpg`. Also create the gallery folder:
```bash
mkdir -p public/images/gallery
```

- [ ] **Step 5: Commit**
```bash
git add .
git commit -m "feat: scaffold Next.js 14 project for spiritual website"
```

---

## Task 2: Tailwind Config + Global CSS

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace tailwind.config.ts with Sacred Radiance tokens**

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary':                  '#8f4e00',
        'primary-container':        '#ff9933',
        'on-primary':               '#ffffff',
        'secondary':                '#735c00',
        'secondary-container':      '#fed65b',
        'secondary-fixed-dim':      '#e9c349',
        'background':               '#faf9f5',
        'surface':                  '#faf9f5',
        'surface-bright':           '#faf9f5',
        'surface-container-lowest': '#ffffff',
        'surface-container-low':    '#f4f4f0',
        'surface-container':        '#efeeea',
        'surface-container-high':   '#e9e8e4',
        'surface-container-highest':'#e3e2df',
        'surface-dim':              '#dbdad6',
        'on-surface':               '#1b1c1a',
        'on-surface-variant':       '#554336',
        'on-secondary':             '#ffffff',
        'on-secondary-container':   '#745c00',
        'outline':                  '#887364',
        'outline-variant':          '#dbc2b0',
        'inverse-surface':          '#2f312e',
        'inverse-primary':          '#ffb77a',
        'surface-tint':             '#8f4e00',
        'primary-fixed':            '#ffdcc2',
        'primary-fixed-dim':        '#ffb77a',
        'surface-variant':          '#e3e2df',
      },
      fontFamily: {
        'headline': ['Literata', 'Georgia', 'serif'],
        'body':     ['Manrope', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-lg':        ['64px', { lineHeight: '72px', letterSpacing: '-0.02em', fontWeight: '600' }],
        'display-lg-mobile': ['40px', { lineHeight: '48px', letterSpacing: '-0.01em', fontWeight: '600' }],
        'headline-lg':       ['32px', { lineHeight: '40px', fontWeight: '500' }],
        'headline-md':       ['24px', { lineHeight: '32px', fontWeight: '500' }],
        'body-lg':           ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'body-md':           ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'label-md':          ['14px', { lineHeight: '20px', letterSpacing: '0.05em', fontWeight: '600' }],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg:      '0.5rem',
        xl:      '0.75rem',
        '2xl':   '1rem',
        '3xl':   '1.5rem',
        '4xl':   '2rem',
        full:    '9999px',
      },
      spacing: {
        'gutter':            '24px',
        'margin-mobile':     '20px',
        'section-padding':   '120px',
        'container-max':     '1200px',
      },
      maxWidth: {
        'container': '1200px',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Replace globals.css with custom animation classes**

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html { scroll-behavior: smooth; }
  body { @apply bg-surface font-body text-on-surface; }
}

@layer components {
  /* Glass card effect */
  .glass-card {
    background: rgba(252, 251, 247, 0.8);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(212, 175, 55, 0.2);
    box-shadow: 0 10px 40px -10px rgba(143, 78, 0, 0.08);
  }

  /* Ethereal shadow */
  .ethereal-shadow {
    box-shadow: 0 25px 50px -12px rgba(233, 195, 73, 0.08);
  }

  /* Shimmer button */
  .shimmer-effect {
    position: relative;
    overflow: hidden;
  }
  .shimmer-effect::after {
    content: '';
    position: absolute;
    top: -50%; left: -50%;
    width: 200%; height: 200%;
    background: linear-gradient(
      to bottom right,
      rgba(255,255,255,0) 0%,
      rgba(255,255,255,0) 40%,
      rgba(255,255,255,0.4) 50%,
      rgba(255,255,255,0) 60%,
      rgba(255,255,255,0) 100%
    );
    transform: rotate(45deg);
    animation: shimmer 4s infinite;
  }

  /* Scroll reveal */
  .reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: all 1s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .reveal.active {
    opacity: 1;
    transform: translateY(0);
  }
  .reveal-delay-100 { transition-delay: 100ms; }
  .reveal-delay-200 { transition-delay: 200ms; }
  .reveal-delay-300 { transition-delay: 300ms; }
  .reveal-delay-400 { transition-delay: 400ms; }

  /* Navbar scrolled */
  nav.scrolled {
    background: rgba(250, 249, 245, 0.85) !important;
    backdrop-filter: blur(16px);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
  }

  /* Material icons vertical align */
  .material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    display: inline-block;
    vertical-align: middle;
  }
}

@keyframes shimmer {
  0%   { transform: translateX(-150%) rotate(45deg); }
  100% { transform: translateX(150%) rotate(45deg); }
}

@keyframes float {
  0%   { transform: translateY(0px); }
  50%  { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}
```

- [ ] **Step 3: Run build to verify no CSS errors**
```bash
npm run build
```
Expected: `✓ Compiled successfully`

- [ ] **Step 4: Commit**
```bash
git add tailwind.config.ts src/app/globals.css
git commit -m "feat: add Sacred Radiance design tokens and animation CSS"
```

---

## Task 3: Language Context + Content

**Files:**
- Create: `src/lib/LanguageContext.tsx`
- Create: `src/lib/content.ts`

- [ ] **Step 1: Create LanguageContext.tsx**

```tsx
// src/lib/LanguageContext.tsx
'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

type Lang = 'en' | 'hi'
const LanguageContext = createContext<{ lang: Lang; toggle: () => void }>({
  lang: 'en',
  toggle: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  const toggle = () => setLang(l => l === 'en' ? 'hi' : 'en')
  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)
```

- [ ] **Step 2: Create content.ts with all bilingual text**

```ts
// src/lib/content.ts
export type BiText = { en: string; hi: string }
export const t = (text: BiText, lang: 'en' | 'hi') => text[lang]

export const content = {
  nav: {
    logo:    { en: 'Sanjay Krishn Mishra', hi: 'संजय कृष्ण मिश्रा' },
    about:   { en: 'About',    hi: 'परिचय' },
    events:  { en: 'Events',   hi: 'आयोजन' },
    media:   { en: 'Media',    hi: 'मीडिया' },
    gallery: { en: 'Gallery',  hi: 'गैलरी' },
    astrology:{ en:'Astrology',hi: 'ज्योतिष' },
    contact: { en: 'Contact',  hi: 'संपर्क' },
    bookNow: { en: 'Book Now', hi: 'बुकिंग करें' },
  },
  hero: {
    label:    { en: 'Katha & Astrology', hi: 'कथा और ज्योतिष' },
    headline: { en: 'Spreading Wisdom Through Sacred Katha & Divine Astrology', hi: 'पवित्र कथा और दिव्य ज्योतिष के माध्यम से ज्ञान का प्रसार' },
    sub:      { en: 'A revered spiritual orator and Vedic astrologer, Pandit Sanjay Krishn Mishra guides devotees toward clarity, dharma, and inner peace through his transformative kathas and precise astrological wisdom.', hi: 'एक पूजनीय आध्यात्मिक वक्ता और वैदिक ज्योतिषी, पंडित संजय कृष्ण मिश्रा अपनी कथाओं और सटीक ज्योतिषीय ज्ञान के माध्यम से भक्तों को स्पष्टता, धर्म और आंतरिक शांति की ओर मार्गदर्शन करते हैं।' },
    cta1:     { en: 'Book a Katha', hi: 'कथा बुक करें' },
    cta2:     { en: 'Watch Pravachan', hi: 'प्रवचन देखें' },
  },
  about: {
    label:    { en: 'Our Journey', hi: 'हमारा परिचय' },
    heading:  { en: 'A Lifetime Dedicated to Devotion', hi: 'भक्ति को समर्पित एक जीवन' },
    p1:       { en: 'With over 20 years of spiritual service, Pandit Sanjay Krishn Mishra has dedicated his life to spreading the eternal wisdom of the Vedas and Puranas. Based in the sacred town of Tryambakeshwar (Nashik) and Jabalpur, he has conducted more than 500 Kathas across India.', hi: '20 से अधिक वर्षों की आध्यात्मिक सेवा के साथ, पंडित संजय कृष्ण मिश्रा ने वेदों और पुराणों की शाश्वत ज्ञान को फैलाने के लिए अपना जीवन समर्पित किया है। त्र्यंबकेश्वर (नाशिक) और जबलपुर में स्थित, उन्होंने भारत भर में 500 से अधिक कथाएं कीं।' },
    p2:       { en: 'As a Vedic astrologer, he offers deep insight into kundali reading, vastu shastra, and life guidance — helping families navigate life\'s milestones with divine clarity.', hi: 'एक वैदिक ज्योतिषी के रूप में, वे कुंडली पाठन, वास्तु शास्त्र और जीवन मार्गदर्शन में गहरी अंतर्दृष्टि प्रदान करते हैं — परिवारों को दिव्य स्पष्टता के साथ जीवन के महत्वपूर्ण क्षणों में मार्गदर्शन करते हैं।' },
    readMore: { en: 'Read More', hi: 'और पढ़ें' },
    photo_quote: { en: '"Where devotion meets wisdom, the divine reveals itself."', hi: '"जहाँ भक्ति और ज्ञान मिलते हैं, वहाँ ईश्वर प्रकट होते हैं।"' },
    stats: [
      { value: '500+', label: { en: 'Katha Events', hi: 'कथा आयोजन' } },
      { value: '20+',  label: { en: 'Years of Service', hi: 'वर्षों की सेवा' } },
      { value: '10K+', label: { en: 'Devotees', hi: 'भक्त' } },
      { value: '2',    label: { en: 'Locations', hi: 'स्थान' } },
    ],
  },
  services: {
    label:   { en: 'Our Services', hi: 'हमारी सेवाएँ' },
    heading: { en: 'How We Can Serve You', hi: 'हम आपकी कैसे सेवा कर सकते हैं' },
    items: [
      {
        icon: 'menu_book',
        title:   { en: 'Katha Vachak', hi: 'कथा वाचक' },
        desc:    { en: 'Bhagavat Katha, Ram Katha, and Shiv Purana delivered with deep devotion and scriptural accuracy for family and community events.', hi: 'गहरी भक्ति और शास्त्रीय सटीकता के साथ परिवार और सामुदायिक कार्यक्रमों के लिए भागवत कथा, राम कथा और शिव पुराण।' },
        cta:     { en: 'Learn More', hi: 'अधिक जानें' },
      },
      {
        icon: 'auto_awesome',
        title:   { en: 'Vedic Astrology', hi: 'वैदिक ज्योतिष' },
        desc:    { en: 'Kundali reading, horoscope analysis, muhurta selection, and Vastu Shastra consultations rooted in authentic Vedic tradition.', hi: 'कुंडली पाठन, कुंडली विश्लेषण, मुहूर्त चयन, और प्रामाणिक वैदिक परंपरा में निहित वास्तु शास्त्र परामर्श।' },
        cta:     { en: 'Book Consultation', hi: 'परामर्श बुक करें' },
      },
      {
        icon: 'local_fire_department',
        title:   { en: 'Puja & Anusthan', hi: 'पूजा और अनुष्ठान' },
        desc:    { en: 'Special yagnas, griha pravesh puja, satyanarayan katha, and sacred ceremonies performed with complete Vedic rituals.', hi: 'विशेष यज्ञ, गृह प्रवेश पूजा, सत्यनारायण कथा और पूर्ण वैदिक विधि-विधान के साथ पवित्र समारोह।' },
        cta:     { en: 'Book Puja', hi: 'पूजा बुक करें' },
      },
    ],
  },
  events: {
    label:   { en: 'Upcoming Kathas', hi: 'आगामी कथाएं' },
    heading: { en: 'Join Us in Sacred Gatherings', hi: 'पवित्र सभाओं में हमारे साथ जुड़ें' },
    sub:     { en: 'Join these sacred gatherings of wisdom and divinity across holy lands.', hi: 'पवित्र भूमियों पर ज्ञान और दिव्यता की इन पवित्र सभाओं में शामिल हों।' },
    register:{ en: 'Register Now', hi: 'अभी पंजीकरण करें' },
    items: [
      { dates: '12 - 18 OCT', title: { en: 'Bhagavat Katha', hi: 'भागवत कथा' }, location: { en: 'Tryambakeshwar, Nashik', hi: 'त्र्यंबकेश्वर, नाशिक' } },
      { dates: '05 - 11 NOV', title: { en: 'Ram Katha',      hi: 'राम कथा' },     location: { en: 'Jabalpur, MP',          hi: 'जबलपुर, मध्यप्रदेश' } },
      { dates: '20 - 26 DEC', title: { en: 'Shiv Purana',    hi: 'शिव पुराण' },   location: { en: 'Nashik, Maharashtra',   hi: 'नाशिक, महाराष्ट्र' } },
    ],
  },
  quote: {
    text: { en: '"Realizing the divinity within is the ultimate purpose of human existence. When we surrender our ego at the lotus feet of the Lord, our journey toward eternal bliss begins."', hi: '"अपने भीतर की दिव्यता को पहचानना मानव जीवन का परम उद्देश्य है। जब हम अपना अहंकार प्रभु के चरण कमलों में अर्पण करते हैं, तब शाश्वत आनंद की ओर हमारी यात्रा शुरू होती है।"' },
    attr: { en: '— Prem Murti Sanjay Krishn Mishra', hi: '— प्रेम मूर्ति संजय कृष्ण मिश्रा' },
  },
  media: {
    label:   { en: 'Digital Satsang', hi: 'डिजिटल सत्संग' },
    heading: { en: 'Watch & Listen', hi: 'देखें और सुनें' },
    sub:     { en: 'Listen to the latest discourses and divine kathas.', hi: 'नवीनतम प्रवचन और दिव्य कथाएं सुनें।' },
    youtube: { en: 'View YouTube Channel', hi: 'यूट्यूब चैनल देखें' },
    videos: [
      { title: { en: 'Shrimad Bhagavat Katha — Day 1',     hi: 'श्रीमद् भागवत कथा — दिन 1' },     sub: { en: 'Tryambakeshwar, 2025', hi: 'त्र्यंबकेश्वर, 2025' }, youtubeId: '' },
      { title: { en: 'Evening Pravachan: Gita Chapter 18', hi: 'सायं प्रवचन: गीता अध्याय 18' }, sub: { en: 'Recorded in Jabalpur',  hi: 'जबलपुर में रिकॉर्ड किया गया' }, youtubeId: '' },
    ],
  },
  gallery: {
    label:   { en: 'Gallery', hi: 'गैलरी' },
    heading: { en: 'Moments of Grace', hi: 'कृपा के क्षण' },
    viewAll: { en: 'View All', hi: 'सभी देखें' },
  },
  contact: {
    label:   { en: 'Connect with Us', hi: 'हमसे जुड़ें' },
    heading: { en: 'Inquire for a Katha', hi: 'कथा के लिए पूछताछ करें' },
    sub:     { en: 'Whether for a private family event or a large community gathering, we are here to bring the divine word to your space.', hi: 'चाहे एक निजी पारिवारिक कार्यक्रम हो या एक बड़ी सामुदायिक सभा, हम दिव्य वचन को आपके स्थान तक लाने के लिए यहाँ हैं।' },
    email:   'bookings@sanjaykrishnmishra.com',
    phone1:  '+91 XXXXX XXXXX (Nashik)',
    phone2:  '+91 XXXXX XXXXX (Jabalpur)',
    form: {
      firstName: { en: 'First Name', hi: 'पहला नाम' },
      lastName:  { en: 'Last Name',  hi: 'अंतिम नाम' },
      email:     { en: 'Email',      hi: 'ईमेल' },
      phone:     { en: 'Phone',      hi: 'फ़ोन' },
      service:   { en: 'Service',    hi: 'सेवा' },
      message:   { en: 'Message',    hi: 'संदेश' },
      submit:    { en: 'Send Inquiry', hi: 'पूछताछ भेजें' },
      services: [
        { en: 'Shrimad Bhagavat Katha', hi: 'श्रीमद् भागवत कथा' },
        { en: 'Ram Katha',              hi: 'राम कथा' },
        { en: 'Shiv Purana',            hi: 'शिव पुराण' },
        { en: 'Vedic Astrology',        hi: 'वैदिक ज्योतिष' },
        { en: 'Puja & Anusthan',        hi: 'पूजा और अनुष्ठान' },
      ],
    },
  },
  footer: {
    logo:       { en: 'Sanjay Krishn Mishra', hi: 'संजय कृष्ण मिश्रा' },
    quote:      { en: '"May the divine grace of peace and love be with you always."', hi: '"शांति और प्रेम की दिव्य कृपा सदा आपके साथ रहे।"' },
    copyright:  { en: '© 2026 Prem Murti Sanjay Krishn Mishra. All rights reserved.', hi: '© 2026 प्रेम मूर्ति संजय कृष्ण मिश्रा। सर्वाधिकार सुरक्षित।' },
    links: [
      { en: 'About',          hi: 'परिचय',   href: '#about' },
      { en: 'Contact',        hi: 'संपर्क',  href: '#contact' },
      { en: 'Privacy Policy', hi: 'गोपनीयता नीति', href: '#' },
    ],
  },
}
```

- [ ] **Step 3: Verify TypeScript compiles**
```bash
npx tsc --noEmit
```
Expected: No errors.

- [ ] **Step 4: Commit**
```bash
git add src/lib/
git commit -m "feat: add bilingual content system and LanguageContext"
```

---

## Task 4: Layout + Page Shell

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Write layout.tsx with fonts and LanguageProvider**

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next'
import { Literata, Manrope } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/lib/LanguageContext'

const literata = Literata({
  subsets: ['latin'],
  variable: '--font-literata',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Prem Murti Sanjay Krishn Mishra — Katha & Astrology',
  description: 'Official website of Prem Murti Sanjay Krishn Mishra — revered Katha Vachak and Vedic Astrologer based in Tryambakeshwar Nashik and Jabalpur.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${literata.variable} ${manrope.variable} scroll-smooth`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Update tailwind.config.ts to use CSS variables for fonts**

In `tailwind.config.ts`, update `fontFamily`:
```ts
fontFamily: {
  'headline': ['var(--font-literata)', 'Georgia', 'serif'],
  'body':     ['var(--font-manrope)', 'system-ui', 'sans-serif'],
},
```

- [ ] **Step 3: Write page.tsx shell (all sections imported but stubbed)**

```tsx
// src/app/page.tsx
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import EventsSection from '@/components/EventsSection'
import QuoteSection from '@/components/QuoteSection'
import MediaSection from '@/components/MediaSection'
import GallerySection from '@/components/GallerySection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <EventsSection />
      <QuoteSection />
      <MediaSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 4: Create stub files for all components so the build passes**

Create each file with a minimal export. Example for each:
```tsx
// src/components/Navbar.tsx
export default function Navbar() { return <nav /> }
```

Repeat for: `HeroSection`, `AboutSection`, `ServicesSection`, `EventsSection`, `QuoteSection`, `MediaSection`, `GallerySection`, `ContactSection`, `Footer`.

- [ ] **Step 5: Build to verify no import errors**
```bash
npm run build
```
Expected: `✓ Compiled successfully`

- [ ] **Step 6: Commit**
```bash
git add src/app/ src/components/
git commit -m "feat: add layout with fonts, LanguageProvider, and page shell"
```

---

## Task 5: Navbar Component

**Files:**
- Modify: `src/components/Navbar.tsx`

- [ ] **Step 1: Implement full Navbar**

```tsx
// src/components/Navbar.tsx
'use client'
import { useEffect, useState } from 'react'
import { useLang } from '@/lib/LanguageContext'
import { content, t } from '@/lib/content'

export default function Navbar() {
  const { lang, toggle } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const c = content.nav

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { key: 'about',     href: '#about' },
    { key: 'events',    href: '#events' },
    { key: 'media',     href: '#media' },
    { key: 'gallery',   href: '#gallery' },
    { key: 'astrology', href: '#services' },
    { key: 'contact',   href: '#contact' },
  ] as const

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b border-transparent h-[72px] flex items-center ${scrolled ? 'scrolled border-outline-variant/30' : 'bg-transparent'}`}
    >
      <div className="flex justify-between items-center max-w-container mx-auto px-margin-mobile md:px-gutter w-full">
        {/* Logo */}
        <a href="#" className="font-headline text-headline-md font-bold italic text-primary tracking-tight">
          {t(c.logo, lang)}
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              className="font-body text-label-md text-on-surface-variant hover:text-primary transition-colors"
            >
              {t(c[key as keyof typeof c] as any, lang)}
            </a>
          ))}
        </div>

        {/* Right side: lang toggle + CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="hidden md:block font-body text-label-md text-secondary border border-outline-variant px-3 py-1.5 rounded-full hover:border-secondary transition-colors"
          >
            {lang === 'en' ? 'हि' : 'EN'}
          </button>
          <a
            href="#contact"
            className="shimmer-effect bg-gradient-to-r from-primary to-primary-container text-on-primary font-body text-label-md px-6 py-2.5 rounded-full shadow-lg hover:opacity-90 transition-all active:scale-95"
          >
            {t(c.bookNow, lang)}
          </a>
          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-on-surface"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-[72px] left-0 right-0 bg-surface-container-low border-b border-outline-variant shadow-lg md:hidden">
          <div className="flex flex-col px-margin-mobile py-4 gap-4">
            {links.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="font-body text-body-md text-on-surface-variant hover:text-primary transition-colors"
              >
                {t(c[key as keyof typeof c] as any, lang)}
              </a>
            ))}
            <button onClick={toggle} className="text-left font-body text-body-md text-secondary">
              {lang === 'en' ? 'हिंदी में देखें' : 'View in English'}
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
```

- [ ] **Step 2: Verify dev server — navbar appears fixed and transparent**
```bash
npm run dev
```
Open http://localhost:3000 — verify navbar renders, scroll to see glass effect.

- [ ] **Step 3: Commit**
```bash
git add src/components/Navbar.tsx
git commit -m "feat: add Navbar with scroll glass effect, lang toggle, mobile menu"
```

---

## Task 6: Hero Section

**Files:**
- Modify: `src/components/HeroSection.tsx`

- [ ] **Step 1: Implement HeroSection**

```tsx
// src/components/HeroSection.tsx
'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useLang } from '@/lib/LanguageContext'
import { content, t } from '@/lib/content'

export default function HeroSection() {
  const { lang } = useLang()
  const c = content.hero
  const imgRef = useRef<HTMLDivElement>(null)

  // Parallax on scroll
  useEffect(() => {
    const onScroll = () => {
      if (imgRef.current) {
        imgRef.current.style.transform = `translateY(${window.scrollY * 0.15}px) scale(1.1)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background image with parallax */}
      <div ref={imgRef} className="absolute inset-0 z-0 scale-110 will-change-transform">
        <Image
          src="/images/hero.jpg"
          alt="Prem Murti Sanjay Krishn Mishra"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Gradient overlay: left-heavy so text is readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-surface/85 via-surface/50 to-transparent z-[1]" />

      {/* Content */}
      <div className="relative z-10 max-w-container mx-auto px-margin-mobile md:px-gutter w-full">
        <div className="max-w-2xl reveal active">
          <span className="font-body text-label-md text-secondary tracking-widest block mb-4 uppercase">
            {t(c.label, lang)}
          </span>
          <h1 className="font-headline text-display-lg-mobile md:text-display-lg text-on-surface mb-6 leading-tight">
            {t(c.headline, lang)}
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant mb-10 max-w-xl">
            {t(c.sub, lang)}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="shimmer-effect animate-float bg-gradient-to-r from-primary to-primary-container text-on-primary font-body text-label-md px-10 py-4 rounded-full shadow-xl hover:opacity-90 transition-all text-center"
            >
              {t(c.cta1, lang)}
            </a>
            <a
              href="#media"
              className="border-[1.5px] border-secondary text-secondary font-body text-label-md px-10 py-4 rounded-full hover:bg-secondary/5 transition-all text-center"
            >
              {t(c.cta2, lang)}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add placeholder hero image**

Place any landscape image at `public/images/hero.jpg`. Until the client provides one, copy `public/images/placeholder.jpg` and rename it:
```bash
cp public/images/placeholder.jpg public/images/hero.jpg
```

- [ ] **Step 3: Verify — hero fills screen with image and text overlay**
```bash
npm run dev
```
Open http://localhost:3000, verify full-screen hero renders.

- [ ] **Step 4: Commit**
```bash
git add src/components/HeroSection.tsx public/images/hero.jpg
git commit -m "feat: add Hero section with parallax and shimmer CTAs"
```

---

## Task 7: About Section

**Files:**
- Modify: `src/components/AboutSection.tsx`

- [ ] **Step 1: Implement AboutSection**

```tsx
// src/components/AboutSection.tsx
'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useLang } from '@/lib/LanguageContext'
import { content, t } from '@/lib/content'

export default function AboutSection() {
  const { lang } = useLang()
  const c = content.about
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-section-padding bg-surface">
      <div className="max-w-container mx-auto px-margin-mobile md:px-gutter">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Photo */}
          <div className="reveal relative rounded-4xl overflow-hidden ethereal-shadow group">
            <Image
              src="/images/about.jpg"
              alt="Pandit Sanjay Krishn Mishra"
              width={600}
              height={600}
              className="w-full h-[600px] object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-white italic font-headline text-headline-md">
                {t(c.photo_quote, lang)}
              </p>
            </div>
          </div>

          {/* Text */}
          <div className="reveal reveal-delay-200">
            <span className="font-body text-label-md text-secondary uppercase tracking-[0.2em] block mb-6">
              {t(c.label, lang)}
            </span>
            <h2 className="font-headline text-headline-lg text-on-surface mb-8">
              {t(c.heading, lang)}
            </h2>
            <div className="space-y-6 font-body text-body-lg text-on-surface-variant">
              <p>{t(c.p1, lang)}</p>
              <p>{t(c.p2, lang)}</p>
            </div>

            <a
              href="#contact"
              className="shimmer-effect inline-block mt-10 bg-gradient-to-r from-primary to-primary-container text-on-primary font-body text-label-md px-8 py-3 rounded-full shadow-lg hover:opacity-90 transition-all"
            >
              {t(c.readMore, lang)}
            </a>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 gap-8">
              {c.stats.map(stat => (
                <div key={stat.value}>
                  <span className="block font-headline text-4xl font-bold text-primary mb-1">
                    {stat.value}
                  </span>
                  <span className="font-body text-label-md text-on-surface-variant uppercase tracking-wider">
                    {t(stat.label, lang)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add about placeholder image**
```bash
cp public/images/placeholder.jpg public/images/about.jpg
```

- [ ] **Step 3: Verify**
```bash
npm run dev
```
Scroll to About — verify 2-column layout with stats.

- [ ] **Step 4: Commit**
```bash
git add src/components/AboutSection.tsx public/images/about.jpg
git commit -m "feat: add About section with bio, stats, and scroll reveal"
```

---

## Task 8: Services Section

**Files:**
- Modify: `src/components/ServicesSection.tsx`

- [ ] **Step 1: Implement ServicesSection**

```tsx
// src/components/ServicesSection.tsx
'use client'
import { useEffect, useRef } from 'react'
import { useLang } from '@/lib/LanguageContext'
import { content, t } from '@/lib/content'

export default function ServicesSection() {
  const { lang } = useLang()
  const c = content.services
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.15 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Card tilt on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rotateX = (y - rect.height / 2) / 20
    const rotateY = (rect.width / 2 - x) / 20
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`
  }
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)'
  }

  return (
    <section id="services" ref={sectionRef} className="py-section-padding bg-surface-container-low">
      <div className="max-w-container mx-auto px-margin-mobile md:px-gutter">
        <div className="text-center mb-16 reveal">
          <span className="font-body text-label-md text-secondary uppercase tracking-widest block mb-4">
            {t(c.label, lang)}
          </span>
          <h2 className="font-headline text-headline-lg text-on-surface">
            {t(c.heading, lang)}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {c.items.map((item, i) => (
            <div
              key={i}
              className={`glass-card p-8 rounded-3xl reveal reveal-delay-${(i + 1) * 100} transition-transform duration-500 cursor-default`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary" style={{ fontSize: '28px' }}>
                  {item.icon}
                </span>
              </div>
              <h3 className="font-headline text-headline-md text-on-surface mb-2">
                {t(item.title, lang)}
              </h3>
              <p className="font-body text-body-md text-on-surface-variant mb-8 leading-relaxed">
                {t(item.desc, lang)}
              </p>
              <a
                href="#contact"
                className="font-body text-label-md text-secondary border-b border-secondary pb-0.5 hover:text-primary hover:border-primary transition-colors"
              >
                {t(item.cta, lang)} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**
```bash
git add src/components/ServicesSection.tsx
git commit -m "feat: add Services section with glass cards and tilt effect"
```

---

## Task 9: Events + Quote + Media Sections

**Files:**
- Modify: `src/components/EventsSection.tsx`
- Modify: `src/components/QuoteSection.tsx`
- Modify: `src/components/MediaSection.tsx`

- [ ] **Step 1: Implement EventsSection**

```tsx
// src/components/EventsSection.tsx
'use client'
import { useEffect, useRef } from 'react'
import { useLang } from '@/lib/LanguageContext'
import { content, t } from '@/lib/content'

export default function EventsSection() {
  const { lang } = useLang()
  const c = content.events
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="events" ref={sectionRef} className="py-section-padding bg-surface">
      <div className="max-w-container mx-auto px-margin-mobile md:px-gutter">
        <div className="text-center mb-16 reveal">
          <span className="font-body text-label-md text-secondary uppercase tracking-widest block mb-4">
            {t(c.label, lang)}
          </span>
          <h2 className="font-headline text-headline-lg text-on-surface mb-4">{t(c.heading, lang)}</h2>
          <p className="font-body text-body-md text-on-surface-variant max-w-xl mx-auto">{t(c.sub, lang)}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {c.items.map((event, i) => (
            <div
              key={i}
              className={`glass-card p-2 rounded-3xl reveal reveal-delay-${(i + 1) * 100} hover:-translate-y-2 transition-transform duration-500`}
            >
              <div className="h-48 rounded-2xl overflow-hidden mb-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary opacity-40" style={{ fontSize: '80px' }}>
                  temple_hindu
                </span>
              </div>
              <div className="p-6">
                <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full font-body text-[12px] tracking-wider mb-4 inline-block">
                  {event.dates}
                </span>
                <h3 className="font-headline text-headline-md text-on-surface mb-2">{t(event.title, lang)}</h3>
                <p className="font-body text-label-md text-on-surface-variant flex items-center gap-2 mb-6">
                  <span className="material-symbols-outlined text-secondary" style={{ fontSize: '18px' }}>location_on</span>
                  {t(event.location, lang)}
                </p>
                <a
                  href="#contact"
                  className="shimmer-effect block w-full py-3 rounded-full border border-outline text-center font-body text-label-md hover:bg-primary hover:text-on-primary hover:border-primary transition-all"
                >
                  {t(c.register, lang)}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Implement QuoteSection**

```tsx
// src/components/QuoteSection.tsx
'use client'
import { useEffect, useRef } from 'react'
import { useLang } from '@/lib/LanguageContext'
import { content, t } from '@/lib/content'

export default function QuoteSection() {
  const { lang } = useLang()
  const c = content.quote
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.2 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-section-padding bg-surface-container-highest relative overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-margin-mobile text-center reveal">
        <div className="w-24 h-px bg-primary mx-auto mb-12" />
        {/* Lotus icon — using emoji as placeholder, replace with SVG if desired */}
        <div className="text-5xl mx-auto mb-8 animate-float opacity-60">🪷</div>
        <blockquote className="font-headline italic text-2xl md:text-4xl text-primary leading-relaxed mb-12 hover:scale-105 transition-transform duration-700">
          {t(c.text, lang)}
        </blockquote>
        <p className="font-body text-label-md tracking-widest text-on-surface-variant uppercase">
          {t(c.attr, lang)}
        </p>
        <div className="w-24 h-px bg-primary mx-auto mt-12" />
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Implement MediaSection**

```tsx
// src/components/MediaSection.tsx
'use client'
import { useEffect, useRef } from 'react'
import { useLang } from '@/lib/LanguageContext'
import { content, t } from '@/lib/content'

export default function MediaSection() {
  const { lang } = useLang()
  const c = content.media
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="media" ref={sectionRef} className="py-section-padding bg-surface-container-low">
      <div className="max-w-container mx-auto px-margin-mobile md:px-gutter">
        <div className="flex justify-between items-end mb-16 reveal">
          <div>
            <span className="font-body text-label-md text-secondary uppercase tracking-widest block mb-4">
              {t(c.label, lang)}
            </span>
            <h2 className="font-headline text-headline-lg text-on-surface mb-2">{t(c.heading, lang)}</h2>
            <p className="font-body text-body-md text-on-surface-variant">{t(c.sub, lang)}</p>
          </div>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 text-secondary font-body text-label-md border-b border-secondary hover:translate-x-1 transition-transform"
          >
            {t(c.youtube, lang)}
            <span className="material-symbols-outlined text-sm">arrow_outward</span>
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {c.videos.map((video, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-4xl ethereal-shadow reveal reveal-delay-${i * 200}`}
            >
              {/* Thumbnail placeholder */}
              <div className="w-full aspect-video bg-gradient-to-br from-primary/30 to-secondary/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                <span className="material-symbols-outlined text-primary/30" style={{ fontSize: '80px' }}>
                  videocam
                </span>
              </div>
              {/* Play overlay */}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-all">
                <a
                  href={video.youtubeId ? `https://youtube.com/watch?v=${video.youtubeId}` : '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform"
                >
                  <span
                    className="material-symbols-outlined text-white text-4xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    play_arrow
                  </span>
                </a>
              </div>
              {/* Title overlay */}
              <div className="absolute bottom-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform">
                <h3 className="text-white font-headline text-headline-md">{t(video.title, lang)}</h3>
                <p className="text-white/70 font-body text-label-md">{t(video.sub, lang)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Commit**
```bash
git add src/components/EventsSection.tsx src/components/QuoteSection.tsx src/components/MediaSection.tsx
git commit -m "feat: add Events, Quote, and Media sections"
```

---

## Task 10: Gallery Section

**Files:**
- Modify: `src/components/GallerySection.tsx`

- [ ] **Step 1: Implement GallerySection**

```tsx
// src/components/GallerySection.tsx
'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useLang } from '@/lib/LanguageContext'
import { content, t } from '@/lib/content'

// Placeholder gallery images — replace with client photos in public/images/gallery/
const GALLERY_IMAGES = [
  '/images/gallery/1.jpg',
  '/images/gallery/2.jpg',
  '/images/gallery/3.jpg',
  '/images/gallery/4.jpg',
  '/images/gallery/5.jpg',
  '/images/gallery/6.jpg',
]

export default function GallerySection() {
  const { lang } = useLang()
  const c = content.gallery
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Copy placeholder for gallery images that don't exist yet
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="gallery" ref={sectionRef} className="py-section-padding bg-surface">
      <div className="max-w-container mx-auto px-margin-mobile md:px-gutter">
        <div className="text-center mb-12 reveal">
          <span className="font-body text-label-md text-secondary uppercase tracking-widest block mb-4">
            {t(c.label, lang)}
          </span>
          <h2 className="font-headline text-headline-lg text-on-surface">{t(c.heading, lang)}</h2>
        </div>

        {/* Masonry grid */}
        <div className="columns-1 md:columns-3 gap-8 space-y-8">
          {GALLERY_IMAGES.map((src, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${(i % 3) * 100} overflow-hidden rounded-3xl break-inside-avoid`}
            >
              <Image
                src={src}
                alt={`Gallery ${i + 1}`}
                width={400}
                height={300}
                className="w-full hover:scale-110 transition-transform duration-1000 object-cover"
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-12 reveal">
          <button className="shimmer-effect border-[1.5px] border-primary text-primary font-body text-label-md px-10 py-3 rounded-full hover:bg-primary hover:text-on-primary transition-all">
            {t(c.viewAll, lang)}
          </button>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Copy placeholder images into gallery folder**
```bash
for i in 1 2 3 4 5 6; do cp public/images/placeholder.jpg public/images/gallery/$i.jpg; done
```

- [ ] **Step 3: Commit**
```bash
git add src/components/GallerySection.tsx public/images/gallery/
git commit -m "feat: add Gallery section with masonry grid and hover zoom"
```

---

## Task 11: Contact Section + API Route

**Files:**
- Modify: `src/components/ContactSection.tsx`
- Create: `src/app/api/contact/route.ts`

- [ ] **Step 1: Create API contact route**

```ts
// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { firstName, lastName, email, phone, service, message } = body

  if (!firstName || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  await transporter.sendMail({
    from: `"Website Inquiry" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL ?? 'bookings@sanjaykrishnmishra.com',
    subject: `New Booking Inquiry: ${service} from ${firstName} ${lastName}`,
    html: `
      <h2>New Inquiry from Website</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  })

  return NextResponse.json({ success: true })
}
```

- [ ] **Step 2: Create .env.local for SMTP config**

```bash
# .env.local (never commit this file)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_gmail@gmail.com
SMTP_PASS=your_app_password
CONTACT_EMAIL=bookings@sanjaykrishnmishra.com
```

Add to `.gitignore`:
```
.env.local
```

- [ ] **Step 3: Implement ContactSection**

```tsx
// src/components/ContactSection.tsx
'use client'
import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/lib/LanguageContext'
import { content, t } from '@/lib/content'

export default function ContactSection() {
  const { lang } = useLang()
  const c = content.contact
  const sectionRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', service: '', message: ''
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('sent')
      setForm({ firstName: '', lastName: '', email: '', phone: '', service: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputClass = "w-full bg-surface-container-low border-none rounded-2xl p-4 font-body text-body-md focus:ring-1 focus:ring-secondary outline-none transition-all"

  return (
    <section id="contact" ref={sectionRef} className="py-section-padding bg-surface-container-low">
      <div className="max-w-container mx-auto px-margin-mobile md:px-gutter">
        <div className="glass-card rounded-[3rem] p-8 md:p-20 reveal">
          <div className="grid md:grid-cols-2 gap-16 items-start">

            {/* Left: info */}
            <div>
              <span className="font-body text-label-md text-secondary uppercase tracking-widest block mb-4">
                {t(c.label, lang)}
              </span>
              <h2 className="font-headline text-headline-lg text-on-surface mb-6">{t(c.heading, lang)}</h2>
              <p className="font-body text-body-lg text-on-surface-variant mb-12">{t(c.sub, lang)}</p>
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-on-surface-variant group">
                  <span className="material-symbols-outlined text-primary p-3 bg-primary/10 rounded-full group-hover:scale-110 transition-transform">mail</span>
                  <span className="font-body text-body-md">{c.email}</span>
                </div>
                <div className="flex items-center gap-4 text-on-surface-variant group">
                  <span className="material-symbols-outlined text-primary p-3 bg-primary/10 rounded-full group-hover:scale-110 transition-transform">call</span>
                  <div>
                    <p className="font-body text-body-md">{c.phone1}</p>
                    <p className="font-body text-body-md">{c.phone2}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-on-surface-variant group">
                  <span className="material-symbols-outlined text-primary p-3 bg-primary/10 rounded-full group-hover:scale-110 transition-transform">location_on</span>
                  <span className="font-body text-body-md">Tryambakeshwar, Nashik & Jabalpur, MP</span>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input name="firstName" value={form.firstName} onChange={handleChange} className={inputClass} placeholder={t(c.form.firstName, lang)} required />
                <input name="lastName"  value={form.lastName}  onChange={handleChange} className={inputClass} placeholder={t(c.form.lastName, lang)} />
              </div>
              <input name="email" type="email" value={form.email} onChange={handleChange} className={inputClass} placeholder={t(c.form.email, lang)} required />
              <input name="phone" type="tel"   value={form.phone} onChange={handleChange} className={inputClass} placeholder={t(c.form.phone, lang)} />
              <select name="service" value={form.service} onChange={handleChange} className={`${inputClass} text-on-surface-variant`}>
                <option value="">{t(c.form.service, lang)}</option>
                {c.form.services.map((s, i) => (
                  <option key={i} value={t(s, 'en')}>{t(s, lang)}</option>
                ))}
              </select>
              <textarea name="message" value={form.message} onChange={handleChange} className={inputClass} placeholder={t(c.form.message, lang)} rows={4} required />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="shimmer-effect w-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-body text-label-md py-4 rounded-full shadow-lg hover:opacity-90 transition-all disabled:opacity-60"
              >
                {status === 'sending' ? '...' : t(c.form.submit, lang)}
              </button>
              {status === 'sent'  && <p className="text-center text-green-700 font-body text-label-md">✓ Message sent successfully!</p>}
              {status === 'error' && <p className="text-center text-red-600 font-body text-label-md">Failed to send. Please try again.</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Build to verify API route compiles**
```bash
npm run build
```
Expected: `✓ Compiled successfully`

- [ ] **Step 5: Commit**
```bash
git add src/components/ContactSection.tsx src/app/api/ .gitignore
git commit -m "feat: add Contact section and /api/contact email route"
```

---

## Task 12: Footer

**Files:**
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Implement Footer**

```tsx
// src/components/Footer.tsx
'use client'
import { useLang } from '@/lib/LanguageContext'
import { content, t } from '@/lib/content'

export default function Footer() {
  const { lang } = useLang()
  const c = content.footer

  return (
    <footer className="bg-surface-container-low py-20 border-t border-outline-variant/30">
      <div className="max-w-container mx-auto px-margin-mobile md:px-gutter flex flex-col items-center gap-8 text-center">
        <div className="font-headline text-headline-md text-primary font-bold italic">
          {t(c.logo, lang)}
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {c.links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="font-body text-label-md text-on-surface-variant hover:text-secondary transition-colors duration-300"
            >
              {t(link, lang)}
            </a>
          ))}
        </div>

        {/* Social icons */}
        <div className="flex gap-6 mt-2">
          {/* Facebook */}
          <a href="#" className="text-secondary hover:opacity-100 opacity-70 hover:scale-110 transition-all">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          {/* Instagram */}
          <a href="#" className="text-secondary hover:opacity-100 opacity-70 hover:scale-110 transition-all">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
          </a>
          {/* YouTube */}
          <a href="#" className="text-secondary hover:opacity-100 opacity-70 hover:scale-110 transition-all">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.872.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
        </div>

        <p className="font-headline italic text-primary/60 max-w-lg mt-4">
          {t(c.quote, lang)}
        </p>
        <p className="font-body text-[12px] text-on-surface-variant/60">
          {t(c.copyright, lang)}
        </p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**
```bash
git add src/components/Footer.tsx
git commit -m "feat: add Footer with social links and bilingual content"
```

---

## Task 13: Final Build & Polish

**Files:** None new — verify everything works end-to-end.

- [ ] **Step 1: Run full build**
```bash
npm run build
```
Expected: `✓ Compiled successfully` with no TypeScript errors.

- [ ] **Step 2: Run dev and walk through all sections**
```bash
npm run dev
```
Manual checks:
- [ ] Navbar: transparent → glass on scroll, lang toggle works (EN ↔ हि), mobile menu opens
- [ ] Hero: full-screen, parallax on scroll, shimmer button animation, float on CTA
- [ ] About: 2-column, stats show, scroll reveal fires
- [ ] Services: 3 glass cards, tilt on mouse move
- [ ] Events: 3 cards with dates and locations
- [ ] Quote: centered italic quote with float lotus
- [ ] Media: 2 video thumbnails with play overlay
- [ ] Gallery: masonry 3-col layout, hover zoom
- [ ] Contact: form renders, submit shows "..." then success/error
- [ ] Footer: all links and social icons present

- [ ] **Step 3: Add .env.local to .gitignore (if not already done)**
```bash
echo ".env.local" >> .gitignore
```

- [ ] **Step 4: Update CLAUDE.md with dev commands**

Update `CLAUDE.md` in the project root:
```markdown
## Commands

```bash
npm run dev      # start dev server on port 3000
npm run build    # production build
npm run lint     # ESLint check
```

## Environment Variables
Copy `.env.local.example` to `.env.local` and fill in SMTP credentials.
Required: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_EMAIL`
```

- [ ] **Step 5: Final commit**
```bash
git add .
git commit -m "feat: complete spiritual website — all sections, bilingual, contact form"
```

---

## Self-Review Checklist

**Spec coverage:**
- [x] Navbar with glass scroll, lang toggle, mobile menu → Task 5
- [x] Hero with parallax, shimmer, float → Task 6
- [x] About 2-col, photo left, stats → Task 7
- [x] Services 3 glass cards, tilt → Task 8
- [x] Events 3 cards → Task 9
- [x] Quote section with lotus → Task 9
- [x] Media 2 video thumbnails → Task 9
- [x] Gallery masonry → Task 10
- [x] Contact form + API route → Task 11
- [x] Footer → Task 12
- [x] Bilingual EN/HI via content.ts + LanguageContext → Task 3
- [x] Sacred Radiance Tailwind tokens → Task 2
- [x] All animations (shimmer, reveal, float, tilt, parallax) → Task 2 + components

**Type consistency:**
- `useLang()` returns `{ lang, toggle }` — used consistently across all components
- `t(BiText, lang)` signature defined in `content.ts` — used identically everywhere
- `content.nav.logo` is `BiText` — accessed as `t(c.logo, lang)` in Navbar ✓
- `content.services.items[i].cta` is `BiText` — accessed correctly in ServicesSection ✓
