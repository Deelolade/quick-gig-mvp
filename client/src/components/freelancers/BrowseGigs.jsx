import React, { useEffect, useState } from 'react'
import SideBar from '../freelancers/FreelancerSideBar'
import { GoHomeFill } from "react-icons/go";
import axios from "axios"



const BrowseGigs = () => {
  const [gigs, setGigs] = useState([])
  useEffect(() => {
    const getGigs = async () => {
      try {
        const res = await axios.get("http://localhost:5500/api/gigs",
          { withCredentials: true }
        )
        setGigs(res.data.Gigs)
        console.log(res.data.Gigs)
      } catch (error) {
        console.error('Failed to fetch freelancers:', error);
      }
    }
    getGigs()
  }, [])

  return (
    <div className='flex justify-between  bg-gray-100 h-[100vh]'>
      <SideBar />
      <div className="dashboard w-[85%] bg-gray-100 h-[auto] ">
        <nav className='h-[8vh] w-[85vw]  py-4 px-12 flex justify-between items-center bg-white shadow-md fixed z-20' >
          <h1 className='text-2xl font-semibold'>Browse Gigs </h1>
          <div className="">
            <button className='px-3 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg'>Refer a Freelancer</button>
          </div>
        </nav>
        <section className='top-[8vh] relative p-8  bg-gray-100 grid grid-cols-4 mx-auto  '>
          {
            gigs.map((gig, idx) => {
              return (
                <div className="w-full md:w-[350px] mt-6 bg-white shadow-md border border-gray-200 rounded-2xl p-4 transition transform hover:scale-105 hover:shadow-xl" key={idx}>
                  <div className="mt-2">
                    <h2 className="text-xl font-semibold text-gray-800">{gig.title}</h2>

                    <p className="text-sm text-gray-600 mt-1">Category: <span className="capitalize">{gig.category}</span></p>

                    <p className="text-sm text-gray-600 mt-1">🗓️ Delivery by: <span className="font-medium">{new Date(gig.deliveryTime).toLocaleDateString()}</span></p>

                    <p className="text-sm text-gray-700 mt-3 line-clamp-3">{gig.description}</p>

                    <div className="flex justify-between items-center mt-4">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        ${gig.price}
                      </span>

                      <button className="bg-green-500 hover:bg-green-600 transition text-white py-1.5 px-4 rounded-full text-sm font-medium">
                        View Gig
                      </button>
                    </div>
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

export default BrowseGigs
