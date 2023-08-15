import { Box, Text, Button, Tooltip } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NavBar from "../../misc/NavBar";
import { Link, useLocation } from "react-router-dom";
import {
  databases,
  DATABASE_ID,
  COLLECTION_ID_BLOGS,
} from "../../../api/appwrite";
import moment from "moment";
import { ChevronUpIcon, DeleteIcon } from "@chakra-ui/icons";
import { useAuth } from "../../../utils/AuthContext";
import ShareLinks from "../SharLinks";
import ReactMarkdown from "react-markdown";
import DeletePostModal from "../../modals/DeletePostModal";
import Footer from "../../misc/Footer";
import PostHeading from "./PostHeading";
import PostBody from "./PostBody";

const Main = () => {
  const [postData, setPostData] = useState({});
  const { user } = useAuth();
  useEffect(() => {
    getPost();
  }, []);

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
  return (
    <>
      <Box
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        bgColor={"#1a1b1f"}
      >
        <Box width={{ base: "300px", md: "800px" }}>
          <Box id="top">
            <NavBar />
          </Box>
          <PostHeading postData={postData} isAuthor={isAuthor} date={date} />
          <PostBody postData={postData} />
      
            <a href="#top">
              <Box
                position={"fixed"}
                bottom={{ base: "2rem", lg: "4rem" }}
                right={{ base: "2rem", lg: "4rem" }}
                border={"0.5px solid #2b2c33"}
                borderRadius={"1rem"}
                _hover={{ bgColor: "#2b2c33" }}
            >
              <Tooltip label={"Go to top"} hasArrow>
                
                <ChevronUpIcon fontSize={"48px"} color={"white"} />
                  </Tooltip>
              </Box>
            </a>

        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default Main;
