import React, { useEffect, useState } from 'react'
import DataTableBase from '../dataTable/DataTableBase'
import { getAllUsers } from '../../../actions/UserListActions'


function UsersList() {

  const columns = [
    { 
      name: 'firstname', 
      selector:row=>row.firstname,
      width: 130 
    },
    {
    name: 'lastname', 
    selector:row=>row.lastname,
    width: 130 
  },
    { 
      name: 'username',
      selector:row=>row.username,
      width: 70, 
      sortable:true
    },
    { 
      name: 'email', 
      selector:row=>row.email,
      width: 130 ,
    },
    { 
      name: 'phone', 
      selector:row=>row.phone,
      width: 130,
    },
    
  ];
 
    

  return (
    <div className="w-full">
    <DataTableBase columns={columns} selectableRows/>
    </div>
  )
}

export default UsersList
