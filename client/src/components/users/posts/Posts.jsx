import React, { useEffect, useRef, useState } from "react";
import PostOptionModal from "./postOptionModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchSaved } from "../../../actions/UserActions";
import { toast } from "react-toastify";
import { fetchLikedPosts } from "../../../actions/PostActions";
import PostButtons from "./PostButtons";
import PostImage from "../Img/PostImage";
import useThrowAsyncError from "../../../hooks/useThrowAsyncError";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PostModal from "./PostModal";
import { Link } from "react-router-dom";

const Posts = () => {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(null);
  const posts = useSelector((state) => state.postReducer.posts);
  const uploading = useSelector((state) => state.postReducer.uploading);
  const userId = useSelector((state) => state.authReducer.authData._id);

  const [openPostModal,setOpenPostModal]=useState(false)
  const [postInfo,setPostInfo]=useState(null)

  const handleCommentClick=(post)=>{ 
      setOpenPostModal(true)
      setPostInfo(post)
  }

  const handleOnModalClose=()=>{
    setOpenPostModal(false)
   }
  


  const [page, setPage] = useState(0);

  const throwAsyncErr = useThrowAsyncError();
  const handleOnClose = () => {
    setSelectedItem(false);
  };

  const handleOptionClick = (post) => {
    selectedItem ? setSelectedItem(null) : setSelectedItem(post._id);
  };

  // intersection observer for infinite scroll
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          dispatch(fetchPosts(userId, page))
            .then(() => {
              setPage((prevPage) => prevPage + 1);
            })
            .catch((err) => {
              throwAsyncErr(err);
            });
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, page]);

  useEffect(() => {
    dispatch(fetchPosts(userId, page))
      .then(() => {
        setPage((prevPage) => prevPage + 1);
      })
      .catch((err) => {
        throwAsyncErr(err);
      });
    dispatch(fetchSaved(userId))
      .then()
      .catch((err) => {
        throwAsyncErr(err);
      });
    dispatch(fetchLikedPosts(userId))
      .then()
      .catch((err) => {
        throwAsyncErr(err);
      });
  }, []);

  useEffect(() => {
    if (uploading) {
      toast.info("Uploading post...");
    }
  }, [uploading]);

  return (
    <div className="w-full pt-7 md:w-1/2 md:px-10 lg:pt-20">
      {posts?.map(
        (post, id) =>
          !post.unlisted && (
            <div
              key={id}
              className="relative mt-5 rounded-md bg-white shadow-md"
            >
              <div className="flex justify-between px-2 py-2">
                <Link className="flex items-center justify-center gap-2 font-semibold text-black"
                            to={`/profile/${post.userId}`}

                >
                 
                  <span>
                    {(
                      <img
                        src={post.user.profilePicture}
                        alt="https://source.unsplash.com/150x150/?portrait?3"
                        className="mx-auto mt-2 h-10 w-10 rounded-full bg-gray-300"
                      />
                    ) || <Skeleton />}
                  </span>

                  {post.user.username || <Skeleton />}
                </Link>
                <PostOptionModal
                  setSelectedItem={setSelectedItem}
                  postId={post._id}
                  postedUser={post.userId}
                  onClose={handleOnClose}
                />
              </div>

              <PostImage image={post.image} />
              <PostButtons post={post} userId={userId}  handleCommentClick={handleCommentClick}/>
              <div className="flex items-center">
                <span className="mx-2 text-sm font-semibold">
                  {post.user.username}
                </span>
                <span className="font-normal">{post.caption}</span>
              </div>

              <div className="mx-2 text-sm font-semibold">
                {post.likes} likes
              </div>
            </div>
          )
      )}
      <PostModal openModal={openPostModal} handleOnClose={handleOnModalClose} user={postInfo?.user} post={postInfo}/>
      <div ref={observerTarget}></div>
    </div>
  );
};

export default Posts;
