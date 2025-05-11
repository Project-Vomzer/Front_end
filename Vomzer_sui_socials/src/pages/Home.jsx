import React from 'react'
import Trends from '../components/Trends'
import Feeds from '../components/Feeds'
import Sui from '../components/Sui'

const Home = () => {
  return (
    <div className='flex md:flex-row flex-col items-center justify-between gap-5 container pt-10'>
      <Trends/>
      <Feeds/>
      <Sui/>
    </div>
  )
}

export default Home
