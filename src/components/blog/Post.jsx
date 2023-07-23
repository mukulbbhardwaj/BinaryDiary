import { Box, Text } from "@chakra-ui/react";
import React from "react";
import NavBar from "../misc/NavBar";


const Post = () => {
  return (
    <>
      <NavBar />
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
        <Box
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          width={"60%"}
          style={{ border: "0px" }}
          borderColor={"red"}
          borderWidth={"2px"}
        >
          <Box>
            <Text
              fontSize={"64px"}
              fontWeight={"100"}
              borderBottom={"1px solid black"}
              color={"red"}
            >
              title
            </Text>
            <Box display={"flex"} flexWrap={"wrap"}>
        
           {/* {Post.body} */}
              culpa. Porro quaerat laudantium necessitatibus cum sunt?
              Asperiores, modi! Adipisci voluptatibus aliquam autem similique
              quidem, omnis ad id repellat earum qui eos aliquid culpa, ea nemo
              accusantium accusamus explicabo, provident vitae! Voluptas, vel
              sequi!
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Post;
