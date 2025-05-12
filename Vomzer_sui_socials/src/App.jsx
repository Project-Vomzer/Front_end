import React from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/Home'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';



const App = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode='wait'>
    <div className='app-background overflow-x-hidden'>
      <Navbar/>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={ <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}> <Home/> </motion.div> } />
          <Route path="/login" element={ <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}> <Login/> </motion.div> } />
        </Routes>
        <ToastContainer/>
      <Footer/>
    </div>
    </AnimatePresence>
  )
}

export default App
