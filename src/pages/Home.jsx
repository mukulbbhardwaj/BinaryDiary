import { Box, Text } from "@chakra-ui/react";
import React from "react";
import NavBar from "../components/misc/NavBar";
import BlogListItem from "../components/blog/BlogListItem";
import { Link } from "react-router-dom";
const Home = () => {
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
          <Link to={"/post"} style={{ textDecoration: "none" }} >
            <BlogListItem />
          </Link>
          <Link to={"/post"} style={{ textDecoration: "none" }}>
            <BlogListItem />
          </Link>
          <Link to={"/post"} style={{ textDecoration: "none" }}>
            <BlogListItem />
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Home;
