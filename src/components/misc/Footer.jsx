import { Text, Box, Link, Image } from "@chakra-ui/react";
import twitter from "../../asset/twitter.png";
import React from "react";

const Footer = () => {
  return (
    <>
      <Box
        position={"relative"}
        bottom={"0"}
        display={"flex"}
        color={"white"}
        borderTop={"0.5px solid #2b2c33"}
        marginTop={"75px"}
        gap={"6px"}
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        width={"80%"}
      >
        <Text margin={"1rem"}> Binary Diary</Text>
        <Box display={"flex"} gap={"6px"}>
          <Text textAlign={"center"} marginTop={"10px"}>
            made by
          </Text>

          <Text textDecor={"none"} marginTop={"10px"}>
            <Link href="https://github.com/mukulbbhardwaj" target="_blank">
              mukul ♡
            </Link>
          </Text>
        </Box>
        <Box marginTop={"10px"} marginBottom={"75px"}>
          <Link href="https://twitter.com/mukulbbhardwaj" target="_blank">
            <Image src={twitter}
              alt="twitter"
              width={"24px"}
            aria-label="Twitter Account"
            ></Image>
          </Link>
        </Box>
      </Box>
    </>
  );
};
export default Footer;
