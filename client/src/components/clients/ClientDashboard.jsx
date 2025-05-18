import React, { useEffect, useState } from 'react'
import SideBar from './ClientSideBar'
import axios from 'axios'
import { useSelector } from 'react-redux'
import BottomMenu from './BottomMenu'
import { Link } from 'react-router-dom'


const FreelancersDashboard = () => {
  const { currentUser } = useSelector(state => state.user)
  const API_URL = import.meta.env.VITE_API_BASE_URL
  
  const [proposalCount, setProposalCount] = useState(0)
  useEffect(() => {
    const fetchProposalCount = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/client/proposals/${currentUser._id}`, {
          withCredentials: true,
        })
        setProposalCount(res.data.proposalCount)
        localStorage.setItem("total_proposal_count", JSON.stringify(res.data.proposalCount))
        console.log(res.data)
      } catch (error) {
        console.error("Error fetching gig count:", error);
        const cachedData = localStorage.getItem("total_proposal_count")
        if (cachedData) {
          setProposalCount(JSON.parse(cachedData))
        }
      }
    }
    fetchProposalCount();
  }, [])

  return (
    <>
      <div className='lg:flex lg:justify-between'>
        <SideBar />
        <div className="dashboard lg:w-[85vw] bg-gray-100 min-h-screen">
          <nav className='h-[8vh] w-full lg:w-[85vw] py-4 px-5 md:px-12 flex justify-between items-center bg-white shadow-md fixed z-20'>
            <h1 className='md:text-xl font-semibold'>Dashboard</h1>
            <button className='px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition'>Refer a Freelancer</button>
          </nav>
          <section className='pt-[12vh] md:pt-[15vh] lg:pt-[12vh] bg-gradient-to-br from-blue-500 to-red-500 px-6 md:px-12 lg:px-6 pb-16'>
            <div className='text-white'>
              <h1 className=' text-2xl md:text-3xl font-semibold mb-2'>Hi, {currentUser.userName}! </h1>
              <span className='block text-sm md:text-lg font-normal'>Here are your action items of the week.</span>
              <div className='mt-4 inline-flex items-center gap-3 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-lg shadow-md text-white'>
                <span className='font-medium text-sm md:text-lg'>You have <span className='font-bold'> 0 </span>interviews coming up.</span>
              </div>
            </div>
            {/* For larger screens */}
            <div className="lg:grid hidden grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 mt-12 mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-6 transition hover:shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <h2 className='text-xl font-semibold text-gray-700'>Active Gigs</h2>
                  <span className='text-2xl font-bold text-blue-600'>{proposalCount}</span>
                </div>
                <p className='text-gray-500 text-sm'>These are gigs you’re currently working on.</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 transition hover:shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <h2 className='text-xl font-semibold text-gray-700'>Pending Proposals</h2>
                  <span className='text-2xl font-bold text-yellow-500'>{proposalCount}</span>
                </div>
                <p className='text-gray-500 text-sm'>Awaiting responses from clients.</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 transition hover:shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <h2 className='text-xl font-semibold text-gray-700'>Ongoing Projects</h2>
                  <span className='text-2xl font-bold text-green-500'>0</span>
                </div>
                <p className='text-gray-500 text-sm'>Currently in development or collaboration stage.</p>
              </div>
            </div>
            {/* For smaller and medium screens */}
            <div className="grid grid-cols-1 lg:hidden md:grid-cols-1 lg:grid-cols-3 gap-6 mt-12 mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-6 transition hover:shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <h2 className='text-xl font-semibold text-gray-700'>Ongoing Gigs</h2>
                  <span className='text-2xl font-bold text-blue-600'>{proposalCount}</span>
                </div>
                <p className='text-gray-500 text-sm'>These are the projects you're actively working on. Stay focused and keep delivering great work!</p>
              </div>

              {/* Manage Payments */}
              <div className="bg-white rounded-2xl shadow-lg p-6 transition hover:shadow-xl flex flex-col justify-between">
                <div className="flex justify-between items-center mb-4">
                  <h2 className='text-xl font-semibold text-gray-700'>Freelancer Hub</h2>
                </div>
                <p className='text-gray-500 text-sm mb-6'>Track pending payments and stay updated with client activity. Don’t forget to follow up on unresolved transactions.</p>
                <div className="flex justify-between gap-4">
                  <Link to='/proposals' className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-semibold transition w-full text-center">See Proposals Received</Link>
                  <Link to="/payments" className="px-4 py-2   bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 text-sm font-semibold transition w-full text-center">Check Payment Status</Link>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 transition hover:shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <h2 className='text-xl font-semibold text-gray-700'>Message Center</h2>
                </div>
                <p className='text-gray-500 text-sm mb-6'>Stay on top of your conversations. Review past messages or follow up with potential clients.</p>
                <Link to='/messages' className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-semibold transition w-full text-center">View messages</Link>
              </div>
            </div>

          </section>
        </div>
      </div>
      <BottomMenu />
    </>
  )
}

export default FreelancersDashboard
