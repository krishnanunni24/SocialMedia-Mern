import React from 'react'
import SideNav from '../../../components/admin/sideNav'
import PageWrapper from '../../../components/admin/PageWrapper'
import ReportsList from "../../../components/admin/reportPost/ReportsList"
function ReportedPosts() {
  return (
    <div>
      <PageWrapper>
      <SideNav/>
       <ReportsList/>
      </PageWrapper>
    </div>
  )
}

export default ReportedPosts
