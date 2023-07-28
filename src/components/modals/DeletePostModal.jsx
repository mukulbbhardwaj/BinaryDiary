import React from "react";
import {
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
import {
  databases,
  DATABASE_ID,
  COLLECTION_ID_BLOGS,
} from "../../api/appwrite";

import { useLocation, useNavigate } from "react-router-dom";

const DeletePostModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
    const location = useLocation();
    const toast = useToast();
  const DOCUMENT_ID = location.pathname.split("/")[2];
  const deletePost = async () => {
    await databases.deleteDocument(
      DATABASE_ID,
      COLLECTION_ID_BLOGS,
      DOCUMENT_ID
    );
      navigate("/");
      toast({
          title: "Post deleted",
          status: "success"
          
      })
      
  };

  return (
    <div>
      <span onClick={onOpen}>{children}</span>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor={"#22293e"} color={"#838a8f"}>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            want to delete your post? this action cannot be undone
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={deletePost}>
              Yes
            </Button>
            <Button variant="ghost" colorScheme="telegram" onClick={onClose}>
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DeletePostModal;
