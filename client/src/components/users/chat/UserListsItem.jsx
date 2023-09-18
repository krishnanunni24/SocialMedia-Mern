import { useEffect, useState } from "react";
import { getChatNotification } from "../../../api/chatRequests";

function UserListItem({ user, onUserClick, onlineUsers ,chat,setChats}) {
  const [userOnline, setUserOnline] = useState(false);

  const fetchNotification = async()=>{
    const {data}=await getChatNotification(chat._id,user._id)
    console.log("dataFetchNotifications:",data)
    setChats((chats) => {
      return chats.map((chatUser) => {
        if (chatUser._id === chat._id) {
          return {
            ...chatUser,
            notificationCount: (data || 0),
          };
        }
        return chatUser;
      });
    });

  }


  useEffect(() => {
    
    if(onlineUsers && onlineUsers.length){
      setUserOnline(onlineUsers.some((person) => person.userId === user._id));
    }
  }, [onlineUsers,user]);

  useEffect(() => {  
    if(user && chat){
    fetchNotification()
    }
  }, [user]);



  return (
    <li>
      <a
        onClick={() => {
          console.log("chat:",chat)
          onUserClick(user,chat?._id);
        }}
        className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <div className="relative h-12 w-12 flex-shrink-0 rounded-full">
          <img
            src={user?.profilePicture}
            alt=""
            className="absolute h-full w-full rounded-full"
          />
          {userOnline && (
            <span className="absolute bottom-0 right-0 m-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500 shadow-md"></span>
          )}
        </div>
        <div className="relative min-w-0 flex-1 text-gray-500">
          <h4 className="font-semibold text-black dark:text-white">
            {user?.username}
          </h4>
          {
             chat?.notificationCount && (

          <span className="absolute right-0 top-1 rounded-full px-2 py-1 bg-green-400 text-xs text-white">
            {chat.notificationCount} 
          </span>
             ) || ""
          }
        </div>
      </a>
    </li>
  );
};

export default UserListItem;
