import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

function App() {
  useGSAP(() => {
    const tl = gsap.timeline()

    tl.from('.question-letter', {
      visibility: 'hidden',
      position: 'absolute',
      ease: 'power3.out',
      stagger: 0.15,
    })
      .to(
        '.question',
        {
          yPercent: -50,
          opacity: 0,
          ease: 'power3.inOut',
        },
        '+=1',
      )
      .from(
        '.answer-letter',
        {
          opacity: 0,
          yPercent: 100,
          stagger: {
            amount: 0.1,
          },
          ease: 'back.out(1.7)',
        },
        '-=25%',
      )
  })
  return (
    <main>
      <section className='grid h-screen place-content-center'>
        <h1 className='relative flex flex-col items-center overflow-hidden py-12 text-8xl font-black'>
          <div className='question absolute inset-x-0 inset-y-12 text-center'>
            <span className='question-letter'>당</span>
            <span className='question-letter'>근</span>
            <span className='question-letter'>이</span>
            <span className='question-letter'>세</span>
            <span className='question-letter'>요</span>
            <span>?</span>
          </div>
          <div className='answer flex'>
            <span className='answer-letter'>네!</span>
            <span className='answer-letter'>&nbsp;당근이에요</span>
          </div>
        </h1>
      </section>
    </main>
  )
}

export default App
