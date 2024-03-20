import { Player } from '@lottiefiles/react-lottie-player'

export function DaangnMomentSection() {
  return (
    <section className='min-h-[100dvh] bg-white py-[11.875rem]'>
      <div className='mx-auto flex max-w-[68.75rem] flex-col items-center'>
        <h2 className='whitespace-pre-line text-center font-karrot text-[3.75rem] leading-tight'>
          동네에서 만나는{'\n'}당근의 순간들
        </h2>
        <div className='mt-6 text-center font-karrot text-[1.375rem] text-[#4d5159]'>
          <p>당근하는 순간이 많아질수록</p>
          <p>우리는 함께 사는 방법을 알게 될 거예요.</p>
        </div>

        <div className='mt-[5.625rem] grid max-w-[60.625rem] grid-flow-row-dense grid-cols-2 grid-rows-[1fr_0.3fr_0.7fr_1fr] content-start gap-[1rem]'>
          <article className='relative transition ease-out hover:scale-[1.01]'>
            <h2 className='absolute left-0 top-[2.5rem] z-10 w-full text-center font-karrot text-[1.75rem]'>
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
            <video autoPlay loop playsInline muted className='h-full w-full'>
              <source src='/videos/moment_two.mp4' type='video/mp4' />
            </video>
          </div>
          <article className='relative row-span-2 transition ease-out hover:scale-[1.01]'>
            <h2 className='absolute left-0 top-[2.5rem] z-10 w-full text-center font-karrot text-[1.75rem] text-white'>
              걸어서 10분 동네 알바
            </h2>
            <video autoPlay loop playsInline muted>
              <source src='/videos/moment_three.mp4' type='video/mp4' />
            </video>
          </article>
          <article className='relative transition ease-out hover:scale-[1.01]'>
            <h2 className='absolute left-0 top-[2.5rem] z-10 w-full text-center font-karrot text-[1.75rem] text-[#212124]'>
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
            <h2 className='absolute left-0 top-[2.5rem] z-10 w-full text-center font-karrot text-[1.75rem] text-[#212124]'>
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
            <h2 className='absolute left-0 top-[2.5rem] z-10 w-full text-center font-karrot text-[1.75rem] text-[#212124]'>
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
            <video autoPlay loop playsInline muted className='h-full w-full'>
              <source src='/videos/moment_seven.mp4' type='video/mp4' />
            </video>
          </div>
        </div>
      </div>
    </section>
  )
}
