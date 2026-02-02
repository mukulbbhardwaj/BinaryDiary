import { Box, Text, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";

export default function HomeBanner() {
  const { user } = useAuth();

  return (
    <Box
      as="section"
      aria-label="Binary Diary — Read, Write, Share"
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      py={{ base: 12, md: 16 }}
      px={6}
      my={{ base: 6, md: 10 }}
      borderRadius="2xl"
      border="1px solid"
      borderColor="surface.border"
      bg="surface.card"
      boxShadow="card"
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        h="3px"
        bgGradient="linear(to-r, brand.400, brand.600)"
        opacity={0.9}
      />
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <Text
          as="span"
          color="white"
          bg="brand.500"
          px={2.5}
          py={1}
          borderRadius="lg"
          fontWeight="700"
          fontSize={{ base: "xl", md: "2xl" }}
          letterSpacing="-0.02em"
        >
          Binary
        </Text>
        <Text color="brand.400" fontWeight="700" fontSize={{ base: "xl", md: "2xl" }} letterSpacing="-0.02em">
          Diary
        </Text>
      </Box>
      <Text color="text.muted" fontSize="md" display="flex" gap={3} flexWrap="wrap" justifyContent="center">
        <span>Read.</span>
        <span>Write.</span>
        <span>Share.</span>
      </Text>
      {user ? (
        <Link
          as={RouterLink}
          to="/write"
          mt={6}
          px={5}
          py={2.5}
          borderRadius="lg"
          bg="brand.500"
          color="white"
          fontWeight="600"
          fontSize="sm"
          _hover={{ bg: "brand.600", textDecoration: "none" }}
          _focusVisible={{ boxShadow: "0 0 0 2px var(--chakra-colors-brand-400)" }}
          transition="all 0.2s"
        >
          Start writing →
        </Link>
      ) : (
        <Link
          as={RouterLink}
          to="/login"
          mt={6}
          px={5}
          py={2.5}
          borderRadius="lg"
          bg="brand.500"
          color="white"
          fontWeight="600"
          fontSize="sm"
          _hover={{ bg: "brand.600", textDecoration: "none" }}
          _focusVisible={{ boxShadow: "0 0 0 2px var(--chakra-colors-brand-400)" }}
          transition="all 0.2s"
        >
          Sign in to write →
        </Link>
      )}
    </Box>
  );
}
