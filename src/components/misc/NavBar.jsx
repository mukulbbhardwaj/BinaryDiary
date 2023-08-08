import React from "react";
import { Box, Button, Image, Text, Tooltip } from "@chakra-ui/react";
import logo from "../../../src/asset/logo-sm.png";
import pfp from "../../../src/asset/user.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import { EditIcon } from "@chakra-ui/icons";

const NavBar = () => {
  const { user } = useAuth();
  return (
    <div>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-evenly"}
        marginTop={"2rem"}
      >
        <Link to={"/"}>
          <Image src={logo} height={"3rem"} width={"3rem"} />
        </Link>
        <Link to={"/write"} style={{ textDecoration: "none", color: "black" }}>
          <Box display={"flex"} alignItems={"center"}>
            <Tooltip label="write" hasArrow>
              <EditIcon
                fontWeight={100}
                fontSize={28}
                color={"gray"}
                _hover={{ color: "white" }}
              />
            </Tooltip>
            {/* <Text
              fontSize={"24px"}
              fontWeight={650}
              padding={"0.5rem"}
              borderRadius={"20px"}
              boxSize={"max-content"}
              cursor={"pointer"}
              color={"gray"}
              _hover={{ color: "white" }}
            >
              write
            </Text> */}
          </Box>
        </Link>

        {user ? (
          <Link to={"/profile"}>
            <Image
              src={pfp}
              height={"2rem"}
              width={"2rem"}
              color={"red"}
              cursor={"pointer"}
            />
          </Link>
        ) : (
          <Link to={"/login"} style={{ textDecoration: "none" }}>
            <Button>login</Button>
          </Link>
        )}
      </Box>
    </div>
  );
};

export default NavBar;
