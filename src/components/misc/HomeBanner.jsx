import { Box, Text } from "@chakra-ui/react";
import React from "react";
// import banner from "../../asset/big-banner.png";
const HomeBanner = () => {
  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        margin={{base:"10px","lg":"100px"}}
        flexDir={"column"}
        border={"0.5px solid #2b2c33"}
        borderRadius={'1rem'}
      >
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          fontSize={"48px"}
          margin={"30px"}
          fontWeight={600}
          flexDir={"column"}
          mb={"0px"}
        >
          <Text
            color={"white"}
            bgColor={"#89b1c9"}
            padding={"4px"}
            borderRadius={"9px"}
            fontFamily={"PT Sans"}
          >
            Binary
          </Text>
          <Text color={"#89b1c9"}>Diary</Text>
        </Box>
        <Box color={"#66747d"} fontSize={"20px"} display={"flex"} gap={"1rem"}>
          <Text>Read.</Text>
          <Text>Write.</Text>
          <Text>Share.</Text>
        </Box>
      </Box>
    </>
  );
};

export default HomeBanner;
