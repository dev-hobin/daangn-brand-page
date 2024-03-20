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
      <div data-scroller='intro'>
        <IntroSection />
      </div>
      <div>
        <div data-scroller='new-logo'>
          <NewLogoSection />
        </div>
      </div>
      <div className='absolute inset-x-0 top-0'>
        <BalloonSection />
      </div>
      <div data-scroller='brand-film'>
        <BrandFilmSection />
      </div>

      <div className='relative -top-[100dvh] z-10'>
        <DaangnMomentSection />
      </div>

      <div className='relative -mt-[200dvh]'>
        <CommunitySection />
      </div>

      <div data-scroller='ending'>
        <EndingSection />
      </div>
    </main>
  )
}

export default App
