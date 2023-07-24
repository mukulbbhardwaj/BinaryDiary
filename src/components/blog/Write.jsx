import React, { useState } from "react";
import WriteNavBar from "../misc/WriteNavBar";
import { Box, Input, Textarea } from "@chakra-ui/react";

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
          </Box>
          {/* <Input
            type="text"
            onChange={(e) => setPostContent(e.target.value)}
            padding={"10px"}
            fontSize={"32px"}
            border={"none"}
            outline={"none"}
            fontWeight={"10"}
            placeholder="write your story..."
          /> */}
          <Textarea placeholder="tell your story..." resize={'none'}  border={'none'} outline={'none'} height={'70vh'}/>
        </Box>
      </Box>
    </div>
  );
};

export default Write;
