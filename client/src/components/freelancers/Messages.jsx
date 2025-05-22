import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from "socket.io-client"
import { FaSearch, FaChevronLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { IoSendSharp } from "react-icons/io5";
import axios from "axios"
import { addUser, setSelectedUser } from '../../redux/chat/chatSlice';

const Messages = () => {
  const dispatch = useDispatch()
  const API_URL = import.meta.env.VITE_API_BASE_URL
  const [showModal, setShowModal] = useState(false)
  const [incomingChat, setIncomingChat] = useState(null)
  const [searchedValue, setSearchedValue] = useState('')
  const [client, setClient] = useState(null)
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [messages, setMessages] = useState([])
  const [messageData, setMessageData] = useState({
    content: "",
    senderId: "",
    receiverId: ""
  })
  const socket = useRef();
  const { currentUser } = useSelector(state => state.user);
  const { selectedUsers } = useSelector(state => state.chat);
  const chatUsers = useSelector(state => state.chat.selectedUsers)
  const selectedUser = useSelector(state => state.chat.selectedUser);
  const messagesEndRef = useRef(null);

  const handleChange = (e) => {
    setSearchedValue(e.target.value);
  };
  // /chats/:userId
  //FETCH PREVIOUS MESSAGES 
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${API_URL}/messages`, {
          params: {
            userA: currentUser._id,
            userB: selectedUser._id
          }, withCredentials: true
        })
        setMessages(res.data.messages)
        localStorage.setItem("cached_messages", JSON.stringify(res.data.messages))
        console.log("API Response:", res);
        console.log(res.data.messages)
      } catch (error) {
        const cachedData = localStorage.getItem("cached_messages")
        if (cachedData) {
          setMessages(JSON.parse(cachedData))
        }
        console.log(error)
      }
    }
    if (currentUser && selectedUser) {
      fetchMessages();
    }
  }, [currentUser, selectedUser])

  
useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [messages]);


  useEffect(() => {
    if (!currentUser?._id) return;

    if (!socket.current) {
      socket.current = io(`${API_URL}`, { withCredentials: true });
    }
    socket.current.on("incoming_chat_request", (clientData) => {
      setIncomingChat(clientData);
      setShowModal(true);
      setClient(clientData)
      setFilteredUsers([clientData])
      dispatch(addUser(clientData))
      console.log(clientData)
      console.log(`${clientData.userName} wants to speak with you`);
    });

    socket.current.emit("register_user", currentUser._id);
    return () => {
      if (socket.current) {
        socket.current.off("incoming_chat_request");
      }
    };
  }, [currentUser]);

  const acceptChat = (chatData) => {
    dispatch(addUser(chatData));
    console.log("Accepted chat with:", chatData);
    setShowModal(false);
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

    console.log("Client initiated chat with:", user._id);
  };
  
  useEffect(() => {
    const searchFilter = () => {
      const searchUser = selectedUsers?.filter(user => user.userName.toLowerCase().includes(searchedValue) || user.fullName === searchedValue)
      setFilteredUsers(searchUser)
    }
    searchFilter()
  }, [searchedValue, selectedUsers])

  const sendMessage = async () => {
    const data = {
      senderId: currentUser._id,
      receiverId: selectedUser._id,
      content: messageData.content,
      room: selectedUser._id,
      createdAt: new Date().toISOString(),
    }
    socket.current.emit("send_message", data)
    setMessages((prev) => [...prev, data])
    setMessageData({ content: "" })
  }
  useEffect(() => {
    socket.current.on('receive_message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.current.off('receive_message');
    };
  }, []);

  return (
    <div>

      {showModal && incomingChat && (
        <div className="modal bg-white p-6 rounded shadow-lg fixed top-10 left-1/2 transform -translate-x-1/2 z-50">
          <p className="mb-4">{incomingChat.userName} wants to chat!</p>
          <button
            onClick={() => acceptChat(incomingChat)}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Accept
          </button>
        </div>)}

      <div className='flex '>
        <aside className='w-[15vw] md:w-[10vw] lg:w-[15vw] h-screen overflow-y-auto bg-green-500  px-2 text-white  py-4 flex flex-col justify-between shadow-md'>
          <div className="">
            <Link to="/dashboard">
              <FaChevronLeft />
            </Link>
            <div className=" hidden lg:flex justify-between items-center my-5 md:px-3 bg-white rounded-lg">
              <FaSearch className='text-green-500' />
              <input type="text" placeholder='Search for chat' className='py-3 text-gray-900 outline-none  w-[90%]' value={searchedValue} onChange={handleChange} />
            </div>


            {filteredUsers && filteredUsers.length > 0 ? (filteredUsers.map((user, idx) => {
              return (
                <ul key={idx} className='flex justify-center md:justify-start items-center my-2 bg-green-500 py-2 md:px-2 rounded-xl hover:bg-green-300 hover:text-green-700' onClick={() => handleClickedUser(user)} >
                <img src={user.profilePicture} alt="" className=' w-8 h-8 md:w-12 md:h-12 rounded-full md:me-3' />
                <li className='font-semibold text-lg hidden lg:block'>{user.userName}</li>
              </ul>
              )
            })) : <p className='text-lg text-center'>no users found..</p>}
          </div>
        </aside>
        <section className='w-full   lg:px-0 lg:w-[85%]'>
          <nav className='h-[8vh] w-[94vw] lg:w-[85vw] py-4 px-5 md:px-12 flex justify-between items-center bg-white shadow-md fixed z-20' >
            <h1 className='md:text-2xl font-semibold'>Messages</h1>
            <div className="hidden md:block">
              <button className='px-3 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg'>Refer a Freelancer</button>
            </div>
          </nav>

          {selectedUser ? (
            <div className="flex flex-col h-[92vh] px-3 md:py-5 max-w-4xl justify-center items-center w-[100%] mx-auto relative top-[8vh]">
              <div className='max-w-4xl  h-[84vh]  w-[100%] overflow-y-auto overflow-x-hidden flex flex-col  px-2 py-4 space-x-4 '>
                {messages && messages.map((message, idx) => (
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
                <textarea type="text" id="content" value={messageData.content} name='content' onChange={(e) => setMessageData({ ...messageData, content: e.target.value })} placeholder='Type a Message...' rows={1} className='py-3 px-3 w-[90%] outline-none bg-green-500 text-white placeholder-white break-words overflow-auto ' onKeyDown={(e) => { e.key === "Enter" && sendMessage() }}></textarea>
                <div className="p-2 md:p-3 hover:bg-green-400 rounded-lg">
                  <IoSendSharp className='text-2xl text-white' onClick={sendMessage} />
                </div>
              </div>
            </div>
          ) : <p>no users slected yet</p>}
        </section>
      </div>
    </div>
  )
}


export default Messages
