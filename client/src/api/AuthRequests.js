import { API } from "./ApiConfig";

export const logIn= (formData)=> API.post('/auth/login',formData);

export const adminLogin=(formData)=>API.post("/admin/login",formData);

export const signUp = (formData) => API.post('/auth/register', formData)

export const googleLogin = (data) => API.post("/auth/google/login",data)

export const googleSignUp = (formData) =>API.post("/auth/google/signup",formData)