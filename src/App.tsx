import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

function App() {
  useGSAP(() => {
    const tl = gsap.timeline()

    tl.from('.question-letter', {
      visibility: 'hidden',
      position: 'absolute',
      ease: 'power3.out',
      stagger: 0.15,
    })
      .to(
        '.question',
        {
          yPercent: -50,
          opacity: 0,
          ease: 'power3.inOut',
        },
        '+=1',
      )
      .from(
        '.answer-letter',
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
      .to('[data-scroll-guide]', {
        opacity: 1,
      })
      .to(
        '[data-scroll-guide] [data-text]',
        {
          keyframes: {
            '0%': { opacity: 1 },
            '50%': { opacity: 0.6 },
            '75%': { opacity: 0.6, ease: 'power2.out' },
            '100%': { opacity: 1 },
            easeEach: 'power2.inOut',
          },
          repeat: -1,
          yoyo: true,
          repeatDelay: 1,
          duration: 1.5,
        },
        '+=0.5',
      )
      .to(
        '[data-scroll-guide] [data-icon]',
        {
          keyframes: {
            '0%': { y: 0 },
            '25%': { y: 12, ease: 'power2.in' },
            '50%': { y: 0 },
            '75%': { y: 12, ease: 'power2.in' },
            '100%': { y: 0 },
            easeEach: 'power2.out',
          },
          repeat: -1,
          repeatDelay: 1,
          yoyo: true,
          duration: 1.5,
        },
        '<=',
      )
  })
  return (
    <main>
      <section className='relative grid h-screen place-content-center'>
        <h1 className='relative flex flex-col items-center overflow-hidden py-12 text-8xl font-black'>
          <div className='question absolute inset-x-0 inset-y-12 text-center'>
            <span className='question-letter'>당</span>
            <span className='question-letter'>근</span>
            <span className='question-letter'>이</span>
            <span className='question-letter'>세</span>
            <span className='question-letter'>요</span>
            <span>?</span>
          </div>
          <div className='answer flex'>
            <span className='answer-letter'>네!</span>
            <span className='answer-letter'>&nbsp;당근이에요</span>
          </div>
        </h1>
        <div
          className='absolute bottom-16 left-1/2 flex -translate-x-1/2 flex-col items-center opacity-0'
          data-scroll-guide
        >
          <span className='text-xl font-extrabold text-gray-400' data-text>
            아래로 내려보세요
          </span>
          <svg
            id='edubGENkp7x1'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            viewBox='0 0 24 8'
            shapeRendering='geometricPrecision'
            textRendering='geometricPrecision'
            className='chevron-down mx-auto mt-4 w-14'
            data-icon
          >
            <path
              d='M5,8.793L17,21.95409L29,8.793v3.037174L17,24.991265L5,11.830174L5,8.793Z'
              transform='matrix(1 0 0 0.49388-5.000012-4.342686)'
            />
            <path
              d='M0,0h23.999976v8L0,8v-8Z'
              transform='matrix(1.000001 0 0 1-.000012 0)'
              fill='none'
            />
          </svg>
        </div>
      </section>
    </main>
  )
}

export default App
