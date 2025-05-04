import React, { useEffect, useState } from 'react'
import ClientSideBar from './ClientSideBar'
import axios from "axios"
import Modal from "react-modal"
import { Link, useNavigate } from 'react-router-dom'
import { FaTelegramPlane } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'
import {io} from "socket.io-client"
import { addUser } from '../../redux/chat/chatSlice'

const BrowseFreelancers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [freelancer, setFreelancer] = useState([])
  const [isOpen, setIsOpen] = useState(false)  
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector(state => state.user);
  const [selectedFreelancer, setSelectedFreelancer] = useState(null); // <-- store clicked job
const socket = io('http://localhost:5500', {withCredentials:true})

  useEffect(() => {
    const getFreelancers = async () => {
      setLoading(true)
      try {
        const res = await axios.get("http://localhost:5500/api/users/freelancer-dashboard",
          { withCredentials: true }
        )
        setFreelancer(res.data.freelancers)
        localStorage.setItem("freelancer_cache", JSON.stringify(res.data.freelancers))
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch freelancers:', error);
        const cacheData = localStorage.getItem("freelancer_cache")
        if (cacheData){
          setFreelancer(JSON.parse(cacheData))
          setTimeout(() => {
            setLoading(false)
          }, 500)
          return;
        }
        setLoading(false)
      }
    }
    getFreelancers()
  }, [])
  const handleChatClick = (user) => {
    dispatch(addUser(user))
    navigate("/messages", {state:{selectedUser : user, senderUser: currentUser}})
    socket.emit("initiate_chat", {
      from: currentUser._id,
      to:user._id
    })
    console.log(user._id)
  }
  return (
    <div className='flex justify-between  bg-gray-100 h-[100vh]'>
       {loading && (
        <div className="fixed  inset-0 flex justify-center items-center bg-black/20 z-[9999] ">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      )}
      <ClientSideBar />
      <div className="dashboard w-[85%] bg-gray-100 h-[auto] ">
        <nav className='h-[8vh] w-[85vw]  py-4 px-12 flex justify-between items-center bg-white shadow-md fixed z-20' >
          <h1 className='text-2xl font-semibold'>Browse Freelancers </h1>
          <div className="">
            <button className='px-3 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg'>Refer a Freelancer</button>
          </div>
        </nav>
        <section className='top-[8vh] relative p-8  bg-gray-100 grid grid-cols-4 mx-auto  '>
          {
            freelancer.map((user, idx) => {
              return (
                <div className="w-full md:w-[350px] bg-white my-4 shadow-md border border-gray-200 rounded-2xl p-4 transition transform hover:scale-105 hover:shadow-xl" key={idx}>
                  <img src={user.profilePicture} alt="profile" className="w-full h-48 object-cover rounded-xl" />
                  <div className="mt-4">
                    <h1 className="text-xl font-semibold">{user.fullName}</h1>
                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {user.skills?.map((skill, i) => (
                        <span key={i} className="bg-green-100 text-green-800 px-3 py-1 text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                    {/* Bio */}
                    <p className="text-sm text-gray-700 mt-3 line-clamp-3">
                      {user.bio || "No bio provided."}
                    </p>
                    {/* Verified Status */}
                    <p className="flex items-center gap-1 text-green-600 text-sm mt-2">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full" />
                      Verified Profile
                    </p>
                    {/* Button */}
                    <button
                      onClick={() => { setIsOpen(true); setSelectedFreelancer(user) }}
                      className="bg-green-500 hover:bg-green-600 transition text-white py-2 px-4 rounded-full mt-4 w-full font-medium">
                      View Profile
                    </button>
                  </div>
                </div>



              )
            })
          }


        </section>
      </div>
      <Modal
        isOpen={isOpen}
        contentLabel="Freelancer Details"
        onRequestClose={() => setIsOpen(false)}
        className="bg-white w-[38vw] h-auto  mx-auto mt-24 p-8 rounded-xl shadow-xl outline-none"
        overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center"
      >
        {
          selectedFreelancer && (
            <>
              {/* Profile Picture */}
              <div className="flex flex-col items-center">
                <img
                  src={selectedFreelancer.profilePicture || '/default-profile.png'}
                  alt="Profile"
                  className="w-36 h-36 rounded-full object-cover mb-4"
                />
                <h2 className="text-2xl font-bold">{selectedFreelancer.fullName}</h2>
                <p className="text-gray-500 text-sm mt-1">{selectedFreelancer.topSkill || 'Freelancer'}</p>
                {/* Verified Badge */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-green-500 text-lg font-semibold">Verified</span>
                  <div className="relative flex justify-center items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full z-30" />
                    <div className="w-4 h-4 bg-green-200 rounded-full absolute  animate-pulse duration-75" />
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">About Me</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {selectedFreelancer.bio || 'No bio provided yet.'}
                </p>
              </div>

              {/* Skills */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedFreelancer.skills?.length ? (
                    selectedFreelancer.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No skills listed.</p>
                  )}
                </div>
              </div>

              {/* Details Section */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-gray-100 p-4 rounded-xl text-center">
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="text-sm font-medium">{selectedFreelancer.location || 'Unknown'}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between gap-4 mt-8">
                <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full text-sm w-full">
                  Invite to Job
                </button>
                <button onClick={() => handleChatClick(selectedFreelancer)} className=" flex justify-center items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full text-sm w-full">
                  Send Message <FaTelegramPlane className='mx-2' />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-full text-sm w-full"
                >
                  Close
                </button>
              </div>
            </>
          )
        }
      </Modal>
    </div>
  )
}

export default BrowseFreelancers
