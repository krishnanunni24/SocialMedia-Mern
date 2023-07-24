import React, { useEffect, useRef, useState } from "react";
import UserList from "./UserList";
import RightPanel from "./RightPanel";
import SearchUser from "./SearchUser";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { SearchFollowingUsers } from "../../../api/UserRequests";
import { fetchChats, updateMessageStatus } from "../../../api/chatRequests";
import useThrowAsyncError from "../../../hooks/useThrowAsyncError";

const ChatComponent = () => {
  const socket = useRef();
  const [searchTxt, setSearchTxt] = useState("");
  const [users, setUsers] = useState([]);
  const [receiver, setReceiver] = useState(null);
  const [chats, setChats] = useState([]);
  const throwAsyncErr = useThrowAsyncError();
  const user = useSelector((state) => state.authReducer.authData);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [noUsersExc, setNoUsersExc] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [isComponentHidden, setIsComponentHidden] = useState(false);

  const handleToggleComponent = () => {
    setIsComponentHidden(!isComponentHidden);
  };



  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 1024) {
        // Change this breakpoint to suit your "md" breakpoint
        setIsComponentHidden(true);
      } else {
        setIsComponentHidden(false);
      }
    };

    // Add event listener to check screen width on resize
    window.addEventListener("resize", handleResize);

    // Initial check on component mount
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(()=>{
 console.log("chats:",chats)
  },[chats])

  
  useEffect(() => {
    socket.current &&
      socket.current.on("receive-message", (data) => {
        setReceivedMessage(data);
        const chatId = data.chatId;
        setChats((chats) => {
          return chats.map((chatUser) => {
            if (chatUser._id === chatId) {
              return {
                ...chatUser,
                notificationCount: (chatUser.notificationCount || 0) + 1,
              };
            }
            return chatUser;
          });
        });
        console.log("message received", chatId);
      });
  }, [socket]);


  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
    const Data = {
      status:"delivered",
      userId:user._id,
    }
   UpdateMessageStatus(Data)
  }, []);

  useEffect(() => {
    if (!sendMessage || sendMessage === "") return;
    socket.current.emit("send-message", sendMessage);
    console.log("message send");
  }, [sendMessage]);

  useEffect(() => {
    if (searchTxt === "") setUsers([]);
    if (searchTxt) {
      console.log("searchingusers...");
      const searchUsers = async () => {
        try {
          const { data } = await SearchFollowingUsers(searchTxt, user._id);
          setNoUsersExc(false);
          setUsers(data.users);
        } catch (err) {
          if (err.response && err.response.data.message === "no users found") {
            setNoUsersExc(true);
            setUsers([]);
          }
        }
        // Do something with the users data
      };
      searchUsers();
    }
  }, [searchTxt]);

  useEffect(() => {
    const fetchChatData = async (userId) => {
      try {
        console.log("fetching chats...");
        const chat = await fetchChats(userId);
        if (chat.data) {
          if (chats.length) {
            setChats([chats, ...chat.data]);
          } else {
            setChats(chat.data);
          }
        }
      } catch (err) {
        throwAsyncErr(err);
      }
      return;
    
    };

    fetchChatData(user._id);
    
  }, []);

  // Get the message from socket server

  const onUserClick = (user,chatId) => {
    setReceiver(user);
    if(chatId){
      setChats((chats)=>{
        return chats.map((chatUser) => {
          if (chatUser._id === chatId) {
            return {
              ...chatUser,
              notificationCount: 0,
            };
          }
          return chatUser;
        });
      })
    }
  };

  const UpdateMessageStatus=async(updateData)=>{
  try{
    console.log("updating message statuse to :",updateData.status)
  const  {data}=await updateMessageStatus(updateData)
  }catch(err){
  console.log(err)
  }
  }

  return (
    <div className="mt-8 w-full">
      <div className="container mx-auto mt-10 px-4 md:px-12">
        <div className="-mx-5 h-3/4 space-y-8 overflow-hidden rounded-md lg:-mx-0 lg:flex lg:space-y-0 lg:bg-white lg:shadow dark:lg:bg-gray-800">
          {/* Left panel - User list */}

          <div
            className={`${
              receiver && isComponentHidden &&  "hidden md:block"
            }flex flex-col justify-start border-r bg-white dark:border-gray-600  dark:bg-gray-800 lg:w-4/12`}
          >
            {/* Search */}
            <SearchUser searchTxt={searchTxt} setSearchTxt={setSearchTxt} />

            {/* User list */}

            <UserList
             setChats={setChats}
              users={users}
              onUserClick={onUserClick}
              chats={chats}
              onlineUsers={onlineUsers}
            />
          </div>

          {/* Right panel - Chat messages */}
          <RightPanel
            receiver={receiver}
            socket={socket}
            setSendMessage={setSendMessage}
            receivedMessage={receivedMessage}
            onlineUsers={onlineUsers}
            setReceiver={setReceiver}
            setChats={setChats}
            UpdateMessageStatus={UpdateMessageStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
