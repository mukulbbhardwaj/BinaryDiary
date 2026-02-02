import { Box, Text, Button } from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import ShareLinks from "../SharLinks";
import DeletePostModal from "../../modals/DeletePostModal";

export default function PostHeading({ postData, documentId, date, isAuthor }) {
  return (
    <Box
      as="header"
      border="1px solid"
      borderColor="surface.border"
      borderRadius="xl"
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      minH={{ base: "40vh", md: "50vh" }}
      py={10}
      px={6}
      my={4}
      bg="surface.card"
    >
      <Text
        as="h1"
        textAlign="center"
        fontSize={{ base: "2xl", md: "4xl" }}
        fontWeight="700"
        color="text.primary"
        mb={4}
        lineHeight="tall"
      >
        {postData.title}
      </Text>

      <Box display="flex" flexDir="column" alignItems="center" gap={1} color="text.muted" fontSize="sm">
        <Text>{postData.username}</Text>
        <Text display="flex" alignItems="center" gap={2}>
          <TimeIcon /> {date}
        </Text>
      </Box>

      <Box display="flex" alignItems="center" gap={3} mt={6} flexWrap="wrap" justifyContent="center">
        <ShareLinks />
        {isAuthor && documentId && (
          <Box display="flex" gap={2}>
            <Button as={Link} to={`/edit/${documentId}`} size="sm" colorScheme="brand" variant="outline">
              Edit
            </Button>
            <DeletePostModal>
              <Button size="sm" variant="outline" borderColor="red.500" color="red.400" _hover={{ bg: "red.900" }}>
                Delete
              </Button>
            </DeletePostModal>
          </Box>
        )}
      </Box>
    </Box>
  );
}
