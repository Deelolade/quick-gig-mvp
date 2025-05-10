import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { GoHomeFill } from "react-icons/go";
import { FaMessage } from "react-icons/fa6";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { SlEnvolopeLetter } from "react-icons/sl";
import { RiFileList2Fill } from "react-icons/ri";
import { FaFileContract } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { RiContractFill } from "react-icons/ri";

const ClientSideBar = () => {
    const location = useLocation();
    const { currentUser } = useSelector(state => state.user)
    return (
        <div>
            <div className="sidebar bg-black w-[15%] h-[100%] fixed text-white px-5 py-4 flex flex-col justify-between shadow-md">
                <div className="w-[100%] px-3">
                    <div className="logo mb-9">
                        <h1 className="text-2xl mb-2 bg-red-50 font-bold bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">Quick~Gig</h1>
                    </div>
                    <div className="links w-auto flex flex-col">
                        <Link to='/dashboard' className={`text-sm font-semibold w-full hover:bg-gray-500 px-2 py-4 my-2 rounded-md flex items-center ${location.pathname === '/dashboard' ? 'bg-gray-500' : ''}`}><GoHomeFill className='text-2xl me-3' />Home</Link>
                        <Link to='/post-gigs' className={`text-sm font-semibold w-full hover:bg-gray-500 px-2 py-4 my-2 rounded-md flex items-center ${location.pathname === '/post-gigs' ? 'bg-gray-500' : ''}`}><RiContractFill className='text-2xl me-3'/>Post a Job</Link>
                        <Link to='/browse' className={`text-sm font-semibold w-full hover:bg-gray-500 px-2 py-4 my-2 rounded-md flex items-center ${location.pathname === '/browse' ? 'bg-gray-500' : ''}`}> <RiFileList2Fill className='text-2xl me-3'/>Browse Freelancers</Link>
                        <Link to='/proposals' className={`text-sm font-semibold w-full hover:bg-gray-500 px-2 py-4 my-2 rounded-md flex items-center ${location.pathname === '/proposals' ? 'bg-gray-500' : ''}`}> <FaFileContract className='text-2xl me-3' />Proposals</Link>
                        <Link to='/messages' className={`text-sm font-semibold w-full hover:bg-gray-500 px-2 py-4 my-2 rounded-md flex items-center ${location.pathname === '/messages' ? 'bg-gray-500' : ''}`}><FaMessage className='text-2xl me-3'/>Messages</Link>
                        <Link to='/chatroom' className={`text-sm font-semibold w-full hover:bg-gray-500 px-2 py-4 my-2 rounded-md flex items-center ${location.pathname === '/chatroom' ? 'bg-gray-500' : ''}`}><SlEnvolopeLetter  className='text-2xl me-3'/>Chat rooms</Link>
                        <Link to='/payments' className={`text-sm font-semibold w-full hover:bg-gray-500 px-2 py-4 my-2 rounded-md flex items-center ${location.pathname === '/payments' ? 'bg-gray-500' : ''}`}><FaMoneyCheckAlt className='text-2xl me-3' />Payment</Link>
                    </div>
                </div>
                <Link to='/profile' className="user-profile text-white mb-4  w-[70%] flex justify-evenly items-center">
                    <img src={currentUser.profilePicture} alt="" className='w-12 h-12 bg-red-400 rounded-full ' />
                    <h1>Your Profile</h1>
                </Link>
            </div>
        </div>
    )
}

export default ClientSideBar
