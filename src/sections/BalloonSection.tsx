import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Player } from '@lottiefiles/react-lottie-player'
import { AnimationItem } from 'lottie-web'
import { useRef } from 'react'

const scroller = (name: string) => `[data-scroller=${name}]`

export function BalloonSection() {
  const bubbleLottieRef = useRef<AnimationItem | null>(null)

  useGSAP(() => {
    new ScrollTrigger({
      trigger: scroller('balloons'),
      pin: true,
      pinSpacing: false,
      scrub: true,
      start: 'top top',
      end: () => `top+=${innerHeight * 1.5}px top`,
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
  )
}
