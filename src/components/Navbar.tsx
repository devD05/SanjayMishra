'use client'
import { useEffect, useState } from 'react'
import { useLang } from '@/lib/LanguageContext'
import { content, t } from '@/lib/content'

export default function Navbar() {
  const { lang, toggle } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const c = content.nav

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { key: 'about',     href: '#about' },
    { key: 'events',    href: '#events' },
    { key: 'media',     href: '#media' },
    { key: 'gallery',   href: '#gallery' },
    { key: 'astrology', href: '#services' },
    { key: 'contact',   href: '#contact' },
  ] as const

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b border-transparent h-[72px] flex items-center ${scrolled ? 'scrolled border-outline-variant/30' : 'bg-transparent'}`}
    >
      <div className="flex justify-between items-center max-w-container mx-auto px-margin-mobile md:px-gutter w-full">
        <a href="#" className="font-headline text-headline-md font-bold italic text-primary tracking-tight">
          {t(c.logo, lang)}
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              className="font-body text-label-md text-on-surface-variant hover:text-primary transition-colors"
            >
              {t(c[key as keyof typeof c] as { en: string; hi: string }, lang)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="hidden md:block font-body text-label-md text-secondary border border-outline-variant px-3 py-1.5 rounded-full hover:border-secondary transition-colors"
          >
            {lang === 'en' ? 'हि' : 'EN'}
          </button>
          <a
            href="#contact"
            className="shimmer-effect bg-gradient-to-r from-primary to-primary-container text-on-primary font-body text-label-md px-6 py-2.5 rounded-full shadow-lg hover:opacity-90 transition-all active:scale-95"
          >
            {t(c.bookNow, lang)}
          </a>
          <button
            className="md:hidden p-2 text-on-surface"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="absolute top-[72px] left-0 right-0 bg-surface-container-low border-b border-outline-variant shadow-lg md:hidden">
          <div className="flex flex-col px-margin-mobile py-4 gap-4">
            {links.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="font-body text-body-md text-on-surface-variant hover:text-primary transition-colors"
              >
                {t(c[key as keyof typeof c] as { en: string; hi: string }, lang)}
              </a>
            ))}
            <button onClick={toggle} className="text-left font-body text-body-md text-secondary">
              {lang === 'en' ? 'हिंदी में देखें' : 'View in English'}
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
