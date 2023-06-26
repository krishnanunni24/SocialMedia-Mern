import React from 'react'
import PageWrapper from '../../../components/admin/PageWrapper'
import SideNav from '../../../components/sideNav/SideNav'
import PostsSaved from '../../../components/users/savedPosts/PostsSaved'
import NavBar from '../../../components/users/navBar/NavBar'
import ErrorBoundary from '../../../components/error/ErrorBoundary'
function SavedPosts() {
  return (
    <div>
      <PageWrapper>
        <SideNav/>
        <NavBar/>
         <PostsSaved/>
      </PageWrapper>
    </div>
  )
}

export default SavedPosts
