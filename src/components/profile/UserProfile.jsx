import React from "react";
import { Box, Text } from "@chakra-ui/react";
import BlogListItem from "../blog/BlogListItem";
import NavBar from "../misc/NavBar";
import { useAuth } from "../../utils/AuthContext";
const UserProfile = () => {
  const { user, logOutUser } = useAuth();

  return (
    <>
      <NavBar />
      <Box
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        textAlign={"left"}
      >
        <Box>
          <Box display={"flex"} justifyContent={'space-between'} alignItems={'center'}>
            <Box>

            <Text fontSize={'24px'} fontWeight={300}>{user.name}</Text>
            <Text fontWeight={100}>{user.email}</Text>
            </Box>
            <Text
              fontSize={"24px"}
              fontWeight={150}
              border={"2px solid red"}
              _hover={{ bgColor: "red" , color:'white' }}
              padding={"0.5rem"}
              borderRadius={"20px"}
              boxSize={"max-content"}
              onClick={logOutUser}
              cursor={"pointer"}
            >
              logout
            </Text>
          </Box>
          <Text
            fontSize={"64px"}
            fontWeight={"100"}
            borderBottom={"1px solid black"}
            color={"red"}
          >
            articles by you
          </Text>
          <BlogListItem />
          <BlogListItem />
          <BlogListItem />
        </Box>
      </Box>
    </>
  );
};

export default UserProfile;
