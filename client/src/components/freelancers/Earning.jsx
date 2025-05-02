import React from 'react'
import Footer from "../Footer"
import { Link } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa6";

const Earning = () => {
  return (
    <div className=''>
        <section className=' flex justify-center items-center bg-blue-950  h-[70vh] py-24 bg-gradient-to-tr mx-auto overflow-hidden from-black/40 via-purple-600/30  to-purple-800/35'>
          <div className="max-w-6xl ">
          <h1 className='text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight text-center'>This feature is <span className='bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600'>coming soon</span></h1>
          <p className='mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto text-center'>We're working hard to bring this feature to life. Stay tuned for updates as we roll out new enhancements to Quick Gig.</p>
          <div className="text-center p-6 bg-purple-950 h-36 w-[70%] mx-auto mt-10 border border-gray-600 rounded-xl">
            <h3 className='text-2xl font-semibold text-white mb-4'>Want to be notified when it's ready?</h3>
            <div className="flex w-auto justify-center  ">
              <input type="text"
              placeholder='Your Email Address' 
              className='w-[70%] mx-4 outline-none px-3 rounded-md  font-normal text-purple-500' />
              <button className='text-lg  font-semibold text-white bg-purple-600 hover:bg-purple-800 py-2 px-3 rounded-lg'>Notify me</button>
            </div>
          </div>
          <div className="mt-5 text-center flex  justify-center items-center">
          <Link to="/dashboard" className='text-purple-800   hover:text-purple-400 flex justify-center items-center'><FaArrowLeft className=' mx-2'/> Back to Home</Link>
          </div>
          </div>
        </section>
        <Footer/>
    </div>
  )
}

export default Earning
