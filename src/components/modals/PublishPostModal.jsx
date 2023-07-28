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
import { ID } from "appwrite";
import {
  databases,
  DATABASE_ID,
  COLLECTION_ID_BLOGS,
} from "../../api/appwrite";

import {  useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";

const PublishPostModal = ({ children, postBody, postTitle }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
    const toast = useToast();
    const { user } = useAuth();
    const DOCUMENT_ID = ID.unique();
    console.log('title', postTitle, 'body', postBody);
  const publishPost = async () => {
    if (!(postTitle.length > 0 && postBody.length > 0)) {
      toast({
        title: "Complete all the feilds",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    try {
      const post = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID_BLOGS,
        DOCUMENT_ID,
        {
          title: postTitle,
          body: postBody,
          username: user.name,
        }
      );
      toast({
        title: "your post is published",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      console.log("body", postBody);
   
      navigate(`/post/${post.$id}`);
    } catch (error) {
      console.error(error);
        toast({
            status: "error",
            duration:2000,
  })
    }
  };

  return (
    <div>
      <span onClick={onOpen}>{children}</span>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor={"#22293e"} color={"#838a8f"}>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>done writing? want to publish this?</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={publishPost}>
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

export default PublishPostModal;
