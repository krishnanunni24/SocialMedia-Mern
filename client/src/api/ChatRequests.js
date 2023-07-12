import { API } from "./ApiConfig";

export const fetchChats = (userId) => API.get(`/chat/${userId}`)
export const fetchMessages = (receiverId , userId) => API.get(`/chat/${receiverId}/${userId}`)
export const createMessage = (data)=>API.post(`chat/message`,data)