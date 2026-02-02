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
        borderRadius="lg"
        _hover={{ bg: "surface.muted" }}
        _active={{ bg: "surface.muted" }}
      />
      <MenuList bg="surface.card" borderColor="surface.border" border="1px solid" color="text.primary" minW="180px" borderRadius="xl" py={2} boxShadow="lg">
        <MenuItem as={RouterLink} to="/profile" bg="transparent" _hover={{ bg: "surface.muted" }} borderRadius="md" fontWeight="500">
          Account
        </MenuItem>
        <MenuDivider borderColor="surface.border" />
        <MenuItem bg="transparent" _hover={{ bg: "surface.muted" }} onClick={logOutUser} borderRadius="md" fontWeight="500">
          Sign out
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
