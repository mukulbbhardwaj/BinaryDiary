import { Box, Text } from "@chakra-ui/react";

export default function HomeBanner() {
  return (
    <Box
      as="section"
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      py={{ base: 10, md: 16 }}
      my={{ base: 6, md: 10 }}
      borderRadius="xl"
      border="1px solid"
      borderColor="surface.border"
      bg="surface.card"
    >
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <Text
          as="span"
          color="white"
          bg="brand.500"
          px={2}
          py={1}
          borderRadius="lg"
          fontWeight="700"
          fontSize={{ base: "xl", md: "2xl" }}
        >
          Binary
        </Text>
        <Text color="brand.400" fontWeight="700" fontSize={{ base: "xl", md: "2xl" }}>
          Diary
        </Text>
      </Box>
      <Text color="text.muted" fontSize="md" display="flex" gap={2}>
        <span>Read.</span>
        <span>Write.</span>
        <span>Share.</span>
      </Text>
    </Box>
  );
}
