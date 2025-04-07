import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import OAuth from "../components/OAuth";
import { FaApple, FaEye, FaEyeSlash } from 'react-icons/fa';
import {  useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import Oauth from "../components/Oauth";
import { signInFailure, signInSuccess, signInStart } from "../redux/user/userSlice";


const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [passwordType, setPasswordType] = useState("password");
    const [passwordIcon, setPasswordIcon] = useState(FaEye);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const selectedRole = useSelector((state)=> state.user.selectedRole)
    // Handle form input changes


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePasswordToggle = ()=> {
        if(passwordType === "password"){
            setPasswordType("text")
            setPasswordIcon(FaEyeSlash)
        }
        if(passwordType === "text"){
            setPasswordType("password")
            setPasswordIcon(FaEye)
        }
    }
    // Form validation
    const validate = () => {
        let tempErrors = {};
        if (!formData.email.match(/^\S+@\S+\.\S+$/)) {
            tempErrors.email = "*Valid email is required*";
        }
        if (formData.password.length < 6) {
            tempErrors.password = "*Password must be at least 6 characters*";
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        if ( !formData.email || !formData.password) {
            return setErrors("please fill out all fields");
        }
        try {
            dispatch(signInStart());
            const res = await fetch("http://localhost:5500/api/auth/signin", {
                
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                ...formData,
                role: selectedRole,})
            });
            const data = await res.json();
            console.log(data);
            toast.success("Signed in successful! 🎉");

            if (!res.ok) {
                dispatch(signInFailure(data.message));
                return setErrors("Error posting data");
            }else{
                dispatch(signInSuccess(data));
            setSuccessMessage(true);
            setTimeout(() => navigate("/dashboard"), 2000);
            }
            
        } catch (error) {
            dispatch(signInFailure(error.message));
        }
    };
    return (
        <div className="flex justify-center items-center min-h-screen w-screen bg-gray-100">
            <div className="w-[90%] md:w-[70%]  lg:w-[30%] xl:w-[45%] 2xl:w-[29%] bg-white p-6  shadow-lg rounded-lg">
                <h2 className="text-2xl font-normal text-center mb-7">Log in to Upwork </h2>
                {successMessage && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black/20">
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4 ">
                <div className="flex flex-col justify-between md:flex-row ">
                    <div className="apple  w-[100%] md:w-[48%] flex items-center justify-center py-2 md:py-2 px-3 border border-black rounded-full text-[14px]">
                        <FaApple className="mx-4 w-4 h-4" />continue with Apple
                    </div>
                    <Oauth/>
                </div>
                <div className="flex items-center justify-center gap-4 mt-6">
                    <div className="h-[1px] w-[40%] bg-gray-300"></div>
                    <span className="text-gray-700">OR</span>
                    <div className="h-[1px] w-[40%] bg-gray-300"></div>
                </div>
                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter email"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email}</p>
                        )}
                    </div>
                    
                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="mt-1 w-full flex justify-between items-center px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                            <input
                                type={passwordType}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                className="outline-none w-[90%]"
                            />
                            <button
                                className="password-icon"
                                onClick={handlePasswordToggle}
                            >
                                {passwordIcon}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password}</p>
                        )}
                    </div>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white outline py-2 rounded-lg  transition hover:outline-green-200"
                    >
                        Sign In
                    </button>

                    {/* <OAuth /> */}
                    <div className="text-center text-slate-500 mb-5 mx-auto w-full">
                        <Link to="/role" className="hover:underline">
                            {" "}
                            Don't have an account
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
