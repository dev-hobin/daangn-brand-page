import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { AnimationItem } from 'lottie-web'
import { Player } from '@lottiefiles/react-lottie-player'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger, useGSAP)
gsap.defaults({ duration: 1 })

const scroller = (name: string) => `[data-scroller=${name}]`
const section = (name: string) => `[data-section=${name}]`
const text = (name: string) => `[data-text=${name}]`

const introAnimation = ({
  onStart,
  onComplete,
}: {
  onStart?: () => void
  onComplete?: () => void
} = {}) => {
  const tl = gsap
    .timeline({
      onStart: onStart,
    })
    .from('[data-question] [data-letter]', {
      visibility: 'hidden',
      position: 'absolute',
      ease: 'power3.out',
      stagger: 0.15,
    })
    .to(
      '[data-question]',
      {
        yPercent: -50,
        opacity: 0,
        ease: 'power3.inOut',
      },
      '+=1',
    )
    .from(
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

const newLogoScrollAnimation = (
  scroller: string,
  fastForwardRate: `${number}%` = '0%',
) => {
  const selectAll = gsap.utils.selector(scroller)
  const [logo, image, text, description] = selectAll('[data-new-logo]')
  const rate = Number(fastForwardRate.slice(0, -1))

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

  const delay = (rate * tl.totalDuration()) / (100 - rate)
  return tl.add(gsap.to(logo, { duration: delay }))
}

function App() {
  const bubbleLottieRef = useRef<AnimationItem | null>(null)

  useEffect(() => {
    window.onbeforeunload = () => {
      window.scrollTo(0, 0)
    }
  }, [])

  useGSAP(() => {
    introAnimation({
      // onStart: () => {
      //   document.body.style.overflow = 'hidden'
      // },
      // onComplete: () => {
      //   document.body.style.overflow = 'auto'
      //   gsap.matchMediaRefresh()
      // },
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
      // 1.5 스크린 크기만큼 애니메이션 진행
      end: () => `top+=${innerHeight * 1.5}px top`,
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
      animation: newLogoScrollAnimation(scroller('new-logo'), '50%'),
      pin: true,
      pinSpacing: false,
      scrub: true,
      start: 'top top',
      markers: true,
      // brand-film 영역과 겹치는 1 스크린 + 1 스크린 길이만큼 핀 고정
      end: () => `top+=${innerHeight * 2}px top`,
    })

    new ScrollTrigger({
      trigger: scroller('brand-film'),
      pin: true,
      scrub: true,
      start: 'top top',
      end: () => `bottom+=${innerHeight * 2}px top`,
      animation: gsap
        .timeline()
        .to(section('brand-film'), {
          backgroundColor: 'black',
          opacity: 1,
          duration: 0.5,
        })
        .add(
          gsap
            .timeline()
            .to(`${section('brand-film')} [data-video]`, {
              opacity: 0.6,
              y: 0,
            })
            .to(`${section('brand-film')} [data-staggers]`, {
              opacity: 1,
              y: 0,
              stagger: 0.1,
            })
            .to(`${section('brand-film')} [data-video]`, {
              scale: 1,
              borderRadius: 0,
            })
            .to(`${section('brand-film')} [data-video]`, {
              opacity: 0.5,
            })
            .to(
              `${section('brand-film')} [data-title-container]`,
              { opacity: 0 },
              '<',
            )
            .to(`${section('brand-film')} [data-content-container]`, {
              y: 0,
              opacity: 1,
            })
            .to(
              `${section('brand-film')} [data-content-container] [data-first-content]`,
              { duration: 1 },
            )
            .to(
              `${section('brand-film')} [data-content-container] [data-first-content]`,
              { opacity: 0 },
            )
            .to(
              `${section('brand-film')} [data-content-container] [data-second-content]`,
              { y: 0, opacity: 1 },
            )
            .to(
              `${section('brand-film')} [data-content-container] [data-second-content]`,
              { duration: 1 },
            ),
        )
        .to(section('brand-film'), { duration: 2.5 }), // total duration: 2.5가 나와야 함
      // markers: true,
    })

    // new ScrollTrigger({
    //   trigger: scroller('daangn-moments'),
    //   pin: true,
    //   pinSpacing: false,
    //   scrub: true,
    //   start: 'top top',
    //   // markers: true,
    // })

    new ScrollTrigger({
      trigger: scroller('community'),
      pin: true,
      pinSpacing: false,
      scrub: true,
      start: 'top top',
      end: () => `top+=${2 * innerHeight}px top`,
      animation: gsap
        .timeline()
        .to(section('community'), { duration: 1 })
        .to(text('community'), { scale: 0.5, duration: 1 }),
      // markers: true,
    })

    // new ScrollTrigger({
    //   trigger: scroller('ending'),
    //   pin: true,
    //   pinSpacing: false,
    //   scrub: true,
    //   start: 'top top',
    //   // markers: true,
    // })
  })

  return (
    <main>
      <div data-scroller='intro'>
        <section data-section='intro' className='grid h-dvh items-center'>
          <h1 className='relative flex flex-col items-center overflow-hidden py-12 text-8xl font-black'>
            <div data-question className='absolute inset-x-0 text-center'>
              <span data-letter>당</span>
              <span data-letter>근</span>
              <span data-letter>이</span>
              <span data-letter>세</span>
              <span data-letter>요</span>
              <span>?</span>
            </div>
            <div data-answer className='flex'>
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
      <div data-positioner='new-logo'>
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
      <div data-positioner='balloons' className='absolute inset-x-0 top-0'>
        <div data-scroller='balloons'>
          <section data-section='balloons' className='relative z-10 h-dvh'>
            <Player
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
          className='relative grid h-dvh items-center bg-slate-400 opacity-25'
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
          className='min-h-[150dvh] bg-white py-[11.875rem]'
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

      <div className='relative -top-[200dvh]'>
        <div data-scroller='community'>
          <section
            data-section='community'
            className='grid h-dvh items-center bg-blue-100'
          >
            <div
              data-text='community'
              className='text-center text-8xl font-black'
            >
              지역생활 커뮤니티
            </div>
          </section>
        </div>
      </div>

      <div data-scroller='ending'>
        <section
          data-section='ending'
          className='grid h-dvh items-center bg-pink-100'
        >
          <div className='text-center text-8xl font-black'>당근에서 만나요</div>
        </section>
      </div>
    </main>
  )
}

export default App
