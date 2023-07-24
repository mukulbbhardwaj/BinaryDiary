import { Text, Box } from "@chakra-ui/react";
import React from "react";

const BlogListItem = ({title,username,date}) => {

  return (
    <>
      <Box fontSize={"24px"} mx={0} border={"none"} style={{ border: "0px" }}>
        <Text textAlign={"left"} color={"black"}>
          {title}
        </Text>
      </Box>
      <Box
        display={"flex"}
        
        fontWeight={100}
        fontSize={"14px"}
        gap={"1rem"}
        borderBottom="0.5px solid red"
      >
        <Text >{date} </Text>
        <Text >{username}</Text>
      </Box>
    </>
  );
};

export default BlogListItem;
