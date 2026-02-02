import { Box, Text } from "@chakra-ui/react";

export default function BlogListItem({ title, username, date }) {
  return (
    <Box
      as="article"
      bg="surface.card"
      borderRadius="lg"
      p={4}
      mb={3}
      border="1px solid"
      borderColor="surface.border"
      _hover={{ borderColor: "surface.muted", bg: "surface.muted" }}
      transition="all 0.15s"
      cursor="pointer"
    >
      <Text
        as="h2"
        fontSize="xl"
        fontWeight="600"
        color="text.primary"
        noOfLines={2}
        _hover={{ textDecoration: "underline", textDecorationColor: "brand.400" }}
        wordBreak="break-word"
      >
        {title}
      </Text>
      <Box display="flex" gap={3} mt={2} fontSize="sm" color="text.muted">
        <Text>{date}</Text>
        <Text>{username}</Text>
      </Box>
    </Box>
  );
}
