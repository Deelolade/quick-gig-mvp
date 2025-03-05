import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [hoveredItem, setHoveredItem] = useState(null);
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
        <div className='bg-black' onMouseLeave={() => setHoveredItem(null)} >
            <nav className="navbar bg-black text-white flex h-[10vh] 2xl:h-[8vh] 2xl:w-[60%] lg:w-[90%] justify-between items-center mx-auto">
                <ul className="nav-links flex space-x-4 justify-center items-center">
                    <h1 className="text-3xl mb-2 bg-red-50 font-bold bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">Quick~Gig</h1>
                    {navItems.map((item, index) => (
                        <div key={index} className="relative font-bold">
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
                        className="absolute left-0 2xl:top-[8vh] lg:top-[10vh] w-full bg-black/50 backdrop-blur-sm text-white shadow-lg transition-all"
                        onMouseEnter={() => setHoveredItem(hoveredItem)} // Keep it open when inside
                        onMouseLeave={() => setHoveredItem(null)} // Close when leaving
                    >
                        <div className="max-w-5xl mx-auto">
                            {navItems[hoveredItem].content} {/* Dynamic Content */}
                        </div>
                    </div>
                )}

                <div className="nav-buttons space-x-8">
                    <button className='bg-[#1A1A1A] hover:bg-[#333333] py-2 px-4 text-white font-semibold rounded-full'>Sign In</button>
                    <button className='bg-white py-2 px-4 text-black font-semibold rounded-full'>Start Hiring Talent </button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
