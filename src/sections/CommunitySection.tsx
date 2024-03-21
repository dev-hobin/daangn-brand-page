import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { fastForwardAnimation } from '../utils/scrollTimeline'
import { horizontalLoop } from '../utils/horizontalLoop'
import { useRef } from 'react'
import { ScrollProps } from '../types'

const textFadeInAnimation = (scrollElement: HTMLElement) => {
  const select = gsap.utils.selector(scrollElement)
  const title = select('[data-title]')

  return gsap.timeline().to(title, { opacity: 1 })
}

const animation = (scrollElement: HTMLElement) => {
  const select = gsap.utils.selector(scrollElement)
  const title = select('[data-title]')
  const background = select('[data-background]')

  const staticGalleryFadeItems = select('[data-fade-item]')
  const autoGallery = select('[data-auto-gallery]')
  const autoGalleryFadeInItems = select('[data-bottom-fade-item]')

  const firstFadeInItems = staticGalleryFadeItems.filter(
    (item) => item.dataset.fadeItem === 'first',
  )
  const secondFadeInItems = staticGalleryFadeItems.filter(
    (item) => item.dataset.fadeItem === 'second',
  )
  const thirdFadeInItems = staticGalleryFadeItems.filter(
    (item) => item.dataset.fadeItem === 'third',
  )

  const tl = gsap
    .timeline()
    .add(textFadeInAnimation(scrollElement))
    .set(staticGalleryFadeItems, {
      opacity: 0,
      xPercent: (index, _, targets) => {
        if (index < targets.length / 2) return -10
        return 10
      },
    })
    .set(autoGalleryFadeInItems, { yPercent: 10, opacity: 0 })
    .to(title, { opacity: 0 })
    .to(background, {
      width: '32.375rem',
      height: '21.5625rem',
      borderRadius: '1.5rem',
    })
    .from(autoGallery, { height: 0, paddingTop: 0 })
    .to(firstFadeInItems, { xPercent: 0, opacity: 1 })
    .to(secondFadeInItems, { xPercent: 0, opacity: 1 })
    .to(thirdFadeInItems, { xPercent: 0, opacity: 1 })
    .to(autoGalleryFadeInItems, { yPercent: 0, opacity: 1 }, '<')

  return tl
}

