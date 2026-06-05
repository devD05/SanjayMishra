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
    <section className="relative h-screen flex items-center overflow-hidden">
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

      {/* Strong gradient right → left: text area fully clear on right, face on left stays visible */}
      <div className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(to left, rgba(250,249,245,0.97) 0%, rgba(250,249,245,0.88) 35%, rgba(250,249,245,0.55) 55%, rgba(250,249,245,0.10) 75%, transparent 100%)'
        }}
      />

      <div className="relative z-10 max-w-container mx-auto px-margin-mobile md:px-gutter w-full flex justify-end">
        <div className="max-w-lg reveal active text-left">
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
