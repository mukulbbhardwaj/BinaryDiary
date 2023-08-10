import { Box, Text } from "@chakra-ui/react";
import React from "react";

const Logo = () => {
  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={"2px"}
        fontSize={"20px"}
        fontWeight={800}
        padding={"1rem"}
        border={"0.5px solid #2b2c33"}
        borderRadius={"1rem"}
        _hover={{ bgColor: "#2b2c33" }}
      >
        <Text
          color={"white"}
          bgColor={"#89b1c9"}
          borderRadius={"4px"}
          padding={"2px"}
        >
          B
        </Text>
        <Text color={"#89b1c9"}>D</Text>
      </Box>
    </>
  );
};

export default Logo;
