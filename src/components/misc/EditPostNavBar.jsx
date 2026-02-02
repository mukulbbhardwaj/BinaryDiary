import { Box, Button, Image, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import { useToast } from "@chakra-ui/react";
import { databases, DATABASE_ID, COLLECTION_ID_BLOGS } from "../../api/appwrite";
import UpdatePostModal from "../modals/UpdatePostModal";
import Logo from "./Logo";
import pfp from "../../asset/user.png";

export default function EditPostNavBar({ postBody, postTitle, postId }) {
  const { user } = useAuth();
  const toast = useToast();

  const saveToDraft = async () => {
    if (!postId || !user) return;
    try {
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID_BLOGS, postId, {
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
        <UpdatePostModal postBody={postBody} postTitle={postTitle} postId={postId}>
          <Button size="sm" colorScheme="brand">
            Publish
          </Button>
        </UpdatePostModal>
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
