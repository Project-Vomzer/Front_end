import React from 'react'
import Trends from '../components/Trends'
import Feeds from '../components/Feeds'
import Sui from '../components/Sui'

const Home = () => {
  return (
    <div className='flex md:flex-row flex-col items-stretch md:gap-4 gap-20 container pt-10 pb-10'>
      <div className='md:w-[27%] w-full'>
        <Trends />
      </div>
      <div className='md:w-[45%] w-full'>
        <Feeds />
      </div>
      <div className='md:w-[27%] w-full'>
        <Sui />
      </div>
    </div>
  )
}

export default Home