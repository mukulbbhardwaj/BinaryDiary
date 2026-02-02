import { Box, Text } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function PostBody({ postData }) {
  const body = postData?.body ?? "";

  return (
    <Box
      as="article"
      w="100%"
      maxW="65ch"
      mx="auto"
      py={10}
      color="text.secondary"
      fontSize="lg"
      lineHeight="1.75"
    >
      <Box className="markdown" w="100%">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
      </Box>
      <Text textAlign="center" fontSize="3xl" color="text.muted" mt={14} aria-hidden>
        · · ·
      </Text>
    </Box>
  );
}
