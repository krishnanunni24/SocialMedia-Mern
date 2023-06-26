import React from 'react'
import ProfileContent from '../../../components/users/profile/profileContent'
import SideNav from '../../../components/sideNav/SideNav'
import PageWrapper from '../../../components/admin/PageWrapper'
import NavBar from '../../../components/users/navBar/NavBar'
import UserPosts from '../../../components/users/profile/UserPosts'
import ProfileCard from '../../../components/users/profile/ProfileCard'

function Profile() {
  return (
    <div>
      <PageWrapper>
      <SideNav/>
      <NavBar/>
      <ProfileContent>
        <ProfileCard/>
        <UserPosts/>
      </ProfileContent>
      </PageWrapper>

    </div>
  )
}

export default Profile
