import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import logo from "../../../src/asset/logo-sm.png";
import user from "../../../src/asset/user.png";
import { Link } from "react-router-dom";

const WriteNavBar = () => {
  const isUser = true;
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
        <Text fontSize={"24px"} color={"black"} fontWeight={200}></Text>

        {isUser ? (
          <Link to={"/profile"}>
            <Image src={user} height={"2rem"} width={"2rem"} color={"red"} />
          </Link>
        ) : (
          <Link to={"/login"} style={{ textDecoration: "none" }}>
            <Text fontSize={"24px"} color={"black"} fontWeight={"200"}>
              login
            </Text>
          </Link>
        )}
      </Box>
    </div>
  );
};

export default WriteNavBar;
