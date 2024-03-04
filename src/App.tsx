import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const scroller = (name: string) => `[data-scroller=${name}]`
// const section = (name: string) => `[data-section=${name}]`

function App() {
  useGSAP(() => {
    new ScrollTrigger({
      trigger: scroller('intro'),
      pin: true,
      pinSpacing: false,
      scrub: 1,
      start: 'top top',
      markers: true,
    })

    new ScrollTrigger({
      trigger: scroller('balloons'),
      pin: true,
      pinSpacing: false,
      scrub: 1,
      start: 'top top',
      markers: true,
    })

    new ScrollTrigger({
      trigger: scroller('logo'),
      pin: true,
      pinSpacing: false,
      scrub: 1,
      start: 'top top',
      markers: true,
    })

    new ScrollTrigger({
      trigger: scroller('logo'),
      pin: true,
      pinSpacing: false,
      scrub: 1,
      start: 'top top',
      markers: true,
    })

    new ScrollTrigger({
      trigger: scroller('brand-film'),
      pin: true,
      pinSpacing: false,
      scrub: 1,
      start: 'top top',
      markers: true,
    })

    new ScrollTrigger({
      trigger: scroller('daangn-moments'),
      pin: true,
      pinSpacing: false,
      scrub: 1,
      start: 'top top',
      markers: true,
    })

    new ScrollTrigger({
      trigger: scroller('community'),
      pin: true,
      pinSpacing: false,
      scrub: 1,
      start: 'top top',
      markers: true,
    })

    new ScrollTrigger({
      trigger: scroller('ending'),
      pin: true,
      pinSpacing: false,
      scrub: 1,
      start: 'top top',
      markers: true,
    })
  })

  return (
    <main>
      <div data-scroller='intro'>
        <section
          data-section='intro'
          className='grid h-screen items-center bg-red-100'
        >
          <div className='text-center text-8xl font-black'>인트로</div>
        </section>
      </div>
      <div data-scroller='balloons'>
        <section
          data-section='balloons'
          className='grid h-screen items-center bg-orange-100'
        >
          <div className='text-center text-8xl font-black'>풍선 효과</div>
        </section>
      </div>
      <div data-scroller='logo'>
        <section
          data-section='logo'
          className='grid h-screen items-center bg-amber-100'
        >
          <div className='text-center text-8xl font-black'>당근 로고</div>
        </section>
      </div>
      <div data-scroller='brand-film'>
        <section
          data-section='brand-film'
          className='grid h-screen items-center bg-lime-100'
        >
          <div className='text-center text-8xl font-black'>브랜드 필름</div>
        </section>
      </div>
      <div data-scroller='daangn-moments'>
        <section
          data-section='daangn-moments'
          className='grid h-screen items-center bg-cyan-100'
        >
          <div className='text-center text-8xl font-black'>당근의 순간들</div>
        </section>
      </div>
      <div data-scroller='community'>
        <section
          data-section='community'
          className='grid h-screen items-center bg-blue-100'
        >
          <div className='text-center text-8xl font-black'>
            지역생활 커뮤니티
          </div>
        </section>
      </div>
      <div data-scroller='ending'>
        <section
          data-section='ending'
          className='grid h-screen items-center bg-pink-100'
        >
          <div className='text-center text-8xl font-black'>당근에서 만나요</div>
        </section>
      </div>
    </main>
  )
}

export default App
