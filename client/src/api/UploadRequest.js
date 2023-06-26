import { API } from "./ApiConfig";
const config = {
    headers:{
        "Content-Type":"multipart/form-data"
    }
}


export const uploadPost = (data) => API.post("/upload/",data,config);
