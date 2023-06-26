import { toast } from "react-toastify";
import * as AuthApi from "../api/AuthRequests"
import setAuthToken from "../utils/setAuthToken";

export const signUp = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {console.log(formData,"form")
  let response;
    if(formData.googleData){
     response = await AuthApi.googleSignUp(formData)
    }else{
    response = await AuthApi.signUp(formData); 
    }
      const { user, token } = response.data;
      // Store the token in the client-side storage
      localStorage.setItem('token', token);
      
      // Set the token in the Axios headers for subsequent requests
      setAuthToken(token);
      
      dispatch({ type: "AUTH_SUCCESS", data: user });
      navigate("/");
  } catch (error) {
    console.error(error);
    if (error.response && (error.response.data.username || error.response.data.phone || error.response.data.email)) {
      dispatch({ type: "AUTH_CREDENTIAL_EXISTS", exists: error.response.data });
    } else if (error.response && error.response.data.authFail) {
      dispatch({ type:   "AUTH_FAIL", authFail: true });
    }
  }
};

export const logIn = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    console.log(formData,"data")
    let response;
    if(formData.uid){
    response = await AuthApi.googleLogin(formData)
    }else{
      response = await AuthApi.logIn(formData);
    }
    const { user, token } = response.data;
     console.log("token",token)
    // Store the token in the client-side storage
    localStorage.setItem('token', token);

    // Set the token in the Axios headers for subsequent requests
    setAuthToken(token);
    
    dispatch({ type: "AUTH_SUCCESS", data: user });
    navigate("/");
  } catch (error) {
    console.error(error)
    if (error.response && error.response.data?.blocked) {
      dispatch({ type: "AUTH_FAIL_BLOCKED" });
    } else {
      dispatch({ type: "AUTH_FAIL" });
    }
  }
};

  export const adminLogin = (formData,navigate)=> async(dispatch)=>{
    dispatch({ type: "AUTH_START" });
  try {
    const response = await AuthApi.adminLogin(formData);
    const { admin, token } = response.data;

    // Store the token in the client-side storage
    localStorage.setItem('token', token);

    console.log("token",token)
    // Set the token in the Axios headers for subsequent requests
    setAuthToken(token);
    admin.admin=true;
    dispatch({ type: "AUTH_SUCCESS", data: admin });
    navigate("/dashboard");
    console.log("success")
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAIL" });
  }
  }

  export const logout = () => async (dispatch) => {
    try {
      // Clear the token from the client-side storage
      const token = localStorage.getItem('token')
      if(token){
        localStorage.removeItem('token');
      }
      setAuthToken(null);
      // Clear the authorization header in Axios
      dispatch({ type: "LOG_OUT", user: true });
      toast.warn("Logged out");
    } catch (error) {
      console.error(error.message);
    }
  };
  
  export const adminLogout = () => async (dispatch) => {
    try {
      // Clear the token from the client-side storage
      localStorage.removeItem('token');
  
      // Clear the authorization header in Axios
      setAuthToken(null);
  
      dispatch({ type: "ADMIN_LOG_OUT", admin: true });
    } catch (error) {
      console.log(error);
    }
  };
  

  export const loginWithGoogle =()=> async(dispatch)=>{
    // try{
    //  const data = await 
    // }catch(err){
    //  console.error(err)
    // }
  }
  