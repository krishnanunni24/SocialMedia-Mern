import { API } from "./ApiConfig";


export const postReport=(data)=>API.post("/upload/PostReport",data)
export const postComment=(data)=>API.post("/upload/comment",data)
export const fetchComments=(postId)=>API.get(`user/${postId}/comments`)
export const FetchReplies=(Id)=>API.get(`user/${Id}/replies`)