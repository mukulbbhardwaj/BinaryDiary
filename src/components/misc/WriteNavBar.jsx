import { Box, Button, Image, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import { ID } from "appwrite";
import { databases, DATABASE_ID, COLLECTION_ID_BLOGS } from "../../api/appwrite";
import { useToast } from "@chakra-ui/react";
import Logo from "./Logo";
import PublishPostModal from "../modals/PublishPostModal";
import pfp from "../../asset/user.png";

export default function WriteNavBar({ postBody, postTitle }) {
  const { user } = useAuth();
  const toast = useToast();

  const saveToDraft = async () => {
    if (!user) return;
    try {
      const documentId = ID.unique();
      await databases.createDocument(DATABASE_ID, COLLECTION_ID_BLOGS, documentId, {
        title: postTitle || "Untitled",
        body: postBody || "",
        username: user.name,
        isDraft: "true",
      });
      toast({ title: "Draft saved", status: "success", duration: 2000, isClosable: true });
    } catch (err) {
      toast({ title: "Failed to save draft", status: "error", duration: 3000, isClosable: true });
    }
  };

  return (
    <Box
      as="nav"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      py={6}
      borderBottom="1px solid"
      borderColor="surface.border"
    >
      <RouterLink to="/">
        <Logo />
      </RouterLink>

      <Box display="flex" alignItems="center" gap={3}>
        <PublishPostModal postBody={postBody} postTitle={postTitle}>
          <Button size="sm" colorScheme="brand">
            Publish
          </Button>
        </PublishPostModal>
        <Button
          size="sm"
          variant="outline"
          borderColor="surface.border"
          color="text.secondary"
          _hover={{ bg: "surface.muted", color: "text.primary" }}
          onClick={saveToDraft}
        >
          Save draft
        </Button>

        {user ? (
          <Link as={RouterLink} to="/profile" display="inline-flex" alignItems="center" _hover={{ opacity: 0.9 }}>
            <Image src={pfp} alt="" boxSize={8} borderRadius="full" objectFit="cover" />
          </Link>
        ) : (
          <Button as={RouterLink} to="/login" size="sm" colorScheme="brand" variant="outline">
            Sign in
          </Button>
        )}
      </Box>
    </Box>
  );
}
