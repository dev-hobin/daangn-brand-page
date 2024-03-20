import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { IntroSection } from './sections/IntroSection'
import { NewLogoSection } from './sections/NewLogoSection'
import { BalloonSection } from './sections/BalloonSection'
import { BrandFilmSection } from './sections/BrandFilmSection'
import { DaangnMomentSection } from './sections/DaangnMomentSection'
import { CommunitySection } from './sections/CommunitySection'
import { EndingSection } from './sections/EndingSection'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function App() {
  useEffect(() => {
    window.onbeforeunload = () => {
      window.scrollTo(0, 0)
    }
  }, [])

  return (
    <main>
      <IntroSection />
      <NewLogoSection size={2} delay='1/2' />
      <div className='absolute inset-x-0 top-0'>
        <BalloonSection size={1.5} />
      </div>
      <BrandFilmSection size={6} delay='1/6' />
      <div className='relative z-10 -mt-[100dvh]'>
        <DaangnMomentSection />
      </div>
      <div className='relative -mt-[100dvh]'>
        <CommunitySection size={6} faster='1/6' />
      </div>
      <EndingSection />
    </main>
  )
}

export default App
