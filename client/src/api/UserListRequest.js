import { API } from "./ApiConfig";



export const FetchUsers=()=>API.get(`/admin/getUsers`);

export const BlockUser =(id,blocked)=>API.put("/admin/block",{id,blocked});

export const FetchNewUsersStats = ()=> API.get("/admin/fetchUsersStats")
export const FetchNewPostsStats = ()=> API.get("/admin/fetchPostsStats")
export const FetchNewLikesStats = ()=> API.get("/admin/fetchLikesStats")
export const FetchNewReportsStats = ()=> API.get("/admin/fetchReportsStats")

export const FetchNewUsersWeekly =() =>API.get("/admin/fetchNewUsersWeekly")
export const FetchNewPostsWeekly =() =>API.get("/admin/fetchNewPostsWeekly")


export const FetchTotal =() =>API.get("/admin/fetchTotal")

