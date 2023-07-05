import React from "react";
import UserListItem from "./UserListsItem";

function UserList({ users,onUserClick }) {
  return (
    <div className="h-[calc(90vh-127px)] overflow-y-auto">
      <ul className="dark:text-gray-100">
        {users?.map((user, key) => {
          return <UserListItem key={key} user={user} onUserClick={onUserClick}/>;
        })}
      </ul>
    </div>
  );
}

export default UserList;
