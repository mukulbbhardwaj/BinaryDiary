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
        <ModalContent bg="surface.card" border="1px solid" borderColor="surface.border" borderRadius="2xl" boxShadow="xl">
          <ModalHeader color="text.primary" fontWeight="600" fontSize="lg">
            Delete post?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody color="text.secondary" fontSize="md">
            This action cannot be undone. Your post will be permanently removed.
          </ModalBody>
          <ModalFooter borderTop="1px solid" borderColor="surface.border" pt={4} gap={3}>
            <Button colorScheme="red" onClick={deletePost} borderRadius="lg">
              Delete
            </Button>
            <Button variant="outline" borderRadius="lg" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
