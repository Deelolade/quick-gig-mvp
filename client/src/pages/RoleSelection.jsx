import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectRole } from "../redux/user/userSlice"; 
import { FaUserTie } from "react-icons/fa";
import { LuUserCog } from "react-icons/lu";


const RoleSelection = () => {
    const [role, setRole] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = () => {
        if(!role){
            alert("Please select a role before proceeding!!")
            return;
        }

        dispatch(selectRole(role));

        if (role === "client") {
            navigate("/signup/client");
        } else if (role === "freelancer") {
            navigate("/signup/freelancer");
        } else {
            alert("Please select a role before proceeding.");
        }
    };
    return (
        <div className="flex flex-col  items-center pt-20 md:my-0   md:pt-20 h-[100vh] p-6 bg-gray-100">
            <h2 className=" text-2xl text-center md:text-4xl mb-12 ">Join as a client or freelancer</h2>
            <div className="md:flex gap-6 flex flex-col md:flex-row">
            <label className="  gap-2 cursor-pointer w-full h-44 p-6 border-2 border-gray-500 rounded-lg 
                    hover:border-black sm:w-72 sm:h-42">
                    <div className=" flex justify-between w-[100%] ">
                    <FaUserTie className="w-8 h-8" />
                    <input
                        type="radio"
                        name="role"
                        value="freelancer"
                        onChange={() => setRole("client")}
                        className="w-6 h-6 accent-green-500 "
                    />
                    </div>
                    <div className="text-2xl font-normal mt-7">I'm a Client, hiring for a projects</div>
                </label>
                <label className=" gap-2 cursor-pointer w-full h-44 p-6 border-2 border-gray-500 rounded-lg 
                    hover:border-black sm:w-72 sm:h-42">
                    <div className=" flex justify-between w-[100%] ">
                    <LuUserCog className="w-8 h-8" />
                    <input
                        type="radio"
                        name="role"
                        value="freelancer"
                        onChange={() => setRole("freelancer")}
                        className="w-6 h-6 bg-white accent-green-500"
                    />
                    </div>
                    <div className="text-2xl font-normal mt-7">I'm a Freelancer, looking for work</div>
                </label>
            </div>
            <button
                disabled={!role}
                onClick={handleSubmit}
                className={`mt-8 px-6 py-2 w-52 md:w-auto rounded-md transition-all ${
                    role
                        ? "bg-green-600 text-lg text-white cursor-pointer font-semibold"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
            >
                {role ? (role === "client" ?"Join as client": "Join as freelancer") : "Create an Account"}
            </button>
            <span className="mt-5">Already have an account? <Link to='/signin' className="text-green-500 hover:underline">Log In</Link></span>
        </div>
    );
};

export default RoleSelection;
