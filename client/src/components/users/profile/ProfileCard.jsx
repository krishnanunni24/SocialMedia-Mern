import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import EditProfileModal from './editProfileModal';

function ProfileCard() {
    const user=useSelector((state) => state.authReducer.authData);
    const [openModal,setOpenModal]=useState(null)
    const handleClick=()=>{
     setOpenModal(true)
    }
    const handleOnClose= ()=>{
      setOpenModal(false)
    }
    return (
  <div className='flex justify-center'>

    <div className="flex lg:flex-row flex-col items-center lg:py-8 lg:space-x-8  rounded-xl bg-white">

    <div>
      <div className="bg-gradient-to-tr from-pink-600 to-accent p-1 rounded-full m-0.5 mr-2 w-56 h-56 relative overflow-hidden transition duration-300">
        <img
          src={user.profilePicture}
          className="bg-gray-200 border-4 border-white rounded-full w-full h-full dark:border-gray-900"
          alt="Avatar"
          />
  
        <div className="absolute -bottom-3 custom-overly1 flex justify-center pt-4 pb-7 space-x-3 text-2xl text-white transition duration-300 w-full">
          <a href="#" className="hover:text-white">
            <i className="uil-camera"></i>
          </a>
          <a href="#" className="hover:text-white">
            <i className="uil-crop-alt"></i>
          </a>
        </div>
      </div>
    </div>
  
    <div className="lg:w-8/12 flex-1 flex flex-col lg:items-start items-center">
  
      <h2 className="font-semibold lg:text-2xl text-lg mb-2">{user.username}</h2>
      <p className="lg:text-left mb-2 text-center dark:text-gray-100">Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum</p>
  
     
  
      <div className="capitalize flex font-semibold space-x-3 text-center text-sm my-2">
         {user? (
            <>
            <button onClick={handleClick} className="bg-gray-300 shadow-sm p-2 px-6 rounded-md dark:bg-gray-700">edit Profile</button>

            </>
         ):(
            <>
            <a href="#" className="bg-gray-300 shadow-sm p-2 px-6 rounded-md dark:bg-gray-700">Follow</a>
        <a href="#" className="bg-accent shadow-sm p-2 pink-500 px-6 rounded-md text-white hover:text-white hover:bg-primary">Message</a>
            </>
         )}
        
      </div>
  
      <div className="divide-gray-300 divide-transparent divide-x grid grid-cols-3 lg:text-left lg:text-lg mt-3 text-center w-full dark:text-gray-100">
        <div className="flex lg:flex-row flex-col">{user.posts} <strong className="lg:pl-2">Posts</strong></div>
        <div className="lg:pl-4 flex lg:flex-row flex-col">{user.followers} <strong className="lg:pl-2">Followers</strong></div>
        <div className="lg:pl-4 flex lg:flex-row flex-col">{user.following}<strong className="lg:pl-2">Following</strong></div>
      </div>
  
    </div>
   
    <EditProfileModal openModal={openModal} handleOnClose={handleOnClose}/>  
  </div>
  
          </div>
  )
}

export default ProfileCard
