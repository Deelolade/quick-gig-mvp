import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from "socket.io-client"
import { FaSearch, FaChevronLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { addUser, setSelectedUser } from '../../redux/chat/chatSlice';

const Messages = () => {
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)
  const [incomingChat, setIncomingChat] = useState(null)
  const [searchedValue, setSearchedValue] = useState('')
  const [client, setClient] = useState(null)
  const [filteredUsers, setFilteredUsers] = useState([]);
  const socket = useRef();
  const { currentUser } = useSelector(state => state.user);
  const { selectedUsers } = useSelector(state => state.chat);
  const chatUsers = useSelector(state => state.chat.selectedUsers)
  const selectedUser = useSelector(state => state.chat.selectedUser);

  const handleChange = (e) => {
    setSearchedValue(e.target.value);
  };

  useEffect(() => {
    if (!currentUser?._id) return;

    if (!socket.current) {
      socket.current = io('http://localhost:5500', { withCredentials: true });
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
        const searchUser = selectedUsers.filter(user => user.userName.toLowerCase().includes(searchedValue) || user.fullName === searchedValue)
        setFilteredUsers(searchUser)
      }
      searchFilter()
    }, [searchedValue, selectedUsers])
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
        <aside className='w-[15vw] h-screen overflow-y-auto bg-green-500  px-2 text-white  py-4 flex flex-col justify-between shadow-md'>
          <div className="">
            <Link to="/dashboard">
              <FaChevronLeft />
            </Link>
            <div className=" flex justify-between items-center my-5 px-3 bg-white rounded-lg">
              <FaSearch className='text-green-500' />
              <input type="text" placeholder='Search for chat' className='py-3 text-gray-900 outline-none  w-[90%]' value={searchedValue} onChange={handleChange} />
            </div>


            {filteredUsers && filteredUsers.length > 0 ? (filteredUsers.map((user, idx) => {
              return (
                <ul key={idx} className='flex  justify-start items-center my-2 bg-green-500 py-2 px-2 rounded-xl hover:bg-green-300 hover:text-green-700' onClick={() => handleClickedUser(user)} >
                  <img src={user.profilePicture} alt="" className='w-12 h-12 rounded-full me-3' />
                  <li className='font-semibold text-lg'>{user.userName}</li>
                </ul>
              )
            })) : <p className='text-lg text-center'>no users found..</p>}
          </div>
        </aside>
        <section className=''>
          <nav className='h-[8vh] w-[85vw]  py-4 px-12 flex justify-between items-center bg-white shadow-md fixed z-20' >
            <h1 className='text-2xl font-semibold'>Messages</h1>
            <div className="">
              <button className='px-3 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg'>Refer a Freelancer</button>
            </div>
          </nav>
          {/* <h1>{selectedUser.userName}</h1> */}
          {client && (
            <div>
              <h2 className="text-xl font-bold">{client.userName}</h2>
              <img src={client.profilePicture} alt="" className="w-24 h-24 rounded-full" />
              <h2 className="text-xl font-bold">this is the {client.userName}</h2>
              {/* other details here */}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}


export default Messages
