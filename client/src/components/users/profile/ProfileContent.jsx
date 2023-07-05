import React, { useEffect, useState } from 'react';
import ProfileCard from './ProfileCard';
import UserPosts from './UserPosts';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUser } from '../../../actions/UserActions';

function ProfileContent() {
  const currentUser = useSelector((state) => state.authReducer.authData);
  const params = useParams();
  const userId = params.userId;
  const isCurrentUserProfile = currentUser._id === userId;
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("userId changed:", userId);
    if (isCurrentUserProfile) {
      // Code to handle current user
      setUser(currentUser);
      console.log("user", currentUser);
    } else {
      console.log("working");
      dispatch(fetchUser(userId))
        .then((response) => {
          setUser(response); // Assuming the response contains the user details
          console.log("user", response);
        })
        .catch((error) => {
          console.error("Error fetching user", error);
        });
    }
  }, [currentUser, dispatch, isCurrentUserProfile, userId]);

  return (
    <div className="w-full mt-12">
      <ProfileCard user={user} isCurrentUserProfile={isCurrentUserProfile} currentUser={currentUser} />
      <UserPosts userId={userId} />
    </div>
  );
}

export default ProfileContent;
