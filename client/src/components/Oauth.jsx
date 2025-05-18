import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { app } from '../firebase.js';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice.js";


const Oauth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth(app)
  const API_URL = import.meta.env.VITE_API_BASE_URL
  const [successMessage, setSuccessMessage] = useState(false);
  const selectedRole = useSelector((state)=> state.user.selectedRole);

  const handleGoogleclick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' })
    try {
      dispatch(signInStart());
      const resultFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch(`${API_URL}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: resultFromGoogle.user.displayName.toLowerCase().replace(/\s+/g, "") + Math.random().toString(36).slice(-4),
          fullName: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          photo: resultFromGoogle.user.photoURL,
          role: selectedRole,
        }),
        credentials: 'include',
      })
      const data = await res.json();
      // console.log(data)
      if (data.success === false) {
        dispatch(signInFailure(error.message));
        const errorMessage = err.response?.data?.message || "Signup failed. Please try again.";
        toast.error(errorMessage);
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        toast.success(data?.message  || "Signed in successful 🎉!!");
        setSuccessMessage(true)
        setTimeout(() => navigate("/dashboard"), 2000);
      }
    } catch (error) {
      dispatch(signInFailure(error.message));

    }
  }
  return (
    <>
    <button className="w-[100%] md:w-[48%]  flex items-center justify-center mt-3 md:mt-0 py-2 md:py-2 px-3 border border-black rounded-full text-[14px]"
    type='button'
    onClick={handleGoogleclick}>
      <FcGoogle className="mx-4 w-4 h-4" />continue with Google
    </button>
    {successMessage && (
      <div className="fixed inset-0 flex justify-center items-center bg-black/20">
          <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
      </div>
  )}
  </>
  )
}

export default Oauth
