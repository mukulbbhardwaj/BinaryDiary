import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./pages/Home";
import Write from "./components/blog/Write";
import Edit from "./components/blog/Edit";
import Main from "./components/blog/post/Main";
import UserProfile from "./components/profile/UserProfile";
import PrivateRoutes from "./utils/PrivateRoutes";
import { AuthProvider } from "./utils/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post/:postId" element={<Main />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/write" element={<Write />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/edit/:postId" element={<Edit />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
