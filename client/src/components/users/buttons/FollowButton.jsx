import React from "react";

function FollowButton({handleFollow,following}) {
  return (
    <button
      onClick={handleFollow}
      className="w-20 rounded-md bg-accent px-2 py-2 font-normal text-white hover:bg-blue-700 "
    >
      {following ? "unfollow" : "follow"}
    </button>
  );
}

export default FollowButton;
