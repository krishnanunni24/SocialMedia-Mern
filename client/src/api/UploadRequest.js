import { formToJSON } from "axios";
import { API } from "./ApiConfig";
const config = {
    headers:{
        "Content-Type":"multipart/form-data"
    }
}


export const uploadPost = (data) => API.post("/upload/",data,config);

export const updateUserData = (Data,userId) => API.put(`/user/${userId}/update`,Data)
