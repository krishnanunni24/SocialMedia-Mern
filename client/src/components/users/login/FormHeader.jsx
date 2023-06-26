import React from 'react'

function FormHeader(props) {
    const isSignUp= props.isSignUp
    const handleIsSignUp = ()=>{
        props.setIsSignUp(!isSignUp)
        props.reset()
    }

  return (
    <div>
       <p tabIndex={0} className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800">
       {props.isSignUp? "Sign Up Here!" : "Login to your Account"}
    </p>
    <p tabIndex={0} className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500">
       {props.isSignUp? "Already have an Account? " : " Dont have an account? "}
        <a onClick={handleIsSignUp} className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none text-gray-800 cursor-pointer">
          
        {props.isSignUp? "Log In here !" : "Sign Up Here!"}
        </a>
    </p>

    </div>
  )
}

export default FormHeader
