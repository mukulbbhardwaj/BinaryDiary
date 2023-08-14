import { React } from "react";
import { Box, Image, Text, useToast } from "@chakra-ui/react";
import pfp from "../../../src/asset/user.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import { useLocation } from "react-router-dom";
import {
  databases,
  DATABASE_ID,
  COLLECTION_ID_BLOGS,
} from "../../api/appwrite";
import UpdatePostModal from "../modals/UpdatePostModal";
import Logo from "./Logo";

const EditPostNavBar = ({ postBody, postTitle }) => {
  const { user } = useAuth();
  const toast = useToast();
  const location = useLocation();
  const POST_ID = location.pathname.split("/")[2];
  const saveToDraft = async () => {
    try {
       await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID_BLOGS,
        POST_ID,
        {
          title: postTitle,
          body: postBody,
          username: user.name,
          isDraft: "true",
        }
      );
      toast({
        title: "draft saved",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        status: "error",
        duration: 2000,
      });
    }
  };
  return (
    <div>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-evenly"}
        marginTop={"2rem"}
      >
        <Link to={"/"}>
          {/* <Image src={logo} height={"3rem"} width={"3rem"} /> */}
          <Logo />
        </Link>
        {/* <Link to={"/write"} style={{ textDecoration: "none", color: "black" }}> */}
        <Box display={"flex"} alignItems={"center"} gap={"4px"}>
          <UpdatePostModal
            postBody={postBody}
            postTitle={postTitle}
            POST_ID={POST_ID}
          >
            <Text className="btn">publish</Text>
          </UpdatePostModal>
          <Text className="btn" onClick={saveToDraft}>
            save to draft
          </Text>
        </Box>
        {/* </Link> */}

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
    </div>
  );
};

export default EditPostNavBar;
