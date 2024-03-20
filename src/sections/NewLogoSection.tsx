import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { delayAnimation } from '../utils/scrollTimeline'
import { useRef } from 'react'
import { ScrollProps } from '../types'

const animation = (scrollElement: HTMLElement) => {
  const select = gsap.utils.selector(scrollElement)
  const [logo, image, text, description] = select('[data-new-logo]')

  const tl = gsap
    .timeline()
    .fromTo(
      image,
      {
        opacity: 0,
        translateX: '-50%',
        translateY: '-50%',
      },
      { opacity: 1 },
    )
    .to(image, { scale: 0.7 })
    .to(
      logo,
      {
        translateX: '-8.4375rem',
        translateY: '-6.25rem',
      },
      '<',
    )
    .to(
      text,
      {
        opacity: 1,
        translateX: '5.5rem',
      },
      '-=80%',
    )
    .from(description, { y: '1rem', opacity: 0 })

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
    <section
      ref={ref}
      data-section='new-logo'
      className='relative grid h-dvh place-content-center'
    >
      <div data-new-logo='logo' className='relative flex items-center'>
        <picture>
          <source srcSet='/images/logo-img.webp' type='image/webp' />
          <img
            data-new-logo='image'
            src='/images/logo-img.png'
            alt='새로운 당근 로고 이미지'
            className='absolute left-0 top-0 w-[10.875rem] min-w-[10.875rem] opacity-0'
          />
        </picture>
        <picture>
          <source srcSet='/images/logo-text.webp' type='image/webp' />
          <img
            data-new-logo='text'
            srcSet='/images/logo-text.png'
            alt='새로운 당근 로고 텍스트'
            className='absolute left-0 top-0 h-[8.4375rem] w-[15.5rem] min-w-[15.5rem] -translate-y-12 opacity-0'
          />
        </picture>
      </div>
      <div
        data-new-logo='description'
        className='absolute bottom-[25%] left-1/2 -translate-x-1/2'
      >
        <p className='text-center font-karrot text-4xl leading-normal'>
          소개할게요!
        </p>
        <p className='text-center font-karrot text-4xl leading-normal'>
          당근마켓의 새 이름, 새 얼굴
        </p>
      </div>
    </section>
  )
}
