import React, { useState, useEffect } from 'react'
import { setSelectedUser } from "../../redux/chat/chatSlice"
import { useSelector, useDispatch } from 'react-redux'
import { FaSearch, FaChevronLeft } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import {io} from "socket.io-client"
import { IoSendSharp } from "react-icons/io5";
import { addUser } from '../../redux/chat/chatSlice'


const Messages = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const { selectedUsers } = useSelector(state => state.chat);
  const { currentUser } = useSelector(state => state.user);
  const selectedUser = useSelector(state => state.chat.selectedUser);
  const [searchedValue, setSearchedValue] = useState([])
  const [hoveredList, setHoveredList] = useState(null)
  const [messages, setMessages] = useState([])
  const [messageData, setMessageData] = useState({
    content: "",
    senderId:"",
    receiverId:""
  })
  const socket = io('http://localhost:5500', {withCredentials:true})
  const [filteredUsers, setFilteredUsers] = useState(selectedUsers);
  const handleChange = (e) => {
    setSearchedValue(e.target.value);
  };
  const data = {
    receiverId: selectedUser._id,
    senderId: currentUser._id,
    content:messageData.content
  }
  console.log(data)
  const handleClickedUser = (user) => {
    dispatch(setSelectedUser({
      userName: user.userName,
      profilePicture: user.profilePicture,
      _id: user._id,
      location: user.location
    }));
    setHoveredList(user._id)
  };
  
  // sets freelancer from the browse freelancers page
  useEffect(() => {
    if (location.state?.selectedUser) {
      dispatch(setSelectedUser(location.state.selectedUser));
      dispatch(addUser(location.state.selectedUser));
      setHoveredList(location.state.selectedUser._id);
    }
    if (location.state?.senderUser) {
      dispatch(currentUser(location.state.senderUser));
    }
  }, [location.state, dispatch]);

  useEffect(() => {
    const searchFilter = () => {
      const searchUser = selectedUsers.filter(user => user.userName.toLowerCase().includes(searchedValue) || user.fullName === searchedValue)
      setFilteredUsers(searchUser)

    }
    searchFilter()
  }, [searchedValue, selectedUsers])

  useEffect(()=>{
    const fetchMessages = async()=>{
      try {
        const res =await  axios.get("http://localhost:5500/api/messages",{
          params:{userA: currentUser,
            userB: selectedUser
          } ,withCredentials:true })
          setMessages(res.data.messages)
          console.log("API Response:", res);
          console.log(res.data.messages)
      } catch (error) {
        console.log(error)
      }
    }
    if(currentUser && selectedUser){
    fetchMessages(); 
    }
  },[currentUser, selectedUser])

  // Listen for incoming messages from the socket
  useEffect(()=>{
socket.on("", (message)=>{
  setMessages(prevMessages =>[...prevMessages, message])
})
  },[])

  const sendMessage = async()=>{
    const {content }= messageData;
    const data = {
      senderId:currentUser._id,
      receiverId:selectedUser._id,
      content,
      room: selectedUser._id
    }
    socket.emit("send_message",data)
    console.log(data.room)
    setMessageData({content:""})
  }
   // Listen for the acknowledgment (message sent confirmation)
   useEffect(() => {
    socket.on('message_sent', (data) => {
      if (data.status === 'success') {
        setFeedback('Message sent successfully!');
      } else {
        setFeedback('Failed to send message.');
      }
    });

    return () => {
      socket.off('message_sent'); // Clean up when component unmounts
    };
  }, []);

  // Listen for incoming messages
  useEffect(() => {
    socket.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receive_message'); // Clean up when component unmounts
    };
  }, []);
  return (
    <div className='flex '>
      <aside className=' w-[15vw] h-screen overflow-y-auto bg-green-500  px-2 text-white  py-4 flex flex-col justify-between shadow-md'>
        <div className="">
          <Link to="/dashboard">
            <FaChevronLeft />
          </Link>
          <div className=" flex justify-between items-center my-5 px-3 bg-white rounded-lg">
            <FaSearch className='text-green-500' />
            <input type="text" placeholder='Search for chat' className='py-3 text-gray-900 outline-none  w-[90%]' value={searchedValue} onChange={handleChange} />
          </div>


          {filteredUsers.length > 0 ? (filteredUsers.map((user, idx) => {
            return (
              <ul key={idx} className={`flex justify-start items-center ${hoveredList === user._id ? "bg-green-300 text-green-700" : ""} my-2 bg-green-500 py-2 px-2 rounded-xl hover:bg-green-300 hover:text-green-700`} onClick={() => handleClickedUser(user)} >
                <img src={user.profilePicture} alt="" className='w-12 h-12 rounded-full me-3' />
                <li className='font-semibold text-lg'>{user.userName}</li>
              </ul>
            )
          })) : <p className='text-lg text-center'>no users found..</p>}
        </div>
      </aside>
      <section className='w-[85vw] '>
        <nav className='h-[8vh] w-[85vw]  py-4 px-12 flex justify-between items-center bg-white shadow-md fixed z-20' >
          <div className="flex space-x-2 items-center">
            <img src={selectedUser.profilePicture} alt="" className="w-14 h-14 rounded-full" />
            <div className="">
              <h1 className='text-xl font-semibold'>{selectedUser.userName}</h1>
              <p className='text-sm text-slate-500'>{selectedUser.location || "Unknown Location"}</p>
            </div>
          </div>
        </nav>
        {/* <nav className='h-[8vh] w-[85vw]  py-4 px-12 flex justify-between items-center bg-white shadow-md fixed z-20' >
          <h1 className='text-2xl font-semibold'></h1>
          <div className="">
            <button className='px-3 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg'>Refer a Freelancer</button>
          </div>
        </nav> */}
        {/* <h1>{selectedUser.userName}</h1> */}
        {selectedUser ? (
          <div className="flex flex-col h-[92vh] py-5 max-w-4xl justify-center items-center w-[100%] mx-auto relative top-[8vh]">
            <div className='max-w-4xl  h-[84vh]  w-[100%] overflow-y-auto overflow-x -hidden flex flex-col  px-2 py-4 space-x-4   '>
            {messages.map((message, idx) => (
        <div key={idx} className={`flex ${message.senderId === currentUser._id ? 'justify-end' : 'items-start'} my-2`}>
          <div
            className={`px-4 py-3 rounded-2xl max-w-[75%] break-words ${message.senderId === currentUser._id ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-900'}`}
          >
            <p>{message.content}</p>
            <p className='text-right text-gray-300 text-sm'>{new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        </div>
      ))}
            </div>
            <div className="h-[8vh] rounded-lg bg-green-500 w-[100%] px-5 flex justify-between items-center">
              <textarea type="text"  id="content" name='content'onChange={(e)=>setMessageData({...messageData, content:e.target.value})} value={messageData.content} placeholder='Type a Message...' rows={1} className='py-3 px-3 w-[90%] outline-none bg-green-500 text-white placeholder-white break-words overflow-auto ' ></textarea>
              <div className="p-3 hover:bg-green-400 rounded-lg">
              <IoSendSharp className='text-2xl text-white' onClick={sendMessage} onKeyDown={(e) => {e.key === "Enter" && sendMessage() } }/>
              </div>
            </div>
          </div>
        ) : <p>no users slected yet</p>}
      </section>
    </div>
  )
}

export default Messages
