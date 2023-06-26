import React, { useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { AiOutlineDelete, AiOutlineUserAdd } from "react-icons/ai";
import { RiUserUnfollowLine } from "react-icons/ri";
import { MdReportGmailerrorred } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../../actions/UserActions";
import { followUser, unfollowUser } from "../../../actions/UserActions";
import ReportModal from "./ReportModal";
import { ToastContainer, toast } from "react-toastify";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


function PostOptionModal({ postId, postedUser ,onClose}) {
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const following = useSelector((state) => state.userReducer.following);
  const user = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();

  const handleReportClick = () => {
    setReportModalOpen(true);
  };

  const handleOnClose = () => {
    setReportModalOpen(false);
  };

  const handleDelete = () => {
    onClose()
    confirmAlert({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this post?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            dispatch(deletePost(postId, user._id));
          }
        },
        {
          label: 'No',
          onClick: () => {
              alert("deletion cancelled")
          }
        }
      ]
    });
  };

  const handleUnfollow = () => {
    dispatch(unfollowUser(user._id, postedUser));
  };

  const handleFollow = () => {
    dispatch(followUser(user._id, postedUser));
  };

  return (
    <>
      <Menu as="div" className="relative flex items-center justify-center">
        <div>
          <Menu.Button>
            <svg
              className="h-6 w-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
            </svg>
          </Menu.Button>
        </div>

        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 top-8 z-10  w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {postedUser === user._id ? (
              
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleDelete}
                      className={`${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      } block w-full px-4 py-2 text-left text-sm`}
                    >
                      <div className="flex">
                        <span className="mr-1 text-red-500">
                          <AiOutlineDelete size={20} />
                        </span>
                        <span> Delete</span>
                        <ToastContainer />
                      </div>
                    </button>
                  )}
                </Menu.Item>
              ) : (
                <>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleReportClick}
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        } block w-full border-b-2 px-4 py-2 text-left text-sm`}
                      >
                        <div className="flex">
                          <span className="mr-1 text-red-500">
                            <RiUserUnfollowLine size={20} />
                          </span>
                          <span>Report</span>
                        </div>
                      </button>
                    )}
                  </Menu.Item>

                  {following?.includes(postedUser) ? (
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleUnfollow}
                          className={`${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          } block w-full px-4 py-2 text-left text-sm`}
                        >
                          <div className="flex">
                            <span className="mr-1 text-red-500">
                              <MdReportGmailerrorred size={20} />
                            </span>
                            <span>Unfollow</span>
                          </div>
                        </button>
                      )}
                    </Menu.Item>
                  ) : (
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleFollow}
                          className={`${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          } block w-full px-4 py-2 text-left text-sm`}
                        >
                          <div className="flex">
                          <span className="mr-1 text-red-500">
                            <AiOutlineUserAdd size={20} />
                          </span>
                         <span>
                         Follow
                          </span>
 
                          </div>
                        </button>
                      )}
                    </Menu.Item>
                  )}
                </>
              )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      <ReportModal
        openModal={reportModalOpen}
        closeModal={handleOnClose}
        postId={postId}
      />
    </>
  );
}

export default PostOptionModal;
