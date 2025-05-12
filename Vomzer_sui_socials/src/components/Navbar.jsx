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
            <img onClick={()=> navigate("/")} className='w-7 cursor-pointer' src={assets.home} alt="" />
            <img className='w-7 cursor-pointer' src={assets.feeds} alt="" />
            <img className='w-7 cursor-pointer' src={assets.notification} alt="" />
            <img className='w-7 cursor-pointer' src={assets.chatmessages} alt="" />
            <img className='w-7 cursor-pointer' src={assets.wallet} alt="" />
            <img className='w-7 cursor-pointer' src={assets.services} alt="" />
            <img className='w-7 cursor-pointer' src={assets.Dots} alt="" />
            <img onClick={()=> navigate("/login")} className='w-7 cursor-pointer' src={assets.login} alt="" />
        </div>
        <ResponsiveNavbar/>
    </div>
  )
}

export default Navbar
