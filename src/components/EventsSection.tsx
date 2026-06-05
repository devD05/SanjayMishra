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
              className={`glass-card p-2 rounded-[1.5rem] reveal reveal-delay-${(i + 1) * 100} hover:-translate-y-2 transition-transform duration-500`}
            >
              <div className="h-48 rounded-[1.2rem] overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
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
