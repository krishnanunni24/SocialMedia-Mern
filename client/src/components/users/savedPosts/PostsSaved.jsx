import React, { useEffect } from 'react'
import { fetchSaved } from '../../../actions/UserActions';
import { useDispatch, useSelector } from 'react-redux';
import ListPosts from '../postList/ListPosts';
import useThrowAsyncError from '../../../hooks/useThrowAsyncError';

function PostsSaved() {
  const dispatch = useDispatch();
  const userId=useSelector((state) => state.authReducer.authData._id);
  const savedPosts = useSelector((state) => state.userReducer.savedPosts);
  const throwAsyncErr = useThrowAsyncError()
  useEffect(() => {
    try{
      dispatch(fetchSaved(userId)).then().catch((err)=>{
        throwAsyncErr(err)
      });
    }catch(err){
      console.log("useeffect error",err )
     throwAsyncErr(err)
    }
  }, []);


  return (
    <div className="w-full mt-8">
    <div className="container my-12 mx-auto px-4 md:px-12">
      <h1 className="text-lg  font-semibold">Saved Posts</h1>
      <ListPosts Posts={savedPosts}/>
      
    </div>
  </div>
  )
}

export default PostsSaved
