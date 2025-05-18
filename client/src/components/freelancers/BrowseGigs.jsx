import React, { useEffect, useState } from 'react'
import SideBar from '../freelancers/FreelancerSideBar'
import { GoHomeFill } from "react-icons/go";
import axios from "axios"
import Modal from "react-modal"
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BottomMenu from './BottomMenu';



const BrowseGigs = () => {
  const [gigs, setGigs] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null); // <-- store clicked job
  const [gigData, setGigData] = useState({})
  const {currentUser }= useSelector(state=> state.user)
  const API_URL = import.meta.env.VITE_API_BASE_URL

  const handleChange =(e)=>{
    setGigData((prev)=>({...prev,[e.target.name]:e.target.value}))
  }
  const combinedData ={
    ...gigData,
    gigId: selectedJob?._id,
  freelancerId: currentUser?._id
  }
  const handleSubmit = async () => {
   try {
    setIsOpen(false);
    const res = await axios.post(`${API_URL}/api/proposals/${currentUser._id}`, combinedData ,
      {withCredentials:true} 
    ) 
    toast.success("Proposal sent successfully")
    return res.data.Gigs
   } catch (error) {
    toast.error("Submission failed:", error?.response?.data?.message || error.message)
   }
  };
  useEffect(() => {
    const getGigs = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/gigs`,
          { withCredentials: true }
        )
        setGigs(res.data.Gigs)
        localStorage.setItem("cached_gigs", JSON.stringify(res.data.Gigs) )
      } catch (error) {
        console.error('Failed to fetch freelancers:', error);
        const cachedData = localStorage.getItem("cached_gigs")
        if (cachedData) {
          setProposalCount(JSON.parse(cachedData))
        }
      }
    }
    getGigs()
  }, [])
  return (
    <>
    <div className='lg:flex lg:justify-between  bg-gray-100 h-[100vh]'>
      <SideBar />
      <div className="dashboard lg:w-[85vw] bg-gray-100 min-h-screen">
          <nav className='h-[8vh] w-full lg:w-[85vw] py-4 px-5 md:px-12 flex justify-between items-center bg-white shadow-md fixed z-20'>
            <h1 className='md:text-xl font-semibold'>Browse Gigs</h1>
            <button className='px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition'>Refer a Freelancer</button>
          </nav>
        <section className='top-[8vh] relative p-8  bg-gray-100 mb-12 '>
          <div className=" mb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto">
          {
            gigs.map((gig, idx) => {
              return (
                <div className="w-full md:w-[95%] mt-6 bg-white shadow-md border border-gray-200 rounded-2xl p-4 transition transform hover:scale-105 hover:shadow-xl " key={idx}>
                  <div className="mt-2">
                    <h2 className="text-xl font-semibold text-gray-800">{gig.title}</h2>

                    <p className="text-sm text-gray-600 mt-1">Category: <span className="capitalize">{gig.category}</span></p>

                    <p className="text-sm text-gray-600 mt-1">🗓️ Delivery by: <span className="font-medium">{new Date(gig.deliveryTime).toLocaleDateString()}</span></p>

                    <p className="text-sm text-gray-700 mt-3 line-clamp-3">{gig.description}</p>

                    <div className="flex justify-between items-center mt-4">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        ${gig.price}
                      </span>
                      <button
                        onClick={() => {
                          setSelectedJob(gig); // set clicked job
                          setIsOpen(true);     // open modal
                        }}
                        className="bg-green-500 hover:bg-green-600 transition text-white py-1.5 px-4 rounded-full text-sm font-medium">
                        View Gig
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          }
          </div>
        </section>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Job Details"
        className="bg-white w-[90vw] md:w-[80vw] lg:w-[38vw] h-auto  mx-auto mt-24 p-8 rounded-xl shadow-xl outline-none"
        overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center"
      >
        {selectedJob && (
          <>
            <h2 className="text-3xl font-semibold">{selectedJob.title}</h2>
            <p className="mt-2">{selectedJob.description}</p>
            <div className="my-4">
              <label htmlFor="" className='text-gray-700'>Budget:</label>
              <input type="text"
              name="budget"
              id="budget"
              onChange={handleChange}
              placeholder='eg. 100'
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className=" my-4">
              <label htmlFor="" className='text-gray-700'>Delivery Time (Days):</label>
              <input type="date"
              name='duration'
              id='duration'
              onChange={handleChange}
              placeholder='can deliver in less?'
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <textarea
              name='proposalText'
              id='proposalText'
              onChange={handleChange}
              className="w-full mt-4 border rounded p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              rows="4"
              placeholder="Briefly explain how you'll handle this project and why you're the right fit."
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Send Proposal
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </Modal>
    </div>
    <BottomMenu/>
    </>
  )
}

export default BrowseGigs
