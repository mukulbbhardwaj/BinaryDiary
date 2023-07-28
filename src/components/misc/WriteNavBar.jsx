import { React} from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import logo from "../../../src/asset/logo-sm.png";
import pfp from "../../../src/asset/user.png";
import { Link } from "react-router-dom";
import PublishPostModal from "../modals/PublishPostModal";
import { useAuth } from "../../utils/AuthContext";

const WriteNavBar = ({postBody,postTitle}) => {
  const { user } = useAuth();
  
  return (
    <div>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-evenly"}
      >
        <Link to={"/"}>
          <Image src={logo} height={"3rem"} width={"3rem"} />
        </Link>
        <Link to={"/write"} style={{ textDecoration: "none", color: "black" }}>
          <Box display={"flex"} alignItems={"center"}>
            <PublishPostModal postBody={postBody} postTitle={postTitle}>
              <Text
                fontSize={"24px"}
                fontWeight={650}
                padding={"0.5rem"}
                borderRadius={"20px"}
                boxSize={"max-content"}
                _hover={{ color: "white" }}
                cursor={"pointer"}
                color={"gray"}
              >
                publish
              </Text>
            </PublishPostModal>
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
    </div>
  );
};

export default WriteNavBar;
