import React from 'react'
import { AnimatePresence,motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'


const ResponsiveDisplay = ({img}) => {
    const navigate = useNavigate()


  return <AnimatePresence>
        { img && (
            <motion.div
            initial={{ opacity:0, y: -100 }}
            animate={{ opacity:1, y: 0 }}
            exit={{ opacity:0, y: -100 }}
            transition={{duration: 0.3}}
            >
                <div className='bg-gradient-to-r from-blue-400 to-teal-400  text-white text-sm font-semibold uppercase py-10 mt-10 rounded-3xl md:hidden'>
                    <ul className='flex flex-col items-center justify-center  gap-7'>
                        <div className='flex gap-5'>
                            {/* <Link to="/" ><li>Home</li></Link> */}
                            <img className='w-5' src={assets.home} alt="" />
                        </div>
                        <div className='flex gap-5'>
                            {/* <Link to="/" ><li>feeds</li></Link> */}
                            <img className='w-5' src={assets.feeds} alt="" />
                        </div>
                        <div className='flex gap-2'>
                            {/* <Link to="/" ><li>notification</li></Link> */}
                            <img className='w-5' src={assets.notification} alt="" />
                        </div>
                        <div className='flex gap-5'>
                            {/* <Link to="/" ><li>messages</li></Link> */}
                            <img className='w-5' src={assets.chatmessages} alt="" />
                        </div>
                        <div className='flex gap-5'>
                            {/* <Link to="/" ><li>wallet</li></Link> */}
                            <img className='w-5' src={assets.wallet} alt="" />
                        </div>
                        <div className='flex gap-5'>
                            {/* <Link to="/" ><li>services</li></Link> */}
                            <img className='w-5' src={assets.services} alt="" />
                        </div>
                        <div className='flex gap-5'>
                            {/* <Link to="/" ><li>menu</li></Link> */}
                            <img className='w-5' src={assets.Dots} alt="" />
                        </div>
                        <div className='flex gap-5'>
                            {/* <Link to="/" ><li>menu</li></Link> */}
                            <img onClick={()=> navigate("/login")} className='w-5' src={assets.login} alt="" />
                        </div>
                    </ul>
                </div>
            </motion.div>
            )
        }
</AnimatePresence>
}

export default ResponsiveDisplay
