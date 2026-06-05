'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useLang } from '@/lib/LanguageContext'
import { content, t } from '@/lib/content'

const GALLERY_IMAGES = [
  { src: '/images/gallery/1.jpg',                                    alt: 'Katha Event' },
  { src: 'https://img.youtube.com/vi/1h9PoIhWgI8/maxresdefault.jpg', alt: 'Shrimad Bhagavat Katha' },
  { src: '/images/gallery/3.jpg',                                    alt: 'Spiritual Event' },
  { src: 'https://img.youtube.com/vi/yLgR1BO98J8/maxresdefault.jpg', alt: 'Katha Pravachan' },
  { src: 'https://img.youtube.com/vi/cOEqTykLzpQ/maxresdefault.jpg', alt: 'Bhagavat Katha' },
  { src: '/images/gallery/4.jpg',                                    alt: 'Devotional Ceremony' },
  { src: 'https://img.youtube.com/vi/PlAnHRW3WPU/maxresdefault.jpg', alt: 'Pravachan' },
  { src: '/images/gallery/2.jpg',                                    alt: 'Katha Event' },
]

export default function GallerySection() {
  const { lang } = useLang()
  const c = content.gallery
  const sectionRef = useRef<HTMLDivElement>(null)
  const [lightbox, setLightbox] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.08 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Close lightbox on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox(i => i !== null ? (i + 1) % GALLERY_IMAGES.length : null)
      if (e.key === 'ArrowLeft')  setLightbox(i => i !== null ? (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // 3D tilt
  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width  - 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5
    el.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.03)`
  }
  const resetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(800px) rotateY(0) rotateX(0) scale(1)'
  }

  return (
    <section id="gallery" ref={sectionRef} className="py-section-padding bg-surface">
      <div className="max-w-container mx-auto px-margin-mobile md:px-gutter">

        {/* Heading */}
        <div className="text-center mb-12 reveal">
          <span className="font-body text-label-md text-secondary uppercase tracking-widest block mb-4">
            {t(c.label, lang)}
          </span>
          <h2 className="font-headline text-headline-lg text-on-surface">{t(c.heading, lang)}</h2>
        </div>

        {/* Symmetrical bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[220px]">

          {/* Row 1: wide + square + square + wide */}
          {/* [0] spans 2 cols */}
          <div
            className="col-span-2 row-span-1 reveal reveal-delay-100 relative overflow-hidden rounded-2xl cursor-pointer group transition-transform duration-500"
            onMouseMove={handleTilt} onMouseLeave={resetTilt}
            onClick={() => setLightbox(0)}
          >
            <GalleryImage img={GALLERY_IMAGES[0]} />
          </div>

          {/* [1] 1 col */}
          <div
            className="col-span-1 row-span-1 reveal reveal-delay-200 relative overflow-hidden rounded-2xl cursor-pointer group transition-transform duration-500"
            onMouseMove={handleTilt} onMouseLeave={resetTilt}
            onClick={() => setLightbox(1)}
          >
            <GalleryImage img={GALLERY_IMAGES[1]} />
          </div>

          {/* [2] 1 col */}
          <div
            className="col-span-1 row-span-1 reveal reveal-delay-300 relative overflow-hidden rounded-2xl cursor-pointer group transition-transform duration-500"
            onMouseMove={handleTilt} onMouseLeave={resetTilt}
            onClick={() => setLightbox(2)}
          >
            <GalleryImage img={GALLERY_IMAGES[2]} />
          </div>

          {/* Row 2: square + square + wide */}
          {/* [3] 1 col */}
          <div
            className="col-span-1 row-span-1 reveal reveal-delay-100 relative overflow-hidden rounded-2xl cursor-pointer group transition-transform duration-500"
            onMouseMove={handleTilt} onMouseLeave={resetTilt}
            onClick={() => setLightbox(3)}
          >
            <GalleryImage img={GALLERY_IMAGES[3]} />
          </div>

          {/* [4] 1 col */}
          <div
            className="col-span-1 row-span-1 reveal reveal-delay-200 relative overflow-hidden rounded-2xl cursor-pointer group transition-transform duration-500"
            onMouseMove={handleTilt} onMouseLeave={resetTilt}
            onClick={() => setLightbox(4)}
          >
            <GalleryImage img={GALLERY_IMAGES[4]} />
          </div>

          {/* [5] spans 2 cols */}
          <div
            className="col-span-2 row-span-1 reveal reveal-delay-300 relative overflow-hidden rounded-2xl cursor-pointer group transition-transform duration-500"
            onMouseMove={handleTilt} onMouseLeave={resetTilt}
            onClick={() => setLightbox(5)}
          >
            <GalleryImage img={GALLERY_IMAGES[5]} />
          </div>

          {/* Row 3: wide + square + square */}
          {/* [6] spans 2 cols */}
          <div
            className="col-span-2 row-span-1 reveal reveal-delay-100 relative overflow-hidden rounded-2xl cursor-pointer group transition-transform duration-500"
            onMouseMove={handleTilt} onMouseLeave={resetTilt}
            onClick={() => setLightbox(6)}
          >
            <GalleryImage img={GALLERY_IMAGES[6]} />
          </div>

          {/* [7] spans 2 cols */}
          <div
            className="col-span-2 row-span-1 reveal reveal-delay-200 relative overflow-hidden rounded-2xl cursor-pointer group transition-transform duration-500"
            onMouseMove={handleTilt} onMouseLeave={resetTilt}
            onClick={() => setLightbox(7)}
          >
            <GalleryImage img={GALLERY_IMAGES[7]} />
          </div>

        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-4xl">close</span>
          </button>
          {/* Prev */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
            onClick={e => { e.stopPropagation(); setLightbox((lightbox - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length) }}
          >
            <span className="material-symbols-outlined text-5xl">chevron_left</span>
          </button>
          {/* Image */}
          <div
            className="relative max-w-4xl w-full max-h-[80vh] aspect-video rounded-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={GALLERY_IMAGES[lightbox].src}
              alt={GALLERY_IMAGES[lightbox].alt}
              fill
              className="object-contain"
              style={{ filter: 'contrast(1.08) brightness(1.02) saturate(1.1)' }}
            />
          </div>
          {/* Next */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
            onClick={e => { e.stopPropagation(); setLightbox((lightbox + 1) % GALLERY_IMAGES.length) }}
          >
            <span className="material-symbols-outlined text-5xl">chevron_right</span>
          </button>
          {/* Counter */}
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 font-body text-label-md">
            {lightbox + 1} / {GALLERY_IMAGES.length}
          </p>
        </div>
      )}
    </section>
  )
}

// Shared image tile component
function GalleryImage({ img }: { img: { src: string; alt: string } }) {
  return (
    <>
      <Image
        src={img.src}
        alt={img.alt}
        fill
        className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
        style={{ filter: 'contrast(1.1) saturate(1.15)' }}
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-between p-4">
        <p className="text-white font-body text-label-md truncate">{img.alt}</p>
        <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
          <span className="material-symbols-outlined text-white" style={{ fontSize: '18px' }}>zoom_in</span>
        </div>
      </div>
    </>
  )
}
