import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { GoHomeFill } from "react-icons/go";
import { RiFileList2Fill } from "react-icons/ri";
import { SlEnvolopeLetter } from "react-icons/sl";
import { useSelector } from 'react-redux';
import { RiContractFill } from "react-icons/ri";

const BottomMenu = () => {
    const location = useLocation();
    const { currentUser } = useSelector(state => state.user)
    return (
        <div>
            <div>
                <div className="bottombar bg-black  h-[9vh] md:h-[9vh] fixed  bottom-0 w-[100vw] lg:hidden text-white md:px-5 py-2  flex justify-between shadow-md">
                    <div className="links w-[100vw] flex justify-evenly items-center  ">
                        <Link to='/dashboard' className={`text-[12px]  md:text-[15px]  font-bold  text-center flex flex-col justify-center items-center`}>
                            <GoHomeFill className={`text-5xl   my-1 rounded-md me-3   hover:bg-gray-500 px-2 ${location.pathname === '/dashboard' ? 'bg-gray-500' : ''}`} />
                            <p className='hidden md:block' >
                                Home
                            </p>
                        </Link>
                        <Link to='/browse-gigs' className={`text-[12px]  md:text-[15px]  font-bold  text-center flex flex-col justify-center items-center`}>
                            <RiContractFill className={`text-5xl   my-1 rounded-md me-3   hover:bg-gray-500 px-2 ${location.pathname === '/browse-gigs' ? 'bg-gray-500' : ''}`} />
                            <p  className='hidden md:block' >
                                Browse Gigs
                            </p>
                        </Link>
                        <Link to='/proposals' className={`text-[12px]  md:text-[15px]  font-bold  text-center flex flex-col justify-center items-center`}>
                            <RiFileList2Fill className={`text-5xl   my-1 rounded-md me-3   hover:bg-gray-500 px-2 ${location.pathname === '/proposals' ? 'bg-gray-500' : ''}`} />
                            <p className='hidden md:block' >
                                Proposals
                            </p>
                        </Link>
                        <Link to='/chatroom' className={`text-[12px]  md:text-[15px]  font-bold  text-center flex flex-col justify-center items-center`}>
                            <SlEnvolopeLetter className={`text-5xl   my-1 rounded-md me-3   hover:bg-gray-500 px-2 ${location.pathname === '/chatroom' ? 'bg-gray-500' : ''}`} />
                            <p className='hidden md:block' >
                                Chatroom
                            </p>
                        </Link>
                        <Link to='/profile' className="user-profile text-white    flex justify-evenly items-center">
                            <img src={currentUser.profilePicture} alt="" className=' lg:w-14 lg:h-14 w-12 h-12  rounded-full ' />
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default BottomMenu
