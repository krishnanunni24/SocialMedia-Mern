import React, { useEffect, useState } from "react";
import EditProfileModal from "./editProfileModal";
import FollowButton from "../buttons/FollowButton";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFollowing,
  followUser,
  unfollowUser,
} from "../../../actions/UserActions";
import UnFollowButton from "../buttons/UnFollowButton";

function ProfileCard({ user, isCurrentUserProfile, currentUser }) {

  const [openModal, setOpenModal] = useState(null);
  const followingList = useSelector((state) => state.userReducer.following);

  const [following, setFollowing] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
   if(currentUser){

     const fetchFollowingUsers = async () => {
       dispatch(fetchFollowing(currentUser._id));
     };
     fetchFollowingUsers();
   }
  }, [currentUser]);

  useEffect(() => {
      if(user){
      setFollowing(followingList.includes(user._id))
    }
  }, [followingList,user]);

  useEffect(()=>{
  if(following)console.log("following:",following)
  },[following])

  const handleFollow = () => {
    dispatch(followUser(currentUser._id,user._id));
    setFollowing(true);
  };
  
  const handleUnFollow = () => {
    dispatch(unfollowUser(currentUser._id,user._id));
    setFollowing(false);
  };

  const handleClick = () => {
    setOpenModal(true);
  };
  const handleOnClose = () => {
    setOpenModal(false);
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center rounded-xl bg-white px-6 lg:flex-row  lg:space-x-8 lg:py-8">
        <div>
          <div className="relative m-0.5 mr-2 h-56 w-56 overflow-hidden rounded-full bg-gradient-to-tr from-pink-600 to-accent p-1 transition duration-300">
            <img
              src={user?.profilePicture}
              className="h-full w-full rounded-full border-4 border-white bg-gray-200 dark:border-gray-900"
              alt="Avatar"
            />

            <div className="custom-overly1 absolute -bottom-3 flex w-full justify-center space-x-3 pb-7 pt-4 text-2xl text-white transition duration-300">
              <a href="#" className="hover:text-white">
                <i className="uil-camera"></i>
              </a>
              <a href="#" className="hover:text-white">
                <i className="uil-crop-alt"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center lg:w-8/12 lg:items-start">
          <h2 className="mb-2 text-lg font-semibold lg:text-2xl">
            {user?.username}
          </h2>
          <p className="mb-2 text-center dark:text-gray-100 lg:text-left">
            {user?.about || ""}
          </p>

          <div className="my-2 flex space-x-3 text-center text-sm font-semibold capitalize">
            {isCurrentUserProfile ? (
              <>
                <button
                  onClick={handleClick}
                  className="rounded-md bg-gray-300 p-2 px-6 shadow-sm dark:bg-gray-700"
                >
                  edit Profile
                </button>
              </>
            ) : (
              <>
              {
                following ? <UnFollowButton handleUnFollow={handleUnFollow}/> :
            
                <FollowButton
                  handleFollow={handleFollow}
                />
              }
                <a
                  href="#"
                  className="pink-500 rounded-md bg-accent p-2 px-6 text-white shadow-sm hover:bg-primary hover:text-white"
                >
                  Message
                </a>
              </>
            )}
          </div>

          <div className="mt-3 grid w-full grid-cols-3 divide-x divide-gray-300 divide-transparent text-center dark:text-gray-100 lg:text-left lg:text-lg">
            <div className="flex flex-col lg:flex-row">
              {user?.posts} <strong className="lg:pl-2">Posts</strong>
            </div>
            <div className="flex flex-col lg:flex-row lg:pl-4">
              {user?.followers} <strong className="lg:pl-2">Followers</strong>
            </div>
            <div className="flex flex-col lg:flex-row lg:pl-4">
              {user?.following}
              <strong className="lg:pl-2">Following</strong>
            </div>
          </div>
        </div>

        <EditProfileModal openModal={openModal} handleOnClose={handleOnClose} />
      </div>
    </div>
  );
}

export default ProfileCard;
