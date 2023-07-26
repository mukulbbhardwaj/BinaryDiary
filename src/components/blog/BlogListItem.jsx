import { Text, Box } from "@chakra-ui/react";
import React from "react";

const BlogListItem = ({title,username,date}) => {

  return (
    <Box
      bgColor={"#111d24"}
      borderRadius={"4px"}
      padding={"12px"}
      marginBottom={"8px"}
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
          color={"#cfbccc"}
          border={"0"}
          margin={"0"}
          _hover={{ textDecor: "underline", textDecorationColor: "white" }}
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
        // borderBottom="0.5px solid red"
      >
        <Text>{date} </Text>
        <Text>{username}</Text>
      </Box>
    </Box>
  );
};

export default BlogListItem;
