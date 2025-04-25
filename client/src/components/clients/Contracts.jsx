import React from 'react'
import ClientSideBar from './ClientSideBar'

const Contracts = () => {
  return (
    <div className='flex justify-between  bg-gray-100 h-[100vh]'>
      <ClientSideBar />
      <div className="dashboard w-[85%] bg-gray-100 h-[auto] ">
        <nav className='h-[8vh] w-[85vw]  py-4 px-12 flex justify-between items-center bg-white shadow-md fixed z-20' >
          <h1 className='text-2xl font-semibold'>Contracts </h1>
          <div className="">
            <button className='px-3 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg'>Refer a Freelancer</button>
          </div>
        </nav>
        </div>
    </div>
  )
}

export default Contracts
