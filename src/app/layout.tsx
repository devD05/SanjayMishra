import type { Metadata } from 'next'
import { Literata, Manrope } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/lib/LanguageContext'

const literata = Literata({
  subsets: ['latin'],
  variable: '--font-literata',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Prem Murti Sanjay Krishna Mishra — Katha & Astrology',
  description: 'Official website of Prem Murti Sanjay Krishna Mishra — revered Katha Vachak and Vedic Astrologer based in Tryambakeshwar Nashik and Jabalpur.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${literata.variable} ${manrope.variable} scroll-smooth`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
