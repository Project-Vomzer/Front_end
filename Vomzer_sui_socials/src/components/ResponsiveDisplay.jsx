import React from 'react'
import { AnimatePresence,motion } from 'framer-motion'
import { Link } from 'react-router-dom'

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
                        <div className='flex'>
                            <Link to="/" ><li>Home</li></Link>
                            <img src="" alt="" />
                        </div>
                        <Link to="/buy" ><li>Buy</li></Link>
                        <Link to="/sell" ><li>Sell</li></Link>
                        <Link to="/about" ><li>About</li></Link>
                        <Link to="/contactus" ><li>Contact Us</li></Link>
                    </ul>
                </div>
            </motion.div>
            )
        }
</AnimatePresence>
}

export default ResponsiveDisplay
