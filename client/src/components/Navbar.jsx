import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [hoveredItem, setHoveredItem] = useState(null);
    const [hiddenMenu, setHiddenMenu] = useState(false)

    // const top =()=>{
    //     scrollX
    // }
    const navItems = [
        {
            name: "Features",
            content: (
                <div className=" flex  space-x-20 p-4">
                    <ul className='font-semibold'>
                        <li className='my-2'>Job Posts</li>
                        <li className='my-2'>Candidates</li>
                        <li className='my-2'>Interviews</li>
                    </ul>
                    <ul className='font-semibold'>
                        <li className='my-2'>Assignments</li>
                        <li className='my-2'>Invoices</li>
                    </ul>
                </div>
            ),
        },
        {
            name: "Roles",
            content: (
                <div className=" flex  space-x-20 p-4">
                    <ul className='font-semibold'>
                        <li className='my-2'>Marketing</li>
                        <li className='my-2'>Growth Marketer</li>
                        <li className='my-2'>Product Marketer</li>
                        <li className='my-2'>Email Marketer</li>
                    </ul>
                    <ul className='font-semibold'>
                        <li className='my-2'>Design</li>
                        <li className='my-2'>Graphics Designer</li>
                        <li className='my-2'>UI Designer</li>
                        <li className='my-2'>Web Designer</li>
                    </ul>
                    <ul className='font-semibold'>
                        <li className='my-2'>Content</li>
                        <li className='my-2'>Social Media Manager</li>
                        <li className='my-2'>Content Marketer</li>
                        <li className='my-2'>Copywriter</li>
                    </ul>
                </div>
            ),
        },
        {
            name: "For Talent",

        },
        {
            name: "About",
            content: (
                <ul className='flex space-x-16 font-bold p-6 '>
                    <li>Our Mission</li>
                    <li>Press</li>
                </ul>
            ),
        },
        {
            name: "Resources",
            content: (
                <ul className='flex space-x-20 font-bold p-6 '>
                    <li>Job Description Generator</li>
                    <li>Blog</li>
                    <li>FAQ</li>
                </ul>
            ),
        }
    ]
    return (
            <div className='bg-black z-50 fixed w-screen  '  onMouseLeave={() => setHoveredItem(null)} >
                <nav className="navbar px-6 bg-black max-w-6xl text-white flex h-[10vh] 2xl:h-[8vh] w-[95vw] lg:w-[95vw]  xl:w-[95vw] 2xl:w-[80vw]  justify-between items-center mx-auto">
                    <ul className="nav-links flex space-x-4 justify-center items-center ">
                        <h1 className="text-3xl mb-2 bg-red-50 font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">Quick~Gig</h1>
                        {navItems.map((item, index) => (
                            <div key={index} className="relative font-bold  hidden md:hidden lg:flex  ">
                                {/* Navigation Item */}
                                <button
                                    onMouseEnter={() => setHoveredItem(index)}
                                    className="hover:bg-[#1A1A1A] py-2 px-4 rounded transition"
                                >
                                    {item.name}
                                </button>
                            </div>
                        ))} 
                    </ul>
                    {hoveredItem !== null && (
                        <div
                            className="absolute left-0 hidden md:block md:top-[10vh] 2xl:top-[8vh] lg:top-[10vh] w-full bg-black/70  z-50 backdrop-blur-sm text-white shadow-lg transition-all"
                            onMouseEnter={() => setHoveredItem(hoveredItem)} // Keep it open when inside
                            onMouseLeave={() => setHoveredItem(null)} // Close when leaving
                        >
                            <div className="max-w-5xl mx-auto">
                                {navItems[hoveredItem].content} {/* Dynamic Content */}
                            </div>
                        </div>
                    )}

                    <div className="nav-buttons space-x-8 flex   ">
                        <Link to="/signin" className='bg-[#1A1A1A] hover:bg-[#333333] py-2 px-4 text-white font-semibold rounded-full hidden  lg:flex'>Sign In</Link>
                        <Link to='/role' className='bg-white py-2 px-4 text-black font-semibold rounded-full hidden  lg:flex'>Start Hiring Talent </Link>
                        <button className=" hover:bg-[#1A1A1A] py-2 px-2 rounded transition lg:hidden" onClick={() => setHiddenMenu((prev) => !prev)}>
                            <div className="w-5 h-[2px] mb-[3px] bg-white"></div>
                            <div className="w-5 h-[2px] mb-[3px] bg-white"></div>
                            <div className="w-5 h-[2px] mb-[3px] bg-white"></div>
                        </button>
                    </div>
                </nav>
                {hiddenMenu && (
                    <div className=" bg-black/50  z-50 backdrop-blur-lg  h-screen w-screen fixed ">
                        {hiddenMenu && (navItems.map((item, idx) => (
                            <ul key={idx} className={`  text-white px-5 py-2`}>
                                <li className='hover:bg-[#333333] px-2 py-1 rounded'>{item.name} </li>
                            </ul>
                        )))}
                        <div className="mx-auto mt-5 items-center flex flex-col  justify-center  p-8">
                            <Link to='/signin' className='py-2 px-8  text-white  hover:bg-[#333333] font-semibold rounded-full text-center'>Sign In</Link>
                            <Link to='/role' className=' py-2 px-4  text-white  hover:bg-[#333333] font-semibold rounded-full text-center'>Start Hiring Talent </Link>
                        </div>
                        <button onClick={() => setHiddenMenu((prev) => !prev)} className=' mx-auto mt-5 items-center flex flex-col  justify-center  p-8 rounded-full hover:bg-[#333333]'>
                            <div className="absolute w-7 h-[2px] mb-[3px] bg-white rotate-45"></div>
                            <div className="absolute w-7 h-[2px] mb-[3px] bg-white -rotate-45"></div>
                        </button>
                    </div>
                )}
            </div>
    )
}

export default Navbar
