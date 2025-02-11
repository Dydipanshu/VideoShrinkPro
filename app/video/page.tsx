"use client"

// When using dynamic, the component will be loaded on demand, which can improve initial load times.
//Useful im lazy loading, which can help improve the performance of your application by loading components only when they are needed.
import dynamic from 'next/dynamic'

const CompressVideo = dynamic(() => import("../_components/compressVideo"), {
  ssr: false
})

const Page = () => {
  return (
      <div className='pt-32 mx-auto max-w-5xl'>
          <div className='lg:grid lg:grid-cols-8 gap-8 lg:h-[calc(100dvh-130px)] pb-10 px-6 lg:px-6 flex flex-col'>
              <CompressVideo />
          </div>
    </div>
  )
}

export default Page