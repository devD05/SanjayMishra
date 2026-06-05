'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useLang } from '@/lib/LanguageContext'
import { content, t } from '@/lib/content'

export default function HeroSection() {
  const { lang } = useLang()
  const c = content.hero
  const imgRef = useRef<HTMLDivElement>(null)

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
    <section className="relative min-h-screen flex items-center overflow-hidden pt-[72px]">
      <div ref={imgRef} className="absolute inset-0 z-0 scale-110 will-change-transform">
        <Image
          src="/images/hero.jpg"
          alt="Prem Murti Sanjay Krishn Mishra"
          fill
          className="object-cover"
          priority
          style={{
            objectPosition: '52% center',
            filter: 'contrast(1.08) brightness(0.82) saturate(1.15)',
          }}
        />
      </div>

      {/* Mobile: dark overlay for readable white text over image */}
      <div className="absolute inset-0 z-[1] md:hidden"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.25) 100%)'
        }}
      />

      {/* Desktop: gradient right → left: text area fully clear on right, face on left stays visible */}
      <div className="absolute inset-0 z-[1] hidden md:block"
        style={{
          background: 'linear-gradient(to left, rgba(250,249,245,0.97) 0%, rgba(250,249,245,0.88) 35%, rgba(250,249,245,0.55) 55%, rgba(250,249,245,0.10) 75%, transparent 100%)'
        }}
      />

      <div className="relative z-10 max-w-container mx-auto px-margin-mobile md:px-gutter w-full flex justify-center md:justify-end">
        <div className="max-w-lg reveal active text-center md:text-left">
          <span className="font-body text-label-md text-secondary-container md:text-secondary tracking-widest block mb-4 uppercase">
            {t(c.label, lang)}
          </span>
          <h1 className="font-headline text-display-lg-mobile md:text-display-lg text-white md:text-on-surface mb-6 leading-tight">
            {t(c.headline, lang)}
          </h1>
          <p className="font-body text-body-lg text-white/80 md:text-on-surface-variant mb-10 max-w-xl">
            {t(c.sub, lang)}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="#contact"
              className="shimmer-effect animate-float bg-gradient-to-r from-primary to-primary-container text-on-primary font-body text-label-md px-10 py-4 rounded-full shadow-xl hover:opacity-90 transition-all text-center"
            >
              {t(c.cta1, lang)}
            </a>
            <a
              href="#media"
              className="border-[1.5px] border-white/60 text-white md:border-secondary md:text-secondary font-body text-label-md px-10 py-4 rounded-full hover:bg-white/10 md:hover:bg-secondary/5 transition-all text-center"
            >
              {t(c.cta2, lang)}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
