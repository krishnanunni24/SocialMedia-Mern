import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./comment.css";
function Comments({ comment, onReplyClick, fetchReplies, replies }) {
  useEffect(()=>{
  console.log("replies:",replies)
  },[replies])
  return (
    <>
      <div>
        <div className="relative flex items-start gap-3">
          <Link to={`/profile/${comment.userId._id}`}>
            <img
              src={comment.userId.profilePicture}
              alt=""
              className="mt-1 h-6 w-6 rounded-full"
            />
          </Link>
          <div className="flex-1">
            <Link
              to={`/profile/${comment.userId._id}`}
              className="inline-block font-medium text-black dark:text-white"
            >
              {comment.userId.username}
            </Link>
            <div className="flex flex-col">
              <span className="comment-content mx-2 text-sm">
                {comment.content}
              </span>
              <button
                onClick={() => {
                  onReplyClick(comment);
                }}
                className="wordBreak m-0 mx-2 mt-1 w-min text-sm text-accent  hover:text-blue-400"
              >
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>
      {(comment.replies?.length && (
        <div className="flex justify-center">
          <button
            onClick={() => {
              fetchReplies(comment._id);
            }}
            type="button"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-500"
          >
            <ion-icon
              name="chevron-down-outline"
              className="md hydrated ml-auto duration-200 group-aria-expanded:rotate-180"
              role="img"
              aria-label="chevron down outline"
            ></ion-icon>
            ---view replies---
          </button>
        </div>
      )) ||
        ""}

      {replies && replies.replies.map((reply) => {
        return (
          <>
            <div className="flex items-end gap-2">
        
              <div className="flex justify-center items-center gap-1">
              
                <span className="comment-content flex justify-end items-center mx-2 text-sm">
                  {reply.content}
                </span>
                <Link
                  to={`/profile/${reply.userId._id}`}
                  className="inline-block font-medium text-black dark:text-white"
                >
                  {reply.userId.username}
                </Link>

               <Link to={`/profile/${reply.userId._id}`}>
                <img
                  src={reply.userId.profilePicture}
                  alt=""
                  className="mt-1 h-6 w-6 rounded-full"
                />
               </Link>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}

export default Comments;
