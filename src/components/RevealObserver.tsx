'use client'
import { useEffect } from 'react'

// Global scroll-reveal handler — runs once, covers all .reveal elements on the page.
// Progressive enhancement: without JS, all .reveal elements stay visible (opacity:1).
// With JS: elements below the fold are hidden then animated in on scroll.
export default function RevealObserver() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.reveal'))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
            entry.target.classList.remove('will-reveal')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    elements.forEach(el => {
      const rect = el.getBoundingClientRect()
      // Only hide elements that are below the viewport on initial load
      if (rect.top > window.innerHeight * 0.95) {
        el.classList.add('will-reveal')
        observer.observe(el)
      }
      // Elements already in view stay visible immediately
    })

    return () => observer.disconnect()
  }, [])

  return null
}
