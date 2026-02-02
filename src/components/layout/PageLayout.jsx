import { Box } from "@chakra-ui/react";

const CONTAINER_MAX = { base: "100%", sm: "min(100% - 2rem, 640px)", md: "min(100% - 3rem, 720px)", lg: "min(100% - 4rem, 800px)" };

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
        px={withPadding ? { base: 4, sm: 6, md: 8 } : 0}
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
