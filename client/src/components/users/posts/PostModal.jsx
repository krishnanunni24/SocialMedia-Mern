import { Modal } from "@mantine/core";
import React, { useState } from "react";
import PostOption from "./postOptionModal";
import LikeButton from "../buttons/LikeButton";
import SaveButton from "../buttons/SaveButton";
import { useSelector } from "react-redux";
import PostButtons from "./PostButtons";

function PostModal({ openModal, handleOnClose, post }) {
    const [comment,setComment]=useState("")
  const userId = useSelector((state)=>state.authReducer.authData._id)
  return (
    <Modal
      opened={openModal}
      onClose={handleOnClose}
      centered
      size="xl"
      withCloseButton={false}
      classNames={{
        body: "p-0", // Remove default padding
      }}
    >
      <div className="flex">
        <div className="flex-1 bg-white">
          <div className="h-full max-w-xl">
            <img
              src={post?.image}
              alt=""
              className="inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="flex-1 flex-col">
            {/* user & option */}
          <div className="flex justify-between border-b px-2 py-1">
            <div className="flex items-center justify-center gap-2 font-semibold text-black">
              <span>
                <img
                  src={post?.userId.profilePicture}
                  alt="https://source.unsplash.com/150x150/?portrait?3"
                  className="mx-auto mt-2 h-10 w-10 rounded-full bg-gray-300"
                />
              </span>
              {post?.userId.username}
            </div>

            <PostOption postId={post?._id} postedUser={post?.userId} onClose={handleOnClose} />
          </div>

            {/* comments */}
            <div className="flex-col h-44 overflow-auto">
             <p>helloooooooo</p>
             <p>helloooooooo</p>
             <p>helloooooooo</p>
             <p>helloooooooo</p>
             <p>helloooooooo</p>
             <p>helloooooooo</p>
             <p>helloooooooo</p>
             <p>helloooooooo</p>
             <p>helloooooooo</p>
             <p>helloooooooo</p>
             <p>helloooooooo</p>
             <p>helloooooooo</p>
             <p>helloooooooo</p>
             <p>helloooooooo</p>
             <p>helloooooooo</p>
             <p>helloooooooo</p>
             <p>helloooooooo</p>
            </div>
         
            {/* like comment save */}
            <div className="flex-col px-3 py-2 border-y">

           <PostButtons post={post} userId={userId}/>
      <div className="font-medium text-xs mx-2">
      {post?.likes} Likes
      </div>
            </div>
          {/* add comment input */}
          <div className="flex px-2 justify-between">
          <input
           className="peer  text-gray-900 focus:outline-none font-normal"
          type="text"
          placeholder="Add a Comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}/> 
          <button className="font-semibold text-accent hover:bg-slate-100 rounded-lg py-2 px-1">
            post
            </button>       
                      </div>
        </div>
      </div>
    </Modal>
  );
}

export default PostModal;
