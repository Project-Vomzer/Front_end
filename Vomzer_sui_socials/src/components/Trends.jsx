import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { VomzerContext } from '../context/VomzerContext'

const Trends = () => {
  const {followers, following} = useContext(VomzerContext)

  return (
    <div className='h-full space-y-4'>
      {/* Profile Section */}
      <div className='bg-white rounded-2xl p-5 h-auto'>
        <img className='w-16 pt-10 ml-[40%]' src={assets.logo} alt="" />
        <h1 className='text-xl font-semibold text-center mt-5'>Vomzer</h1>
        <p className='text-md text-center mt-2'>@Vomzer Socials</p>
        <p className='text-md text-center mt-2'>Web3 Dev & Cybersecurity Enthusiast | Full-Time Legend</p>
        <p className='w-full border px-5 bg-black mt-4'></p>
        <div className='flex items-center justify-between pt-5'>
          <div>
            <p className='text-md font-semibold'>{following}</p>
            <p className='text-sm font-light'>following</p>
          </div>
          <div>
            <p className='text-md font-semibold'>{followers}</p>
            <p className='text-sm font-light'>followers</p>
          </div>
        </div>
        <p className='w-full border px-5 bg-black mt-4'></p>
        <p className='text-md text-center pt-5'>My Profile</p>
      </div>

      {/* Trends Section */}
      <div className='bg-white rounded-2xl p-5 h-auto'>
        <p className='text-md font-medium'>Top Trends</p>
        <p className='text-xl font-normal'>Trending in USA</p>
        <div className='flex items-center justify-between'>
          <p>#Vomzer</p>
          <img src={assets.threedots} alt="" />
        </div>
        <p className='text-sm font-light'>174k mentions</p>
        <div className='flex items-center justify-between pt-2'>
          <p>#Olympics 2026</p>
          <img src={assets.threedots} alt="" />
        </div>
        <p className='text-sm font-light'>126k mentions</p>
        <p className='text-center'>More</p>
        <p className='w-full border px-5 bg-black mt-4 mb-4'></p>
        <p className='text-md font-medium'>Top Trends</p>
        <p className='text-xl font-normal'>Trending in USA</p>
        <div className='flex items-center justify-between'>
          <p>#Premier league</p>
          <img src={assets.threedots} alt="" />
        </div>
        <p className='text-sm font-light'>254k mentions</p>
        <div className='flex items-center justify-between pt-2'>
          <p>#Burna Boy</p>
          <img src={assets.threedots} alt="" />
        </div>
        <p className='text-sm font-light'>345k mentions</p>
        <p className='text-center'>More</p>
      </div>
    </div>
  )
}

export default Trends