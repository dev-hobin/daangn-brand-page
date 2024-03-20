import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { delayAnimationStart } from '../utils/delay'

const newLogoScrollAnimation = (scroller: string) => {
  const selectAll = gsap.utils.selector(scroller)
  const [logo, image, text, description] = selectAll('[data-new-logo]')

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

const scroller = (name: string) => `[data-scroller=${name}]`

export function NewLogoSection() {
  useGSAP(() => {
    new ScrollTrigger({
      trigger: scroller('new-logo'),
      animation: delayAnimationStart(
        newLogoScrollAnimation(scroller('new-logo')),
        '1/2',
      ),
      pin: true,
      pinSpacing: false,
      scrub: true,
      start: 'top top',
      end: () => `top+=${innerHeight * 2}px top`,
    })
  })

  return (
    <section
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
        <p className='text-center text-4xl font-bold leading-normal'>
          소개할게요!
        </p>
        <p className='text-center text-4xl font-bold leading-normal'>
          당근마켓의 새 이름, 새 얼굴
        </p>
      </div>
    </section>
  )
}
