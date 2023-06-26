import React from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from "react-redux"

function ProfileCard() {
  const  user  = useSelector((state) => state.authReducer.authData);
  
  return (
   <div className='hidden md:block my-2 border-b border-solid border-gray-300 py-1'>
    <Link to={"/profile"}>

<div className="max-w-sm w-full mx-auto rounded-xl overflow-hidden bg-white dark:bg-gray-900 dark:text-gray-100">
  <div className="flex justify-center">
    <img src="https://source.unsplash.com/150x150/?portrait?3" alt="" className="w-18 h-18 lg:w-28 lg:h-28 lg:mx-auto mt-2 md:rounded-full lg: bg-gray-300" />
  </div>
  <div className="hidden lg:block mt-4 text-center">
    <h1 className="text-lg font-semibold text-black dark:text-white">{user.username}</h1>
    <div className="flex justify-center mt-2 mb-2">
      <div className="text-center">
        <span className="text-sm font-bold text-gray-800 dark:text-white">Posts</span>
        <span className="block text-sm text-gray-800 dark:text-white">{user.posts}</span>
      </div>
      <div className="text-center px-4">
        <span className="text-sm font-bold text-gray-800 dark:text-white">Followers</span>
        <span className="block text-sm text-gray-800 dark:text-white">{user.followers}</span>
      </div>
      <div className="text-center">
        <span className="text-sm font-bold text-gray-800 dark:text-white">Following</span>
        <span className="block text-sm text-gray-800 dark:text-white">{user.following}</span>
      </div>
    </div>
  </div>
</div>
</Link>


   </div>
  )
}

export default ProfileCard
