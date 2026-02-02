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
      borderRadius="2xl"
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      minH={{ base: "36vh", md: "42vh" }}
      py={12}
      px={6}
      my={6}
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
      <Text
        as="h1"
        textAlign="center"
        fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
        fontWeight="700"
        color="text.primary"
        mb={5}
        lineHeight="1.2"
        letterSpacing="-0.02em"
        maxW="800px"
      >
        {postData.title}
      </Text>

      <Box display="flex" flexDir="column" alignItems="center" gap={2} color="text.muted" fontSize="sm">
        <Text fontWeight="500" color="text.secondary">
          {postData.username}
        </Text>
        <Text display="flex" alignItems="center" gap={2}>
          <TimeIcon /> {date}
        </Text>
      </Box>

      <Box display="flex" alignItems="center" gap={3} mt={8} flexWrap="wrap" justifyContent="center">
        <ShareLinks />
        {isAuthor && documentId && (
          <Box display="flex" gap={2}>
            <Button as={Link} to={`/edit/${documentId}`} size="sm" colorScheme="brand" variant="outline" borderRadius="lg">
              Edit
            </Button>
            <DeletePostModal>
              <Button size="sm" variant="outline" borderColor="red.500" color="red.400" _hover={{ bg: "red.900" }} borderRadius="lg">
                Delete
              </Button>
            </DeletePostModal>
          </Box>
        )}
      </Box>
    </Box>
  );
}
