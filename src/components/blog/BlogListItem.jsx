import { Text, Box } from "@chakra-ui/react";
import React from "react";

const BlogListItem = () => {
  const title = "How to create a Blog Application using ChakraUI and ReactJs";
  const username = "mukulbhardwaj";
  const date = "12th July 2023";
  return (
    <>
      <Box fontSize={"24px"} mx={0} border={"none"} style={{ border: "0px" }}>
        <Text textAlign={"left"} color={'black'}>{title}</Text>
      </Box>
      <Box
        display={"flex"}
        fontWeight={100}
        border={"none"}
        fontSize={"14px"}
        gap={"1rem"}
        borderBottom="0.5px solid red"
      >
        <Text style={{ border: "0px" }}>{date} </Text>
        <Text style={{ border: "0px" }}>{username}</Text>
      </Box>
    </>
  );
};

export default BlogListItem;
