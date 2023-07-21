import React from 'react'

function UnFollowButton({handleUnFollow}) {
  return (
    <div className="flex items-center justify-center">

    <button
      onClick={handleUnFollow}
      className="w-20 h-10 rounded-md bg-accent px-2 py-2 font-normal text-white hover:bg-blue-700 "
    >
      UnFollow
    </button>
    </div>
  )
}

export default UnFollowButton
