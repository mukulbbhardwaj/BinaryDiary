import { Box, Button, Tooltip } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import Logo from "./Logo";
import UserMenu from "./UserMenu";

export default function NavBar() {
  const { user } = useAuth();

  return (
    <Box
      as="nav"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      py={6}
      borderBottom="1px solid"
      borderColor="surface.border"
    >
      <Link to="/" aria-label="Binary Diary home">
        <Logo />
      </Link>

      <Box display="flex" alignItems="center" gap={4}>
        <Tooltip label="Write a post" hasArrow placement="bottom">
          <Box as="span">
            <Link to="/write" aria-label="Write your blog">
              <Box
                as="span"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                w={10}
                h={10}
                borderRadius="lg"
                color="text.muted"
                _hover={{ color: "brand.400", bg: "surface.muted" }}
                transition="all 0.15s"
              >
                <EditIcon boxSize={5} />
              </Box>
            </Link>
          </Box>
        </Tooltip>

        {user ? (
          <UserMenu />
        ) : (
          <Button as={Link} to="/login" size="md" colorScheme="brand">
            Sign in
          </Button>
        )}
      </Box>
    </Box>
  );
}
