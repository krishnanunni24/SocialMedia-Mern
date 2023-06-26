import React from 'react'
import FollowRequests from './FollowRequests'
import UserSuggestion from './UserSuggestion'

function RightSideBar() {
  return (
    <div className='hidden md:block pt-28 '>

    <div className='flex-col'>
      <UserSuggestion/>
       
    </div>
    </div>
  )
}

export default RightSideBar
