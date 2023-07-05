const userReducer = (
  state = {
    following: null,
    followingLoading: false,
    followingError: null,

    loading: false,
    error: null,

    savedPosts: null,
    userPosts: null,
    userData:null,
  },
  action
) => {
  switch (action.type) {
    case "FETCH_FOLLOWING_START":
      return { ...state, followingLoading: true, followingError: null };
    case "FETCH_FOLLOWING_SUCCESS":
      return { ...state, following: action.payload, followingLoading: false };
    case "FETCH_FOLLOWING_EMPTY":
      return { ...state, following: [] };
    case "FOLLOW_USER":
      return { ...state, following: [...state.following, action.payload] };
    case "LOG_OUT":
      return {
        ...state,
        following: null,
        followingLoading: false,
        followingError: false,
        savedPosts:null,
        userPosts:null
      };
    case "UNFOLLOW_USER":
      return {
        ...state,
        following: state.following.filter((userId) => userId !== action.payload),
      };
    case "FETCH_SAVED_STARTED":
      return { ...state, loading: true, error: null };

    case "FETCH_SAVED_SUCCESS":
      return { ...state, savedPosts: action.data, loading: false };

    case "FETCH_SAVED_FAILED":
      return { ...state, savedPosts: null, error: true, loading: false };


    case "SAVE_POST_SUCCESS":
      if (state.savedPosts) {
        return { ...state, savedPosts: [...state.savedPosts, action.data] };
      } else {
        return { ...state, savedPosts: [action.data] };
      }

    case "UNSAVE_POST_SUCCESS":
      return {
        ...state,
        savedPosts: state.savedPosts.filter((post) => post._id !== action.data),
      };

  
      case "DELETE_POST_SUCCESS":
        return {
          ...state,
          userPosts: state.userPosts?.filter((post) => post._id !== action.data),
        };

    case "FETCH_USER_POSTS_STARTED":
      return { ...state, userPostsLoading: true, userPostsError: null };

    case "FETCH_USER_POSTS_SUCCESS":
      return { ...state, userPosts: action.data, userPostsLoading: false };

    case "FETCH_USER_POSTS_FAILED":
      return { ...state, userPosts: null, userPostsError: true, userPostsLoading: false };



     case "FETCH_USER_STARTED" :
     return {...state,loading:true,userData:null} 
     case "FETCH_USER_SUCCESS" :
      return {...state,loading:false,userData:action.payload}
     case "FETCH_USER_FAILED" :
      return {...state,loading:false,error:true}
    default:
      return state;
  }
};

export default userReducer;
