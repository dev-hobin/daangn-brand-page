import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Player } from '@lottiefiles/react-lottie-player'
import { AnimationItem } from 'lottie-web'
import { useRef } from 'react'

export function BalloonSection() {
  const ref = useRef<HTMLDivElement | null>(null)
  const bubbleLottieRef = useRef<AnimationItem | null>(null)

  useGSAP(() => {
    if (!ref.current) return

    new ScrollTrigger({
      trigger: ref.current,
      pin: true,
      pinSpacing: false,
      scrub: true,
      start: 'top top',
      end: () => `top+=${innerHeight * 1.5} top`,
      onUpdate: (self) => {
        if (!bubbleLottieRef.current) return
        bubbleLottieRef.current.goToAndStop(
          self.progress * bubbleLottieRef.current.totalFrames,
          true,
        )
      },
    })
  })

  return (
    <section ref={ref} className='relative z-10 h-dvh'>
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
  )
}
