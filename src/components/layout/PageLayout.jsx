import { Box } from "@chakra-ui/react";

const CONTAINER_MAX = { base: "100%", sm: "360px", md: "720px", lg: "800px" };

/**
 * Consistent page layout: centered container, background, optional padding.
 */
export function PageLayout({ children, withPadding = true, ...props }) {
  return (
    <Box
      minH="100vh"
      bg="surface.bg"
      color="text.secondary"
      display="flex"
      flexDir="column"
      alignItems="center"
      {...props}
    >
      <Box
        w={CONTAINER_MAX}
        maxW="100%"
        px={withPadding ? { base: 4, md: 6 } : 0}
        flex="1"
        display="flex"
        flexDir="column"
      >
        {children}
      </Box>
    </Box>
  );
}

export const containerMaxWidth = CONTAINER_MAX;
