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
              className={`glass-card p-8 rounded-[1.5rem] reveal reveal-delay-${((i % 3) + 1) * 100} transition-transform duration-500 cursor-default`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-[1rem] flex items-center justify-center mb-6">
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
