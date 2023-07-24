import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import logo from "../../../src/asset/logo-sm.png";
import pfp from "../../../src/asset/user.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";

const NavBar = () => {
  const { user } = useAuth();
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
        <Link to={"/write"} style={{ textDecoration: "none" }}>
          <Text
            fontSize={"24px"}
            fontWeight={150}
            border={"2px solid green"}
            padding={"0.5rem"}
            borderRadius={"20px"}
            boxSize={"max-content"}
          >
            write
          </Text>
        </Link>

        {user ? (
          <Link to={"/profile"}>
            <Image src={pfp} height={"2rem"} width={"2rem"} color={"red"} />
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

export default NavBar;
