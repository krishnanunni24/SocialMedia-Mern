import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserPosts } from '../../../actions/UserActions'
import ListPosts from '../postList/ListPosts'

function UserPosts() {
    const dispatch = useDispatch()
    const user=useSelector((state)=>state.authReducer.authData) 
    const posts = useSelector((state)=>state.userReducer.userPosts)
    useEffect(()=>{
    dispatch(fetchUserPosts(user._id))
    },[])

  return (
    <>
    
     <span className='flex justify-center py-3 font-semibold from-accent'>Posts</span>
    <div className='p-4'>

        <ListPosts Posts={posts}/>
    </div>

    </>
)

}

export default UserPosts
