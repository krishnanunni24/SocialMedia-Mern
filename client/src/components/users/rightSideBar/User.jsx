import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unfollowUser } from '../../../actions/UserActions';

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

       <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
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
                    <button onClick={handleFollow} className="bg-accent text-white font-normal w-20 px-2 hover:bg-blue-700 py-2 rounded-md ">
                   {following? "unfollow": "follow"}
                
                  </button>
                </div>
            </li>
  
  )
}

export default User
