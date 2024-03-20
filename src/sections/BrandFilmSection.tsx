import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { delayAnimation } from '../utils/scrollTimeline'
import { useRef } from 'react'
import { ScrollProps } from '../types'

const animation = (scrollElement: HTMLElement) => {
  const select = gsap.utils.selector(scrollElement)

  const container = scrollElement
  const video = select('[data-video]')
  const titleContainer = select('[data-title-container]')
  const contentContainer = select('[data-content-container]')
  const staggers = select('[data-staggers]')
  const firstContent = select('[data-first-content]')
  const secondContent = select('[data-second-content]')

  const tl = gsap
    .timeline()
    .to(container, {
      backgroundColor: 'black',
      opacity: 1,
    })
    .to(video, {
      opacity: 0.6,
      y: 0,
    })
    .to(staggers, {
      opacity: 1,
      y: 0,
      stagger: 0.1,
    })
    .to(video, {
      scale: 1,
      borderRadius: 0,
    })
    .to(video, { opacity: 0.5 })
    .to(titleContainer, { opacity: 0 }, '<')
    .to(contentContainer, {
      y: 0,
      opacity: 1,
    })
    .to(firstContent, {})
    .to(firstContent, { opacity: 0 })
    .to(secondContent, { y: 0, opacity: 1 })
    .to(secondContent, {})

  return tl
}

type BrandFilmSectionProps = Pick<ScrollProps, 'size' | 'delay'>
export function BrandFilmSection({
  size = 1,
  delay = '0/100',
}: BrandFilmSectionProps) {
  const ref = useRef<HTMLElement | null>(null)

  useGSAP(() => {
    if (!ref.current) return

    new ScrollTrigger({
      trigger: ref.current,
      pin: true,
      scrub: true,
      start: 'top top',
      end: () => `top+=${innerHeight * size} top`,
      animation: delayAnimation(animation(ref.current), delay),
    })
  })

  return (
    <section ref={ref} className='relative grid h-dvh items-center'>
      <video
        data-video
        autoPlay
        loop
        playsInline
        muted
        className='absolute inset-0 h-full w-full translate-y-[10dvh] scale-75 rounded-[3.75rem] object-cover opacity-0'
      >
        <source src='/videos/campaign_preview_pc.webm' type='video/webm' />
        <source src='/videos/campaign_preview_pc.mp4' type='video/mp4' />
      </video>

      <div
        data-title-container
        className='absolute inset-x-0 z-10 mx-auto max-w-[68.75rem]'
      >
        <div className='flex flex-col items-center'>
          <h2
            data-staggers
            className='h-[6.375rem] translate-y-[5dvh] opacity-0'
          >
            <picture>
              <source
                srcSet='/images/campaign-title-pc.webp'
                type='image/webp'
              />
              <img
                src='/images/campaign-title-pc.webp'
                alt='함께 사는 방법'
                className='h-full w-auto'
              />
            </picture>
          </h2>
          <button
            data-staggers
            className='mt-[2rem] translate-y-[5dvh] text-2xl font-black text-white opacity-0'
          >
            브랜드 필름 보기
          </button>
        </div>
      </div>

      <div
        data-content-container
        className='absolute inset-x-0 z-10 mx-auto max-w-[68.75rem] translate-y-[5dvh] opacity-0'
      >
        <div className='flex items-center justify-between'>
          <div className='relative'>
            <div
              data-first-content
              className='absolute left-0 top-1/2 -translate-y-1/2'
            >
              <p className='font-karrot text-[2.5rem] leading-[3.75rem] text-white'>
                근처에 살고 있다는 이유만으로
              </p>
              <p className='font-karrot text-[2.5rem] leading-[3.75rem] text-white'>
                함께 할 수 있는 것들이 많아져요
              </p>
            </div>
            <div data-second-content className='translate-y-[5dvh] opacity-0'>
              <p className='mb-[2rem] font-karrot text-[2.5rem] leading-[3.75rem] text-white'>
                더 가깝게, 조금은 느슨하게
              </p>

              <p className='font-karrot text-[2.5rem] leading-[3.75rem] text-white'>
                나와 이웃의 연결이 시작될 때
              </p>
              <p className='font-karrot text-[2.5rem] leading-[3.75rem] text-white'>
                우리의 삶은 더 이로워질 거예요.
              </p>
            </div>
          </div>

          <button className='text-2xl font-black text-white'>
            브랜드 필름 보기
          </button>
        </div>
      </div>
    </section>
  )
}
