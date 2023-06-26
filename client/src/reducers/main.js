import { combineReducers } from "redux";

import authReducer from "./authReducers";
import postReducer from "./postReducers";
import userReducer from "./userReducers";
import adminReducer from "./adminReducer";

export const reducers = combineReducers({adminReducer,authReducer,userReducer,postReducer})