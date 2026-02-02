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
import { useParams, useNavigate } from "react-router-dom";
import { databases, DATABASE_ID, COLLECTION_ID_BLOGS } from "../../api/appwrite";

export default function DeletePostModal({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();
  const { postId } = useParams();

  const deletePost = async () => {
    if (!postId) return;
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID_BLOGS, postId);
      toast({ title: "Post deleted", status: "success", duration: 2000, isClosable: true });
      navigate("/", { replace: true });
      onClose();
    } catch (err) {
      toast({ title: "Failed to delete post", status: "error", duration: 3000, isClosable: true });
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
          <ModalHeader color="text.primary">Delete post?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            This action cannot be undone. Your post will be permanently removed.
          </ModalBody>
          <ModalFooter borderTop="1px solid" borderColor="surface.border" gap={2}>
            <Button colorScheme="red" onClick={deletePost}>
              Delete
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
