import { Player } from '@lottiefiles/react-lottie-player'
import { AnimationItem } from 'lottie-web'
import { useRef } from 'react'

export function EndingSection() {
  const effectOneRef = useRef<AnimationItem | null>(null)
  const effectTwoRef = useRef<AnimationItem | null>(null)

  const handleLogoClick = () => {
    const firstEffectIsPaused = effectOneRef.current?.isPaused
    const secondEffectIsPaused = effectTwoRef.current?.isPaused

    if (firstEffectIsPaused) {
      effectOneRef.current?.play()
    } else if (secondEffectIsPaused) {
      effectTwoRef.current?.play()
    }
  }

  return (
    <section className='flex h-dvh flex-col items-center justify-center'>
      <div
        className='relative -mt-[7.8125rem] h-[15.625rem] w-[12.5rem] cursor-pointer transition-transform hover:active:scale-[0.98] mo:-mt-[15.625rem] mo:h-[31.25rem] mo:w-[25rem]'
        onClick={handleLogoClick}
      >
        <Player
          lottieRef={(item) => {
            effectOneRef.current = item
          }}
          renderer='svg'
          src='/lotties/outro_logo_hover.json'
          className='absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2'
        />
        <Player
          lottieRef={(item) => {
            effectTwoRef.current = item
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
      <p className='mt-[1.875rem] select-none text-center font-karrot text-[1.5rem] text-[#212124] sm:text-[1.75rem] mo:mt-[3.125rem] mo:text-[2.5rem]'>
        당근에서 만나요!
      </p>
    </section>
  )
}
