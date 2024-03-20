import { Player } from '@lottiefiles/react-lottie-player'
import { AnimationItem } from 'lottie-web'
import { useRef } from 'react'

export function EndingSection() {
  const logoLottieEffectOneRef = useRef<AnimationItem | null>(null)
  const logoLottieEffectTwoRef = useRef<AnimationItem | null>(null)

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
  )
}
