import { Modal } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import PostOption from "./postOptionModal";
import { useSelector } from "react-redux";
import PostButtons from "./PostButtons";
import { fetchComments, postComment } from "../../../api/PostRequests";
import Comments from "../comment/Comments";
import { io } from "socket.io-client";

function PostModal({ openModal, handleOnClose, post, user }) {
  const [comment, setComment] = useState("");
  const [commentsArr, setCommentsArr] = useState([]);
  const userId = useSelector((state) => state.authReducer.authData._id);
  const currentUser = useSelector((state) => state.authReducer.authData);
  const isUser = currentUser?._id === post?.userId;
  const [recievedComment, setReceivedComment] = useState(null);
  const socket = useRef();

  useEffect(() => {
    if (post) {
      socket.current = io("ws://localhost:8800");
      socket.current.emit("join-post-group", post._id);
      FetchComments(post._id);
    }
  }, [post]);

  useEffect(() => {
    socket.current &&
      socket.current.on("receive-comment", (data) => {
        setReceivedComment(data);
        console.log("received a new comment :", data);
      });
  }, [socket]);

  useEffect(()=>{
   if(!recievedComment)return;
   if(commentsArr.length >0){
    setCommentsArr([recievedComment,...commentsArr])
   }else{
    setCommentsArr([recievedComment])
   }
  },[recievedComment])

  useEffect(() => {
    console.log("comments:", commentsArr);
  }, [commentsArr]);

  const FetchComments = async (postId) => {
    try {
      const { data } = await fetchComments(postId);
      console.log("fetchedComments:", data);
      if (data?.data.length) {
        setCommentsArr(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    if (!comment || comment === "") return;
    const Data = {
      userId,
      postId: post._id,
      comment,
    };
    try {
      const { data } = await postComment(Data);
      console.log("postedNewComment", data);
      socket.current.emit("post-comment", data);
      if (commentsArr.length > 0) {
        setCommentsArr((prevData) => [...prevData, data.data]);
      } else {
        setCommentsArr([data.data]);
      }
      setComment("");
    } catch (err) {
      console.error(err);
    }
  };

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
                  src={
                    !isUser ? user?.profilePicture : currentUser?.profilePicture
                  }
                  alt="https://source.unsplash.com/150x150/?portrait?3"
                  className="mx-auto mt-2 h-10 w-10 rounded-full bg-gray-300"
                />
              </span>
              {!isUser ? user?.username : currentUser?.username}
            </div>

            <PostOption
              postId={post?._id}
              postedUser={post?.userId}
              onClose={handleOnClose}
            />
          </div>

          {/* comments */}
          <div className="h-60 flex-col overflow-auto">
            <div className="relative space-y-3 border-t border-gray-100 p-2.5 font-normal dark:border-slate-700/40 sm:p-4">
              {commentsArr.length > 0 &&
                commentsArr.map((comment, key) => {
                  return <Comments comment={comment} key={key} />;
                })}
            </div>
          </div>

          {/* like comment save */}
          <div className="flex-col justify-end">
            <div className="flex-col border-y px-3 py-2">
              <PostButtons post={post} userId={userId} />
              <div className="mx-2 text-xs font-medium">
                {post?.likes} Likes
              </div>
            </div>
            {/* add comment input */}
            <div className="flex justify-between px-2">
              <input
                className="peer  font-normal text-gray-900 focus:outline-none"
                type="text"
                placeholder="Add a Comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                onClick={handleSubmit}
                className="rounded-lg px-1 py-2 font-semibold text-accent hover:bg-slate-100"
              >
                post
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default PostModal;
