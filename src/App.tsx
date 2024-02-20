import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { tv } from 'tailwind-variants'

const button = tv({
  base: 'rounded-full bg-blue-50 font-medium text-white active:opacity-80',
  variants: {
    color: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-purple-500 text-white',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'px-4 py-3 text-lg',
    },
  },
  compoundVariants: [
    {
      size: ['sm', 'md'],
      class: 'px-3 py-1',
    },
  ],
  defaultVariants: {
    size: 'md',
    color: 'primary',
  },
})

function App() {
  useGSAP(() => {
    gsap.to('.button', { rotation: 180, repeat: -1, ease: 'none' })
  })

  return (
    <>
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
      <button
        className={button({
          size: 'sm',
          color: 'secondary',
          className: 'button',
        })}
      >
        Click me
      </button>
    </>
  )
}

export default App
