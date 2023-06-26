import React from "react";

function ReportUsersCard({ users, click }) {
  return (
    <div
      id="dropdownUsersButton"
      type="button"
      onClick={click}
      className="flex -space-x-4"
    >
      {users?.map((user, id) => {
        if (id > 4) return null;
        return (
       
          <img
            key={id}
            className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
            src={user.userId.profilePicture}
          />
        );
      })}
      <a className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800">
       {users.length}
      </a>

      {/* <AvatarGroup>
    {users?.map((user, id) => {
  if (id > 4) return null; // Exit the loop if id is greater than 4
  
  return (
    <Avatar
      key={id}
      img={user.profilePicture}
      rounded
      stacked
    />
  );
})}
     
      <AvatarGroupCounter
        total={users.length}
      />
    </AvatarGroup> */}
    </div>
  );
}

export default ReportUsersCard;
