import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePost } from '../../../actions/UserActions';

function SaveButton({ post, userId }) {
  const savedPosts = useSelector((state) => state.userReducer.savedPosts);
  const isPostSaved = savedPosts?.some((savedPost) => savedPost._id === post._id);
  const [saveButton, setSaveButton] = useState(!isPostSaved);

  const dispatch = useDispatch();

  const handleClick = () => {
    const data = { userId, post };
    dispatch(savePost(data));
    setSaveButton(!saveButton);
  };

  return (
    <button>
      {saveButton ? (
        <svg onClick={handleClick} fill="#262626" height="24" viewBox="0 0 48 48" width="24">
          <path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path>
        </svg>
      ) : (
        // black
        <svg onClick={handleClick} width="24" height="24" className="fill-current">
          <path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z"></path>
        </svg>
      )}
    </button>
  );
}

export default SaveButton;
