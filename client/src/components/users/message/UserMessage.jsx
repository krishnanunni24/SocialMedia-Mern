import React from "react";

function UserMessage({ message, user }) {

  return (
    <div className="flex flex-row-reverse items-end gap-2 my-3">

      <img
        src={user?.profilePicture}
        alt=""
        className="h-5 w-5 rounded-full shadow"
      />
      <div className="max-w-sm rounded-[20px] bg-gradient-to-tr from-sky-500 to-blue-500 px-4 py-2 text-white shadow">
        {message?.message}
      </div>
    </div>
  );
}

export default UserMessage;
