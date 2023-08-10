import { Box, Text } from "@chakra-ui/react";
import React from "react";

const TagsItem = ({ tag }) => {
  return (
    <>
      <Box textAlign={"center"} display={"flex"}>
        <Text
          borderRadius={"9px"}
          border={"0.5px solid white"}
          padding={"4px"}
          cursor={"pointer"}
        >
          {tag}
        </Text>
      </Box>
    </>
  );
};

export default TagsItem;
