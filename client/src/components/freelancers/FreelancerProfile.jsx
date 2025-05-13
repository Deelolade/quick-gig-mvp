import { useState, useEffect, useRef } from 'react'
import FreelancerSideBar from '../freelancers/FreelancerSideBar'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { updateFailure, updateStart, updateSuccess,logOut } from '../../redux/user/userSlice';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GiCancel } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';

const ClientProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [socialLinks, setSocialLinks] = useState({
    twitter: "",
    linkedin: "",
    portfolio: ""
  })
  const [formData, setFormData] = useState({})
  const filePickerRef = useRef()
  const { currentUser } = useSelector(state => state.user)
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState([]);

  const handleImageChange = async (e) => {
    // setImageFile(e.target.files[0])
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
    }

  }

const addSkill = () => {
  if (skillInput.trim()) {
    setSkills([...skills, skillInput.trim()]);
    setSkillInput('');
  }
};
const removeSkill = (indexToRemove) => {
  setSkills(skills.filter((_, idx) => idx !== indexToRemove));
};

  const uploadImage = async () => {
    if (!imageFile) return;
    const data = new FormData()
    data.append("file", imageFile)
    data.append("upload_preset", "quick-gig")
    data.append("cloud_name", "dluhzoptp")
    console.log(imageFile)
    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/dluhzoptp/image/upload", data)
      const url = res.data.secure_url;
      console.log('Image uploaded:', url);
      setImageFileUrl(url)
      setFormData((prev) => ({ ...prev, profilePicture: url }))
    } catch (error) {
      console.error("image failed to upload", error)
    }
  }
  useEffect(() => {
    if (imageFile) {
      uploadImage()
    }
  }, [imageFile])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (Object.keys(formData).length === 0) {
      return;
    }
    const combinedFormData = {
      ...formData,
      skills,
      socialLinks: Object.values(socialLinks).filter(Boolean),
    }
    try {
      dispatch(updateStart())
      const res = await axios.put(`http://localhost:5500/api/auth/update/${currentUser._id}`, combinedFormData,
        { withCredentials: true }
      )
      dispatch(updateSuccess(res.data));
      toast.success(res?.message || "User's Data successfully 🎉!!");
      console.log("User updated:", res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong")
      dispatch(updateFailure("error updating data", error.message))
      console.log(error.message)
    }
  }
  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks((prev) => ({ ...prev, [name]: value }))

  }
  const signOut = ()=>{
      dispatch(logOut())
      navigate("/")
    }
  return (
    <div className='flex justify-between  bg-gray-100 min-h-screen'>
      <FreelancerSideBar />
      <div className="dashboard w-[85%]  min-h-screen bg-gray-100 ">
        <nav className='h-[8vh] w-[85vw]  py-4 px-12 flex justify-between items-center bg-white shadow-md fixed z-20' >
          <h1 className='text-3xl font-semibold'>Edit Profile</h1>
          <div className="">
            <button onClick={signOut} className='px-3 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg'>Sign Out</button>
          </div>
        </nav>
        <div className="max-w-2xl mx-auto px-4 py-32 ">
          <form className=" max-w-xl space-y-5" onSubmit={handleSubmit}>
            <input type="file" accept='image/*' id="profilePicture" onChange={handleImageChange} ref={filePickerRef} hidden />
            <div className="relative" onClick={() => filePickerRef.current.click()} >
              <img src={imageFileUrl || currentUser.profilePicture} alt="" className='w-52 h-52 rounded-full bg-red-300 mx-auto' />
            </div>
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                onChange={handleChange}
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
                id="location"
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
                    id='skills'
                    placeholder="e.g. JavaScript"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                 
                  <button
                    type="button"
                    onClick={addSkill}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex space-x-2 items-center "
                      >
                        {skill}
                        <GiCancel className='mx-2 text-red-400' onClick={()=>removeSkill(idx)}/>
                      </span>
                    ))}
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
                  onChange={handleSocialChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">LinkedIn</label>
                <input
                  type="url"
                  name="linkedin"
                  onChange={handleSocialChange}
                  placeholder="https://linkedin.com/in/yourname"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Portfolio</label>
                <input
                  type="url"
                  name="portfolio"
                  onChange={handleSocialChange}
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
