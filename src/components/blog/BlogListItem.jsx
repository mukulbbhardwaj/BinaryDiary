import { Box, Text } from "@chakra-ui/react";

export default function BlogListItem({ title, username, date }) {
  return (
    <Box
      as="article"
      bg="surface.card"
      borderRadius="xl"
      p={5}
      mb={4}
      border="1px solid"
      borderColor="surface.border"
      boxShadow="card"
      _hover={{
        borderColor: "surface.muted",
        bg: "surface.muted",
        boxShadow: "card-hover",
        transform: "translateY(-1px)",
      }}
      transition="all 0.2s ease"
      cursor="pointer"
    >
      <Text
        as="h2"
        fontSize={{ base: "lg", md: "xl" }}
        fontWeight="600"
        color="text.primary"
        noOfLines={2}
        _hover={{ textDecoration: "underline", textDecorationColor: "brand.400" }}
        wordBreak="break-word"
        lineHeight="tall"
      >
        {title}
      </Text>
      <Box display="flex" gap={4} mt={3} fontSize="sm" color="text.muted">
        <Text>{date}</Text>
        <Text fontWeight="500" color="text.secondary">
          {username}
        </Text>
      </Box>
    </Box>
  );
}
