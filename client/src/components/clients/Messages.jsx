import React, { useState, useEffect, useRef } from 'react'
import { setSelectedUser } from "../../redux/chat/chatSlice"
import { useSelector, useDispatch } from 'react-redux'
import { FaSearch, FaChevronLeft } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";
import { Link, useLocation } from 'react-router-dom';
import { io } from "socket.io-client"
import axios from "axios"


const Messages = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const socket = useRef();
  const { selectedUsers } = useSelector(state => state.chat);
  const selectedUser = useSelector(state => state.chat.selectedUser);
  const { currentUser } = useSelector(state => state.user);
  const [searchedValue, setSearchedValue] = useState('')
  const [filteredUsers, setFilteredUsers] = useState(selectedUsers);
  const [messages, setMessages] = useState([])
  const [messageData, setMessageData] = useState({
      content: "",
      senderId:"",
      receiverId:""
    })
      const messagesEndRef = useRef(null);
    
  useEffect(() => {
    if (!socket.current) {
      socket.current = io("http://localhost:5500", { withCredentials: true });
    }
  }, []);
  const handleChange = (e) => {
    setSearchedValue(e.target.value);
  };
  const handleClickedUser = (user) => {
    dispatch(setSelectedUser({
      userName: user.userName,
      profilePicture: user.profilePicture,
      _id: user._id,
    }));
    socket.current.emit("chat_request", {
      from: currentUser,
      to: user._id
    });
    socket.current.on('receive_message', (message) => {
      setMessages(prev => [...prev, message]);
    });
    console.log("Client initiated chat with:", user._id);
  };

  const sendMessage = async () => {
    const { content } = messageData;
    const data = {
      senderId: currentUser._id,
      receiverId: selectedUser._id,
      content,
      room: selectedUser._id,
      createdAt: new Date().toISOString(), 
    }
    socket.current.emit("send_message", data)
    console.log(data.room)
    setMessages((prev)=> [...prev, data])
    setMessageData({ content: "" })
  }
// Listen for incoming messages
useEffect(() => {
  socket.current.on('receive_message', (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  });

  return () => {
    socket.current.off('receive_message'); // Clean up when component unmounts
  };
}, []);

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
          const res =await  axios.get("http://localhost:5500/messages",{
            params:{userA: currentUser._id,
              userB: selectedUser._id
            } ,withCredentials:true })
            setMessages(res.data.messages)
            localStorage.setItem("cached_messages", JSON.stringify(res.data.messages))
            console.log("API Response:", res);
            console.log( "shows", res.data.messages)
        } catch (error) {
          const cacheData = localStorage.getItem("cached_messages")
          if(cacheData){
            setMessages(JSON.parse(cacheData))
          }
          console.log(error)
        }
      }
      if(currentUser && selectedUser){
      fetchMessages(); 
      }
    },[currentUser, selectedUser])
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
  return (
    <div className='flex '>
      <aside className='w-[15vw] h-screen overflow-y-auto bg-green-500  px-2 text-white  py-4 flex flex-col justify-between shadow-md'>
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
              <ul key={idx} className='flex  justify-start items-center my-2 bg-green-500 py-2 px-2 rounded-xl hover:bg-green-300 hover:text-green-700' onClick={() => handleClickedUser(user)} >
                <img src={user.profilePicture} alt="" className='w-12 h-12 rounded-full me-3' />
                <li className='font-semibold text-lg'>{user.userName}</li>
              </ul>
            )
          })) : <p className='text-lg text-center'>no users found..</p>}
        </div>
      </aside>
      <section className='w-[85vw]'>
        <nav className='h-[8vh] w-[85vw]  py-4 px-12 flex justify-between items-center bg-white shadow-md fixed z-20' >
          <h1 className='text-2xl font-semibold'>Messages</h1>
          <div className="">
            <button className='px-3 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg'>Refer a Freelancer</button>
          </div>
        </nav>
        {selectedUser ? (
          <div className="flex flex-col h-[92vh] py-5 max-w-4xl justify-center items-center w-[100%] mx-auto relative top-[8vh]">
            <div className='max-w-4xl  h-[84vh]  w-[100%] overflow-y-auto overflow-x -hidden flex flex-col  px-2 py-4 space-x-4   '>
              {messages&& messages.map((message, idx) => (
                <div key={idx} className={`flex ${message.senderId === currentUser._id ? 'justify-end' : 'items-start'} my-2`}>
                  <div
                    className={`px-4 py-3 rounded-2xl max-w-[75%] break-words ${message.senderId === currentUser._id ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-900'}`}
                  >
                    <p>{message.content}</p>
                    <p className='text-right text-gray-300 text-sm'>{new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                  <div ref={messagesEndRef} />
                </div>
              ))}
            </div>
            <div className="h-[8vh] rounded-lg bg-green-500 w-[100%] px-5 flex justify-between items-center">
              <textarea type="text" id="content" name='content'onKeyDown={(e) => { e.key === "Enter" && sendMessage() }}  onChange={(e) => setMessageData({ ...messageData, content: e.target.value })} value={messageData.content} placeholder='Type a Message...' rows={1} className='py-3 px-3 w-[90%] outline-none bg-green-500 text-white placeholder-white break-words overflow-auto ' ></textarea>
              <div className="p-3 hover:bg-green-400 rounded-lg">
                <IoSendSharp className='text-2xl text-white' onClick={sendMessage} />
              </div>
            </div>
          </div>
        ) : <p>no users slected yet</p>}
      </section>
    </div>
  )
}

export default Messages
