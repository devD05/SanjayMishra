# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal brand website for **Prem Murti Sanjay Krishn Mishra** — astrologer and katha wachak based in Tryambakeshwar (Nashik) and Jabalpur.

## Commands

```bash
npm run dev      # start dev server on port 3000
npm run build    # production build
npm run lint     # ESLint check
```

## Architecture

Next.js 14 App Router + Tailwind CSS. Single-page site with 10 scroll-anchored sections. All content is bilingual (EN/HI) via `src/lib/content.ts` + `src/lib/LanguageContext.tsx`.

### Key files

| File | Purpose |
|---|---|
| `src/lib/content.ts` | All bilingual text — edit this to update copy |
| `src/lib/LanguageContext.tsx` | EN/HI toggle React context |
| `src/app/globals.css` | Animation CSS: `.glass-card`, `.shimmer-effect`, `.reveal`, `animate-float` |
| `tailwind.config.ts` | Sacred Radiance color tokens |
| `src/app/api/contact/route.ts` | Contact form POST handler (Nodemailer) |

### Sections (in order)

`Navbar` → `HeroSection` → `AboutSection` → `ServicesSection` → `EventsSection` → `QuoteSection` → `MediaSection` → `GallerySection` → `ContactSection` → `Footer`

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:
- `SMTP_HOST` — e.g. `smtp.gmail.com`
- `SMTP_PORT` — e.g. `587`
- `SMTP_USER` — Gmail address
- `SMTP_PASS` — Gmail App Password
- `CONTACT_EMAIL` — where inquiries are sent

## Client Photos

Replace placeholder images with real client photos:
- `public/images/hero.jpg` — full-screen landscape photo for hero section
- `public/images/about.jpg` — portrait photo for about section
- `public/images/gallery/1.jpg` through `6.jpg` — gallery photos

## Deployment

Deploy to Vercel: connect the GitHub repo, add environment variables in Vercel dashboard.
