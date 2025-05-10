import React from 'react'
import { io } from "socket.io-client"
import axios from "axios"


const ChatRoom = () => {
    //  useEffect(() => {
    //     if (!currentUser?._id) return;

    //     if (!socket.current) {
    //       socket.current = io('http://localhost:5500', { withCredentials: true });
    //     }
    //     socket.current.on("incoming_chat_request", (clientData) => {
    //       setIncomingChat(clientData);
    //       setShowModal(true);
    //       setClient(clientData)
    //       setFilteredUsers([clientData])
    //       dispatch(addUser(clientData))
    //       console.log(clientData)
    //       console.log(`${clientData.userName} wants to speak with you`);
    //     });

    //     socket.current.emit("register_user", currentUser._id);
    //     return () => {
    //       if (socket.current) {
    //         socket.current.off("incoming_chat_request");
    //       }
    //     };
    //   }, [currentUser]);
    return (
        <div>
            hiii
        </div>
    )
}

export default ChatRoom
