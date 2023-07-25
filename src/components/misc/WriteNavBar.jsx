import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import logo from "../../../src/asset/logo-sm.png";
import user from "../../../src/asset/user.png";
import { Link } from "react-router-dom";

const WriteNavBar = () => {
  return (
    <div>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-evenly"}
      >
        <Link to={"/"}>
          <Image src={logo} height={"3rem"} width={"3rem"} />
        </Link>
        <Text
          fontSize={"24px"}
          fontWeight={150}
          border={"2px solid green"}
          padding={"0.5rem"}
          borderRadius={"20px"}
          boxSize={"max-content"}
          cursor={"pointer"}
        >
          publish
        </Text>

        <Link to={"/profile"}>
          <Image src={user} height={"2rem"} width={"2rem"} color={"red"} />
        </Link>
      </Box>
    </div>
  );
};

export default WriteNavBar;
