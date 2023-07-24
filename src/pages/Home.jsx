import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NavBar from "../components/misc/NavBar";
import BlogListItem from "../components/blog/BlogListItem";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  databases,
  DATABASE_ID,
  PROJECT_ID,
  COLLECTION_ID_BLOGS,
} from "../api/appwrite";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);
  const getPosts = async () => {
    const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID_BLOGS);
    // console.log("RESPONSE:", res);
    setPosts(res.documents);
  };
  return (
    <>
      <NavBar />

      <Box
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box>
          <Text
            fontSize={"64px"}
            fontWeight={"100"}
            borderBottom={"1px solid black"}
            color={"red"}
          >
            article to read
          </Text>
          {posts.map((post) => (
            <Link to={`/post/${post.$id}`} style={{ textDecoration: "none" }} key={post.$id}>
              <BlogListItem
                title={post.title}
                date={moment(post.$createdAt).format("DD MMMM,YYYY")}
                username={post.username}
              />
            </Link>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Home;
