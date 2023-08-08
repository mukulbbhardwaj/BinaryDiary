import { Text, Box } from "@chakra-ui/react";
import React from "react";

const BlogListItem = ({title,username,date}) => {

  return (
    <Box
      bgColor={"#17181c"}
      borderRadius={"4px"}
      padding={"12px"}
      marginBottom={"8px"}
      border={"1px solid #131414"}
    >
      <Box
        fontSize={"24px"}
        mx={0}
        border={"none"}
        style={{ border: "0px" }}
        fontWeight={800}
      >
        <Text
          textAlign={"left"}
          color={"#d1d1d1"}
          border={"0"}
          margin={"0"}
          _hover={{ textDecor: "underline", textDecorationColor: "white" }}
          wordBreak={"break-word"}
        >
          {title}
        </Text>
      </Box>
      <Box
        display={"flex"}
        fontWeight={100}
        fontSize={"14px"}
        gap={"1rem"}
        color={"white"}
      >
        <Text>{date} </Text>
        <Text>{username}</Text>
      </Box>
    </Box>
  );
};

export default BlogListItem;
