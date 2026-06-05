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
        <div className="text-5xl mx-auto mb-8 animate-float opacity-60 select-none">🪷</div>
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
