import React, { useEffect, useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
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
      [Query.equal("username", [user.name]), Query.orderDesc("$createdAt")]
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
        bgColor={"#22293e"}
        color={"#838a8f"}
      >
        <Box width={{ base: "300px", md: "800px" }}>
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
                  <Text fontWeight={400} fontSize={"18px"} color={"#b8b1b0"}>
                    {user.email}
                  </Text>
                </Box>

                <Button colorScheme="teal" onClick={logOutUser}>
                  logout
                </Button>
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
