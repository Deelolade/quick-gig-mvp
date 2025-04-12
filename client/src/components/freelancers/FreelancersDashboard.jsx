import React from 'react'
import SideBar from './FreelancerSideBar'

const FreelancersDashboard = () => {
  return (
    <div className='flex justify-between  '>
      <SideBar />
      <div className="dashboard w-[85%] bg-gray-100 h-[auto] ">
        <nav className='h-[8vh] w-[85vw]  py-4 px-12 flex justify-between items-center bg-white shadow-md fixed z-20' >
          <h1 className='text-xl font-semibold'>Home</h1>
          <div className="">
            <button className='px-3 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg'>Refer a Client</button>
          </div>
        </nav>
        <section className='top-[8vh] bg-gradient-to-br from-blue-500 to-red-500 relative px-6 py-8 h-[30vh] '>
          <h1 className='text-3xl text-white'><span className='font-semibold'>Hi, Habeeb!</span> Here are your action items of the week.</h1>
          <button className='mt-4  bg-slate-100/20 border-2  py-2 px-3 rounded-md text-white font-semibold'>You have 0 interviews coming up.</button>
          <div className="flex justify-evenly items-center w-[100%] mt-20">
            <div className="w-[30%] bg-white h-[30vh] rounded-md shadow-md">
              <div className="border-b-2 border-gray-400 py-4 px-4 flex justify-between items-center">
                <h1 className='font-semibold text-xl'>Active Gigs:</h1>
                <h1 className='font-semibold text-xl' >0</h1>
              </div>

            </div>
            <div className="w-[30%] bg-white h-[30vh] rounded-md shadow-md">
              <div className="border-b-2 border-gray-400 py-4 px-4 flex justify-between items-center">
                <h1 className='font-semibold text-xl'>Pending Proposals:</h1>
                <h1 className='font-semibold text-xl'>0</h1>
              </div>

            </div>
            <div className="w-[30%] bg-white h-[30vh] rounded-md shadow-md">
              <div className="border-b-2 border-gray-400 py-4 px-4 flex justify-between items-center">
                <h1 className='font-semibold text-xl'>Ongoing Projects:</h1>
                <h1 className='font-semibold text-xl'>0</h1>
              </div>

            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

export default FreelancersDashboard
