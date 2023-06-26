// authMiddleware.js

import { logout } from "../actions/AuthActions"; // Replace with the actual path to your logout action file
import { useNavigate } from "react-router-dom";
const excludedRoutes = ['/auth',"/"]; // Routes to exclude from triggering logout
const authMiddleware = (store) => (next) => (action) => {
  const  token  = localStorage.getItem("token"); // Replace 'auth' with the actual name of your authentication reducer

  // Get the current route from the window location
  const currentRoute = window.location.pathname;

  // Check if the current route matches any of the excluded routes
  const isExcludedRoute = excludedRoutes.includes(currentRoute);

  if (!isExcludedRoute && !token) {
    // Dispatch the logout action if the token is empty and the route is not excluded
    store.dispatch(logout());
  }
  
  next(action);
};

export default authMiddleware;
