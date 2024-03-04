function App() {
  return (
    <>
      <section
        data-section='intro'
        className='grid h-screen items-center bg-red-100'
      >
        <div className='text-center text-8xl font-black'>인트로</div>
      </section>
      <section
        data-section='balloons'
        className='grid h-screen items-center bg-orange-100'
      >
        <div className='text-center text-8xl font-black'>풍선 효과</div>
      </section>
      <section
        data-section='logo'
        className='grid h-screen items-center bg-amber-100'
      >
        <div className='text-center text-8xl font-black'>당근 로고</div>
      </section>
      <section
        data-section='brand-film'
        className='grid h-screen items-center bg-lime-100'
      >
        <div className='text-center text-8xl font-black'>브랜드 필름</div>
      </section>
      <section
        data-section='daangn-moments'
        className='grid h-screen items-center bg-green-100'
      >
        <div className='text-center text-8xl font-black'>당근의 순간들</div>
      </section>
      <section
        data-section='community'
        className='grid h-screen items-center bg-emerald-100'
      >
        <div className='text-center text-8xl font-black'>지역생활 커뮤니티</div>
      </section>
      <section
        data-section='ending'
        className='grid h-screen items-center bg-teal-100'
      >
        <div className='text-center text-8xl font-black'>당근에서 만나요</div>
      </section>
    </>
  )
}

export default App
