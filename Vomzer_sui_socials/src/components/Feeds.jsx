import React from 'react'
import { assets } from '../assets/assets'

const Feeds = () => {
  return (
    <div className='bg-white  rounded w-full md:w-[40%]'>
      <div>
        <div className='flex p-5 gap-5'>
            <img className='w-10 rounded-full' src={assets.logo} alt="" />
            <input className='border-2 pl-2 rounded-xl w-full border-gray-700' type="text" placeholder='Whats happening ?'/>
        </div>
      </div>
    </div>
  )
}

export default Feeds
