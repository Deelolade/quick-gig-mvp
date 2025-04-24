import React, { useEffect, useState } from 'react'
import ClientSideBar from './ClientSideBar'
import { GoHomeFill } from "react-icons/go";
import axios from "axios"



const BrowseFreelancers = () => {
  const [freelancer, setFreelancer] = useState([])
  useEffect(()=>{
      const getFreelancers = async ()=>{
        try {
      const res = await axios.get("http://localhost:5500/api/users/freelancer-dashboard", 
        {withCredentials: true}
      )
      setFreelancer(res.data.freelancers)
      console.log(res.data.freelancers)
        } catch (error) {
          console.error('Failed to fetch freelancers:', error);
        }
      }
      getFreelancers()
  }, [])
  
  return (
    <div className='flex justify-between  bg-gray-100 h-[100vh]'>
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
          freelancer.map((user, idx)=>{
            return (
              <div className="w-full md:w-[350px] bg-white shadow-md border border-gray-200 rounded-2xl p-4 transition transform hover:scale-105 hover:shadow-xl" key={idx}>
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
    <button className="bg-green-500 hover:bg-green-600 transition text-white py-2 px-4 rounded-full mt-4 w-full font-medium">
      View Profile
    </button>
  </div>
</div>



            )
          })
        }

          
        </section>
        </div>
    </div>
  )
}

export default BrowseFreelancers
