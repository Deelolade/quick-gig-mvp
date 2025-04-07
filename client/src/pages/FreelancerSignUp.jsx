import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoMdAlert } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SignUpHook from "../components/SignUpHook";
import { FaApple } from "react-icons/fa";
import Oauth from "../components/Oauth";

const FreelancerSignUp = () => {
    const [successMessage, setSuccessMessage] = useState(false);
    const [passwordType, setPasswordType] = useState("password");
    const [passwordIcon, setPasswordIcon] = useState(FaEye);
    const { mutate,  } = SignUpHook();

    const selectedRole = useSelector((state) => state.user.selectedRole);

    const ValidationSchema = yup.object().shape({
        fullName: yup.string().trim().required("Please fill out this field"),
        userName: yup
            .string()
            .trim()
            .required("Please fill out this field")
            .min(3, "Username must be at least 3 characters long"),
        email: yup.string().email().required("Please fill out this field"),
        password: yup
            .string()
            .required("Please fill out this field")
            .min(4)
            .max(20),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(ValidationSchema),
    });

    const handlePasswordToggle = () => {
        if (passwordType === "password") {
            setPasswordType("text");
            setPasswordIcon(FaEyeSlash);
        }
        if (passwordType === "text") {
            setPasswordType("password");
            setPasswordIcon(FaEye);
        }
    };

    // Form submit
    const onSubmit = (data) => {
        mutate(data);
    };

    return (
        <div className="form-container w-screen h-screen flex flex-col justify-center items-center   ">
            <div className="w-[90%] md:w-[70%]  lg:w-[30%] xl:w-[50%] 2xl:w-[29%]">
                <h1 className="text-2xl  text-center md:text-4xl md:font-normal mb-5">
                    Sign up to find work you love
                </h1>
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
            </div>
            {successMessage && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black/20">
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    </div>
                )}
            <form
                action=""
                className="h-[60vh] w-[90%]  md:w-[70%] lg:w-[30%] xl:w-[50%] 2xl:w-[29%]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex flex-col my-5">
                    <label htmlFor="full name" className="text-[15px]">
                        Full Name{" "}
                    </label>
                    <input
                        type="text"
                        name=""
                        id="full name"
                        placeholder=" Enter your full name"
                        {...register("fullName")}
                        className="px-4 py-2 mt-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    {errors.fullName && (
                        <p className="mt-2 text-red-500 font-medium flex ">
                            <IoMdAlert className="w-6 h-6 mx-2" />
                            {errors.fullName?.message}
                        </p>
                    )}
                </div>
                <div className=" flex flex-col my-5">
                    <label htmlFor="user name" className="text-[15px]">
                        Username{" "}
                    </label>
                    <input
                        type="text"
                        name=""
                        id="user name"
                        placeholder="Create a username – be creative!"
                        {...register("userName")}
                        className="px-4 py-2 mt-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    {errors.userName && (
                        <p className="mt-2 text-red-500 font-medium flex">
                            <IoMdAlert className="w-6 h-6 mx-2" />
                            {errors.userName?.message}
                        </p>
                    )}
                </div>
                <div className="flex flex-col my-5  ">
                    <label htmlFor="email" className="text-[15px]">
                        Email Address{" "}
                    </label>
                    <input
                        type="text"
                        name=""
                        id="email"
                        placeholder="Enter Email Address"
                        {...register("email")}
                        className="px-4 py-2 mt-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    {errors.email && (
                        <p className="mt-2 text-red-500 font-medium flex">
                            <IoMdAlert className="w-6 h-6 mx-2" />
                            {errors.email?.message}
                        </p>
                    )}
                </div>

                <div className="flex flex-col my-5  ">
                    <label htmlFor="password" className="text-[15px]">
                        Password{" "}
                    </label>
                    <div
                        className="px-4 py-2 mt-3 flex justify-between bg-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:black 
                    hover:ring-2 hover:ring-black hover:shadow-lg transition-all duration-300"
                    >
                        <input
                            type={passwordType}
                            id="password"
                            placeholder="Password"
                            {...register("password")}
                            className="outline-none w-[90%] bg-white"
                        />
                        <button className="password-icon" onClick={handlePasswordToggle}>
                            {passwordIcon}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="mt-2 text-red-500 font-medium flex">
                            <IoMdAlert className="w-6 h-6 mx-2" />
                            {errors.password?.message}
                        </p>
                    )}
                </div>
                
                <div className="space-x-3  flex mt-8 mb-5">
                    <input
                        type="checkbox"
                        className=" w-9 h-9 lg:w-8 lg:h-8 accent-green-500  "
                    />
                    <p className=" ">
                        Yes, I understand and agree to the{" "}
                        <span className="text-green-500 underline cursor-pointer">
                            Quick-Gig Terms of Service
                        </span>{" "}
                        , including the{" "}
                        <span className="text-green-500 underline cursor-pointer">
                            User Agreement{" "}
                        </span>{" "}
                        and{" "}
                        <span className="text-green-500 underline cursor-pointer">
                            Privacy Policy .
                        </span>
                    </p>
                </div>

                <div className="flex justify-center">
                    <button className="bg-green-600  text-[15px] md:text-lg text-white cursor-pointer  mt-8 px-6 py-2 w-52 md:w-auto rounded-md transition-all">
                        Create my account
                    </button>
                </div>
                <p className="text-center mx-auto mt-6 pb-10">
                    Here to hire talent?{" "}
                    <Link
                        to="/role"
                        className="text-green-500 underline cursor-pointer"
                    >
                        Join as client
                    </Link>
                </p>

            </form>
        </div>
    );
};

export default FreelancerSignUp;
