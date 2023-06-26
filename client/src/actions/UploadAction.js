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

