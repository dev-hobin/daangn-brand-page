import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { delayAnimation } from '../utils/scrollTimeline'
import { useRef } from 'react'
import { ScrollProps } from '../types'

const animation = (scrollElement: HTMLElement) => {
  const select = gsap.utils.selector(scrollElement)
  const container = select('[data-container]')
  const logoContainer = select('[data-logo-container]')
  const logoTextContainer = select('[data-logo-text-container]')
  const description = select('[data-description]')

  const tl = gsap
    .timeline()
    .fromTo(logoContainer, { opacity: 0 }, { opacity: 1 })
    .fromTo(
      logoContainer,
      { left: '50%', xPercent: -50, scale: 1 },
      { left: '0%', xPercent: 0, scale: 0.7 },
    )
    .fromTo(
      container,
      { top: '50%', yPercent: -50 },
      { top: '0%', yPercent: 0 },
      '<',
    )
    .fromTo(
      logoTextContainer,
      { right: '50%', xPercent: 50, opacity: 0 },
      { right: '0%', xPercent: 0, opacity: 1 },
      '-=50%',
    )
    .from(description, {
      opacity: 0,
      y: '10%',
    })

  return tl
}

export function NewLogoSection({ size = 1, delay = '0/100' }: ScrollProps) {
  const ref = useRef<HTMLElement | null>(null)

  useGSAP(() => {
    if (!ref.current) return

    new ScrollTrigger({
      trigger: ref.current,
      animation: delayAnimation(animation(ref.current), delay),
      pin: true,
      pinSpacing: false,
      scrub: true,
      start: 'top top',
      end: () => `top+=${innerHeight * size} top`,
    })
  })

  return (
    <section ref={ref} className='grid h-dvh place-content-center'>
      <div className='flex flex-col items-center'>
        <div data-container className='relative flex items-center'>
          <picture data-logo-container className='relative'>
            <source srcSet='/images/logo-img.webp' type='image/webp' />
            <img
              src='/images/logo-img.png'
              alt='새로운 당근 로고 이미지'
              className='w-[calc(0.5*10.875rem)] sm:w-[calc(0.7*10.875rem)] ta:w-[10.875rem]'
            />
          </picture>
          <picture data-logo-text-container className='relative mt-[2rem]'>
            <source srcSet='/images/logo-text.webp' type='image/webp' />
            <img
              srcSet='/images/logo-text.png'
              alt='새로운 당근 로고 텍스트'
              className='h-[calc(0.5*8.4375rem)] sm:h-[calc(0.7*8.4375rem)] ta:h-[8.4375rem]'
            />
          </picture>
        </div>
        <div data-description className='mt-6 sm:mt-10 ta:mt-12'>
          <p className='text-center font-karrot text-[calc(0.5*2.875rem)] leading-normal antialiased sm:text-[calc(0.7*2.375rem)] ta:text-[2.25rem]'>
            소개할게요!
          </p>
          <p className='text-center font-karrot text-[calc(0.5*2.875rem)] leading-normal antialiased sm:text-[calc(0.7*2.375rem)] ta:text-[2.25rem]'>
            당근마켓의 새 이름, 새 얼굴
          </p>
        </div>
      </div>
    </section>
  )
}
