import React from 'react'
import { assets } from '../assets/assets'

const Trends = () => {
  return (
    <div className='bg-white rounded-2xl w-full md:w-[27%] p-10'>
      <div>
        <img className='w-16 pt-10 ml-[40%]' src={assets.logo} alt="" />
        <h1 className='text-xl font-semibold text-center mt-5'>Vomzer</h1>
        <p className='text-md text-center mt-2'>@Vomzer Socials</p>
        <p className='text-md text-center mt-2'>Web3 Dev & Cybersecurity Enthusiast | Full-Time Legend</p>
        <p className='w-full border px-5 bg-black mt-4'></p>
        <div>
          <div>
            <p></p>
            <p></p>
          </div>
          <div>
            <p></p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Trends
