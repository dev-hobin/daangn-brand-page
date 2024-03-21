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
    .set(titleContainer, { display: 'none' })
    .set(contentContainer, { display: 'none' })
    .to(container, {
      backgroundColor: 'black',
      opacity: 1,
    })
    .to(video, {
      opacity: 0.6,
      y: 0,
    })
    .set(titleContainer, { display: 'block' })
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
    .set(contentContainer, { display: 'block' })
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
        className='absolute inset-x-0 mx-auto max-w-[68.75rem]'
      >
        <div className='flex flex-col items-center'>
          <h2
            data-staggers
            className='mo:h-[4.75rem] ta:h-[6.375rem] h-[5.75rem] translate-y-[5dvh] opacity-0'
          >
            <picture className='mo:hidden h-full'>
              <source
                srcSet='/images/campaign-title-mo.webp'
                type='image/webp'
              />
              <img
                src='/images/campaign-title-mo.webp'
                alt='함께 사는 방법'
                className='h-full'
              />
            </picture>
            <picture className='mo:block hidden h-full'>
              <source
                srcSet='/images/campaign-title-pc.webp'
                type='image/webp'
              />
              <img
                src='/images/campaign-title-pc.webp'
                alt='함께 사는 방법'
                className='h-full'
              />
            </picture>
          </h2>
          <button
            data-staggers
            className='mt-[1.875rem] flex translate-y-[5dvh] transform cursor-pointer items-center rounded-[6.25rem] bg-white px-[1.25rem] py-[0.75rem] text-[1.25rem] font-bold text-[#212124] antialiased opacity-0 duration-200 hover:bg-[#212124] hover:text-white sm:mt-[2rem]'
          >
            브랜드 필름 보기
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='none'
              className='ml-[0.375rem] h-[1.25rem] w-[1.25rem]'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M15.0239 10.7809C15.5243 10.3805 15.5243 9.61946 15.0239 9.21913L7.6247 3.29976C6.96993 2.77595 6 3.24212 6 4.08062L6 15.9194C6 16.7579 6.96993 17.2241 7.62469 16.7002L15.0239 10.7809Z'
                fill='currentColor'
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <div
        data-content-container
        className='absolute inset-x-0 mx-auto max-w-[68.75rem] translate-y-[5dvh] opacity-0'
      >
        <div className='ta:flex-row ta:px-[2.5rem] ta:items-center flex flex-col items-start justify-between px-[1rem]'>
          <div className='relative'>
            <div
              data-first-content
              className='absolute left-0 top-1/2 -translate-y-1/2'
            >
              <p className='mo:text-[1.625rem] mo:leading-[2.5rem] sde:text-[2.5rem] sde:leading-[3.75rem] font-karrot text-[1.25rem] leading-[2rem] text-white antialiased sm:text-[1.375rem] sm:leading-[2rem]'>
                근처에 살고 있다는 이유만으로
              </p>
              <p className='mo:leading-[2.5rem] mo:text-[1.625rem] sde:text-[2.5rem] sde:leading-[3.75rem] font-karrot text-[1.25rem] leading-[2rem] text-white antialiased sm:text-[1.375rem] sm:leading-[2rem]'>
                함께 할 수 있는 것들이 많아져요
              </p>
            </div>
            <div data-second-content className='translate-y-[5dvh] opacity-0'>
              <p className='mo:leading-[2.5rem] mo:text-[1.625rem] sde:text-[2.5rem] sde:leading-[3.75rem] mb-[2rem] font-karrot text-[1.25rem] leading-[2rem] text-white antialiased sm:text-[1.375rem] sm:leading-[2rem]'>
                더 가깝게, 조금은 느슨하게
              </p>

              <p className='mo:leading-[2.5rem] mo:text-[1.625rem] sde:text-[2.5rem] sde:leading-[3.75rem] font-karrot text-[1.25rem] leading-[2rem] text-white antialiased sm:text-[1.375rem] sm:leading-[2rem]'>
                나와 이웃의 연결이 시작될 때
              </p>
              <p className='mo:leading-[2.5rem] mo:text-[1.625rem] sde:text-[2.5rem] sde:leading-[3.75rem] font-karrot text-[1.25rem] leading-[2rem] text-white antialiased sm:text-[1.375rem] sm:leading-[2rem]'>
                우리의 삶은 더 이로워질 거예요.
              </p>
            </div>
          </div>

          <button className='ta:text-[1.25rem] mt-[3rem] flex items-center text-[1.125rem] font-bold text-white antialiased'>
            브랜드 필름 보기
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 30 30'
              fill='none'
              className='ta:w-[1.875rem] ta:h-[1.875rem] ml-[0.375rem] h-[1.25rem] w-[1.25rem]'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30ZM12.75 9.75L18.75 15L12.75 20.25V9.75Z'
                fill='white'
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
