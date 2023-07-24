import React from 'react'

function ReceiverMessage({message,receiver}) {
  return (
    <div>
        
       {/* opposite user message */}
       <div className="flex gap-2 my-3">
        <img
          src={receiver?.profilePicture}
          alt=""
          className="h-9 w-9 rounded-full shadow"
        />
        <div className="max-w-sm rounded-[20px] bg-secondary px-4 py-2">
         {message?.message}
        </div>
      </div>
    </div>
  )
}

export default ReceiverMessage
