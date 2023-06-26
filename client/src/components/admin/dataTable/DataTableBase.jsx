import React, { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { blockUser, getAllUsers } from '../../../actions/UserListActions';
import { useDispatch, useSelector } from 'react-redux';


function DataTableBase(props) {
    const dispatch = useDispatch()
    const  users= useSelector((state) => state.adminReducer.users);
    const [filterText, setFilterText] = useState("");

    
    
    const handleBlock = async (row) => {
      const blocked = !row.isBlocked;
      console.log("blocked", blocked);
      try {
        await dispatch(blockUser(row._id, blocked));
        await dispatch(getAllUsers());

      } catch (error) {
        alert(error)
      }
    };
    
    useEffect(() => {
      dispatch(getAllUsers());
    }, [dispatch]);

    const columns = [
      ...props.columns, // include existing columns
      {
        name: "Block",
        cell: (row) => (
          <button 
            className="bg-purple-600 w-20 text-white py-2 px-3 rounded block"
            onClick={() => handleBlock(row)}
          
          >
           {row.isBlocked? "Unblock": "Block"}
          </button>
        ),
        allowOverflow: true,
        button: true,
      }
    ];
    const customStyles = {
        headCells: {
          style: {
            fontWeight: 'bold',
            fontSize: '16px',
          },
        },
        rows: {
          style: {
            fontSize: '14px',
            minHeight:"64px"
          },
        },
      };

      const filteredData = useMemo(() => {
        return users?.filter((item) =>
          item.username.toLowerCase().includes(filterText.toLowerCase())
        );
      }, [users, filterText]);

    return (
        <div>
            <div className='flex justify-end mt-8 me-8'>

            <input
            className='peer  border-b-2 my-2 p-2 border-secondary rounded-lg text-gray-900 focus:outline-none'
        type="text"
        placeholder="Search by name"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
            </div>
        <DataTable
            search={true}
            direction="auto"
            fixedHeader
            pagination
            responsive={true}
            customStyles={customStyles}
            subHeaderAlign="right"
            subHeaderWrap
            title="Users"
            columns={columns}
            data={filteredData}
            highlightOnHover={true}
            
            />
            </div>
    );
}

export default DataTableBase;