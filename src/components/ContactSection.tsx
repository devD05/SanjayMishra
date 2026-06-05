'use client'
import { useEffect, useRef } from 'react'
import { useLang } from '@/lib/LanguageContext'
import { content, t } from '@/lib/content'

export default function ContactSection() {
  const { lang } = useLang()
  const c = content.contact
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
    <section id="contact" ref={sectionRef} className="py-section-padding bg-surface-container-low">
      <div className="max-w-container mx-auto px-margin-mobile md:px-gutter">
        <div className="text-center mb-16 reveal">
          <span className="font-body text-label-md text-secondary uppercase tracking-widest block mb-4">
            {t(c.label, lang)}
          </span>
          <h2 className="font-headline text-headline-lg text-on-surface mb-4">
            {t(c.heading, lang)}
          </h2>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            {t(c.sub, lang)}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">

          {/* Phone Nashik */}
          <a
            href="tel:+917697417882"
            className="glass-card reveal reveal-delay-100 p-8 rounded-[1.5rem] flex flex-col items-center gap-4 hover:-translate-y-2 transition-transform duration-300 group text-center"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: '28px' }}>call</span>
            </div>
            <div>
              <p className="font-body text-label-md text-secondary uppercase tracking-widest mb-1">
                {lang === 'en' ? 'Nashik' : 'नाशिक'}
              </p>
              <p className="font-headline text-headline-md text-on-surface">{c.phone1}</p>
            </div>
          </a>

          {/* Phone Jabalpur */}
          <a
            href="tel:+917697417882"
            className="glass-card reveal reveal-delay-200 p-8 rounded-[1.5rem] flex flex-col items-center gap-4 hover:-translate-y-2 transition-transform duration-300 group text-center"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: '28px' }}>call</span>
            </div>
            <div>
              <p className="font-body text-label-md text-secondary uppercase tracking-widest mb-1">
                {lang === 'en' ? 'Jabalpur' : 'जबलपुर'}
              </p>
              <p className="font-headline text-headline-md text-on-surface">{c.phone2}</p>
            </div>
          </a>

          {/* Location */}
          <div className="glass-card reveal reveal-delay-300 p-8 rounded-[1.5rem] flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: '28px' }}>location_on</span>
            </div>
            <div>
              <p className="font-body text-label-md text-secondary uppercase tracking-widest mb-1">
                {lang === 'en' ? 'Locations' : 'स्थान'}
              </p>
              <p className="font-headline text-headline-md text-on-surface">
                {lang === 'en' ? 'Tryambakeshwar, Nashik' : 'त्र्यंबकेश्वर, नाशिक'}
              </p>
              <p className="font-body text-body-md text-on-surface-variant mt-1">
                {lang === 'en' ? '& Jabalpur, MP' : '& जबलपुर, मध्यप्रदेश'}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
