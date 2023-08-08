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

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";

const UpdatePostModal = ({
  children,
  postBody,
  postTitle,
  isDraft,
  POST_ID,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useAuth();

  const publishPost = async () => {
    if (postTitle !== undefined && postBody !== undefined) {
      if (!(postTitle.length > 0 && postBody.length > 0)) {
        toast({
          title: "Complete all the feilds",
          duration: 9000,
          isClosable: true,
        });
        return;
      }
    }
    try {
      const post = await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID_BLOGS,
        POST_ID,
        {
          title: postTitle,
          body: postBody,
          username: user.name,
          isDraft: "false",
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
        duration: 2000,
      });
    }
  };
  const updatePost = () => {
    toast({
      title: "updated",
    });
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
            <Button
              colorScheme="blue"
              mr={3}
              onClick={isDraft ? updatePost : publishPost}
            >
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

export default UpdatePostModal;
