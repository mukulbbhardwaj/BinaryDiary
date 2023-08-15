import React from "react";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./pages/Home";
import Write from "./components/blog/Write";
import { Route, Routes } from "react-router-dom";
import UserProfile from "./components/profile/UserProfile";
import PrivateRoutes from "./utils/PrivateRoutes";
import { AuthProvider } from "./utils/AuthContext";
import Main from "./components/blog/post/Main";
import Edit from "./components/blog/Edit";
const App = () => {
  return (
    <div>
      <AuthProvider>
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path= '/post/:postid' element={<Main />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/write" element={<Write />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/edit/:postId" element={<Edit/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
