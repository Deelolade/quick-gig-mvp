import React, { useEffect, useState } from 'react'
import SideBar from './ClientSideBar'
import axios from 'axios'
import { useSelector } from 'react-redux'


const FreelancersDashboard = () => {
  const {currentUser} = useSelector(state=> state.user)

  const [gigCount, setGigCount] = useState(0)
  const [proposalCount, setProposalCount] = useState(0)
  useEffect(()=>{
    const fetchGigCount = async()=>{
      try {
        const res = await axios.get(`http://localhost:5500/api/client/proposals/${currentUser._id}`, {
          withCredentials: true,
        })
        setGigCount(res.data.count)
        localStorage.setItem("total_gig_count", JSON.stringify(res.data.count))
        console.log(res.data)
      } catch (error) {
        console.error("Error fetching gig count:", error);
        const cachedData = localStorage.getItem("total_gig_count")
        if(cachedData){
          setGigCount(JSON.parse(cachedData))
        }
      }
    }
    fetchGigCount();
  }, [])
  useEffect(()=>{
    const fetchProposalCount = async()=>{
      try {
        const res = await axios.get(`http://localhost:5500/api/user/proposals/:${currentUser._id}`, {
          withCredentials: true,
        })
        setProposalCount(res.data.proposalCount)
        localStorage.getItem("proposal_count", JSON.stringify(res.data.proposalCount))
        console.log(res.data)
      } catch (error) {
        console.error("Error fetching gig count:", error);
        const cachedData = localStorage.setItem("proposal_count")
        if(cachedData){
          setProposalCount(JSON.parse(cachedData))
        }
      }
    }
    fetchProposalCount();
  }, [])
  return (
    <div className='flex justify-between'>
    <SideBar />
    <div className="dashboard w-[85%] bg-gray-100 min-h-screen">
      <nav className='h-[8vh] w-[85vw] py-4 px-12 flex justify-between items-center bg-white shadow-md fixed z-20'>
        <h1 className='text-xl font-semibold'>Dashboard</h1>
        <button className='px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition'>Refer a Client</button>
      </nav>
  
      <section className='pt-[10vh] bg-gradient-to-br from-blue-500 to-red-500 px-6 pb-16'>
        <div className='text-white'>
          <h1 className='text-3xl font-semibold mb-2'>Hi, {currentUser.userName}! 
            <span className='block text-lg font-normal'>Here are your action items of the week.</span>
          </h1>
          <div className='mt-4 inline-flex items-center gap-3 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-lg shadow-md text-white'>
            <span className='font-medium'>You have</span>
            <span className='font-bold'>0</span>
            <span>interviews coming up.</span>
          </div>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 transition hover:shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className='text-xl font-semibold text-gray-700'>Active Gigs</h2>
              <span className='text-2xl font-bold text-blue-600'>{gigCount}</span>
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
      </section>
    </div>
  </div>
  )
}

export default FreelancersDashboard
