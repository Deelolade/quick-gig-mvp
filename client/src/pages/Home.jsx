import React from 'react'
import Navbar from '../components/Navbar'
// import { FaArrowRightLong } from "react-icons/fa6";
// import HeavyMouseButton from '../components/Button';

const Home = () => {
    return (
        <>
        <Navbar/>
        <div className=" bg-black h-[70vh] flex flex-col items-center justify-center">
            <div className=' text-white relative 2xl:w-[60%] lg:w-[90%] h-auto mx-auto text-left-center'>
                <h1 className='text-9xl text-left inline'>Hire Top Talent Today</h1>
                {/* <button className=' items-center inline-block bg-[#F20DCC] text-xl font-bold rounded-full text-black px-6 py-2  relative left-[24px] bottom-[22px] '>Start Hiring <FaArrowRightLong className='inline' /></button> */}
{/* <HeavyMouseButton/> */}
                
            </div>
        </div>
        </>
    )
}

export default Home
