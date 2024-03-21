import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Player } from '@lottiefiles/react-lottie-player'
import { AnimationItem } from 'lottie-web'
import { useRef } from 'react'
import { ScrollProps } from '../types'

type BalloonSectionProps = Pick<ScrollProps, 'size'>
export function BalloonSection({ size = 1 }: BalloonSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const bubbleLottiePcRef = useRef<AnimationItem | null>(null)
  const bubbleLottieMobileRef = useRef<AnimationItem | null>(null)

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

        const lottieRef = isUnderMobile
          ? bubbleLottieMobileRef
          : bubbleLottiePcRef

        new ScrollTrigger({
          trigger: ref.current,
          pin: true,
          pinSpacing: false,
          scrub: true,
          start: 'top top',
          end: () => `top+=${innerHeight * size} top`,
          onUpdate: (self) => {
            if (!lottieRef.current) return
            lottieRef.current.goToAndStop(
              self.progress * lottieRef.current.totalFrames,
              true,
            )
          },
        })
      },
    )
  })

  return (
    <section ref={ref} className='relative z-10 h-dvh'>
      <Player
        lottieRef={(item) => {
          bubbleLottiePcRef.current = item
        }}
        src='/lotties/bubble_up_desktop.json'
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid slice',
        }}
        className='mo:block hidden h-dvh w-full'
      />

      <Player
        lottieRef={(item) => {
          bubbleLottieMobileRef.current = item
        }}
        src='/lotties/bubble_up_mobile.json'
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid slice',
        }}
        className='mo:hidden h-dvh w-full'
      />
    </section>
  )
}
