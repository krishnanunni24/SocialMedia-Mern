import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unfollowUser } from '../../../actions/UserActions';
import { Link } from 'react-router-dom';
import FollowButton from '../buttons/FollowButton';

function User({person}) {
    const dispatch = useDispatch()
    const user= useSelector((state) => state.authReducer.authData);
    const followingList = useSelector((state) => state.userReducer.following)
    const initialFollowing=followingList?.includes(person._id)
   
    const [following, setFollowing] = useState(
        initialFollowing
      );

    
      useEffect(()=>{
      setFollowing(followingList?.includes(person._id))
      },[followingList])


      const handleFollow = () => {
        following
          ? dispatch(unfollowUser(user._id,person._id))
          : dispatch(followUser(user._id,person._id));
        setFollowing((prev) => !prev);
      };
  return (

       <div className="flex gap-2 justify-between py-3 sm:py-4 ">
                <Link to={`/profile/${person._id}`} className="flex items-center space-x-4 my-3">
                    <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src={person.profilePicture} alt="User"/>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {person.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            {person.username}   
                        </p>
                    </div>
                </Link>
                    <FollowButton following={following} handleFollow={handleFollow}/>
            </div>
  
  )
}

export default User