type CommunitySectionProps = Pick<ScrollProps, 'size' | 'faster'>
export function CommunitySection({
  size = 1,
  faster = '0/100',
}: CommunitySectionProps) {
  const ref = useRef<HTMLElement | null>(null)

  useGSAP(() => {
    if (!ref.current) return
    const breakPoint = 480

    gsap.matchMedia().add(
      {
        isUnderMobile: `(max-width: ${breakPoint - 1}px)`,
        isOverMobile: `(min-width: ${breakPoint}px)`,
      },
      (context) => {
        if (!context.conditions) return
        const { isUnderMobile } = context.conditions

        new ScrollTrigger({
          trigger: ref.current!,
          pin: true,
          scrub: true,
          start: 'top top',
          end: () =>
            isUnderMobile
              ? `top+=${innerHeight * 2} top`
              : `top+=${innerHeight * size} top`,
          animation: isUnderMobile
            ? fastForwardAnimation(textFadeInAnimation(ref.current!), '1/2')
            : fastForwardAnimation(animation(ref.current!), faster),
        })

        if (!isUnderMobile) {
          horizontalLoop(gsap.utils.toArray('[data-gallery-item]'), {
            repeat: -1,
            speed: 0.3,
            paddingRight: 24,
          })
        }
      },
    )
  })

  return (
    <section
      ref={ref}
      className='relative grid h-dvh items-center overflow-hidden'
    >
      <h2
        data-title
        className='mo:text-[2.125rem] ta:text-[4rem] absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 text-center font-karrot text-[1.75rem] leading-[1.3] text-white antialiased opacity-0'
      >
        가깝고 따뜻한 당신 근처의
        <br />
        지역 생활 커뮤니티
      </h2>
      <div className='grid h-full w-full items-center'>
        <div data-gallery-container className='flex flex-col'>
          <div
            data-static-gallery
            className='flex -translate-x-[calc(50%-50vw)] items-center justify-center gap-6 overflow-x-clip '
          >
            <div
              data-fade-item='third'
              className='h-[21.5625rem] w-[32.375rem] min-w-[32.375rem] overflow-hidden rounded-3xl'
            >
              <img
                src='/images/up-4.jpg'
                alt='당근 아웃트로 첫 번째 이미지'
                className='h-full w-full object-cover'
              />
            </div>
            <div
              data-fade-item='third'
              className='h-[21.5625rem] w-[32.375rem] min-w-[32.375rem] overflow-hidden rounded-3xl'
            >
              <img
                src='/images/up-5.jpg'
                alt='당근 아웃트로 두 번째 이미지'
                className='h-full w-full object-cover'
              />
            </div>
            <div
              data-fade-item='second'
              className='h-[21.5625rem] w-[32.375rem] min-w-[32.375rem] overflow-hidden rounded-3xl'
            >
              <img
                src='/images/up-1.jpg'
                alt='당근 아웃트로 세 번째 이미지'
                className='h-full w-full object-cover'
              />
            </div>
            <div
              data-fade-item='first'
              className='h-[21.5625rem] w-[32.375rem] min-w-[32.375rem] overflow-hidden rounded-3xl'
            >
              <img
                src='/images/up-2.jpg'
                alt='당근 아웃트로 네 번째 이미지'
                className='h-full w-full object-cover'
              />
            </div>
            <div
              data-background
              className='h-dvh w-screen min-w-[32.375rem] overflow-hidden'
            >
              <video
                autoPlay
                loop
                playsInline
                muted
                className='mo:block hidden h-full w-full object-cover'
              >
                <source src='/videos/outro-pc.webm' type='video/webm' />
                <source src='/videos/outro-pc.mp4' type='video/mp4' />
              </video>
              <video
                autoPlay
                loop
                playsInline
                muted
                className='mo:hidden h-full w-full object-cover'
              >
                <source src='/videos/outro-mobile.webm' type='video/webm' />
                <source src='/videos/outro-mobile.mp4' type='video/mp4' />
              </video>
            </div>
            <div
              data-fade-item='first'
              className='h-[21.5625rem] w-[32.375rem] min-w-[32.375rem] overflow-hidden rounded-3xl'
            >
              <img
                src='/images/up-4.jpg'
                alt='당근 아웃트로 첫 번째 이미지'
                className='h-full w-full object-cover'
              />
            </div>
            <div
              data-fade-item='second'
              className='h-[21.5625rem] w-[32.375rem] min-w-[32.375rem] overflow-hidden rounded-3xl'
            >
              <img
                src='/images/up-5.jpg'
                alt='당근 아웃트로 두 번째 이미지'
                className='h-full w-full object-cover'
              />
            </div>
            <div
              data-fade-item='third'
              className='h-[21.5625rem] w-[32.375rem] min-w-[32.375rem] overflow-hidden rounded-3xl'
            >
              <img
                src='/images/up-1.jpg'
                alt='당근 아웃트로 세 번째 이미지'
                className='h-full w-full object-cover'
              />
            </div>
            <div
              data-fade-item='third'
              className='h-[21.5625rem] w-[32.375rem] min-w-[32.375rem] overflow-hidden rounded-3xl'
            >
              <img
                src='/images/up-2.jpg'
                alt='당근 아웃트로 네 번째 이미지'
                className='h-full w-full object-cover'
              />
            </div>
          </div>
          <div
            data-auto-gallery
            data-bottom-fade-item
            className='flex w-screen items-center gap-6 overflow-clip pt-[1.5rem]'
          >
            <div
              data-gallery-item
              className='h-[13.75rem] w-[22.25rem] min-w-[22.25rem] overflow-hidden rounded-3xl'
            >
              <video
                autoPlay
                loop
                playsInline
                muted
                className='h-full w-full object-cover'
              >
                <source src='/videos/carousel-down-1.webm' type='video/webm' />
                <source src='/videos/carousel-down-1.mp4' type='video/mp4' />
              </video>
            </div>
            <div
              data-gallery-item
              className='h-[13.75rem] w-[22.25rem] min-w-[22.25rem] overflow-hidden rounded-3xl'
            >
              <img
                src='/images/down-2.png'
                alt='당근 아웃트로 아래 두 번째 이미지'
                className='h-full w-full object-cover'
              />
            </div>
            <div
              data-gallery-item
              className='h-[13.75rem] w-[22.25rem] min-w-[22.25rem] overflow-hidden rounded-3xl'
            >
              <video
                autoPlay
                loop
                playsInline
                muted
                className='h-full w-full object-cover'
              >
                <source src='/videos/carousel-down-3.webm' type='video/webm' />
                <source src='/videos/carousel-down-3.mp4' type='video/mp4' />
              </video>
            </div>
            <div
              data-gallery-item
              className='h-[13.75rem] w-[22.25rem] min-w-[22.25rem] overflow-hidden rounded-3xl'
            >
              <img
                src='/images/down-4.png'
                alt='당근 아웃트로 아래 네 번째 이미지'
                className='h-full w-full object-cover'
              />
            </div>
            <div
              data-gallery-item
              className='h-[13.75rem] w-[22.25rem] min-w-[22.25rem] overflow-hidden rounded-3xl'
            >
              <img
                src='/images/down-5.png'
                alt='당근 아웃트로 아래 다섯 번째 이미지'
                className='h-full w-full object-cover'
              />
            </div>
            <div
              data-gallery-item
              className='h-[13.75rem] w-[22.25rem] min-w-[22.25rem] overflow-hidden rounded-3xl'
            >
              <video
                autoPlay
                loop
                playsInline
                muted
                className='h-full w-full object-cover'
              >
                <source src='/videos/carousel-down-1.webm' type='video/webm' />
                <source src='/videos/carousel-down-1.mp4' type='video/mp4' />
              </video>
            </div>
            <div
              data-gallery-item
              className='h-[13.75rem] w-[22.25rem] min-w-[22.25rem] overflow-hidden rounded-3xl'
            >
              <img
                src='/images/down-2.png'
                alt='당근 아웃트로 아래 두 번째 이미지'
                className='h-full w-full object-cover'
              />
            </div>
            <div
              data-gallery-item
              className='h-[13.75rem] w-[22.25rem] min-w-[22.25rem] overflow-hidden rounded-3xl'
            >
              <video
                autoPlay
                loop
                playsInline
                muted
                className='h-full w-full object-cover'
              >
                <source src='/videos/carousel-down-3.webm' type='video/webm' />
                <source src='/videos/carousel-down-3.mp4' type='video/mp4' />
              </video>
            </div>
            <div
              data-gallery-item
              className='h-[13.75rem] w-[22.25rem] min-w-[22.25rem] overflow-hidden rounded-3xl'
            >
              <img
                src='/images/down-4.png'
                alt='당근 아웃트로 아래 네 번째 이미지'
                className='h-full w-full object-cover'
              />
            </div>
            <div
              data-gallery-item
              className='h-[13.75rem] w-[22.25rem] min-w-[22.25rem] overflow-hidden rounded-3xl'
            >
              <img
                src='/images/down-5.png'
                alt='당근 아웃트로 아래 다섯 번째 이미지'
                className='h-full w-full object-cover'
              />
            </div>
            <div
              data-gallery-item
              className='h-[13.75rem] w-[22.25rem] min-w-[22.25rem] overflow-hidden rounded-3xl'
            >
              <video
                autoPlay
                loop
                playsInline
                muted
                className='h-full w-full object-cover'
              >
                <source src='/videos/carousel-down-1.webm' type='video/webm' />
                <source src='/videos/carousel-down-1.mp4' type='video/mp4' />
              </video>
            </div>
            <div
              data-gallery-item
              className='h-[13.75rem] w-[22.25rem] min-w-[22.25rem] overflow-hidden rounded-3xl'
            >
              <img
                src='/images/down-2.png'
                alt='당근 아웃트로 아래 두 번째 이미지'
                className='h-full w-full object-cover'
              />
            </div>
            <div
              data-gallery-item
              className='h-[13.75rem] w-[22.25rem] min-w-[22.25rem] overflow-hidden rounded-3xl'
            >
              <video
                autoPlay
                loop
                playsInline
                muted
                className='h-full w-full object-cover'
              >
                <source src='/videos/carousel-down-3.webm' type='video/webm' />
                <source src='/videos/carousel-down-3.mp4' type='video/mp4' />
              </video>
            </div>
            <div
              data-gallery-item
              className='h-[13.75rem] w-[22.25rem] min-w-[22.25rem] overflow-hidden rounded-3xl'
            >
              <img
                src='/images/down-4.png'
                alt='당근 아웃트로 아래 네 번째 이미지'
                className='h-full w-full object-cover'
              />
            </div>
            <div
              data-gallery-item
              className='h-[13.75rem] w-[22.25rem] min-w-[22.25rem] overflow-hidden rounded-3xl'
            >
              <img
                src='/images/down-5.png'
                alt='당근 아웃트로 아래 다섯 번째 이미지'
                className='h-full w-full object-cover'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
