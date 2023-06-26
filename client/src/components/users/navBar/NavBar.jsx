import React, { useState } from 'react'
import { BsChatSquareDots } from 'react-icons/bs';
import {ImInstagram} from "react-icons/im";
import { Link } from 'react-router-dom';
 

const NavBar = () => {
  
  return (
    <div className='shadow-sm z-20 w-full fixed top-0 left-0'>
      <div className='flex items-center justify-between bg-white py-2 md:px-10 px-7'>
      <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
      text-gray-800'>
        <span className='text-3xl text-black-600 mr-1'>
       <ImInstagram/>
        </span>
      </div>
      
     <div className='flex justify-center items-center gap-5'>
      <Link to="/chat">
    <BsChatSquareDots size={30}/>
      </Link>
      
      <div className='md:hidden'>
        <Link to="/profile">        
       <img src="https://source.unsplash.com/150x150/?portrait?3" alt="" className="w-10 h-10 lg:w-28 lg:h-28 lg:mx-auto mt-2 rounded-full lg: bg-gray-300" />
        </Link>
      </div>
     </div>

      </div>

    </div>
  )
}

export default NavBar