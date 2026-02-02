import { Menu, MenuButton, MenuList, MenuItem, MenuDivider, IconButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";

export default function UserMenu() {
  const { logOutUser } = useAuth();

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Account menu"
        icon={<HamburgerIcon boxSize={5} />}
        variant="outline"
        borderColor="surface.border"
        color="text.primary"
        _hover={{ bg: "surface.muted" }}
        _active={{ bg: "surface.muted" }}
      />
      <MenuList bg="surface.card" borderColor="surface.border" color="text.primary" minW="160px">
        <MenuItem as={RouterLink} to="/profile" bg="transparent" _hover={{ bg: "surface.muted" }}>
          Account
        </MenuItem>
        <MenuDivider borderColor="surface.border" />
        <MenuItem bg="transparent" _hover={{ bg: "surface.muted" }} onClick={logOutUser}>
          Sign out
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
