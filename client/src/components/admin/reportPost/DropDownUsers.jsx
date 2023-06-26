import React, { useState } from 'react';
import ReportUsersCard from './ReportUsersCard';

function DropdownUsers({ users, click }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

 

  return (
    <div className="relative inline-block">
     <ReportUsersCard users={users} click={handleDropdownToggle} />
      {/* Dropdown menu */}
      {isOpen && (
        <div className="z-10 bg-white rounded-lg shadow w-72 absolute top-full mt-2">
          <ul className="py-2 w-auto max-h-40 overflow-y-auto text-gray-700">
            <div className='flex justify-between items-center  px-6 border-b-2 border-gray-100'><span className='flex items-center text-md font-semibold'>Users</span> <span className='flex items-centertext-md font-semibold'>Reasons</span></div>
            {users.map((user, id) => (
              <div key={id} className="flex">
                <div className="flex-1 flex w-full items-center px-4 py-2 hover:bg-gray-100">
                  <img className="w-6 h-6 mr-2 rounded-full" src={user.userId.profilePicture} alt="Profile" />
                  {user.userId.username}
                </div>
                <div className="flex-1 flex items-center justify-start text-sm px-2 text-accent font-semibold">
                  {user.reason}
                </div>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DropdownUsers;
