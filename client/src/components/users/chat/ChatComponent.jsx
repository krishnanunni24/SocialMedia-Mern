import React, { useEffect, useRef, useState } from "react";
import UserListItem from "./UserListsItem";
import MessageBubble from "./MessageBubble";
import UserList from "./UserList";
import RightPanel from "./RightPanel";
import SearchUser from "./SearchUser";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { SearchFollowingUsers } from "../../../api/UserRequests";

const ChatComponent = () => {
  const socket = useRef();
  const [searchTxt,setSearchTxt]=useState("")
  const [noUsersExc, setNoUsersExc] = useState(null);
  const [users, setUsers] = useState([]);
  const [receiver,setReceiver]=useState(null)
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  const user=useSelector((state)=>state.authReducer.authData)
  const [onlineUsers,setOnlineUsers]=useState([])
  
  // Connect to Socket.io
  useEffect(() => {
   socket.current = io("ws://localhost:8800");
   socket.current.emit("new-user-add", user._id);
   socket.current.on("get-users", (users) => {
    console.log("users-online:",users)
     setOnlineUsers(users);
   });
 }, [user]);  

  useEffect(() => {
    if (searchTxt) {
      console.log("searchingusers")
      const searchUsers = async () => {
        try {
          const { data } = await SearchFollowingUsers(searchTxt,user._id);
          setNoUsersExc(false)
          console.log(data)
          setUsers(data.users);
        } catch (err) {
            if(err.response && err.response.data.message === "no users found"){
             setNoUsersExc(true)
             setUsers([])
            }
        }
        // Do something with the users data
      };
      searchUsers();
    }
  }, [searchTxt]);

  useEffect(()=>{
   if(receiver){
    fetchChat(user._id,receiver._id)
   }
  },[receiver])



 //send message
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

// Get the message from socket server
useEffect(() => {
  socket.current.on("recieve-message", (data) => {
    setReceivedMessage(data);
  });
}, []);


  const onUserClick =(user)=>{
  console.log("user",user)
  setReceiver(user)
  }

  
  async function fetchChat(userId, oppUserId) {
    const chat = await findChat(userId, oppUserId);
    console.log(chat)
    // if (chat.data) {
    //   setCurrentChat(chat.data);
    // } else {
    //   setCurrentChat({ members: [userId, oppUserId] });
    // }
  }
  
  return (
    <div className="mt-8 w-full">
      <div className="container mx-auto mt-10 px-4 md:px-12">
        <div className="-mx-5 h-3/4 space-y-8 overflow-hidden rounded-md lg:-mx-0 lg:flex lg:space-y-0 lg:bg-white lg:shadow dark:lg:bg-gray-800">
          {/* Left panel - User list */}

          <div className="flex flex-col justify-start border-r bg-white dark:border-gray-600  dark:bg-gray-800 lg:w-4/12">
           
            {/* Search */}
           <SearchUser searchTxt={searchTxt} setSearchTxt={setSearchTxt}/>

            {/* User list */}
            
            <UserList users={users} onUserClick={onUserClick}/>
            
          </div>

          {/* Right panel - Chat messages */}
           <RightPanel receiver={receiver }/>

        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
