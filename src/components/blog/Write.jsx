import React, { useState } from "react";
import { Alert, Box, Input, Textarea } from "@chakra-ui/react";
import { Image, Text } from "@chakra-ui/react";
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
const Write = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const DOCUMENT_ID = ID.unique();
  const publishPost = async () => {
    try {
      setLoading(true);
      const post = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID_BLOGS,
        DOCUMENT_ID,
        {
          title: postTitle,
          body: postBody,
          username:user.name,
        }
      );
      console.log(user);
      // console.log(post);
      setLoading(false)
      navigate(`/post/${post.$id}`);
      
    } catch (error) {
      console.error(error);
      setLoading(false);
    
    }
  };

  return loading ? (
    "loading..."
  ) : (
    <div>
      <div>
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
            fontWeight={150}
            border={"2px solid green"}
            padding={"0.5rem"}
            borderRadius={"20px"}
            boxSize={"max-content"}
            onClick={publishPost}
          >
            publish
          </Text>

          <Link to={"/profile"}>
            <Image src={userLogo} height={"2rem"} width={"2rem"} color={"red"} />
          </Link>
        </Box>
      </div>

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
              padding={"10px"}
              fontSize={"64px"}
              border={"none"}
              outline={"none"}
              fontWeight={"10"}
              placeholder="title..."
              borderBottom="2px solid red"
            />
          </Box>

          <Textarea
            onChange={(e) => setPostBody(e.target.value)}
            placeholder="tell your story..."
            resize={"none"}
            border={"none"}
            outline={"none"}
            height={"70vh"}
            fontSize={"32px"}
            fontFamily={"Helvetica Neue"}
            padding={"10px"}
          />
        </Box>
      </Box>
    </div>
  );
};

export default Write;
