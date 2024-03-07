import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useEffect } from 'react'

gsap.registerPlugin(ScrollTrigger)

const scroller = (name: string) => `[data-scroller=${name}]`
const section = (name: string) => `[data-section=${name}]`
const text = (name: string) => `[data-text=${name}]`

const introAnimation = ({
  onStart,
  onComplete,
}: {
  onStart?: () => void
  onComplete?: () => void
} = {}) => {
  const tl = gsap
    .timeline({
      onStart: onStart,
      onComplete: onComplete,
    })
    .from('[data-question] [data-letter]', {
      visibility: 'hidden',
      position: 'absolute',
      ease: 'power3.out',
      stagger: 0.15,
    })
    .to(
      '[data-question]',
      {
        yPercent: -50,
        opacity: 0,
        ease: 'power3.inOut',
      },
      '+=1',
    )
    .from(
      '[data-answer] [data-letter]',
      {
        opacity: 0,
        yPercent: 100,
        stagger: {
          amount: 0.1,
        },
        ease: 'back.out(1.7)',
      },
      '-=25%',
    )

  return tl
}

function App() {
  useEffect(() => {
    window.onbeforeunload = () => {
      window.scrollTo(0, 0)
    }
  }, [])

  useGSAP(() => {
    introAnimation({
      onStart: () => {
        document.body.style.overflow = 'hidden'
      },
      onComplete: () => {
        document.body.style.overflow = 'auto'
        gsap.matchMediaRefresh()
      },
    })

    new ScrollTrigger({
      trigger: scroller('intro'),
      animation: gsap.to(section('intro'), { opacity: 0 }),
      pin: true,
      pinSpacing: false,
      scrub: 1,
      start: 'top top',
      // markers: true,
    })

    // new ScrollTrigger({
    //   trigger: scroller('balloons'),
    //   // pin: true,
    //   // pinSpacing: false,
    //   scrub: 1,
    //   start: 'top top',
    //   // markers: true,
    // })

    new ScrollTrigger({
      trigger: scroller('new-logo'),
      pin: true,
      pinSpacing: false,
      scrub: 1,
      start: 'top top',
      // 위로 포지션 끌어올린 크기 innerHeight + brand-film 영역과 겹치는 부분 innerHeight
      end: () => `bottom+=${innerHeight * 2}px top`,
      // markers: true,
    })

    new ScrollTrigger({
      trigger: scroller('brand-film'),
      pin: true,
      scrub: 1,
      start: 'top top',
      end: () => `bottom+=${innerHeight * 2}px top`,
      animation: gsap
        .timeline()
        .to(section('brand-film'), {
          backgroundColor: 'black',
          opacity: 1,
          duration: 2,
        })
        .to(text('brand-film'), { color: 'white' }, '<')
        .to(section('brand-film'), {
          duration: 1,
        }),
      // markers: true,
    })

    // new ScrollTrigger({
    //   trigger: scroller('daangn-moments'),
    //   pin: true,
    //   pinSpacing: false,
    //   scrub: 1,
    //   start: 'top top',
    //   // markers: true,
    // })

    new ScrollTrigger({
      trigger: scroller('community'),
      pin: true,
      pinSpacing: true,
      scrub: 1,
      start: 'top top',
      end: `bottom+=${innerHeight * 2} top`,
      animation: gsap
        .timeline()
        .to(section('community'), { duration: 1 })
        .to(text('community'), { scale: 0.5, duration: 5 }),
      // markers: true,
    })

    // new ScrollTrigger({
    //   trigger: scroller('ending'),
    //   pin: true,
    //   pinSpacing: false,
    //   scrub: 1,
    //   start: 'top top',
    //   // markers: true,
    // })
  })

  return (
    <main>
      <div data-scroller='intro'>
        <section
          data-section='intro'
          className='grid h-screen items-center bg-red-100'
        >
          <h1 className='relative flex flex-col items-center overflow-hidden py-12 text-8xl font-black'>
            <div data-question className='absolute inset-x-0 text-center'>
              <span data-letter>당</span>
              <span data-letter>근</span>
              <span data-letter>이</span>
              <span data-letter>세</span>
              <span data-letter>요</span>
              <span>?</span>
            </div>
            <div data-answer className='flex'>
              <span data-letter>네!</span>
              <span data-letter>&nbsp;당근이에요</span>
            </div>
          </h1>
        </section>
      </div>
      <div data-scroller='balloons'>
        <section
          data-section='balloons'
          className='relative z-10 grid h-[200vh] items-center bg-orange-100 opacity-50'
        >
          <div className='text-center text-8xl font-black'>풍선 효과</div>
        </section>
      </div>
      <div data-positioner='new-logo' className='relative -top-[100vh]'>
        <div data-scroller='new-logo'>
          <section
            data-section='new-logo'
            className='grid h-screen items-center bg-orange-400'
          >
            <div className='text-center text-8xl font-black'>새로운 로고</div>
          </section>
        </div>
      </div>
      <div data-scroller='brand-film'>
        <section
          data-section='brand-film'
          className='grid h-screen items-center bg-lime-100 opacity-50'
        >
          <div
            data-text='brand-film'
            className='text-center text-8xl font-black'
          >
            브랜드 필름
          </div>
        </section>
      </div>

      <div className='relative'>
        <section
          data-section='daangn-moments'
          className='absolute inset-x-0 -top-[100vh] z-10 grid h-[150vh] items-center bg-cyan-100'
        >
          <div className='text-center text-8xl font-black'>당근의 순간들</div>
        </section>
      </div>

      <div data-scroller='community'>
        <section
          data-section='community'
          className='grid h-screen items-center bg-blue-100'
        >
          <div
            data-text='community'
            className='text-center text-8xl font-black'
          >
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
