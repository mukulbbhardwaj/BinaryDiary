import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import BlogListItem from "../blog/BlogListItem";
import NavBar from "../misc/NavBar";
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
      <NavBar />
      <Box
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        textAlign={"left"}
      >
        <Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box>
              <Text fontSize={"24px"} fontWeight={300}>
                {user.name}
              </Text>
              <Text fontWeight={100}>{user.email}</Text>
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
            fontWeight={"100"}
            borderBottom={"1px solid black"}
            color={"red"}
          >
            articles by you...
          </Text>

          {userPosts.map((post) => {

            <Link
              to={`/post/${post.$id}`}
              style={{ textDecoration: "none" }}
              key={post.$id}
            >
              {console.log(post)}
              {console.log(user.name)}
              <BlogListItem
                title={post.title}
                username={post.name}
                // date={post.createdAt}
              />
            </Link>;
          })}
        </Box>
      </Box>
    </>
  );
};

export default UserProfile;
