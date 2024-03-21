import { Player } from '@lottiefiles/react-lottie-player'

export function DaangnMomentSection() {
  return (
    <section className='min-h-dvh bg-white px-[1rem] py-[5rem] mo:py-[11.875rem] ta:px-[2.5rem]'>
      <div className='mx-auto flex max-w-[35.125rem] flex-col items-center sde:max-w-[60.625rem]'>
        <h2 className='whitespace-pre-line text-center font-karrot text-[1.75rem] leading-tight antialiased mo:text-[3.125rem] ta:text-[3.75rem]'>
          동네에서 만나는{'\n'}당근의 순간들
        </h2>
        <div className='mt-[1.25rem] text-center font-karrot text-[1rem] text-[#4d5159] antialiased mo:mt-[1.5rem] mo:text-[1.25rem] ta:text-[1.375rem]'>
          <p>당근하는 순간이 많아질수록</p>
          <p>우리는 함께 사는 방법을 알게 될 거예요.</p>
        </div>

        <div className='mt-[3.125rem] flex flex-col items-start gap-[1rem] mo:mt-[5.625rem] sde:grid sde:max-w-[50rem] sde:grid-flow-row-dense sde:grid-cols-2 sde:grid-rows-[1fr_0.3fr_0.7fr_1fr] sde:content-start de:max-w-full'>
          <article className='relative order-1 transition ease-out hover:scale-[1.01]'>
            <h2 className='absolute left-0 top-[1.875rem] z-10 w-full text-center font-karrot text-[1.25rem] antialiased mo:text-[1.5rem] ta:top-[2.5rem] ta:text-[1.75rem] ta:leading-normal sde:order-1 sde:text-[1.5rem]'>
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
          <div className='hidden transition ease-out hover:scale-[1.01] sde:order-2 sde:block'>
            <video autoPlay loop playsInline muted className='h-full w-full'>
              <source src='/videos/moment_two.mp4' type='video/mp4' />
            </video>
          </div>
          <article className='relative order-3 row-span-2 transition ease-out hover:scale-[1.01] sde:order-3'>
            <h2 className='absolute left-0 top-[1.875rem] z-10 order-3 w-full text-center font-karrot text-[1.25rem] text-white antialiased mo:text-[1.5rem] ta:top-[2.5rem] ta:text-[1.75rem] ta:leading-normal sde:text-[1.5rem]'>
              걸어서 10분 동네 알바
            </h2>
            <video autoPlay loop playsInline muted>
              <source src='/videos/moment_three.mp4' type='video/mp4' />
            </video>
          </article>
          <article className='relative order-2 transition ease-out hover:scale-[1.01] sde:order-4'>
            <h2 className='absolute left-0 top-[1.875rem] z-10 w-full text-center font-karrot text-[1.25rem] text-[#212124] antialiased mo:text-[1.5rem] ta:top-[2.5rem] ta:text-[1.75rem] ta:leading-normal sde:text-[1.5rem]'>
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
          <article className='relative order-4 transition ease-out hover:scale-[1.01] sde:order-5'>
            <h2 className='absolute left-0 top-[1.875rem] z-10 w-full text-center font-karrot text-[1.25rem] text-[#212124] antialiased mo:text-[1.5rem] ta:top-[2.5rem] ta:text-[1.75rem] ta:leading-normal sde:text-[1.5rem]'>
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
          <article className='relative order-5 transition ease-out hover:scale-[1.01] sde:order-6'>
            <h2 className='absolute left-0 top-[1.875rem] z-10 w-full text-center font-karrot text-[1.25rem] text-[#212124] antialiased mo:text-[1.5rem] ta:top-[2.5rem] ta:text-[1.75rem] ta:leading-normal sde:text-[1.5rem]'>
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
          <div className='order-6 transition ease-out hover:scale-[1.01] sde:order-7'>
            <video autoPlay loop playsInline muted className='h-full w-full'>
              <source src='/videos/moment_seven.mp4' type='video/mp4' />
            </video>
          </div>
        </div>
      </div>
    </section>
  )
}
