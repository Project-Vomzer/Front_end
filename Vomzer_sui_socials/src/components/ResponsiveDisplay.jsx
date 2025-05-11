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
            className=' top-[8] left-0 w-full z-10'
            >
                <div className='bg-teal-500 text-white text-sm font-semibold uppercase py-10 m-6 rounded-3xl md:hidden'>
                    <ul className='flex flex-col items-center justify-center  gap-7'>
                        <Link to="/" ><li>Home</li></Link>
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
