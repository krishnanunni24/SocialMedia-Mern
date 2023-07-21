import React from 'react'
import LikeButton from '../buttons/LikeButton'
import SaveButton from '../buttons/SaveButton'
import CommentButton from '../buttons/CommentButton'

function PostButtons({post,userId,handleCommentClick}) {
  return (
    <div className="flex items-center justify-between mx-2 mt-3 mb-2">
    <div className="flex gap-5 ">
       <LikeButton postId={post._id} userId={userId}/>
       <CommentButton post={post} userId={userId} handleClick={handleCommentClick}/>
      {/* <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path></svg> */}
    </div>
    <SaveButton post={post} userId={userId}/>
  </div>
  )
}

export default PostButtons
