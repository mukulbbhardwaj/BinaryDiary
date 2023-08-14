import React from "react";
import { Box, Button,Tooltip } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import { EditIcon } from "@chakra-ui/icons";
import Logo from "./Logo";
import UserMenu from "./UserMenu";

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
          <Logo/>
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
          </Box>
        </Link>

        {user ? (
       <UserMenu/>
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
