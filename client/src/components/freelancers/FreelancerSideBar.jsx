import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { GoHomeFill } from "react-icons/go";


const FreelancerSideBar = () => {
    const [selectedItem, setSelectedItem] = useState("home")

    return (
        <div>
            <div className="sidebar bg-black w-[15%] h-[100%] fixed text-white px-5 py-4 flex flex-col justify-between shadow-md">
                <div className="w-[100%] px-3">
                    <div className="logo mb-9">
                        <h1 className="text-xl mb-2 bg-red-50 font-bold bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">Quick~Gig</h1>
                    </div>
                    <div className="links w-auto flex flex-col">
                        <Link to='/dashboard' className='text-sm font-semibold w-full hover:bg-gray-500 px-2 py-2 rounded-md flex items-center'><GoHomeFill className='text-xl me-3' />Home</Link>
                        <Link to='/browse-gigs' className='text-sm font-semibold w-full hover:bg-gray-500 px-2 py-2 rounded-md'>Browse Job</Link>
                        <Link to='/proposals' className='text-sm font-semibold w-full hover:bg-gray-500 px-2 py-2 rounded-md'>Proposals</Link>
                        <Link to='/messages' className='text-sm font-semibold w-full hover:bg-gray-500 px-2 py-2 rounded-md'>Messages</Link>
                        <Link to='/contracts' className='text-sm font-semibold w-full hover:bg-gray-500 px-2 py-2 rounded-md'>Contracts</Link>
                        <Link to='/earnings' className='text-sm font-semibold w-full hover:bg-gray-500 px-2 py-2 rounded-md'>Earnings</Link>
                    </div>
                </div>
                <Link to='/profile' className="user-profile text-white mb-4  w-[70%] flex justify-evenly items-center">
                    <img src="" alt="" className='w-12 h-12 bg-red-400 rounded-full ' />
                    <h1>Your Profile</h1>
                </Link>
            </div>
        </div>
    )
}

export default FreelancerSideBar
