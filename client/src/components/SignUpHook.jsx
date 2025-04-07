import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import { useNavigate } from 'react-router-dom';



const SignUpHook = () => {
    const [successMessage, setSuccessMessage] = useState(false);
    
    const navigate = useNavigate();
    const selectedRole = useSelector((state) => state.user.selectedRole);

    useEffect(() => {
        if (!selectedRole || selectedRole !== "freelancer" && selectedRole !== "client") {
            const timeOut = setTimeout(()=>{
                navigate("/role");
            },2000)
            return ()=> clearTimeout(timeOut)
        }
    }, [selectedRole, navigate])
    {successMessage && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/20">
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        </div>
    )}
    return useMutation({
        mutationFn: async (userData) => {
            const response = await axios.post("http://localhost:5500/api/auth/signup",
                {...userData,role: selectedRole,},
                { headers: { "Content-Type": "application/json",}}
            )
            console.log("Backend Response:", response.data);
            return response.data;
        },
        onSuccess: (data) => {
            console.log("Success Response:", data?.message); // Debugging
            toast.success(data?.message  || "Signup successful 🎉. check your mail for verification link! ");
            setSuccessMessage(true);
            setTimeout(() => navigate("/signin"), 2000);
        },
        onError: (err) => {
            console.log("Error Response:", err.response?.data); // 🔍 Debugging
            const errorMessage = err.response?.data?.message || "Signup failed. Please try again.";
            toast.error(errorMessage);
        }
    }
)

}

export default SignUpHook
