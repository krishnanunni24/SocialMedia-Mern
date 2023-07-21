import React from "react";
import { Link } from "react-router-dom";

function Comments({ comment }) {
  return (
    <>
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
          <span className="text-sm mx-2">{comment.content}</span>
        </div>
      </div>
     {comment.replies?.length &&  (


      <div className="flex justify-center">
        <button
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
     )}
    </>
  );
}

export default Comments;
