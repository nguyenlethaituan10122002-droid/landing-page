import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MobileCtaBar } from '@/components/layout/MobileCtaBar'
import { FloatingCall } from '@/components/layout/FloatingCall'
import { ScrollProgress } from '@/components/layout/ScrollProgress'

import { Hero } from '@/components/sections/Hero'
import { Promises } from '@/components/sections/Promises'
import { BrandMarquee } from '@/components/sections/BrandMarquee'
import { Services } from '@/components/sections/Services'
import { BeforeAfter } from '@/components/sections/BeforeAfter'
import { Commitments } from '@/components/sections/Commitments'
import { Process } from '@/components/sections/Process'
import { Pricing } from '@/components/sections/Pricing'
import { Gallery } from '@/components/sections/Gallery'
import { ServiceAreas } from '@/components/sections/ServiceAreas'
import { Faq } from '@/components/sections/Faq'
import { FinalCta } from '@/components/sections/FinalCta'

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Promises />
        <BrandMarquee />
        <Services />
        <BeforeAfter />
        <Commitments />
        <Process />
        <Pricing />
        <Gallery />
        <ServiceAreas />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileCtaBar />
      <FloatingCall />
    </>
  )
}
