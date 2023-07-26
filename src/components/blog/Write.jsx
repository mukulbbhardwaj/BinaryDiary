import React, { useRef, useState } from "react";
import {
  Box,
  Input,
  Image,
  Text,
} from "@chakra-ui/react";

import logo from "../../../src/asset/logo-sm.png";
import userLogo from "../../../src/asset/user.png";
import { Link, useNavigate } from "react-router-dom";
import { ID } from "appwrite";
import {
  databases,
  DATABASE_ID,
  COLLECTION_ID_BLOGS,
} from "../../api/appwrite";
import { useAuth } from "../../utils/AuthContext";
import JoditEditor from "jodit-react";

const Write = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const DOCUMENT_ID = ID.unique();

  const editor = useRef(null);


  const publishPost = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!(postTitle.length>0 && postBody.length > 0)) {
        alert("title or body cannot be empty")
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
    <Box width={"600px"}>
      <Box width={"60%"} alignItems={"center"}>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Link to={"/"}>
            <Image src={logo} height={"3rem"} width={"3rem"} />
          </Link>
          <Text
            fontSize={"24px"}
            fontWeight={650}
            padding={"0.5rem"}
            borderRadius={"20px"}
            boxSize={"max-content"}
            _hover={{ color: "white" }}
            cursor={"pointer"}
            color={"gray"}
            border={"0.5px solid gray"}
            onClick={publishPost}
          >
            publish
          </Text>

          <Link to={"/profile"}>
            <Image
              src={userLogo}
              height={"2rem"}
              width={"2rem"}
              color={"red"}
            />
          </Link>
        </Box>
      </Box>

      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Box
          display={"flex"}
          flexDir={"column"}
          justifyContent={"center"}
          width={"60%"}
        >
          <Box display={"flex"} alignItems={"center"}>
            <Input
              type="text"
              onChange={(e) => setPostTitle(e.target.value)}
              fontSize={"64px"}
              fontWeight={"800"}
              borderBottom={"1px solid #332c32"}
              color={"#cfbccc"}
                margin={"0.5rem"}
                bgColor={'inherit'} 
                outline={0}
                border={0}
                placeholder="title..."
            />
          </Box>

          <JoditEditor
            ref={editor}
            value={postBody}
            onChange={(content) => setPostBody(content)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Write;
