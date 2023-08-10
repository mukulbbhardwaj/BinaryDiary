import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Textarea,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import {
  databases,
  DATABASE_ID,
  COLLECTION_ID_BLOGS,
} from "../../api/appwrite";
// import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import EditPostNavBar from "../misc/EditPostNavBar";
// import WriteNavBar from "../misc/WriteNavBar";
import Info from "../misc/Info";
import { useLocation } from "react-router-dom";
import Footer from "../misc/Footer";

const Edit = ({}) => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const location = useLocation();
  const POST_ID = location.pathname.split("/")[2];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postData, setPostData] = useState({});
  useEffect(() => {
    getPost();
  }, []);
  const getPost = async () => {
    const res = await databases.getDocument(
      DATABASE_ID,
      COLLECTION_ID_BLOGS,
      POST_ID
    );
    setPostData(res);
  };
  // console.log(postData);
  const [postTitle, setPostTitle] = useState(postData.title);
  const [postBody, setPostBody] = useState(postData.body);

  return loading ? (
    "loading..."
  ) : (
    <>
      <Box
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        bgColor={"#1a1b1f"}
        color={"#838a8f"}
      >
        <Box width={{ base: "300px", md: "800px" }}>
          <EditPostNavBar postBody={postBody} postTitle={postTitle} />
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
              defaultValue={postData.title}
              resize={"none"}
              fontFamily={"helvetica"}
              width={{ base: "300px", md: "800px" }}
            />

            <Box
              display={"flex"}
              width={"-moz-max-content"}
              textAlign={"center"}
              gap={"4px"}
            >
              <Text
                bgColor={"#1f222b"}
                onClick={(e) => setPreview(!preview)}
                cursor={"pointer"}
                padding={"4px"}
                borderRadius={"6px"}
                _hover={{ color: "white" }}
                border={"1px solid #5c595a"}
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
                textAlign={"center"}
                border={"1px solid #5c595a"}
              >
                info
              </Text>

              <Box>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent
                    display={"flex"}
                    flexDir={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <ModalBody display={"flex"} justifyContent={"center"}>
                      <Info />
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
                  remarkPlugins={[remarkGfm]}
                  width={{ base: "300px", md: "800px" }}
                >
                  {postBody}
                </ReactMarkdown>
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
                defaultValue={postData.body}
                onChange={(e) => setPostBody(e.target.value)}
                width={{ base: "300px", md: "800px" }}
                boxShadow={"none"}
              ></Textarea>
            )}
          </Box>
          </Box>
          <Footer/>
      </Box>
    </>
  );
};

export default Edit;
