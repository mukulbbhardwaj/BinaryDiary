import React from "react";
import {
  Menu,
  MenuItem,
  MenuList,
  IconButton,
  MenuButton,
  MenuDivider,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
// import{logoutUser} from '../'

const UserMenu = () => {
  const { logOutUser } = useAuth();
  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon color={"white"} />}
          variant="outline"
          _hover={{ bgColor: "#2b2c33" }}
        />
        <MenuList bgColor={"#1a1b1f"} color={"white"}>
          <MenuItem bgColor={"#1a1b1f"} _hover={{ bgColor: "#383942" }}>
            <Link to={"/profile"}>Account</Link>
          </MenuItem>
          <MenuDivider />
          <MenuItem
            onClick={logOutUser}
            bgColor={"#1a1b1f"}
            _hover={{ bgColor: "#383942" }}
          >
            LogOut
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default UserMenu;
