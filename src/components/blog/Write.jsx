import React, { useState } from "react";
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

// import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import WriteNavBar from "../misc/WriteNavBar";
import Info from "../misc/Info";

const Write = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("Hello");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

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
          <WriteNavBar
            postBody={postBody}
            postTitle={postTitle}
            isDraft={false}
          />

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
                width={"70px"}
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
                width={"70px"}
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
                  children={postBody}
                  remarkPlugins={[remarkGfm]}
                  width={{ base: "300px", md: "800px" }}
                />
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
                boxShadow={"none"}
              ></Textarea>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Write;
