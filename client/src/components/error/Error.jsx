import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Error = ({ error }) => {
  const navigate = useNavigate()
  const handleClick=()=>{
    localStorage.clear()
  window.location="/auth"

  }
  return (
    <>
    <div className="flex justify-center items-center h-screen bg-purple-600">
      <div id="error-page" className='flex flex-col space-y-3'>
        <h1 className="lg:text-6xl font-bold text-2xl text-white">Oops!</h1>
        <p className="text-xl text-white">
          Sorry, an unexpected error has occurred.
        </p>
        <p className="text-3xl text-white">
          {console.log(error,
            "errorfromerror")}
          {error.statusText || error.message}     
        </p>
        <p className="text-5xl text-white">
          {error.response?.data?.message}     
        </p>
        <div className="mt-4">
          <Link
            onClick={handleClick}
            className="px-5 py-2 bg-white rounded-md hover:bg-gray-100"
          >
            Login 
          </Link>
        </div>
      </div>
    </div>
  </>
  );
};

export default Error;