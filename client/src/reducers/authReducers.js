const authReducer = (
  state = {
    adminAuthData: null,
    usernameExists: false,
    emailExists: false,
    phoneExists: false,
    authData: null,
    loading: false,
    error: false,
    updateLoading: false,
    blocked: false,
  },
  action
) => {
  switch (action.type) {
    case "AUTH_START":
      return {
        ...state,
        loading: true,
        error: false,
        usernameExists: false,
        phoneExists: false,
        emailExists: false,
        authFail: false,
      };
    case "AUTH_SUCCESS":
      if (action.data?.admin) {
        return {
          ...state,
          adminAuthData: action.data,
          loading: false,
          error: false,
          blocked: false,
        };
      } else {
        console.log(action.data)
        return {
          ...state,
          authData: action.data,
          loading: false,
          error: false,
          blocked: false,
        };
      }
    case "AUTH_CREDENTIAL_EXISTS":
      if (action.exists?.username) {
        return {
          ...state,
          usernameExists: true,
          phoneExists: false,
          emailExists: false,
        };
      } else if (action.exists?.email) {
        return {
          ...state,
          usernameExists: false,
          phoneExists: false,
          emailExists: true,
        };
      } else if (action.exists?.phone) {
        return {
          ...state,
          usernameExists: false,
          phoneExists: true,
          emailExists: false,
        };
      }

    case "AUTH_FAIL":
      return {
        ...state,
        loading: false,
        authFail: true,
        blocked: false,
        usernameExists: false,
        phoneExists: false,
        emailExists: false,
      };

    case "AUTH_FAIL_BLOCKED":
      return {
        ...state,
        loading: false,
        error: false,
        blocked: true,
        usernameExists: false,
        phoneExists: false,
        emailExists: false,
      };

    case "LOG_OUT":
      return {
        ...state,
        authData: null,
        loading: false,
        error: false,
        updateLoading: false,
        blocked: false,
      };

    case "ADMIN_LOG_OUT":
      return {
        ...state,
        adminAuthData: null,
        loading: false,
        error: false,
        updateLoading: false,
        blocked: false,
      };

    case "UNFOLLOW_USER":
      const updatedAuthDataUnfollow = { ...state.authData};
      updatedAuthDataUnfollow.following += -1;
      return {
        ...state,
        loading: false,
        error: false,
        authData: updatedAuthDataUnfollow,
      };

      case "UPLOAD_SUCCESS" :
        const updatedAuthPostData = {...state.authData}
        updatedAuthPostData.posts += 1;
        return{
          ...state,
          loading:false,
          error:false,
          authData:updatedAuthPostData
        }

        case "DELETE_POST_SUCCESS" :
          const updatedAuthData = {...state.authData}
          updatedAuthData.posts += -1
          return {
            ...state,
          loading: false,
          error: false,
          authData: updatedAuthData,
          }
  
      // case "REPORT_POST_DELETED" :
      //   const updatedAuthData = {...state.authData}
      //   updatedAuthData.posts += -1
      //   return {
      //     ...state,
      //   loading: false,
      //   error: false,
      //   authData: updatedAuthData,
      //   }

    case "FOLLOW_USER":
      const updatedAuthDataFollow = { ...state.authData };
      updatedAuthDataFollow.following += 1;
      console.log(updatedAuthDataFollow);
      return {
        ...state,
        adminAuthData: null,
        loading: false,
        error: false,
        authData: updatedAuthDataFollow,
      };
      
      case "UPDATE_PROFILE_STARTED":
        return {
          ...state,
          loading: true,
        };

      case "UPDATE_PROFILE_SUCCESS":
        console.log(action.data)
        return {
          ...state,
          usernameExists: false,
          phoneExists: false,
          emailExists: false,
          loading: false,
          error: false,
          authData: action.data,
        };

        case "UPDATE_PROFILE_FAILED":
        return {
          ...state,
          loading: false,
          error: true,
        };

    default:
      return state;
  }
};

export default authReducer;
