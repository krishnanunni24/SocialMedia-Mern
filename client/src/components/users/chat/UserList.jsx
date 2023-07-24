import React from "react";
import UserListItem from "./UserListsItem";

function UserList({ users, onUserClick, chats ,onlineUsers , setChats}) {
  


  return (
    <div className="h-[calc(90vh-127px)] overflow-y-auto">
    <div className="dark:text-gray-100">
      {users.length ? (
        <>
          {users.map((user, key) => (
            <UserListItem key={key} user={user} onUserClick={onUserClick} onlineUsers={onlineUsers}/>
          ))}
        </>
      ) : (
        <>
          {chats.length > 0 &&
            chats.map((chat, key) => {
              return (
                <UserListItem
                  key={key}
                  user={chat.users[0]}
                  chat={chat}
                  onUserClick={onUserClick}
                  onlineUsers={onlineUsers}
                  setChats={setChats}
                />
              );
            })}
        </>
      )}
    </div>
  </div>
  
  );
}

export default UserList;
