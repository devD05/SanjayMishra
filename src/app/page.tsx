import Navbar from '@/components/Navbar'
import RevealObserver from '@/components/RevealObserver'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import EventsSection from '@/components/EventsSection'
import QuoteSection from '@/components/QuoteSection'
import MediaSection from '@/components/MediaSection'
import GallerySection from '@/components/GallerySection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <EventsSection />
      <QuoteSection />
      <MediaSection />
      <GallerySection />
      <ContactSection />
      <Footer />
      <RevealObserver />
    </main>
  )
}
