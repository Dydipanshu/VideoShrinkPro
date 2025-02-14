import React from 'react'
import HeroSection from './_components/heroSection'
import DemoVideo from './_components/demoVideo'

const page = () => {
  return (
    <div className='max-w-5xl mx-auto pt-32 space-y-16 sm:space-y-32'>
      <div>
        <HeroSection />
        <DemoVideo />
      </div>
    </div>
  )
}

export default page