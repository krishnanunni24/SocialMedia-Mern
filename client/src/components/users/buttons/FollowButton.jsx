import React from "react";

function FollowButton({handleFollow}) {
  return (
    <div className="flex items-center justify-center">

    <button
      onClick={handleFollow}
      className="w-20 h-10 rounded-md bg-accent px-2 py-2 font-normal text-white hover:bg-blue-700 "
    >
      Follow
    </button>
    </div>
  );
}

export default FollowButton;
