'use client'
import Image from 'next/image'
import { useLang } from '@/lib/LanguageContext'
import { content, t } from '@/lib/content'

export default function HeroSection() {
  const { lang } = useLang()
  const c = content.hero
  const stats = content.about.stats

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-[#faf9f5] pt-[72px]">

      {/* Lotus mandala watermark */}
      <div className="absolute top-1/2 left-[27%] -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none opacity-[0.045] w-[640px] h-[640px] hidden md:block">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <ellipse key={i} cx="100" cy="100" rx="16" ry="44" fill="#8f4e00"
              transform={`rotate(${angle} 100 100)`} />
          ))}
          <circle cx="100" cy="100" r="18" fill="#8f4e00" />
          <circle cx="100" cy="100" r="82" stroke="#8f4e00" strokeWidth="0.8" fill="none" />
          <circle cx="100" cy="100" r="68" stroke="#8f4e00" strokeWidth="0.4" fill="none" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180
            return (
              <circle key={i}
                cx={100 + 77 * Math.sin(rad)}
                cy={100 - 77 * Math.cos(rad)}
                r="2.5" fill="#8f4e00" />
            )
          })}
        </svg>
      </div>

      {/* Dot grid accent — top left */}
      <div className="absolute top-20 left-6 z-0 pointer-events-none opacity-[0.07] hidden md:block">
        <svg width="72" height="72" viewBox="0 0 72 72">
          {[0, 1, 2, 3, 4].flatMap(row =>
            [0, 1, 2, 3, 4].map(col => (
              <circle key={`${row}-${col}`} cx={col * 14 + 7} cy={row * 14 + 7} r="2" fill="#8f4e00" />
            ))
          )}
        </svg>
      </div>

      {/* Dot grid accent — bottom right of text area */}
      <div className="absolute bottom-16 left-[48%] z-0 pointer-events-none opacity-[0.06] hidden md:block">
        <svg width="56" height="56" viewBox="0 0 56 56">
          {[0, 1, 2, 3].flatMap(row =>
            [0, 1, 2, 3].map(col => (
              <circle key={`${row}-${col}`} cx={col * 14 + 7} cy={row * 14 + 7} r="2" fill="#8f4e00" />
            ))
          )}
        </svg>
      </div>

      {/* Main split layout */}
      <div className="relative z-10 flex min-h-[calc(100vh-72px)] flex-col md:flex-row">

        {/* LEFT: Text content */}
        <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-20 py-14 md:py-20 md:w-[54%] lg:w-[52%]">
          <div className="max-w-xl">

            {/* Label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-primary flex-shrink-0" />
              <span className="font-body text-label-md text-primary tracking-widest uppercase">
                {t(c.label, lang)}
              </span>
            </div>

            {/* Name */}
            <h1 className="font-headline text-display-lg-mobile md:text-display-lg text-on-surface leading-tight mb-4">
              {lang === 'en' ? (
                <>
                  Prem Murti<br />
                  <span className="text-primary">Sanjay Krishn</span><br />
                  Mishra
                </>
              ) : (
                <>
                  प्रेम मूर्ति<br />
                  <span className="text-primary">संजय कृष्ण</span><br />
                  मिश्रा
                </>
              )}
            </h1>

            {/* Tagline */}
            <p className="font-headline text-headline-md text-on-surface-variant italic mb-6 leading-snug">
              {lang === 'en'
                ? 'A Voice of Devotion, Wisdom & Inspiration'
                : 'भक्ति, ज्ञान और प्रेरणा की आवाज़'}
            </p>

            {/* Divider */}
            <div className="w-14 h-0.5 bg-secondary-container mb-6" />

            {/* Description */}
            <p className="font-body text-body-lg text-on-surface-variant mb-10 leading-relaxed">
              {t(c.sub, lang)}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href="#contact"
                className="shimmer-effect bg-gradient-to-r from-primary to-primary-container text-on-primary font-body text-label-md px-10 py-4 rounded-full shadow-xl hover:opacity-90 transition-all text-center"
              >
                {t(c.cta1, lang)}
              </a>
              <a
                href="#media"
                className="border-[1.5px] border-primary text-primary font-body text-label-md px-10 py-4 rounded-full hover:bg-primary/5 transition-all text-center"
              >
                {t(c.cta2, lang)}
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4 pt-6 border-t border-outline-variant">
              {stats.map((s) => (
                <div key={s.value}>
                  <p className="font-headline text-headline-lg text-primary font-semibold leading-none">
                    {s.value}<span className="text-primary-container">+</span>
                  </p>
                  <p className="font-body text-body-md text-on-surface-variant mt-1 leading-tight">
                    {t(s.label, lang)}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* RIGHT: Photo */}
        <div className="relative md:flex-1 h-[75vw] md:h-auto order-first md:order-last">
          <Image
            src="/images/hero.jpg"
            alt="Prem Murti Sanjay Krishn Mishra"
            fill
            className="object-cover"
            priority
            style={{
              objectPosition: '52% 15%',
              filter: 'contrast(1.06) brightness(0.93) saturate(1.12)',
            }}
          />

          {/* Left fade — blends into cream */}
          <div className="absolute inset-0 hidden md:block" style={{
            background: 'linear-gradient(to right, #faf9f5 0%, rgba(250,249,245,0.55) 18%, rgba(250,249,245,0.1) 40%, transparent 60%)',
          }} />

          {/* Top fade */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to bottom, #faf9f5 0%, transparent 18%, transparent 80%, #faf9f5 100%)',
          }} />

          {/* Mobile bottom fade so text reads well when stacked */}
          <div className="absolute inset-0 md:hidden" style={{
            background: 'linear-gradient(to bottom, transparent 50%, rgba(250,249,245,0.8) 85%, #faf9f5 100%)',
          }} />
        </div>

      </div>
    </section>
  )
}
