import React from "react";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./pages/Home";
import Write from "./components/blog/Write";
import { Route, Routes } from "react-router-dom";
import UserProfile from "./components/profile/UserProfile";
import PrivateRoutes from "./utils/PrivateRoutes";
import { AuthProvider } from "./utils/AuthContext";
import Post from "./components/blog/Post";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path= '/post/:postid' element={<Post />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/write" element={<Write />} />
            <Route path="/profile" element={<UserProfile />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
