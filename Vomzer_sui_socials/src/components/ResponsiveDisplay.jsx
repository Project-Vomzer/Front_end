import React from 'react'
import { AnimatePresence,motion } from 'framer-motion'

const ResponsiveDisplay = ({img}) => {


  return <AnimatePresence>
        { img && (
            <div>
                
            </div>
            )
        }
</AnimatePresence>
}

export default ResponsiveDisplay
