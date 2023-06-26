import { API } from "./ApiConfig";



export const FetchUsers=()=>API.get("/admin/getAllUsers");

export const BlockUser =(id,blocked)=>API.put("/admin/block",{id,blocked});

