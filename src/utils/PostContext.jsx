import { useContext, useState, useEffect, createContext } from "react";
import { databases} from "../api/appwrite";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(false);

 
   
};

export const usePost = () => {
  return useContext(PostContext);
};

export default PostContext;
