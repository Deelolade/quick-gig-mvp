import React, { useRef, useState, useEffect } from 'react'
import { io } from "socket.io-client"
import axios from "axios"
import ClientSideBar from '../components/clients/ClientSideBar'
import { useSelector } from 'react-redux'
import FreelancerSideBar from '../components/freelancers/FreelancerSideBar'
import { IoSendSharp } from "react-icons/io5";
import BottomMenu from '../components/clients/BottomMenu'
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom'





const ChatRoom = () => {
    const messagesEndRef = useRef(null);
    const socket = useRef();
    const API_URL = import.meta.env.VITE_API_BASE_URL
    const [messages, setMessages] = useState([])
    const [messageData, setMessageData] = useState({
        text: "",
        senderId: "",
        room: ""
    })

    const { currentUser } = useSelector(state => state.user)
    useEffect(() => {
        if (!currentUser?._id) return;

        if (!socket.current) {
            socket.current = io(`${API_URL}`, { withCredentials: true });
        }
        socket.current.on("chatRoom_request", (chatData) => {
            setMessages((prev) => [...prev, chatData]);
        });
        socket.current.emit("register_user", currentUser._id);
        return () => {
            if (socket.current) {
                socket.current.off("receive_message");
            }
        };

    }, [currentUser]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axios.get(`${API_URL}/chatrooms`)
                setMessages(res.data.message)
                localStorage.setItem("cached_ChatRoom", JSON.stringify(res.data.message))
                console.log(res.data.message)
            } catch (error) {
                console.error('Failed to fetch proposals:', error);
                const cacheData = localStorage.getItem("cached_ChatRoom")
                if (cacheData) {
                    setMessages(JSON.parse(cacheData))
                }
            }
        }
        fetchMessages()
    }, [])
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    const sendMessage = () => {
        
        socket.current.emit("send_general_message", {
            senderId: {
                _id: currentUser._id,
                userName: currentUser.userName,
                profilePicture: currentUser.profilePicture
            },
            text: messageData.text,
            timestamp: new Date().toISOString()
    
        });
        setMessageData({...messageData,text: ""})
    };

    return (
        <>
        <div className='flex justify-between   '>
            {
                currentUser.role === "client" ? <ClientSideBar /> : <FreelancerSideBar />
            }
            <div className="dashboard lg:w-[85%] w-full bg-gray-100 h-[auto] md:pb-20 ">
                <nav className='h-[8vh] lg:w-[85vw] w-full py-4 px-5 md:px-12 flex justify-between items-center bg-white shadow-md fixed z-20' >
                    <div className=" flex  items-center space-x-4">
                    <Link to='/dashboard' className='p-3 hover:bg-green-300 hover:text-white rounded-lg lg:hidden'>
                    <FaArrowLeft/>
                    </Link>
                    <h1 className='text-xl font-semibold'>Chat Rooms</h1>
                    </div>
                    <div className="">
                        <button className='px-3 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg'>Refer a {currentUser.role === "client"? "Client" :"Freelancer"}</button>
                    </div>
                </nav>
                <div className="flex flex-col  h-[92vh] py-5 bg-gray-100 max-w-4xl justify-center items-center  w-[90%] lg:w-[100%] mx-auto relative top-[8vh]">
                    <div className='max-w-4xl h-[84vh] w-full overflow-y-auto overflow-x-hidden flex flex-col px-2 py-4 space-y-4'>
                    
                        {messages.map((message, idx) => (
                            <div key={idx} className={`flex ${message.senderId._id === currentUser._id ? 'justify-end' : 'items-start'} my-2`}>
                                { message.senderId._id  &&
                                    <img src={message.senderId.profilePicture} alt="" className={`  ${message.senderId._id === currentUser._id ? 'hidden ' : 'block'}w-12 h-12 rounded-full me-3`} />
                                }
                                <div
                                    className={`px-4 py-3 rounded-2xl max-w-[75%] flex break-words items-center justify-center ${message.senderId._id === currentUser._id ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-900'}`}
                                >
                                    <div className="">
                                        <p className='font-bold'>{ message.senderId._id === currentUser._id ? "You"  :message.senderId.userName }</p>
                                        <p>{message.text}</p>
                                        <p className='text-right text-gray-300 text-sm'>{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                    </div>
                                    </div>
                                    { message.senderId._id === currentUser._id &&
                                        <img src={message.senderId.profilePicture} alt="" className={`hidden ms-2 w-12 h-12 rounded-full me-3`} />
                                    }
                                <div ref={messagesEndRef} />
                            </div>
                        ))}
                    </div>
                    <div className="h-[8vh] rounded-lg bg-green-500 w-[100%] px-5  flex justify-between items-center">
                        <textarea type="text"  id="content" value={messageData.text} name='content' onChange={(e) => setMessageData({ ...messageData, text: e.target.value })} placeholder='Type a Message...' rows={1} className='py-3 px-3 w-[90%] outline-none bg-green-500 text-white placeholder-white break-words overflow-auto ' onKeyDown={(e) => { e.key === "Enter" && sendMessage() }}></textarea>
                        <div className="p-3 hover:bg-green-400 rounded-lg">
                            <IoSendSharp className='text-2xl text-white' onClick={sendMessage} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
        {/* <BottomMenu/> */}
        </>
    )
}

export default ChatRoom
