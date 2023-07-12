import React from "react";
import UserListItem from "./UserListsItem";

function UserList({ users, onUserClick, chats }) {
  return (
    <div className="h-[calc(90vh-127px)] overflow-y-auto">
    <div className="dark:text-gray-100">
      {users.length ? (
        <>
          {users.map((user, key) => (
            <UserListItem key={key} user={user} onUserClick={onUserClick} />
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
                  onUserClick={onUserClick}
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
