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
              <div className="w-full md:w-[350px] bg-white shadow-md border border-gray-200 rounded-2xl p-4 transition hover:shadow-lg" key={idx}>
            <img src={user.profilePicture} alt="profile" className=' bg-red-300 w-[100%] object-cover h-60'/>
            <div className=" mt-4">
              <h1 className='text-xl font-semibold'>{user.fullName}</h1>
              <p className='bg-green-400/50 rounded-full mt-2 px-2'>react javascript nodejs php laravel</p>
              <p className="text-sm text-gray-700 mb-3 line-clamp-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, aliquid eius. A, magni tempora!</p>
              <p className='bg-green-400/50 rounded-full  mt-2 px-2'>verified : true</p>
              <button className='bg-green-500 my-4 py-2 px-4 rounded-3xl hover:bg-green-400 text-lg font-medium text-white'>  View Profile</button>
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
