import * as UserApi from "../api/UserListRequest";


export const getAllUsers =()=> async(dispatch)=>{
    dispatch({ type: "FETCH_USERS_START"});
    console.log("Getting all users...");
    try{
    const users= await UserApi.FetchUsers()
    if(users){
        dispatch({type:"FETCH_USERS_SUCCESS",users:users.data.users})
    }
    }catch(err){
   dispatch({type:"FETCH_USERS_FAIL"})
    throw err
    }
}



export const blockUser=(id,block)=>async(dispatch)=>{
    console.log("blocking user",id)
    dispatch({type:"BLOCK_USER_START"})
 try{
  const user=await UserApi.BlockUser(id,block)
  if(user){
      dispatch({type:"BLOCK_USER_SUCCESS",user})
  }
 }catch(err){
    dispatch({type:"BLOCK_USER_FAIL"})
  alert(err)
 }
}