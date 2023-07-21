import React from "react";
import { Modal } from "@mantine/core";
import User from "../rightSideBar/User";
import {FaUsers} from "react-icons/fa"

function UsersModal({ users, openModal, handleOnClose, button ,title }) {
  return (
    <Modal
      opened={openModal}
      onClose={handleOnClose}
      centered
      size="sm"
      title={title}
      color="#ffffff" // Set the color to white
      
    >

            {users?.length > 0 ? (
        <div className=" flex flex-col items-start bg-white">
                {users.map((user,id) => {
                    return <div className="flex bg-slate-100 rounded-md justify-center w-full overflow-auto">
                    <User person={user} key={id}/>
                    </div>
              })}
              </div>

            ) : (
                <div className="flex-col justify-center items-center">
                <span className="flex justify-center items-center">
                <FaUsers size={50} />
                    </span>    
              <span className="flex justify-center">No users to Display</span>
          </div>
            )}
    </Modal>
  );
}

export default UsersModal;
