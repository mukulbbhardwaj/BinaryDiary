import React, { useRef, useState ,useEffect} from "react";
import { Box, Input, Image, Text, Textarea } from "@chakra-ui/react";
import EditorJS from "@editorjs/editorjs";
// import { Box } from "@chakra-ui/react";
import Header from "@editorjs/header";
import List from "@editorjs/list";
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
import Editor from "./Editor";

const Write = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const DOCUMENT_ID = ID.unique();



     useEffect(() => {
       if (ejInstance.current === null) {
         initEditor();
       }
       return () => {
         ejInstance?.current?.destroy();
         ejInstance.current = null;
       };
     }, []);


  // console.log(publish)
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





const ejInstance = useRef();
const initEditor = () => {
  const editor = new EditorJS({
    holder: "editorBox",
    onReady: () => {
      ejInstance.current = editor;
    },
    autofocus: true,
    onChange: async () => {
      let content = await editor.save();
      console.log(content.blocks);
      setPostBody(content.blocks);
      console.log("content",postBody);
    },
    tools: {
      header: Header,
      list: List,
    },
  });
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
                <Box>
                  <Textarea
                    type="text"
                    onChange={(e) => setPostTitle(e.target.value)}
                    fontSize={"48px"}
                    fontWeight={"800"}
                    borderBottom={"1px solid #332c32"}
                    color={"#cfbccc"}
                    margin={"0.5rem"}
                    bgColor={"inherit"}
                    outline={0}
                    border={0}
                    placeholder="title..."
                    resize={"none"}
                    width={"400px"}
                    fontFamily={"helvetica"}
                  />
                  {/* <Input
                    type="text"
                    onChange={(e) => setPostBody(e.target.value)}
                    fontWeight={"800"}
                    borderBottom={"1px solid #332c32"}
                    color={"#cfbccc"}
                    margin={"0.5rem"}
                    bgColor={"inherit"}
                    outline={0}
                    border={0}
                    placeholder="write your story"
                    marginTop={"2rem"}
                    fontSize={"24px"}
                  /> */}
                  <div id="editorBox"></div>
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
