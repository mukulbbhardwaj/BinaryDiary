import { Box, Text } from "@chakra-ui/react";
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

const Post = () => {
  const [postData, setPostData] = useState({});
  const { user } = useAuth();
  useEffect(() => {
    getPost();
  }, []);
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
  console.log("username", user.name);
  console.log("author", postData.username);
  const deletePost = async () => {
    if (!isAuthor) return;
    await databases.deleteDocument(
      DATABASE_ID,
      COLLECTION_ID_BLOGS,
      DOCUMENT_ID
    );
    navigate("/");
  };

  return (
    <>
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
              display={'flex'}
              fontSize={"64px"}
              fontWeight={"800"}
              borderBottom={"1px solid #332c32"}
              color={"#cfbccc"}
              margin={"0.5rem"}
            >
              <Text wordBreak={'break-word'}>
              {postData.title}
              </Text>
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

              <Box onClick={deletePost}>{isAuthor ? <DeleteIcon /> : ""}</Box>
            </Box>
            <Box marginTop={"2rem"} fontSize={"24px"} >
              <div dangerouslySetInnerHTML={{ __html: postData.body }}></div>
              <Text textAlign={'center'} fontSize={'64px'} > ...</Text>
            </Box>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Post;
