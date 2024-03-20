import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { AnimationItem } from 'lottie-web'
import { Player } from '@lottiefiles/react-lottie-player'
import { horizontalLoop } from './utils/horizontalLoop'
import { delayAnimationStart, delayAnimationEnd } from './utils/delay'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const PAGE_UNIT = 1

const scroller = (name: string) => `[data-scroller=${name}]`
const section = (name: string) => `[data-section=${name}]`

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

const brandFilmScrollAnimation = (scroller: string) => {
  const select = gsap.utils.selector(scroller)
  const brandFilmSection = select(section('brand-film'))
  const video = select('[data-video]')
  const titleContainer = select('[data-title-container]')
  const contentContainer = select('[data-content-container]')
  const staggers = select('[data-staggers]')
  const firstContent = select('[data-first-content]')
  const secondContent = select('[data-second-content]')

  const tl = gsap
    .timeline()
    .to(brandFilmSection, {
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

const communityScrollAnimation = (scroller: string) => {
  const select = gsap.utils.selector(scroller)
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
    .set(staticGalleryFadeItems, {
      opacity: 0,
      xPercent: (index, _, targets) => {
        if (index < targets.length / 2) return -10
        return 10
      },
    })
    .set(autoGalleryFadeInItems, { yPercent: 10, opacity: 0 })
    .to(title, { opacity: 1 })
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

function App() {
  const bubbleLottieRef = useRef<AnimationItem | null>(null)
  const logoLottieEffectOneRef = useRef<AnimationItem | null>(null)
  const logoLottieEffectTwoRef = useRef<AnimationItem | null>(null)

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

    new ScrollTrigger({
      trigger: scroller('balloons'),
      pin: true,
      pinSpacing: false,
      scrub: true,
      start: 'top top',
      end: () => `top+=${innerHeight * 1.5 * PAGE_UNIT}px top`,
      onUpdate: (self) => {
        if (!bubbleLottieRef.current) return
        bubbleLottieRef.current.goToAndStop(
          self.progress * bubbleLottieRef.current.totalFrames,
          true,
        )
      },
    })

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
      end: () => `top+=${innerHeight * 2 * PAGE_UNIT}px top`,
    })

    new ScrollTrigger({
      trigger: scroller('brand-film'),
      pin: true,
      scrub: true,
      start: 'top top',
      end: () => `top+=${innerHeight * 6 * PAGE_UNIT}px top`,
      animation: delayAnimationStart(
        brandFilmScrollAnimation(scroller('brand-film')),
        '1/6',
      ),
    })

    new ScrollTrigger({
      trigger: scroller('community'),
      pin: true,
      scrub: true,
      start: 'top top',
      end: () => `top+=${6 * innerHeight} top`,
      animation: delayAnimationEnd(
        communityScrollAnimation(scroller('community')),
        '1/6',
      ),
    })

    // new ScrollTrigger({
    //   trigger: scroller('ending'),
    //   pin: true,
    //   pinSpacing: false,
    //   scrub: true,
    //   start: 'top top',
    //   // markers: true,
    // })

    horizontalLoop(gsap.utils.toArray('[data-gallery-item]'), {
      repeat: -1,
      speed: 0.3,
      paddingRight: 24,
    })
  })

  const handleLogoClick = () => {
    const firstEffectIsPaused = logoLottieEffectOneRef.current?.isPaused
    const secondEffectIsPaused = logoLottieEffectTwoRef.current?.isPaused
    if (firstEffectIsPaused) {
      logoLottieEffectOneRef.current?.play()
    } else if (secondEffectIsPaused) {
      logoLottieEffectTwoRef.current?.play()
    }
  }

  return (
    <main>
      <div data-scroller='intro'>
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
      </div>
      <div>
        <div data-scroller='new-logo'>
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
        </div>
      </div>
      <div className='absolute inset-x-0 top-0'>
        <div data-scroller='balloons'>
          <section data-section='balloons' className='relative z-10 h-dvh'>
            <Player
              autoplay
              lottieRef={(item) => {
                bubbleLottieRef.current = item
              }}
              src='/lotties/bubble_up_desktop.json'
              rendererSettings={{
                preserveAspectRatio: 'xMidYMid slice',
              }}
              className='h-dvh w-full'
            />
          </section>
        </div>
      </div>
      <div data-scroller='brand-film'>
        <section
          data-section='brand-film'
          className='relative grid h-dvh items-center'
        >
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
                  <p className='text-[2.5rem] font-black leading-[3.75rem] text-white'>
                    근처에 살고 있다는 이유만으로
                  </p>
                  <p className='text-[2.5rem] font-black leading-[3.75rem] text-white'>
                    함께 할 수 있는 것들이 많아져요
                  </p>
                </div>
                <div
                  data-second-content
                  className='translate-y-[5dvh] opacity-0'
                >
                  <p className='mb-[2rem] text-[2.5rem] font-black leading-[3.75rem] text-white'>
                    더 가깝게, 조금은 느슨하게
                  </p>

                  <p className='text-[2.5rem] font-black leading-[3.75rem] text-white'>
                    나와 이웃의 연결이 시작될 때
                  </p>
                  <p className='text-[2.5rem] font-black leading-[3.75rem] text-white'>
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
      </div>

      <div className='relative -top-[100dvh] z-10'>
        <section
          data-section='daangn-moments'
          className='min-h-[100dvh] bg-white py-[11.875rem]'
        >
          <div className='mx-auto flex max-w-[68.75rem] flex-col items-center'>
            <h2 className='whitespace-pre-line text-center text-[3.75rem] font-bold leading-tight'>
              동네에서 만나는{'\n'}당근의 순간들
            </h2>
            <div className='mt-6 text-center text-[1.375rem] font-bold text-[#4d5159]'>
              <p>당근하는 순간이 많아질수록</p>
              <p>우리는 함께 사는 방법을 알게 될 거예요.</p>
            </div>

            <div className='mt-[5.625rem] grid max-w-[60.625rem] grid-flow-row-dense grid-cols-2 grid-rows-[1fr_0.3fr_0.7fr_1fr] content-start gap-[1rem]'>
              <article className='relative transition ease-out hover:scale-[1.01]'>
                <h2 className='absolute left-0 top-[2.5rem] z-10 w-full text-center text-[1.75rem] font-bold'>
                  좋은 물건을 구하고 <br />
                  나누는 중고거래
                </h2>
                <Player
                  autoplay
                  loop
                  src='/lotties/moment_one.json'
                  rendererSettings={{
                    preserveAspectRatio: 'xMidYMid slice',
                  }}
                />
              </article>
              <div className='transition ease-out hover:scale-[1.01]'>
                <video
                  autoPlay
                  loop
                  playsInline
                  muted
                  className='h-full w-full'
                >
                  <source src='/videos/moment_two.mp4' type='video/mp4' />
                </video>
              </div>
              <article className='relative row-span-2 transition ease-out hover:scale-[1.01]'>
                <h2 className='absolute left-0 top-[2.5rem] z-10 w-full text-center text-[1.75rem] font-bold text-white'>
                  걸어서 10분 동네 알바
                </h2>
                <video autoPlay loop playsInline muted>
                  <source src='/videos/moment_three.mp4' type='video/mp4' />
                </video>
              </article>
              <article className='relative transition ease-out hover:scale-[1.01]'>
                <h2 className='absolute left-0 top-[2.5rem] z-10 w-full text-center text-[1.75rem] font-bold text-[#212124]'>
                  찐 이웃 추천 동네 가게
                </h2>
                <Player
                  autoplay
                  loop
                  src='/lotties/moment_four.json'
                  rendererSettings={{
                    preserveAspectRatio: 'xMidYMid slice',
                  }}
                />
              </article>
              <article className='relative transition ease-out hover:scale-[1.01]'>
                <h2 className='absolute left-0 top-[2.5rem] z-10 w-full text-center text-[1.75rem] font-bold text-[#212124]'>
                  지금 이 순간 동네 소식
                </h2>
                <Player
                  autoplay
                  loop
                  src='/lotties/moment_five.json'
                  rendererSettings={{
                    preserveAspectRatio: 'xMidYMid slice',
                  }}
                />
              </article>
              <article className='relative transition ease-out hover:scale-[1.01]'>
                <h2 className='absolute left-0 top-[2.5rem] z-10 w-full text-center text-[1.75rem] font-bold text-[#212124]'>
                  함께라서 더 즐거운 일들
                </h2>
                <Player
                  autoplay
                  loop
                  src='/lotties/moment_six.json'
                  rendererSettings={{
                    preserveAspectRatio: 'xMidYMid slice',
                  }}
                />
              </article>
              <div className='transition ease-out hover:scale-[1.01]'>
                <video
                  autoPlay
                  loop
                  playsInline
                  muted
                  className='h-full w-full'
                >
                  <source src='/videos/moment_seven.mp4' type='video/mp4' />
                </video>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className='relative -mt-[200dvh]'>
        <div data-scroller='community'>
          <section
            data-section='community'
            className='relative grid h-dvh items-center overflow-hidden'
          >
            <h2
              data-title
              className='absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 text-center text-[4rem] font-bold leading-[1.3] text-white opacity-0'
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
                    className='h-screen w-screen min-w-[32.375rem] overflow-hidden'
                  >
                    <video
                      autoPlay
                      loop
                      playsInline
                      muted
                      className='h-full w-full object-cover'
                    >
                      <source src='/videos/outro-pc.webm' type='video/webm' />
                      <source src='/videos/outro-pc.mp4' type='video/mp4' />
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
                      <source
                        src='/videos/carousel-down-1.webm'
                        type='video/webm'
                      />
                      <source
                        src='/videos/carousel-down-1.mp4'
                        type='video/mp4'
                      />
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
                      <source
                        src='/videos/carousel-down-3.webm'
                        type='video/webm'
                      />
                      <source
                        src='/videos/carousel-down-3.mp4'
                        type='video/mp4'
                      />
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
                      <source
                        src='/videos/carousel-down-1.webm'
                        type='video/webm'
                      />
                      <source
                        src='/videos/carousel-down-1.mp4'
                        type='video/mp4'
                      />
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
                      <source
                        src='/videos/carousel-down-3.webm'
                        type='video/webm'
                      />
                      <source
                        src='/videos/carousel-down-3.mp4'
                        type='video/mp4'
                      />
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
                      <source
                        src='/videos/carousel-down-1.webm'
                        type='video/webm'
                      />
                      <source
                        src='/videos/carousel-down-1.mp4'
                        type='video/mp4'
                      />
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
                      <source
                        src='/videos/carousel-down-3.webm'
                        type='video/webm'
                      />
                      <source
                        src='/videos/carousel-down-3.mp4'
                        type='video/mp4'
                      />
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
        </div>
      </div>

      <div data-scroller='ending'>
        <section
          data-section='ending'
          className='flex h-dvh flex-col items-center justify-start'
        >
          <div
            className='relative h-[31.25rem] w-[25rem] cursor-pointer transition-transform hover:active:scale-[0.98]'
            onClick={handleLogoClick}
          >
            <Player
              lottieRef={(item) => {
                logoLottieEffectOneRef.current = item
              }}
              renderer='svg'
              src='/lotties/outro_logo_hover.json'
              className='absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2'
            />
            <Player
              lottieRef={(item) => {
                logoLottieEffectTwoRef.current = item
              }}
              renderer='svg'
              src='/lotties/outro_logo_hover.json'
              className='absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2'
            />
            <Player
              autoplay
              loop
              renderer='svg'
              src='/lotties/outro_logo.json'
              className='absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2'
            />
          </div>
          <p className='mt-[3.125rem] text-center text-[2.5rem] font-black'>
            당근에서 만나요!
          </p>
        </section>
      </div>
    </main>
  )
}

export default App
