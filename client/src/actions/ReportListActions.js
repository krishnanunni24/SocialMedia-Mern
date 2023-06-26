import { toast } from "react-toastify"
import * as ReportApI from "../api/ReportListRequest"

export const fetchReportedPosts = () =>async(dispatch)=>{
 dispatch({type:"FETCH_REPORTS_STARTED"})
 try{
let response=await ReportApI.FetchReportedPosts()
if(response.data?.reports){
   dispatch({type:"FETCH_REPORTS_SUCCESS",data:response.data.reports})
}
 }catch(err){
    console.log(err)
   dispatch({type:"FETCH_REPORTS_FAIL"})
 }
}

export const unListPostAdmin =(id) =>async(dispatch)=>{
try{
let response = await ReportApI.AdminUnListPost(id)
console.log(response,"response")
dispatch({type:"REPORT_POST_UNLISTED"},{data:id})
if(response.data.unlisted){
toast.warning("unlisted success fully")
}else{
toast.success("Listed successfully")
}

}catch(err){
 console.log(err)
}
}