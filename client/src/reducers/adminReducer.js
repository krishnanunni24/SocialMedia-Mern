const adminReducer = (
  state = { reportedPosts: null, loading: false, error: null, users: null },
  action
) => {
  switch (action.type) {
    case "FETCH_REPORTS_STARTED":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_REPORTS_SUCCESS":
      return {
        ...state,
        loading: false,
        reportedPosts: action.data,
      };
    case "FETCH_REPORTS_FAIL":
      return {
        ...state,
        loading: false,
        reportedPosts: null,
        error: true,
      };

    case "FETCH_USERS_START":
      return { ...state, loading: true, error: null };
    case "FETCH_USERS_SUCCESS":
      return { ...state, users: action.users, loading: false, error: null };
    case "FETCH_USERS_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "BLOCK_USER_START":
      return { ...state, loading: true, error: null };
    case "BLOCK_USER_SUCCESS":
      const updatedUsers = state.users.map((user) =>
        user._id === action.user._id
          ? { ...user, isBlocked: action.user.isBlocked }
          : user
      );
      return { ...state, users: updatedUsers, loading: false, error: null };
    case "BLOCK_USER_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "ADMIN_LOG_OUT":
      return {
        ...state,
        reportedPosts: null,
        error: null,
        users: null,
      };
    default:
      return state;
  }
};

export default adminReducer;
