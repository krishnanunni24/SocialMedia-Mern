import React from 'react'
import LoginForm from './LoginForm'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { adminLogin } from '../../../actions/AuthActions';

function FormWrapper() {
    const navigate = useNavigate()
	const dispatch = useDispatch()
   
	const onSubmit=(data)=>{
	  console.log("onSubmit",data)
	  dispatch(adminLogin(data,navigate))
	}

  return (

    <div>
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-blue-200 py-6 flex flex-col justify-center sm:py-12">
<div className="relative py-3 sm:max-w-xxl sm:mx-auto">
 <div
   className="absolute inset-0 bg-gradient-to-r from-purple-300 to-purple-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
 </div>
 <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
   <div className="max-w-md mx-auto">
     <div>
       <h1 className="flex justify-center text-2xl font-bold">Admin Log In</h1>
     </div>
     <div className="divide-y divide-gray-200">
     <LoginForm onSubmit={onSubmit}/>
        </div>
    </div>
</div>
</div>
</div>

</div>
  )
}

export default FormWrapper
