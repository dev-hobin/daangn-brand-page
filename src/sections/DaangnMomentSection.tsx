import { Player } from '@lottiefiles/react-lottie-player'

export function DaangnMomentSection() {
  return (
    <section className='mo:py-[11.875rem] ta:px-[2.5rem] min-h-[100dvh] bg-white px-[1rem] py-[5rem]'>
      <div className='sde:max-w-[60.625rem] mx-auto flex max-w-[35.125rem] flex-col items-center'>
        <h2 className='mo:text-[3.125rem] ta:text-[3.75rem] whitespace-pre-line text-center font-karrot text-[1.75rem] leading-tight antialiased'>
          동네에서 만나는{'\n'}당근의 순간들
        </h2>
        <div className='mo:mt-[1.5rem] mo:text-[1.25rem] ta:text-[1.375rem] mt-[1.25rem] text-center font-karrot text-[1rem] text-[#4d5159] antialiased'>
          <p>당근하는 순간이 많아질수록</p>
          <p>우리는 함께 사는 방법을 알게 될 거예요.</p>
        </div>

        <div className='mo:mt-[5.625rem] sde:max-w-[50rem] de:max-w-full sde:grid sde:grid-flow-row-dense sde:grid-cols-2 sde:grid-rows-[1fr_0.3fr_0.7fr_1fr] sde:content-start mt-[3.125rem] flex flex-col items-start gap-[1rem]'>
          <article className='relative order-1 transition ease-out hover:scale-[1.01]'>
            <h2 className='mo:text-[1.5rem] ta:text-[1.75rem] ta:top-[2.5rem] ta:leading-normal sde:text-[1.5rem] sde:order-1 absolute left-0 top-[1.875rem] z-10 w-full text-center font-karrot text-[1.25rem] antialiased'>
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
          <div className='sde:block sde:order-2 hidden transition ease-out hover:scale-[1.01]'>
            <video autoPlay loop playsInline muted className='h-full w-full'>
              <source src='/videos/moment_two.mp4' type='video/mp4' />
            </video>
          </div>
          <article className='sde:order-3 relative order-3 row-span-2 transition ease-out hover:scale-[1.01]'>
            <h2 className='sde:text-[1.5rem] ta:text-[1.75rem] ta:top-[2.5rem] ta:leading-normal mo:text-[1.5rem] absolute left-0 top-[1.875rem] z-10 order-3 w-full text-center font-karrot text-[1.25rem] text-white antialiased'>
              걸어서 10분 동네 알바
            </h2>
            <video autoPlay loop playsInline muted>
              <source src='/videos/moment_three.mp4' type='video/mp4' />
            </video>
          </article>
          <article className='sde:order-4 relative order-2 transition ease-out hover:scale-[1.01]'>
            <h2 className='sde:text-[1.5rem] ta:text-[1.75rem] ta:top-[2.5rem] ta:leading-normal mo:text-[1.5rem] absolute left-0 top-[1.875rem] z-10 w-full text-center font-karrot text-[1.25rem] text-[#212124] antialiased'>
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
          <article className='sde:order-5 relative order-4 transition ease-out hover:scale-[1.01]'>
            <h2 className='sde:text-[1.5rem] ta:text-[1.75rem] ta:top-[2.5rem] ta:leading-normal mo:text-[1.5rem] absolute left-0 top-[1.875rem] z-10 w-full text-center font-karrot text-[1.25rem] text-[#212124] antialiased'>
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
          <article className='sde:order-6 relative order-5 transition ease-out hover:scale-[1.01]'>
            <h2 className='sde:text-[1.5rem] ta:text-[1.75rem] ta:top-[2.5rem] ta:leading-normal mo:text-[1.5rem] absolute left-0 top-[1.875rem] z-10 w-full text-center font-karrot text-[1.25rem] text-[#212124] antialiased'>
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
          <div className='sde:order-7 order-6 transition ease-out hover:scale-[1.01]'>
            <video autoPlay loop playsInline muted className='h-full w-full'>
              <source src='/videos/moment_seven.mp4' type='video/mp4' />
            </video>
          </div>
        </div>
      </div>
    </section>
  )
}
