import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/">
      <Box
        display="inline-flex"
        alignItems="center"
        gap={1.5}
        fontSize="lg"
        fontWeight="700"
        px={3}
        py={2}
        borderRadius="lg"
        border="1px solid"
        borderColor="surface.border"
        color="text.primary"
        _hover={{ bg: "surface.muted", borderColor: "surface.muted" }}
        _focusVisible={{ boxShadow: "0 0 0 2px var(--chakra-colors-brand-500)" }}
        transition="all 0.2s"
      >
        <Text as="span" bg="brand.500" color="white" px={1.5} py={0.5} borderRadius="md" fontWeight="800">
          B
        </Text>
        <Text as="span" color="brand.400" letterSpacing="-0.02em">D</Text>
      </Box>
    </Link>
  );
}
