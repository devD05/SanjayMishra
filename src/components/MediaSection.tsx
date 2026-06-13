'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useLang } from '@/lib/LanguageContext'
import { content, t } from '@/lib/content'

export default function MediaSection() {
  const { lang } = useLang()
  const c = content.media
  const sectionRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    const cardWidth = scrollRef.current.offsetWidth / 2
    scrollRef.current.scrollBy({ left: dir === 'right' ? cardWidth : -cardWidth, behavior: 'smooth' })
  }

  return (
    <section id="media" ref={sectionRef} className="py-section-padding bg-surface-container-low">
      <div className="max-w-container mx-auto px-margin-mobile md:px-gutter">

        {/* Header */}
        <div className="flex justify-between items-end mb-12 reveal">
          <div>
            <span className="font-body text-label-md text-secondary uppercase tracking-widest block mb-4">
              {t(c.label, lang)}
            </span>
            <h2 className="font-headline text-headline-lg text-on-surface mb-2">{t(c.heading, lang)}</h2>
            <p className="font-body text-body-md text-on-surface-variant">{t(c.sub, lang)}</p>
          </div>
          <a
            href="https://www.youtube.com/@sanjaykrishnamishraofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 text-secondary font-body text-label-md border-b border-secondary hover:translate-x-1 transition-transform"
          >
            {t(c.youtube, lang)}
            <span className="material-symbols-outlined text-sm">arrow_outward</span>
          </a>
        </div>

        {/* Carousel wrapper */}
        <div className="relative reveal">
          {/* Left arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-surface-container-highest rounded-full shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all"
            aria-label="Scroll left"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          {/* Scrollable track — 2 cards visible, rest scroll horizontally */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {c.videos.map((video, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-[1.5rem] ethereal-shadow flex-none"
                style={{ width: 'calc(50% - 12px)' }}
              >
                {/* Thumbnail */}
                <div className="w-full aspect-video relative overflow-hidden">
                  <Image
                    src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                    alt={t(video.title, 'en')}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    style={{ filter: 'contrast(1.08) brightness(0.92) saturate(1.1)' }}
                  />
                </div>

                {/* Play overlay */}
                <div className="absolute inset-0 bg-black/25 flex items-center justify-center group-hover:bg-black/45 transition-all">
                  <a
                    href={`https://youtube.com/watch?v=${video.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-20 h-20 md:w-16 md:h-16 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform"
                  >
                    <span
                      className="material-symbols-outlined text-white text-5xl md:text-3xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      play_arrow
                    </span>
                  </a>
                </div>

                {/* Title overlay */}
                <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform">
                  <h3 className="text-white font-headline text-headline-md leading-tight">{t(video.title, lang)}</h3>
                  <p className="text-white/70 font-body text-label-md mt-1">{t(video.sub, lang)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-surface-container-highest rounded-full shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all"
            aria-label="Scroll right"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: Math.ceil(c.videos.length / 2) }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollRef.current?.scrollTo({ left: scrollRef.current.offsetWidth * i, behavior: 'smooth' })}
              className="w-2 h-2 rounded-full bg-outline hover:bg-primary transition-colors"
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
