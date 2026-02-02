import { Box, Text } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function PostBody({ postData }) {
  const body = postData?.body ?? "";

  return (
    <Box
      as="article"
      w="100%"
      py={8}
      color="text.secondary"
      fontSize="lg"
      lineHeight="tall"
    >
      <Box className="markdown" w="100%" maxW="100%">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
      </Box>
      <Text textAlign="center" fontSize="4xl" color="text.muted" mt={12} aria-hidden>
        · · ·
      </Text>
    </Box>
  );
}
