import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Input,
  Image,
  Text,
  Textarea,
  useStatStyles,
  Button
} from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
// import { Box } from "@chakra-ui/react";

import ReactMarkdown from "react-markdown";
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

const Write = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("Hello");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const [isInfo, setIsInfo] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();
  const { user } = useAuth();
  const DOCUMENT_ID = ID.unique();

  const publishPost = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!(postTitle.length > 0 && postBody.length > 0)) {
        alert("title or body cannot be empty");
        setLoading(false);
        return;
      }

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
      setLoading(false);
      navigate(`/post/${post.$id}`);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return loading ? (
    "loading..."
  ) : (
    <>
      <Box
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box width={"600px"}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
          >
            <Link to={"/"}>
              <Image src={logo} height={"3rem"} width={"3rem"} />
            </Link>
            <Link
              to={"/write"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Box display={"flex"} alignItems={"center"}>
                <Text
                  fontSize={"24px"}
                  fontWeight={650}
                  padding={"0.5rem"}
                  borderRadius={"20px"}
                  boxSize={"max-content"}
                  _hover={{ color: "white" }}
                  cursor={"pointer"}
                  color={"gray"}
                  onClick={publishPost}
                >
                  publish
                </Text>
              </Box>
            </Link>

            {user ? (
              <Link to={"/profile"}>
                <Image
                  src={pfp}
                  height={"2rem"}
                  width={"2rem"}
                  color={"red"}
                  cursor={"pointer"}
                />
              </Link>
            ) : (
              <Link to={"/login"} style={{ textDecoration: "none" }}>
                <Text
                  fontSize={"24px"}
                  color={"black"}
                  fontWeight={"200"}
                  _hover={{ fontWeight: "300" }}
                  cursor={"pointer"}
                >
                  login
                </Text>
              </Link>
            )}
          </Box>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Box
              display={"flex"}
              flexDir={"column"}
              justifyContent={"center"}
              width={"60%"}
            >
              <Box display={"flex"}>
                <Box margin={0}>
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
                    width={"400px"}
                    fontFamily={"helvetica"}
                    // height={'10px'}
                  />
                  {/* <div id="editorBox"></div>*/}
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
                      // onClick={(e) => setIsInfo(!isInfo)}
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
                    {console.log(isInfo)}
                    <Box
                      // display={isInfo ? "none" : "block"}
                      // bgColor={"black"}
                      // width={"400px"}
                      // height={"600px"}
                    >
                      <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Modal Title</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                           
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
                      <ReactMarkdown>{postBody}</ReactMarkdown>
                    </Box>
                  ) : (
                    <Textarea
                      resize={"unset"}
                      backgroundColor={"inherit"}
                      color={"#cfbccc"}
                      fontSize={"24px"}
                      fontFamily={"helvetica"}
                      width={"400px"}
                      height={"100px"}
                      border={"none"}
                      outline={"none"}
                      value={postBody}
                      onChange={(e) => setPostBody(e.target.value)}
                    >
                    </Textarea>
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
