import React from 'react'
import ProfileCard from './ProfileCard'
import UserPosts from './UserPosts'

function ProfileContent(props) {
  return (
    <div className="w-full mt-12">
       {props.children}
    </div>
  )
}

export default ProfileContent
