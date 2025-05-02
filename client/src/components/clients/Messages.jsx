import React, { useState, useEffect } from 'react'
import { setSelectedUser } from "../../redux/chat/chatSlice"
import { useSelector, useDispatch } from 'react-redux'
const Messages = () => {
  const dispatch = useDispatch()
  const {  selectedUsers } = useSelector(state => state.chat);
  
 
  return (
    <div className='flex '>
      <aside className='w-[15vw] h-screen overflow-y-auto bg-green-300  px-2 text-white  py-4 flex flex-col justify-between shadow-md'>
        <div className="">
          <input type="text" className='my-5' />
        {Array.isArray(selectedUsers) && selectedUsers.map((user, idx)=>{
          return(
            <ul key={idx} className='flex  justify-start items-center my-2 bg-green-400 py-2 px-2 rounded-xl border-b-2'>
            <img src={user.profilePicture} alt="" className='w-12 h-12 rounded-full me-3' />
            <li>{user.userName}</li>
          </ul>
          )
        })}
        </div>
      </aside>
      <section className=''>
        <nav className='h-[8vh] w-[85vw]  py-4 px-12 flex justify-between items-center bg-white shadow-md fixed z-20' >
          <h1 className='text-2xl font-semibold'>Messages</h1>
          <div className="">
            <button className='px-3 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg'>Refer a Freelancer</button>
          </div>
        </nav>
      </section>
    </div>
  )
}

export default Messages
