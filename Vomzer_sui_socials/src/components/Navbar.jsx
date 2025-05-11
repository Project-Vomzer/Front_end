import React from 'react'
import { assets } from '../assets/assets'

const Navbar = () => {
  return (
    <div>
        <div className='md:flex items-center justify-evenly hidden pt-10'>
            <img src={assets.Vomzer} alt="" />
            <input className='rounded-2xl px-10 py-1 text-black outline-none focus:border-blue-400 hover:' type="text" placeholder='Search....'/>
            <img src={assets.home} alt="" />
            <img src={assets.feeds} alt="" />
            <img src={assets.notification} alt="" />
            <img src={assets.chatmessages} alt="" />
            <img src={assets.wallet} alt="" />
            <img src={assets.services} alt="" />
            <img src={assets.Dots} alt="" />
            <img src="" alt="" />
        </div>
    </div>
  )
}

export default Navbar
