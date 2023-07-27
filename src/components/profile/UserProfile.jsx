import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import BlogListItem from "../blog/BlogListItem";
import NavBar from "../misc/NavBar";
import moment from "moment";
import { useAuth } from "../../utils/AuthContext";
import {
  databases,
  COLLECTION_ID_BLOGS,
  DATABASE_ID,
} from "../../api/appwrite";
import { Query } from "appwrite";
import { Link } from "react-router-dom";
const UserProfile = () => {
  const { user, logOutUser } = useAuth();
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    getUserPosts();
  }, []);
  const getUserPosts = async () => {
    const res = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_BLOGS,
      [Query.equal("username", [user.name])]
    );
    setUserPosts(res.documents);
  };
 
  return (
    <>
      <Box
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box width={"600px"}>
          <NavBar />
          <Box
            display={"flex"}
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Box>
              <Box
                display={"flex"}
                justifyContent={"space-around"}
                alignItems={"center"}
              >
                <Box>
                  <Text fontSize={"24px"} fontWeight={700} color={"#ebc5c3"}>
                    {user.name}
                  </Text>
                  <Text fontWeight={400} fontSize={'18px'} color={"#b8b1b0"}>
                    {user.email}
                  </Text>
                </Box>
                <Text
                  fontSize={"24px"}
                  fontWeight={150}
                  border={"2px solid red"}
                  _hover={{ bgColor: "red", color: "white" }}
                  padding={"0.5rem"}
                  borderRadius={"20px"}
                  boxSize={"max-content"}
                  onClick={logOutUser}
                  cursor={"pointer"}
                >
                  logout
                </Text>
              </Box>
              <Text
                fontSize={"64px"}
                fontWeight={"800"}
                borderBottom={"1px solid #332c32"}
                color={"#a0d9cb"}
              >
                articles by you...
              </Text>

              {userPosts.map((post) => (
                <Link
                  to={`/post/${post.$id}`}
                  style={{ textDecoration: "none" }}
                  key={post.$id}
                >
                  {/* {console.log(post)}
              {console.log(user.name)}
              {post.title} */}
                  <BlogListItem
                    title={post.title}
                    date={moment(post.$createdAt).format("DD MMMM,YYYY")}
                    username={post.name}
                  />
                </Link>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserProfile;
