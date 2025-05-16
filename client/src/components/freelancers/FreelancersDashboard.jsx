import React, { useState, useEffect } from 'react'
import SideBar from './FreelancerSideBar'
import { useSelector } from 'react-redux'
import axios from "axios"
import { Link } from 'react-router-dom'
import BottomMenu from './BottomMenu'


const FreelancersDashboard = () => {
  const [proposalCount, setProposalCount] = useState(0)

  const { currentUser } = useSelector(state => state.user)
  useEffect(() => {
    const fetchProposalCount = async () => {
      try {
        const res = await axios.get(`http://localhost:5500/api/freelancer/proposals/${currentUser._id}`, {
          withCredentials: true,
        })
        setProposalCount(res.data.count)
        localStorage.setItem("total_gig_count", JSON.stringify(res.data.count))
        console.log(res.data)
      } catch (error) {
        console.error("Error fetching gig count:", error);
        const cachedData = localStorage.getItem("total_gig_count")
        if (cachedData) {
          setProposalCount(JSON.parse(cachedData))
        }
      }
    }
    fetchProposalCount();
  }, [])
  return (
    <>
      <div className='flex justify-between'>
        <SideBar />
        <div className="dashboard lg:w-[85vw] bg-gray-100 min-h-screen">
          <nav className='h-[8vh] w-full lg:w-[85vw] py-4 px-5 md:px-12 flex justify-between items-center bg-white shadow-md fixed z-20'>
            <h1 className='md:text-xl font-semibold'>Dashboard</h1>
            <button className='px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition'>Refer a Client</button>
          </nav>
          <section className='pt-[12vh] md:pt-[15vh] lg:pt-[12vh] bg-gradient-to-br from-blue-500 to-red-500 px-6 md:px-12 lg:px-6 pb-16'>
            <div className='text-white'>
              <h1 className=' text-2xl md:text-3xl font-semibold mb-2'>Hi, {currentUser.userName}! </h1>
              <span className='block text-sm md:text-lg font-normal'>Here are your action items of the week.</span>
              <div className='mt-4 inline-flex items-center gap-3 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-lg shadow-md text-white'>
                <span className='font-medium text-sm md:text-lg'>You have <span className='font-bold'> 0 </span>interviews coming up.</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12 mb-12">
              {/* Active Gigs */}
              <div className="bg-white rounded-2xl shadow-lg p-6 transition hover:shadow-xl flex flex-col justify-between">
                <div className="flex justify-between items-center mb-4">
                  <h2 className='text-xl font-semibold text-gray-700'>Active Gigs</h2>
                  <span className='text-2xl font-bold text-blue-600'>{proposalCount}</span>
                </div>
                <p className='text-gray-500 text-sm mb-6'>These are gigs you’re currently working on.</p>
                <Link to="/proposals" className="mt-auto px-4 py-2 text-center bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-semibold transition">View Gigs</Link>
              </div>

              {/* Manage Payments */}
              <div className="bg-white rounded-2xl shadow-lg p-6 transition hover:shadow-xl flex flex-col justify-between">
                <div className="flex justify-between items-center mb-4">
                  <h2 className='text-xl font-semibold text-gray-700'>Manage Payments</h2>
                </div>
                <p className='text-gray-500 text-sm mb-6'>Awaiting responses from clients regarding the payments for your recent gigs. Be sure to follow up if necessary.</p>
                <div className="flex justify-between gap-4">
                  <Link to="/earnings" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-semibold transition w-full text-center">View Payment Status</Link>
                  <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 text-sm font-semibold transition w-full">Contact Support</button>
                </div>
              </div>

              {/* Build Your Reputation */}
              <div className="bg-white rounded-2xl shadow-lg p-6 transition hover:shadow-xl flex flex-col justify-between">
                <div className="flex justify-between items-center mb-4">
                  <h2 className='text-xl font-semibold text-gray-700'>Build Your Reputation</h2>
                </div>
                <p className='text-gray-500 text-sm mb-6'>Currently in development or collaboration stage. You’re one step closer to increasing your credibility and showcasing your expertise!</p>
                <div className="flex justify-between gap-4">
                  <Link to='/messages' className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-semibold transition text-center w-full">View Progress</Link>
                  <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 text-sm font-semibold transition w-full">Learn More</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <BottomMenu/>
    </>

  )
}

export default FreelancersDashboard
