import React from "react";
import { DeleteIcon, TimeIcon } from "@chakra-ui/icons";
import { Box, Text, Button } from "@chakra-ui/react";
import moment from "moment";
import { Link, useLocation } from "react-router-dom";
import ShareLinks from "../SharLinks";
import DeletePostModal from "../../modals/DeletePostModal";
import { useAuth } from "../../../utils/AuthContext";
const PostHeading = ({ postData, DOCUMENT_ID, date, isAuthor }) => {
  return (
    <Box
      border={"0.5px solid #2b2c33"}
      borderRadius={"1rem"}
      display={"flex"}
      flexDir={"column"}
      color={"#d1d1d1"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"60vh"}
      margin={"8px"}
    >
      <Text textAlign={"center"} fontSize={{ base: "32px", md: "48px" }}>
        {postData.title}
      </Text>

      {/* POST DETAILS */}
      <Text m={0}>{postData.username}</Text>
      <Text fontSize={"12px"} m={0}>
        <TimeIcon /> {date}
      </Text>

      {/* OPTIONS  */}
      <Box display={"flex"} alignItems={"center"} gap={"4px"} margin={"20px"}>
        <ShareLinks />
        {isAuthor ? (
          <Box display={"flex"} gap={"4px"}>
            <Link to={`/edit/${DOCUMENT_ID}`}>
              <Button size={"sm"}>edit</Button>
            </Link>
            <DeletePostModal>
              <Button size={"sm"}>
                <DeleteIcon />
              </Button>
            </DeletePostModal>
          </Box>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default PostHeading;
