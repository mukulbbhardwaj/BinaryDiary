import {
  Box,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import NavBar from "../misc/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import {
  databases,
  DATABASE_ID,
  COLLECTION_ID_BLOGS,
} from "../../api/appwrite";
import moment from "moment";
import { DeleteIcon } from "@chakra-ui/icons";
import { useAuth } from "../../utils/AuthContext";

import ReactMarkdown from "react-markdown";
import DeletePostModal from "../modals/DeletePostModal";

const Post = () => {
  const [postData, setPostData] = useState({});
  const { user } = useAuth();
  useEffect(() => {
    getPost();
  }, []);

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();
  const DOCUMENT_ID = location.pathname.split("/")[2];
  const getPost = async () => {
    const res = await databases.getDocument(
      DATABASE_ID,
      COLLECTION_ID_BLOGS,
      DOCUMENT_ID
    );
    setPostData(res);
  };
  const date = moment(postData.$createdAt).format("DD MMMM,YYYY");

  const isAuthor = user.name === postData.username;

  const deletePost = async () => {
    await databases.deleteDocument(
      DATABASE_ID,
      COLLECTION_ID_BLOGS,
      DOCUMENT_ID
    );
    navigate("/");
  };

  return (
    <>
      <Box
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        bgColor={"#22293e"}
      >
        <Box width={{ base: "300px", md: "800px" }}>
          <NavBar />
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Box
              display={"flex"}
              flexDir={"column"}
              justifyContent={"center"}
              style={{ border: "0px" }}
              borderColor={"red"}
              borderWidth={"2px"}
              width={"600px"}
            >
              <div>
                <Box
                  display={"flex"}
                  fontSize={"64px"}
                  fontWeight={"800"}
                  borderBottom={"1px solid #332c32"}
                  color={"#cfbccc"}
                  margin={"0.5rem"}
                >
                  <Text wordBreak={"break-word"}>{postData.title}</Text>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Box
                    display={"flex"}
                    flexDir={"column"}
                    fontWeight={300}
                    fontSize={"14px"}
                  >
                    <Text m={0}>{postData.username}</Text>
                    <Text m={0} fontSize={"14px"}>
                      {date}
                    </Text>
                  </Box>
                  {isAuthor ? (
                    <DeletePostModal>
                      <Button>
                        <DeleteIcon />
                      </Button>
                    </DeletePostModal>
                  ) : (
                    ""
                  )}
                </Box>
                <Box marginTop={"2rem"} fontSize={"24px"}>
                  <ReactMarkdown
                    className="markdown"
                    children={postData.body}
                  />
                  <Text textAlign={"center"} fontSize={"64px"}>
                    ...
                  </Text>
                </Box>
              </div>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Post;
