import React, { useEffect, useState } from "react";
import { Modal, Group, Button } from "@mantine/core";
import { AiOutlineAlert, AiOutlineClose, AiOutlineCloseCircle, AiOutlineComment, AiOutlineDelete, AiOutlineHeart } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";
import { Blockquote } from "@mantine/core";
import DropdownUsers from "./DropDownUsers";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { unListPostAdmin } from "../../../actions/ReportListActions";
import { toast } from "react-toastify";
import { BsCheck2All } from "react-icons/bs";

function ReportedPostModal({ handleOnClose, openModal, report }) {
const dispatch = useDispatch()
  const [unlist,setUnlist]=useState(report?.postId?.unlisted)
  useEffect(() => {
    if (report && report.postId && report.postId.unlisted !== undefined) {
      setUnlist(report.postId.unlisted);
    }
  }, [report]);

  console.log("unlist", unlist);
console.log(report?.postId.unlisted)

const handleReportSubmit = (report) => {
  dispatch((unListPostAdmin(report.postId._id,report._id)))
  setUnlist(!unlist)
  };

  
 

  return (
    <Modal opened={openModal} onClose={handleOnClose} centered size="lg">

      <div className="flex">
        <div className="flex-1 bg-white p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <DropdownUsers  users={report?.reporters} />
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-sm">
                {report?.userId.username}
              </span>
              <img
                className="w-10 h-10 rounded-full ml-2"
                src={report?.userId.profilePicture}
                alt="Profile Picture"
              />
            </div>
          </div>
          <div className="flex justify-center max-h-80">
            <img
              className="w-auto h-auto object-cover mb-4"
              src={report?.postId.image}
              alt="Post Image"
            />
          </div>
          <div className="flex">
          <div className="flex-1 flex gap-10 mt-4">
            <div>
              <span className="flex-col justify-center">
                <span className="flex justify-center">
                  <AiOutlineHeart size={25}/>
                </span>
                <span className="hidden sm:block font-medium text-sm">
                  {report?.postId.likes} likes
                </span>
              </span>
            </div>

            <div>
              <span className="flex-col">
                <span className="flex justify-center">
                  <AiOutlineComment size={25}/>
                </span>
                <span className="hidden sm:block font-medium text-sm">
                  {report?.postId.comments} comments
                </span>
              </span>
            </div>

            <div>
              <span className="flex-col">
                <span className="flex justify-center">
                  <FiShare2 size={25} />
                </span>
                <span className="hidden sm:block font-medium text-sm">
                  {report?.postId.shares} shares
                </span>
              </span>
            </div>

          </div>
            <div className="flex justify-end items-center py-3">
            <Link onClick={()=>{handleReportSubmit(report)}} className="flex-col">
                <span className="flex justify-center">
                {unlist ? <BsCheck2All color="green" size={25}/> :(<AiOutlineCloseCircle color="red" size={25} />)}
 
                </span>
                <span  className="hidden sm:block font-medium text-sm">
                {unlist ? "List Post" : "Unlist Post"}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ReportedPostModal;
