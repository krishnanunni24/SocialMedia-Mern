import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from '../../../actions/UserListActions';
import { FetchUsers } from '../../../api/UserListRequest';
import defaultUser from "../../../assets/icons/defaultUser.jpeg"
import User from './User';
import { fetchFollowing } from '../../../actions/UserActions';

function UserSuggestion() {
    const [modalOpened, setModalOpened] = useState(false);
    const  user  = useSelector((state) => state.authReducer.authData);
    const [people, setPeople] = useState([]);
    const dispatch=useDispatch()
  


    useEffect(()=>{
        const fetchPersons = async () => {
            const { data } = await FetchUsers();
            setPeople(data);
          };
          fetchPersons();   

          const fetchFollowingUsers = async ()=>{
           dispatch(fetchFollowing(user._id))
          }
          fetchFollowingUsers()
         },[])

  return (
      
<div className="w-full my-5 max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">You may Know</h5>
        {/* <a  className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
            View all
        </a> */}
   </div>
   <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
       {
           
       people.users?.map((person,id)=>{
         if(person._id!== user._id){
            return(
           <User person={person} key={id}/>
            )
}})}

       
        </ul>
        <span onClick={() => setModalOpened(true)}>Show more</span>

   </div>
   
</div>

  )
}

export default UserSuggestion
