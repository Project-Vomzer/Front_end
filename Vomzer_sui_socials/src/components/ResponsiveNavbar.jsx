import React, { useState } from 'react'
import { assets } from '../assets/assets'
import ResponsiveDisplay from './ResponsiveDisplay'

const ResponsiveNavbar = () => {

    const [img, setImg] = useState(false)


  return (
    <div className='container'>
      <div className='flex items-center justify-between md:hidden pt-5'>
        <img className='w-7' onClick={()=> setImg(!img)} src={img ? assets.cancel : assets.menu} alt="" />
        <img className='w-10' src={assets.Vomzer} alt="" />
      </div>
      <ResponsiveDisplay img={img}/>
    </div>
  )
}

export default ResponsiveNavbar
