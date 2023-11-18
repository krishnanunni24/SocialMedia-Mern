import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/user/Home/Home";
import Auth from "./pages/user/Auth/Auth";
import AdminLogin from "./pages/admin/Login/AdminLogin";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import ManageUsers from "./pages/admin/ManageUsers/ManageUsers";
import { useSelector } from "react-redux";
import Profile from "./pages/user/Profile/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReportedPosts from "./pages/admin/reportedPosts/ReportedPosts";
import SavedPosts from "./pages/user/SavedPosts/SavedPosts";
import ChatPage from "./pages/user/Chat/Chat";

function App() {
  const user = useSelector((state) => state.authReducer.authData);
  const token = localStorage.getItem("token");
  const admin = useSelector((state) => state.authReducer.adminAuthData);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={user && token ? <Home /> : <Navigate to="auth" />}
        />
        <Route
          path="/auth"
          element={user && token ? <Navigate to="../" /> : <Auth />}
        />
        <Route
          path="/profile/:userId"
          element={user && token ? <Profile /> : <Navigate to="../auth" />}
        />
        <Route
          path="/saved"
          element={user && token ? <SavedPosts /> : <Navigate to="../auth" />}
        />
        <Route
          path="/chat"
          element={user && token ? <ChatPage /> : <Navigate to="../auth" />}
        />

        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/dashboard"
          element={admin && token ? <Dashboard /> : <Navigate to="../admin" />}
        />
        <Route
          path="/users"
          element={
            admin && token ? <ManageUsers /> : <Navigate to="../admin" />
          }
        />
        <Route
          path="/reports"
          element={
            admin && token ? <ReportedPosts /> : <Navigate to="../admin" />
          }
        />
      </Routes>
      <ToastContainer hideProgressBar={true} autoClose={3000} />
    </>
  );
}

export default App;
