import { useState } from 'react'
import FreelancerSideBar from '../freelancers/FreelancerSideBar'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { updateFailure, updateStart, updateSuccess } from '../../redux/user/userSlice';


const ClientProfile = () => {
  const dispatch = useDispatch(); 

  const [formData, setFormData] = useState({})
  const { currentUser } = useSelector(state => state.user)

  const handleImageChange = async(e)=>{
    const file = e.target.files[0]
    if(!file) return
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "quick-gig")
    data.append("cloud_name", "dluhzoptp")
    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/dluhzoptp/image/upload", data)
      console.log('Image uploaded:', res.data.secure_url);
      return res.data.secure_url;
    } catch (error) {
      console.error("image failed to upload", error)
    }
    
  }
  const handleChange =(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }
  const handleSubmit = async (e)=>{
    if (Object.keys(formData).length === 0) {
      return;
  }
    e.preventDefault()
    try {
      dispatch(updateStart())
        const res = await axios.put(`http://localhost:5500/api/auth/update/${currentUser._id}`, formData,
          {withCredentials: true}
        )
        dispatch(updateSuccess(res.data));
        console.log("User updated:", res.data);
  } catch (error) {
      dispatch(updateFailure("error updating data",error.message))
  }
  }
  return (
    <div className='flex justify-between  bg-gray-100 h-[100vh]'>
      <FreelancerSideBar />
      <div className="dashboard w-[85%] bg-gray-100 h-[auto] ">
        <nav className='h-[8vh] w-[85vw]  py-4 px-12 flex justify-between items-center bg-white shadow-md fixed z-20' >
          <h1 className='text-2xl font-semibold'>Browse Freelancers </h1>
          <div className="">
            <button className='px-3 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg'>Refer a Freelancer</button>
          </div>
        </nav>
        <div className="max-w-2xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <input type="file" name="" id="profilePicture"  onChange={handleImageChange}/>
            <img src="" alt="" className='w-52 h-52 rounded-full bg-red-300 mx-auto' />
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                defaultValue={currentUser.fullName}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                name="username"
                id="userName"
                defaultValue={currentUser.userName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                onChange={handleChange}
                defaultValue={currentUser.email}
                className="w-full border border-gray-300  rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="text"
                name="password"
                placeholder='********'
                id="password"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            {/* confirmPassword */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password </label>
              <input
                type="text"
                name="confirmPassword"
                placeholder='********'
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            {/* location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                name="location"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>


            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                name="bio"
                rows="4"
                onChange={handleChange}
                id="bio"
                placeholder='Tell us more about yourself — minimum 50 characters.'
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>

            {/* Skills */}
            {currentUser?.role === "freelancer" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="e.g. JavaScript"
                    onChange={handleChange}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    type="button"
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Social Links</h3>

              <div>
                <label className="block text-sm mb-1">Twitter</label>
                <input
                  type="url"
                  name="twitter"
                  placeholder="https://twitter.com/yourhandle"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">LinkedIn</label>
                <input
                  type="url"
                  name="linkedin"
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/yourname"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Portfolio</label>
                <input
                  type="url"
                  name="portfolio"
                  onChange={handleChange}
                  placeholder="https://yourportfolio.com"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ClientProfile
