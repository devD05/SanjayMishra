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

          <div className="reveal relative rounded-[2rem] overflow-hidden ethereal-shadow group">
            <Image
              src="/images/about.jpg"
              alt="Pandit Sanjay Krishn Mishra"
              width={600}
              height={600}
              className="w-full h-[600px] object-cover object-top group-hover:scale-105 transition-transform duration-1000"
              style={{ filter: 'contrast(1.1) brightness(1.08) saturate(1.15)' }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-white italic font-headline text-headline-md">
                {t(c.photo_quote, lang)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
