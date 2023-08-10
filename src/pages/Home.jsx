import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NavBar from "../components/misc/NavBar";
import BlogListItem from "../components/blog/BlogListItem";
import { Link } from "react-router-dom";
import moment from "moment";
import { databases, DATABASE_ID, COLLECTION_ID_BLOGS } from "../api/appwrite";
import Footer from "../components/misc/Footer";
import { Query } from "appwrite";
import HomeBanner from "../components/misc/HomeBanner";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);
  const getPosts = async () => {
    const res = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_BLOGS,
      [Query.orderDesc("$createdAt"), Query.equal("isDraft", "false")]
    );
    setPosts(res.documents);
  };
  return (
    <>
      <Box
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        bgColor={"#1a1b1f"}
      >
        <Box width={{ base: "300px", md: "800px" }}>
          <NavBar />
          <HomeBanner />
          <Box>
            <Text
              fontSize={{ base: "32px", lg: "48px" }}
              fontWeight={"600"}
              borderBottom={"1px solid #332c32"}
              color={"gray"}
              margin={"2rem"}
            >
              Articles to read : 
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
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default Home;
