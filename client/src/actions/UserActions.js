import { toast } from "react-toastify";
import * as UserApi from "./../api/UserRequests";

export const fetchFollowing = (id) => async (dispatch) => {
  dispatch({ type: "FETCH_FOLLOWING_START" });
  try {
    const data = await UserApi.FetchFollowing(id);
    if (data.data.followingNill) {
      dispatch({ type: "FETCH_FOLLOWING_EMPTY" });
    } else {
      dispatch({
        type: "FETCH_FOLLOWING_SUCCESS",
        payload: data.data.user.following,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const followUser = (userId, followingUserId) => async (dispatch) => {
  UserApi.followUser(userId, followingUserId);
  dispatch({ type: "FOLLOW_USER", payload: followingUserId });
};

export const unfollowUser = (userId, unFollowingUserId) => async (dispatch) => {
  UserApi.unfollowUser(userId, unFollowingUserId);
  dispatch({ type: "UNFOLLOW_USER", payload: unFollowingUserId });
};

export const fetchPosts = (userId,page) => async (dispatch) => {
  dispatch({ type: "FETCH_POSTS_STARTED" });
  try {
    let response = await UserApi.FetchPosts(userId,page);
    if (response.data.postsWithUserDetails?.length) {
      dispatch({
        type: "FETCH_POSTS_SUCCESS",
        payload: response.data.postsWithUserDetails,
      });
    }
  } catch (err) {
    dispatch({ type: "FETCH_POSTS_FAILED" ,})
      if(err.response?.data?.expired){
        localStorage.clear()
      }

    throw err;
  }
};

export const fetchSaved = (userId) => async (dispatch) => {
  dispatch({ type: "FETCH_SAVED_STARTED" });
  try {
    let response = await UserApi.FetchSaved(userId);
    dispatch({ type: "FETCH_SAVED_SUCCESS",data:response.data?.posts });

  } catch (err) {
    dispatch({ type: "FETCH_SAVED_FAILED" });
    throw err;
  }
};
export const fetchUserPosts = (userId)=> async (dispatch) => {
  dispatch({type:"FETCH_USER_POSTS_STARTED"})
  try{
   let response = await UserApi.FetchUserPosts(userId)
   if(response.data.empty){
   dispatch({type:"FETCH_USER_POSTS_SUCCESS",data:[]})
  }else{
    dispatch({type:"FETCH_USER_POSTS_SUCCESS",data:response.data?.userPosts})
  }
  }catch(err){
    console.error(err)
  }
}

export const deletePost = (postId, userId) => async (dispatch) => {
  try {
    let response = await UserApi.DeletePost(postId, userId);
    if (response) {
      dispatch({ type: "DELETE_POST_SUCCESS", data: postId });
    }
    toast.success("Post Deleted successfully");
  } catch (err) {
    console.error(err);
  }
};


export const likePost = (data) => async (dispatch) => {
  try {
    const response = await UserApi.LikePost(data);
    if(response.data?.Liked){
        dispatch({type:"LIKE_POST_SUCCESS",data:data.postId})
    }else{
        console.log(data.postId,"postId")

        dispatch({type:"UNLIKE_POST_SUCCESS",data:data.postId})
    }
  } catch (err) {
    console.error(err);
  }
};

export const savePost = (data) => async (dispatch) => {
   const Data = {postId:data.post._id,userId:data.userId}
  try {
    const response = await UserApi.SavePost(Data);
    if(response.data?.saved){
        dispatch({type:"SAVE_POST_SUCCESS",data:data.post})
    }else{

        dispatch({type:"UNSAVE_POST_SUCCESS",data:Data.postId})
    }
  } catch (err) {
    console.error(err);
  }
};

export const fetchUser = (userId) => async (dispatch) => {
  console.log("fetching users")
  dispatch({type:"FETCH_USER_STARTED"})
  try{
    const response = await UserApi.FetchUser(userId)
    const data = response.data.data
    if (data)
    dispatch({type:"FETCH_USER_SUCCESS",payload:data})
    return data
  }catch(err){
    dispatch({type:"FETCH_USER_FAILED"})
    console.error(err)
  }
}

export const sendMessage =(data)=> async (dispatch)=>{
  try{
  const response = await UserApi.SendMessage(data)
  console.log(response)
  }catch(err){
  console.error(err)

  }
}

