import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReportedPosts } from "../../../actions/ReportListActions";
import ReportedPostModal from "./ReportedPostModal";
function ReportsList() {
  const dispatch = useDispatch();
  const [report,setReport]=useState(null)
  const reports = useSelector((state) => state.adminReducer.reportedPosts);
  useEffect(() => {
    dispatch(fetchReportedPosts());
  }, []);
  const [openModal,setOpenModal]=useState(false)
  const handleOnclick=(report)=>{
    setOpenModal(true)
    setReport(report)
    console.log(report)
  }
  const handleOnClose = ()=>{
    console.log("in handleonclose")
    setOpenModal(false)
  }
  
  return (
    <div className="w-full">
      <div className="container my-12 mx-auto px-4 md:px-12">
        <h1 className="text-lg  font-semibold">Reported Posts</h1>
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {reports?.map((report, id) => (
            <div
              key={id}
              className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
            >
              <div  onClick={()=>{
                handleOnclick(report)
              }} className="flex relative sm:w-auto justify-center h-64 sm  :h-52 rounded-lg shadow-lg  overflow-hidden">
                <img
                  src={report.postId?.image}
                  className="w-full  hover:scale-125 transition-all duration-500 cursor-pointer"
                  alt="Reported Post"
                />
               
              </div>
            </div>
          ))}
          <ReportedPostModal openModal={openModal} handleOnClose={handleOnClose} report={report}/>
        </div>
      </div>
    </div>
  );
}

export default ReportsList;
