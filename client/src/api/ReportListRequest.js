import { API } from "./ApiConfig";

export const FetchReportedPosts =()=>  API.get("/admin/reportedPosts")
export const AdminUnListPost =(id)=>  API.patch(`/admin/${id}/reportAction`)