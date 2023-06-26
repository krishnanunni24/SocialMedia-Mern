import { API } from "./ApiConfig";


export const postReport=(data)=>API.post("/upload/PostReport",data)