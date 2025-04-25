import React, { useState } from 'react'
import ClientSideBar from './ClientSideBar'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const PostGig = () => {
  const navigate =useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    deliveryTime: ""
  })
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request with formData
      const res = await axios.post(
        "http://localhost:5500/api/gigs",
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: 'include',
        }
      );
      if (res.status === 200) {
        toast.success("Gig created!");
        setTimeout(() => {
          navigate("/dashboard", { state: { gigCreated: true } });
        }, 1500);
      }
      console.log("Successfully created gig:", res.data);
    } catch (err) {
      console.log("Failed to create gig:", err.response?.data?.message || err.message);
    }
  };
  

  return (
    <div className='flex justify-between  bg-gray-100 h-[100vh]'>
      <ClientSideBar />
      <div className="dashboard w-[85%] bg-gray-100 h-[auto] ">
        <nav className='h-[8vh] w-[85vw]  py-4 px-12 flex justify-between items-center bg-white shadow-md fixed z-20' >
          <h1 className='text-2xl font-semibold'>Post a Job </h1>
          <div className="">
            <button className='px-3 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg'>Refer a Freelancer</button>
          </div>
        </nav>
        <section className='top-[8vh] relative p-5 flex items-center justify-center bg-gray-100'>
          <form action="" className='mt-8 shadow-lg rounded-lg w-[40%] h-auto p-4 ' onSubmit={handleSubmit}>
            <div className="flex flex-col my-5">
              <label htmlFor="full name" className="text-[15px]">
                Title:
              </label>
              <input
                type="text"
                name="title"
                id="title"
                onChange={handleChange}
                placeholder=" e.g., Design a modern landing page "
                className="px-4 py-3 mt-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div className="flex flex-col my-5">
              <label htmlFor="full name" className="text-[15px]">
                Description:
              </label>
              <input
                type="text"
                name="description"
                id="description"
                onChange={handleChange}
                placeholder="e.g., I need a clean, responsive landing page designed for my startup."
                className="px-4 py-3 mt-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div className="flex flex-col my-5">
              <label htmlFor="full name" className="text-[15px]">
                Price:
              </label>
              <input
                type="text"
                name="price"
                id="price"
                onChange={handleChange}
                placeholder="e.g., 100 (in USD)"
                className="px-4 py-3 mt-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div className="flex flex-col my-5">
              <label htmlFor="full name" className="text-[15px]">
                Category:
              </label>
              <input
                type="text"
                name="category"
                id="category"
                onChange={handleChange}
                placeholder="e.g., Web Design, Mobile App, SEO"
                className="px-4 py-3 mt-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div className="flex flex-col my-5">
              <label htmlFor="full name" className="text-[15px]">
                Delivery Time:
              </label>
              <input
                type="date"
                name="deliveryTime"
                id="title"
                onChange={handleChange}
                placeholder="Select expected delivery date"
                className="px-4 py-3 mt-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <button className='bg-green-500 px-4 py-2 text-white font-bold rounded-lg hover:bg-green-400'>Create Gig</button>
          </form>
        </section>
      </div>
    </div>
  )
}

export default PostGig
