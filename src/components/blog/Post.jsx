import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NavBar from "../misc/NavBar";
import { useLocation } from "react-router-dom";
import {
  databases,
  DATABASE_ID,
  PROJECT_ID,
  COLLECTION_ID_BLOGS,
} from "../../api/appwrite";

const Post = () => {
  useEffect(() => {
    getPost();
  }, [])
  const [postData, setPostData] = useState({})

  const location = useLocation();
  const DOCUMENT_ID = location.pathname.split("/")[2];

  // console.log(path)
  const getPost = async () => {
     const res = await databases.getDocument(
       DATABASE_ID,
       COLLECTION_ID_BLOGS,
       DOCUMENT_ID
     );
    setPostData(res);
  }

  
  return (
    <>
      <NavBar />
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
        <Box
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          width={"60%"}
          style={{ border: "0px" }}
          borderColor={"red"}
          borderWidth={"2px"}
        >
          <Box>
            <Text
              fontSize={"64px"}
              fontWeight={"100"}
              borderBottom={"1px solid black"}
              color={"red"}
            >
              {postData.title}
            </Text>
            <Box display={"flex"} flexWrap={"wrap"}>
        {postData.body}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Post;
