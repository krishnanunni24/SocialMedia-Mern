const postReducer = (
  state = { posts: null, loading: false, error: false, uploading: false ,likedPosts:null, },
  action
) => {
  switch (action.type) {
    // belongs to PostShare.jsx
    case "UPLOAD_START":
      return { ...state, error: false, uploading: true };
    case "UPLOAD_SUCCESS":
      if (state.posts) {
        return {
          ...state,
          error: false,
          uploading: false,
          posts: [action.data,...state.posts],
        };
      } else {
        return {
          ...state,
          error: false,
          uploading: false,
          posts: [action.data],
        };
      }
    case "UPLOAD_FAIL":
      return { ...state, uploading: false, error: true };

    // belongs to Posts.jsx
    case "RETREIVING_START":
      return { ...state, loading: true, error: false };
    case "RETREIVING_SUCCESS":
      return { ...state, posts: action.data, loading: false, error: false };
    case "RETREIVING_FAIL":
      return { ...state, loading: false, error: true };

    //Posts.jsx fetching posts
    case "FETCH_POSTS_STARTED":
      return { ...state, loading: true, error: false };
    case "FETCH_POSTS_SUCCESS":
      if(state.posts?.length){
        const fetchedData = action.payload;
        const uniqueData = fetchedData.filter(post => {
          return !state.posts.some(existingPost => existingPost._id === post._id);
        });
        console.log(uniqueData,"uniqueData")
        return {
          ...state,
          posts: [...state.posts, ...uniqueData],
        }
        }else{
      return { ...state, loading: false, error: false, posts: action.payload };
      }
    case "FETCH_POSTS_FAILED":
      return { ...state, loading: false, error: true};

    case "DELETE_POST_STARTED":
      return { ...state, loading: true };

    case "DELETE_POST_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        posts: state.posts.filter((post) => post._id !== action.data),
      };

    case "FETCH_LIKED_STARTED":
      return { ...state, loading: true };

    case "FETCH_LIKED_SUCCESS":
      return { ...state, likedPosts: action.data, loading: false };

    case "FETCH_LIKED_FAILED":
      return { ...state, likedPosts: null, error: true, loading: false };

      case "LIKE_POST_SUCCESS":
        // Find the post with the matching ID and increment the like count
        const updatedLikePosts = state.posts.map((post) => {
          if (post._id === action.data) {
            return { ...post, likes: post.likes + 1 };
          }
          return post;
        });
      
        if (state.likedPosts) {
          return {
            ...state,
            likedPosts: [...state.likedPosts, action.data],
            posts: updatedLikePosts,
          };
        } else {
          return { ...state, likedPosts: [action.data], posts: updatedLikePosts };
         
        }
      
      case "UNLIKE_POST_SUCCESS":
        // Find the post with the matching ID and decrement the like count
        const updatedUnlikePosts = state.posts.map((post) => {
          if (post._id === action.data) {
            return { ...post, likes: post.likes - 1 };
          }
          return post;
        });
      
        return {
          ...state,
          likedPosts: state.likedPosts.filter((postId) => postId !== action.data),
          posts: updatedUnlikePosts,
        };
      
    case "LOG_OUT":
      return { ...state, loading: false, posts: null ,likedPosts:null };
    default:
      return state;
  }
};

export default postReducer;
