import React from 'react'

function SubmitButton(props) {
  return (
    <div>
      <div className="mt-8">
        <button role="button" type='submit' className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 text-sm font-bold leading-none text-white focus:outline-none bg-accent border rounded hover:bg-indigo-600 py-4 w-full">
          {props.isSignUp ? "Create my account" : "Log In"}
        </button>
    </div>
    </div>
  )
}

export default SubmitButton
