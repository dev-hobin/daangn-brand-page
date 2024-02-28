import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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

    gsap
      .timeline({
        scrollTrigger: {
          trigger: '[data-scroll-container="intro"]',
          pin: true,
          pinSpacing: false,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          // markers: true,
        },
      })
      .to('[data-section="intro"]', { opacity: 0 })

    gsap
      .timeline({
        scrollTrigger: {
          trigger: '[data-scroll-container="logo"]',
          pin: true,
          pinSpacing: false,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          markers: true,
        },
      })
      .fromTo(
        '[data-logo-image]',
        {
          opacity: 0,
          translateX: '-50%',
          translateY: '-50%',
        },
        { opacity: 1 },
      )
      .to('[data-logo-image]', { scale: 0.7 })
      .to(
        '[data-logo]',
        {
          translateX: '-8.4375rem',
          translateY: '-6.25rem',
        },
        '<',
      )
      .to(
        '[data-logo-text]',
        {
          opacity: 1,
          translateX: '5.5rem',
        },
        '-=80%',
      )
      .from('[data-intro-desc]', { y: '1rem', opacity: 0 })
      // brand film 시작
      .to('[data-section="brand-film"]', {
        opacity: 1,
      })
  })

  return (
    <main>
      <div data-scroll-container='intro'>
        <section
          data-section='intro'
          className='grid h-screen place-content-center'
        >
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
      </div>
      <div data-scroll-container='logo' className='h-[7000px]'>
        <div data-view className='relative h-screen'>
          <section
            data-section='logo'
            className='relative grid h-screen place-content-center'
          >
            <div data-logo className='relative flex items-center'>
              <picture>
                <source srcSet='/images/logo-img.webp' type='image/webp' />
                <img
                  data-logo-image
                  src='/images/logo-img.png'
                  alt='새로운 당근 로고 이미지'
                  className='absolute left-0 top-0 w-[10.875rem] min-w-[10.875rem] opacity-0'
                />
              </picture>
              <picture>
                <source srcSet='/images/logo-text.webp' type='image/webp' />
                <img
                  data-logo-text
                  srcSet='/images/logo-text.png'
                  alt='새로운 당근 로고 텍스트'
                  className='absolute left-0 top-0 h-[8.4375rem] w-[15.5rem] min-w-[15.5rem] -translate-y-12 opacity-0'
                />
              </picture>
            </div>
            <div
              data-intro-desc
              className='absolute bottom-[25%] left-1/2 -translate-x-1/2'
            >
              <p className='text-center text-4xl font-bold leading-normal'>
                소개할게요!
              </p>
              <p className='text-center text-4xl font-bold leading-normal'>
                당근마켓의 새 이름, 새 얼굴
              </p>
            </div>
          </section>
          <section
            data-section='brand-film'
            className='absolute inset-0 grid h-screen place-content-center bg-black opacity-0'
          >
            <div
              data-background-image
              className='absolute h-screen w-screen scale-75 rounded-[60px] bg-slate-600'
              style={{ zIndex: -1 }}
            />
            <div data-content-container>
              <div className='flex flex-col items-center'>
                <p className='mb-14 text-6xl font-black text-white'>
                  함께 사는 방법
                </p>
                <button className='rounded-full bg-white px-6 py-3 text-xl font-medium opacity-75'>
                  브랜드 필름 보기
                </button>
              </div>

              <div>
                <p>근처에 살고 있다는 이유만으로</p>
                <p>함께 할 수 있는 것들이 많아져요.</p>
                <button className='text-xl font-medium text-white'>
                  브랜드 필름 보기
                </button>
              </div>

              <div>
                <p>더 가깝게, 조금은 느슨하게</p>
                <p>나와 이웃의 연결이 시작될 때</p>
                <p>우리의 삶은 더 이로워질 거에요.</p>
                <button className='text-xl font-medium text-white'>
                  브랜드 필름 보기
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
      <section className='h-[3000px]'></section>
    </main>
  )
}

export default App
