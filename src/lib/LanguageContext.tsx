'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

type Lang = 'en' | 'hi'
const LanguageContext = createContext<{ lang: Lang; toggle: () => void }>({
  lang: 'en',
  toggle: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  const toggle = () => setLang(l => l === 'en' ? 'hi' : 'en')
  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)
