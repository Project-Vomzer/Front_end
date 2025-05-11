import React from 'react'
import { AnimatePresence,motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const ResponsiveDisplay = ({img}) => {


  return <AnimatePresence>
        { img && (
            <motion.div
            initial={{ opacity:0, y: -100 }}
            animate={{ opacity:1, y: 0 }}
            exit={{ opacity:0, y: -100 }}
            transition={{duration: 0.3}}
            >
                <div className='bg-gradient-to-r from-blue-400 to-teal-400 text-white text-sm font-semibold uppercase py-10 m-6 rounded-3xl md:hidden'>
                    <ul className='flex flex-col items-center justify-center  gap-7'>
                        <div className='flex gap-5'>
                            <Link to="/" ><li>Home</li></Link>
                            <img className='w-5' src={assets.home} alt="" />
                        </div>
                        <div className='flex gap-5'>
                            <Link to="/" ><li>Home</li></Link>
                            <img className='w-5' src={assets.home} alt="" />
                        </div>
                        <div className='flex gap-5'>
                            <Link to="/" ><li>Home</li></Link>
                            <img className='w-5' src={assets.home} alt="" />
                        </div>
                        <div className='flex gap-5'>
                            <Link to="/" ><li>Home</li></Link>
                            <img className='w-5' src={assets.home} alt="" />
                        </div>
                        <div className='flex gap-5'>
                            <Link to="/" ><li>Home</li></Link>
                            <img className='w-5' src={assets.home} alt="" />
                        </div>
                        <div className='flex gap-5'>
                            <Link to="/" ><li>Home</li></Link>
                            <img className='w-5' src={assets.home} alt="" />
                        </div>
                        <div className='flex gap-5'>
                            <Link to="/" ><li>Home</li></Link>
                            <img className='w-5' src={assets.home} alt="" />
                        </div>
                    </ul>
                </div>
            </motion.div>
            )
        }
</AnimatePresence>
}

export default ResponsiveDisplay
