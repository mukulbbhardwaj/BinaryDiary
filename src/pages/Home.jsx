import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NavBar from "../components/misc/NavBar";
import BlogListItem from "../components/blog/BlogListItem";
import { Link } from "react-router-dom";
import moment from "moment";
import { databases, DATABASE_ID, COLLECTION_ID_BLOGS } from "../api/appwrite";
import Footer from "../components/misc/Footer";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);
  const getPosts = async () => {
    const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID_BLOGS);
    setPosts(res.documents);
  };
  return (
    <>
      <Box
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        bgColor={"#22293e"}
      >
        <Box width={{ base: "300px", md: "800px" }}>
          <NavBar />
          <Text
            fontSize={"64px"}
            fontWeight={"800"}
            borderBottom={"1px solid #332c32"}
            color={"#a0d9cb"}
            margin={"2rem"}
          >
            articles to read
          </Text>
          {posts.map((post) => (
            <Link
              to={`/post/${post.$id}`}
              style={{ textDecoration: "none" }}
              key={post.$id}
            >
              <BlogListItem
                title={post.title}
                date={moment(post.$createdAt).format("DD MMMM,YYYY")}
                username={post.username}
              />
            </Link>
          ))}
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default Home;
