import React from 'react'
import { assets } from '../assets/assets'
import ResponsiveNavbar from './ResponsiveNavbar'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate()


  return (
    <div>
        <div className='md:flex items-center justify-evenly hidden pt-10'>
            <img onClick={()=> navigate("/")} className='w-10 cursor-pointer' src={assets.Vomzer} alt="" />
            <input className='rounded-2xl px-8 py-1 text-black outline-none ' type="text" placeholder='Search....'/>
            <div className='block items-center '>
              <img onClick={()=> navigate("/")} className='w-7 cursor-pointer' src={assets.home} alt="" />
              <p className='text-white text-sm'>Home</p>
            </div>
            <div className='block items-center '>
              <img className='w-7 cursor-pointer' src={assets.feeds} alt="" />
              <p className='text-white text-sm'>Feeds</p>
            </div>
            <div className='block items-center justify-center'>
              <img className='w-7 cursor-pointer' src={assets.notification} alt="" />
              <p className='text-white text-sm '>Alerts</p>
            </div>
            <div className='block items-center justify-center'>
              <img className='w-7 cursor-pointer' src={assets.chatmessages} alt="" />
              <p className='text-white text-sm '>Messages</p>
            </div>
            <div className='block items-center justify-center'>
              <img className='w-7 cursor-pointer' src={assets.wallet} alt="" />
              <p className='text-white text-sm '>Wallet</p>
            </div>
            <div className='block items-center justify-center'>
              <img className='w-7 cursor-pointer' src={assets.services} alt="" />
              <p className='text-white text-sm '>Services</p>
            </div>
            <div className='block items-center justify-center'>
              <img className='w-7 cursor-pointer' src={assets.Dots} alt="" />
              <p className='text-white text-sm '>Menu</p>
            </div>
            <div className='block items-center justify-center'>
              <img onClick={()=> navigate("/login")}  className='w-7 cursor-pointer' src={assets.login} alt="" />
              <p className='text-white text-sm '>Login</p>
            </div>
        </div>
        <ResponsiveNavbar/>
    </div>
  )
}

export default Navbar
