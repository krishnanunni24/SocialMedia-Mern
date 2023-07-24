import { API } from "./ApiConfig";

export const fetchChats = (userId) => API.get(`/chat/${userId}`)
export const fetchMessages = (receiverId , userId) => API.get(`/chat/${receiverId}/${userId}`)
export const createMessage = (data)=>API.post(`chat/message`,data)
export const updateMessageStatus=(data)=>API.put("/chat/updateMessageStatus",data)
export const getChatNotification =(chatId,userId)=>API.get(`/chat/${userId}/notifications/${chatId}`)