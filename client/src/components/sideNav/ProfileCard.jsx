import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UsersModal from "../users/usersListModal/UsersModal";
import { fetchFollowersData, fetchFollowingUsersData } from "../../api/UserRequests";

function ProfileCard({ isSearchOpen }) {
  const user = useSelector((state) => state.authReducer.authData);
  const [openModal, setOpenModal] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [ModalTitle,setModalTitle]=useState('')

  const handleFollowersClick = () => {
    getFollowersUserData()
    setOpenModal(true);
    setModalTitle("Followers")
  };

  const getFollowingUsersData = async () => {
    console.log("fetch following users");
    try {
      const { data } = await fetchFollowingUsersData(user._id);
      console.log("following:", data);
      setData(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getFollowersUserData = async () => {
    console.log("getfollowersData..")
    try {
      const { data } = await fetchFollowersData(user._id);
      console.log("followers:", data);
      setData(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFollowingClick = async () => {
    console.log("following clicked ")
    getFollowingUsersData();
    setOpenModal(true)
    setModalTitle("Following")

  };

  const handleOnClose = () => {
    setOpenModal(false);
  };

  return (
    <div className="my-2 hidden border-b border-solid border-gray-300 py-1 md:block">
      <div className="mx-auto w-full max-w-sm overflow-hidden rounded-xl bg-white dark:bg-gray-900 dark:text-gray-100">
        <Link to={`/profile/${user._id}`}>
          <div className="flex justify-center">
            <img
              src={user.profilePicture}
              alt=""
              className="w-18 h-18 lg: mt-2 bg-gray-300 md:rounded-full lg:mx-auto lg:h-28 lg:w-28"
            />
          </div>
        </Link>
        <div
          className={`hidden ${
            isSearchOpen ? "" : "lg:block"
          } mt-4 text-center`}
        >
          <h1 className="text-lg font-semibold text-black dark:text-white">
            {user.username}
          </h1>

          <div className="mb-2 mt-2 flex justify-center">
            <div className="text-center">
              <span className="text-sm font-bold text-gray-800 dark:text-white">
                Posts
              </span>
              <span className="block text-sm text-gray-800 dark:text-white">
                {user.posts}
              </span>
            </div>
            <button className="px-4 text-center" onClick={handleFollowersClick}>
              <span className="text-sm font-bold text-gray-800 dark:text-white">
                Followers
              </span>
              <span className="block text-sm text-gray-800 dark:text-white">
                {user.followers}
              </span>
            </button>
            <button className="text-center" onClick={handleFollowingClick}>
              <span className="text-sm font-bold text-gray-800 dark:text-white">
                Following
              </span>
              <span className="block text-sm text-gray-800 dark:text-white">
                {user.following}
              </span>
            </button>
          </div>
        </div>
      </div>

      <UsersModal
        openModal={openModal}
        handleOnClose={handleOnClose}
        users={data}
        loading={Loading}
        title={ModalTitle}
      />
    </div>
  );
}

export default ProfileCard;
