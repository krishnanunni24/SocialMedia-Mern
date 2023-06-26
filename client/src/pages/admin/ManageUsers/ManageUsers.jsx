import React from 'react'
import SideNav from '../../../components/admin/SideNav'
import UsersList from '../../../components/admin/manageUser/UsersList'
import PageWrapper from '../../../components/admin/PageWrapper'
import DataTableBase from '../../../components/admin/dataTable/DataTableBase'

function ManageUsers() {
  return (
    <div>
      <PageWrapper>
      <SideNav/>
      <UsersList>
       <DataTableBase/>
      </UsersList>
      </PageWrapper>  
      
    </div>
  )
}

export default ManageUsers
