import React from "react";
import ReactMarkdown from "react-markdown";
import { Box, Text } from "@chakra-ui/react";
const PostBody = ({ postData }) => {
  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        color={"#c4bdb7"}
        fontSize={"20px"}
      >
        <ReactMarkdown className="markdown" children={postData.body} />
       
      </Box>
      <Text textAlign={"center"} fontSize={"64px"} color={"white"}>
        . . .
      </Text>
    </>
  );
};

export default PostBody;
