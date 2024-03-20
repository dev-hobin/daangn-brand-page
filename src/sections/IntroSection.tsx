import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const introAnimation = ({
  onStart,
  onComplete,
}: {
  onStart?: () => void
  onComplete?: () => void
} = {}) => {
  const tl = gsap.timeline({
    onStart,
  })

  const letters = gsap.utils.toArray<HTMLElement>(
    '[data-question] [data-letter]',
  )
  const lastLetter = letters.pop()

  letters.forEach((item, i) => {
    tl.add(
      gsap.from(item, {
        visibility: 'hidden',
        position: 'absolute',
        ease: 'power3.out',
        delay: 0.15,
        onComplete: () => {
          if (i === 3) {
            gsap.set(letters[0], { attr: { 'data-type': 'basket' } })
          }
          if (i === 4) {
            gsap.set(letters[0], { attr: { 'data-type': 'text' } })
            gsap.set(letters[1], { attr: { 'data-type': 'basket' } })
            gsap.set(letters[1], {
              attr: { 'data-type': 'text' },
              delay: 0.15,
            })
            gsap.set(lastLetter ?? '', {
              attr: { 'data-type': 'karrot' },
              delay: 0.15,
            })
            gsap.set(lastLetter ?? '', {
              attr: { 'data-type': 'text' },
              delay: 0.15 * 2,
            })
          }
        },
      }),
      '<',
    )
  })

  tl.to(
    '[data-question]',
    {
      yPercent: -50,
      opacity: 0,
      ease: 'power3.inOut',
    },
    '+=1',
  ).from(
    '[data-answer] [data-letter]',
    {
      opacity: 0,
      yPercent: 100,
      stagger: { amount: 0.1 },
      ease: 'back.out(1.7)',
      onComplete,
    },
    '-=25%',
  )

  return tl
}

const scrollGuideAnimation = () => {
  const tl = gsap
    .timeline()
    .to('[data-scroll-guide]', { opacity: 1 })
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

  return tl
}

const scroller = (name: string) => `[data-scroller=${name}]`
const section = (name: string) => `[data-section=${name}]`

export function IntroSection() {
  useGSAP(() => {
    introAnimation({
      onStart: () => {
        document.body.style.overflow = 'hidden'
      },
      onComplete: () => {
        document.body.style.overflow = 'auto'
        gsap.matchMediaRefresh()
      },
    }).add(scrollGuideAnimation())

    new ScrollTrigger({
      trigger: scroller('intro'),
      animation: gsap.to(section('intro'), { opacity: 0 }),
      pin: true,
      pinSpacing: false,
      scrub: true,
      start: 'top top',
      // markers: true,
    })
  })

  return (
    <section data-section='intro' className='grid h-dvh items-center'>
      <h1 className='relative flex flex-col items-center overflow-hidden py-12 font-karrot text-9xl font-black'>
        <div
          data-question
          className='absolute inset-x-0 flex items-center justify-center'
        >
          <span
            data-letter
            data-type='karrot'
            className='group relative grid items-center'
          >
            <span className='opacity-0 group-data-[type=text]:opacity-100'>
              당
            </span>
            <img
              src='/images/karrot.png'
              alt=''
              className='absolute left-1/2 top-1/2 h-full -translate-x-1/2 -translate-y-1/2 scale-[1.2] opacity-0 group-data-[type=karrot]:opacity-100'
            />
            <img
              src='/images/basket.png'
              alt=''
              className='absolute left-1/2 top-1/2 h-full -translate-x-1/2 -translate-y-1/2 scale-[1.2] opacity-0 group-data-[type=basket]:opacity-100'
            />
          </span>
          <span
            data-letter
            data-type='karrot'
            className='group relative grid items-center'
          >
            <span className='opacity-0 group-data-[type=text]:opacity-100'>
              근
            </span>
            <img
              src='/images/karrot.png'
              alt=''
              className='absolute left-1/2 top-1/2 h-full -translate-x-1/2 -translate-y-1/2 scale-[1.2] opacity-0 group-data-[type=karrot]:opacity-100'
            />
            <img
              src='/images/basket.png'
              alt=''
              className='absolute left-1/2 top-1/2 h-full -translate-x-1/2 -translate-y-1/2 scale-[1.2] opacity-0 group-data-[type=basket]:opacity-100'
            />
          </span>
          <span data-letter className='relative grid items-center'>
            이
          </span>
          <span data-letter className='relative grid items-center'>
            세
          </span>
          <span data-letter className='relative grid items-center'>
            요
          </span>
          <span
            data-letter
            data-type='daangni'
            className='group relative grid items-center'
          >
            <span className='min-w-[8rem] opacity-0 group-data-[type=text]:opacity-100'>
              ?
            </span>
            <img
              src='/images/karrot.png'
              alt=''
              className='absolute left-1/2 top-1/2 h-full -translate-x-1/2 -translate-y-1/2 scale-[1.2] opacity-0 group-data-[type=karrot]:opacity-100'
            />
            <img
              src='/images/daangni.png'
              alt=''
              className='absolute left-1/2 top-1/2 h-full min-w-[8rem] -translate-x-1/2 -translate-y-1/2 object-contain opacity-0 group-data-[type=daangni]:opacity-100'
            />
          </span>
        </div>
        <div data-answer className='flex font-karrot'>
          <span data-letter>네!</span>
          <span data-letter>&nbsp;당근이에요</span>
        </div>
      </h1>
      <aside
        className='absolute bottom-16 left-1/2 flex -translate-x-1/2 flex-col items-center opacity-0'
        data-scroll-guide
      >
        <p data-text className='text-xl font-extrabold text-gray-400'>
          아래로 내려보세요
        </p>
        <svg
          data-icon
          id='edubGENkp7x1'
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          viewBox='0 0 24 8'
          shapeRendering='geometricPrecision'
          textRendering='geometricPrecision'
          className='mx-auto mt-4 w-14'
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
      </aside>
    </section>
  )
}
