import { API } from "./ApiConfig";



export const FetchFollowing= (id)=> API.get(`/user/${id}/following`);
export const followUser = (id,data)=> API.put(`/user/${id}/follow/${data}`)
export const unfollowUser = (id, data)=> API.put(`/user/${id}/unfollow/${data}`)
export const FetchPosts=(id,page)=>API.get(`/user/${id}/posts/${page}`)
export const FetchUserPosts =(id)=>API.get(`/user/${id}/userPosts`)
export const FetchSaved=(id)=>API.get(`/user/${id}/saved`)
export const FetchLiked=(id)=>API.get(`/user/${id}/LikedPosts`)

export const DeletePost=(postId,userId)=>API.delete(`/user/${userId}/${postId}/delete`)
export const SavePost=(data)=>API.post(`/user/saved`,data)
export const LikePost=(data)=>API.post(`/user/Liked`,data)
