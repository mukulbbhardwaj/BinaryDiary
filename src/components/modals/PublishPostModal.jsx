import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ID } from "appwrite";
import { useNavigate } from "react-router-dom";
import { databases, DATABASE_ID, COLLECTION_ID_BLOGS } from "../../api/appwrite";
import { useAuth } from "../../utils/AuthContext";

export default function PublishPostModal({ children, postBody, postTitle }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useAuth();

  const publishPost = async () => {
    if (!postTitle?.trim() || !postBody?.trim()) {
      toast({ title: "Please add a title and body", status: "warning", duration: 3000, isClosable: true });
      return;
    }
    if (!user) {
      toast({ title: "Please sign in to publish", status: "warning", duration: 3000, isClosable: true });
      return;
    }
    try {
      const documentId = ID.unique();
      const post = await databases.createDocument(DATABASE_ID, COLLECTION_ID_BLOGS, documentId, {
        title: postTitle.trim(),
        body: postBody.trim(),
        username: user.name,
        isDraft: "false",
      });
      toast({ title: "Post published!", status: "success", duration: 2000, isClosable: true });
      onClose();
      navigate(`/post/${post.$id}`, { replace: true });
    } catch (err) {
      toast({
        title: err?.message ?? "Failed to publish",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Box as="span" onClick={onOpen} cursor="pointer">
        {children}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent bg="surface.card" border="1px solid" borderColor="surface.border" color="text.secondary">
          <ModalHeader color="text.primary">Publish post?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Ready to share this with the world? Your post will be visible to everyone.</ModalBody>
          <ModalFooter borderTop="1px solid" borderColor="surface.border" gap={2}>
            <Button colorScheme="brand" onClick={publishPost}>
              Publish
            </Button>
            <Button variant="outline" borderColor="surface.border" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
