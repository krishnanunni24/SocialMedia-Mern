import React, { useState } from 'react'
import MessageBubble from './MessageBubble'
import { AiOutlineSend } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'

function RightPanel({receiver}) {
    const [newMessage,setNewMessage]=useState("")
    const user=useSelector((state)=>state.authReducer.authData)
    const dispatch = useDispatch()
    const handleSend=()=>{
      if (!newMessage || !newMessage.trim()) {
        return; // Do nothing if newMessage is empty
      }    
      
      const data = {
            userId:user._id,
            receiverId:receiver._id,
            message:newMessage
        }
     dispatch(sendMessage(data))
    }
    const handleInputChange=(e)=>{
      setNewMessage(e.target.value)
    }

  return (
    <div className="bg-white dark:bg-gray-800 lg:w-8/12">
            {/* Header */}
            <div className="relative flex flex-col border-b px-6 py-4 dark:border-gray-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative h-12 w-12 flex-shrink-0">
                    <img
                      src={receiver?.profilePicture}
                      alt=""
                      className="absolute h-full w-full rounded-full"
                    />
                    <span className="absolute bottom-0 right-0 m-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500 shadow-md"></span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-black dark:text-white">
                     {receiver?.username}
                    </h4>
                    <span className="text-xs text-gray-500">Online</span>
                  </div>
                </div>
                <button className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                  <i className="icon-material-outline-more-vert"></i>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="w-full p-5 py-10 overflow-y-auto md:h-[calc(80vh-137px)] h-[calc(80vh-250px)]">
             
              <MessageBubble receiver={receiver}/>
          

           
            </div>

            {/* Message input */}
            <div className="border-t px-6 py-4 dark:border-gray-600">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={handleInputChange}
                  className="w-full rounded-full bg-gray-100 px-4 py-2 focus:outline-none dark:bg-gray-700"
                />
                <button onClick={handleSend} className="ml-4 text-white font-semibold bg-accent hover:text-accent hover:bg-slate-100 p-2 rounded-lg">
                  <span className='flex items-center'>
                    <AiOutlineSend/>
                    <span>
                    Send</span>
                    </span>
                </button>
              </div>
            </div>
          </div>
  )
}

export default RightPanel
