import React, { useState } from "react";
import WriteNavBar from "../misc/WriteNavBar";
import { Box,Input } from "@chakra-ui/react";

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
      <Box display={"flex"} alignItems={"center"}
      justifyContent={'center'}>
        <Box
          display={"flex"}
          flexDir={"column"}
          justifyContent={"center"}
          width={"60%"}
          // alignItems={"center"}
        >
          <Input
            type="text"
            onChange={handleInputChange}
            padding={"10px"}
            fontSize={"64px"}
            border={"none"}
            outline={"none"}
            fontWeight={"10"}
            placeholder="title..."
            borderBottom="2px solid red"
          />
          <Input
            type="text"
            // value={username}
            onChange={handleInputChange}
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
