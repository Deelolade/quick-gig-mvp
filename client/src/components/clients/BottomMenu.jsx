import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { GoHomeFill } from "react-icons/go";
import { RiFileList2Fill } from "react-icons/ri";
import { SlEnvolopeLetter } from "react-icons/sl";
import {  useSelector } from 'react-redux';
import { RiContractFill } from "react-icons/ri";

const BottomMenu = () => {
    const location = useLocation();
    const { currentUser } = useSelector(state => state.user)
    return (
        <div>
            <div>
                <div className="bottombar bg-black h-[auto] md:h-[9vh] fixed  bottom-0 w-[100vw] lg:hidden text-white md:px-5 py-2  flex justify-between shadow-md">
                        <div className="links w-[100vw] flex justify-evenly items-center  ">
                            <Link to='/dashboard' className={`text-[13px] md:text-[15px]  font-bold  text-center flex flex-col justify-center items-center`}><GoHomeFill className={`text-5xl   my-1 rounded-md me-3  hover:bg-gray-500 px-2 px-2 ${location.pathname === '/dashboard' ? 'bg-gray-500' : ''}`}/>Home</Link>
                            <Link to='/post-gigs' className={`text-[13px] md:text-[15px]  font-bold  text-center flex flex-col justify-center items-center `}><RiContractFill className={`text-5xl   my-1 rounded-md me-3  hover:bg-gray-500 px-2 py-2 ${location.pathname === '/post-gigs' ? 'bg-gray-500' : ''}`} />Post a Job</Link>
                            <Link to='/browse' className={`text-[13px] md:text-[15px]  font-bold  text-center flex flex-col justify-center items-center `}><RiFileList2Fill className={`text-5xl   my-1 rounded-md me-3  hover:bg-gray-500 px-2 py-2 ${location.pathname === '/browse' ? 'bg-gray-500' : ''}`} />Freelancers</Link>
                            <Link to='/chatroom' className ={`text-[13px] md:text-[15px]  font-bold  text-center flex flex-col justify-center items-center `}><SlEnvolopeLetter className={`text-5xl   my-1 rounded-md me-3  hover:bg-gray-500 px-2 py-2 ${location.pathname === '/chatroom' ? 'bg-gray-500' : ''}`} />Chat rooms</Link>
                            <Link to='/profile' className="user-profile text-white    flex justify-evenly items-center">
                                <img src={currentUser.profilePicture} alt="" className='md:w-14 md:h-14 w-12 h-12  rounded-full ' />
                            </Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default BottomMenu
