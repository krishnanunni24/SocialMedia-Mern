import { toast } from "react-toastify";
import * as UploadApi from "../api/UploadRequest";


export const uploadPost = (data) => async (dispatch) => {
  try {
    console.log("Image upload Action started")
    dispatch({ type: "UPLOAD_START" });
   const newPost= await UploadApi.uploadPost(data);   
   
   dispatch({ type: "UPLOAD_SUCCESS", data: newPost.data.newPost });
   toast.success("Posted SuccessFully")
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPLOAD_FAIL" });
  }
};


export const updateProfile = (Data,userId) => async (dispatch) => {
  dispatch({type:"UPDATE_PROFILE_STARTED"})
  try{
   const response = await UploadApi.updateUserData(Data,userId)
 if(response){
  console.log(response.data.userUpdated)
  dispatch({type:"UPDATE_PROFILE_SUCCESS",data:response.data.userUpdated})
 }
  }catch(error){
    console.error(error)
    if (error.response && (error.response.data.username || error.response.data.email)) {
      dispatch({ type: "AUTH_CREDENTIAL_EXISTS", exists: error.response.data });
    } else {
      dispatch({ type:   "UPDATE_PROFILE_FAILED"});
    }
  }
}
