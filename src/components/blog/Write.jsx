import React, { useState } from "react";
import WriteNavBar from "../misc/WriteNavBar";
import { Box, Input, Text } from "@chakra-ui/react";

const Write = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const handleInputChange = () => {
    setPostTitle(postTitle);
    setPostContent(postContent);
  };






  return (
    <div>
      <WriteNavBar />
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Box
          display={"flex"}
          flexDir={"column"}
          justifyContent={"center"}
          width={"60%"}
        >
          <Box display={"flex"} alignItems={"center"}>
            <Input
              type="text"
              onChange={(e) => setPostTitle(e.target.value)}
              padding={"10px"}
              fontSize={"64px"}
              border={"none"}
              outline={"none"}
              fontWeight={"10"}
              placeholder="title..."
              borderBottom="2px solid red"
            />
            <Text
              fontSize={"24px"}
              fontWeight={150}
              border={"2px solid green"}
              padding={"0.5rem"}
              borderRadius={"20px"}
              boxSize={"max-content"}
            >
              publish
            </Text>
          </Box>
          <Input
            type="text"
            onChange={(e) => setPostContent(e.target.value)}
            padding={"10px"}
            fontSize={"32px"}
            border={"none"}
            outline={"none"}
            fontWeight={"10"}
            placeholder="write your story..."
          />
        </Box>
      </Box>
    </div>
  );
};

export default Write;
