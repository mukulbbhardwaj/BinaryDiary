import React, { useState } from "react";
import {
  Box,
  Image,
  Text,
  Textarea,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import PublishPostModal from "../modals/PublishPostModal";
import infoPage from "../../asset/md-info.png";
// import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import logo from "../../../src/asset/logo-sm.png";
import pfp from "../../../src/asset/user.png";
import { Link, useNavigate } from "react-router-dom";
import { ID } from "appwrite";
import {
  databases,
  DATABASE_ID,
  COLLECTION_ID_BLOGS,
} from "../../api/appwrite";
import { useAuth } from "../../utils/AuthContext";
import WriteNavBar from "../misc/WriteNavBar";

const Write = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("Hello");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const DOCUMENT_ID = ID.unique();
  console.log("body", postBody);

  return loading ? (
    "loading..."
  ) : (
    <>
      <Box
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        bgColor={"#22293e"}
        color={"#838a8f"}
      >
        <Box width={{ base: "300px", md: "800px" }}>
          <WriteNavBar postBody={postBody} postTitle={postTitle} />
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Box
              display={"flex"}
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box>
                <Box
                  margin={0}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  flexDir={"column"}
                >
                  <Textarea
                    type="text"
                    onChange={(e) => setPostTitle(e.target.value)}
                    fontSize={"48px"}
                    fontWeight={"800"}
                    borderBottom={"1px solid red"}
                    color={"#cfbccc"}
                    margin={0}
                    bgColor={"inherit"}
                    outline={0}
                    border={0}
                    placeholder="title..."
                    resize={"none"}
                    fontFamily={"helvetica"}
                    width={{ base: "300px", md: "800px" }}
                  />

                  <Box display={"flex"} gap={"20px"}>
                    <Text
                      bgColor={"#1f222b"}
                      onClick={(e) => setPreview(!preview)}
                      cursor={"pointer"}
                      padding={"4px"}
                      borderRadius={"6px"}
                      _hover={{ color: "white" }}
                      width={"70px"}
                      textAlign={"center"}
                    >
                      {preview ? "edit" : "preview"}
                    </Text>
                    <Text
                      bgColor={"#1f222b"}
                      onClick={onOpen}
                      cursor={"pointer"}
                      padding={"4px"}
                      borderRadius={"6px"}
                      _hover={{ color: "white" }}
                      width={"70px"}
                      textAlign={"center"}
                    >
                      info
                    </Text>
                    <Box width={"600px"}>
                      <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent
                          display={"flex"}
                          flexDir={"column"}
                          alignItems={"center"}
                          justifyContent={"center"}
                        >
                          <ModalBody display={"flex"} justifyContent={"center"}>
                            <Image
                              src={infoPage}
                              width={"600px"}
                              height={"600px"}
                              marginTop={"40px"}
                            ></Image>
                          </ModalBody>

                          <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                              Close
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    </Box>
                  </Box>
                  {preview ? (
                    <Box>
                      <ReactMarkdown
                        className="markdown"
                        children={postBody}
                        remarkPlugins={[remarkGfm]}
                        width={{ base: "300px", md: "800px" }}
                      />
                      {/* <ReactMarkdown>{ postBody}</ReactMarkdown> */}
                    </Box>
                  ) : (
                    <Textarea
                      resize={"none"}
                      backgroundColor={"inherit"}
                      color={"#cfbccc"}
                      fontSize={"24px"}
                      fontFamily={"helvetica"}
                      height={"100vh"}
                      border={"none"}
                      outline={"none"}
                      value={postBody}
                      onChange={(e) => setPostBody(e.target.value)}
                      width={{ base: "300px", md: "800px" }}
                    ></Textarea>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Write;
