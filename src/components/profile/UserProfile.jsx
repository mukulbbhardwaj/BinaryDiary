import React, { useEffect, useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import BlogListItem from "../blog/BlogListItem";
import NavBar from "../misc/NavBar";
import moment from "moment";
import { useAuth } from "../../utils/AuthContext";
import {
  databases,
  COLLECTION_ID_BLOGS,
  DATABASE_ID,
} from "../../api/appwrite";
import { Query } from "appwrite";
import { Link } from "react-router-dom";
const UserProfile = () => {
  const { user } = useAuth();
  const [userPosts, setUserPosts] = useState([]);
  const [userDrafts, setUserDrafts] = useState([]);
  const [draftBtnState, setDraftBtnState] = useState(false);
  useEffect(() => {
    getPublishedPosts();
    getDraftPosts();
  }, []);
  const getPublishedPosts = async () => {
    const res = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_BLOGS,
      [
        Query.equal("username", [user.name]),
        Query.orderDesc("$createdAt"),
        Query.equal("isDraft", "false"),
      ]
    );
    setUserPosts(res.documents);
  };

  const getDraftPosts = async () => {
    const res = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_BLOGS,
      [
        Query.equal("username", [user.name]),
        Query.orderDesc("$createdAt"),
        Query.equal("isDraft", "true"),
      ]
    );
    setUserDrafts(res.documents);
  };

  return (
    <>
      <Box
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        bgColor={"#1a1b1f"}
        color={"#838a8f"}
      >
        <Box width={{ base: "300px", md: "800px" }}>
          <NavBar />
          <Box
            display={"flex"}
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Box>
              <Box
                border={"1px solid #26282e"}
                padding={"2rem"}
                borderRadius={"1rem"}
                margin={{ base: "10px", lg: "100px" }}
              >
                <Text fontSize={"24px"} fontWeight={700} color={"#ebc5c3"}>
                  {user.name}
                </Text>
                <Text fontWeight={400} fontSize={"18px"} color={"#b8b1b0"}>
                  {user.email}
                </Text>
              </Box>
              <Box>
                <Text
                  fontSize={{ base: "32px", lg: "48px" }}
                  fontWeight={"600"}
                  borderBottom={"1px solid #332c32"}
                  color={"gray"}
                  margin={"2rem"}
                >
                  Your Articles:
                </Text>

                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  gap={"4px"}
                  marginBottom={"8px"}
                >
                  <Text
                    bgColor={"#1f222b"}
                    cursor={"pointer"}
                    padding={"4px"}
                    borderRadius={"6px"}
                    _hover={{ color: "white" }}
                    border={"1px solid #5c595a"}
                    onClick={(e) => setDraftBtnState(false)}
                  >
                    Published
                  </Text>
                  <Text
                    bgColor={"#1f222b"}
                    cursor={"pointer"}
                    padding={"4px"}
                    borderRadius={"6px"}
                    border={"1px solid #5c595a"}
                    _hover={{ color: "white" }}
                    onClick={(e) => setDraftBtnState(true)}
                  >
                    Drafts
                  </Text>
                </Box>

                {draftBtnState ? (
                  <>
                    {userDrafts.map((post) => (
                      <Link
                        to={`/post/${post.$id}`}
                        style={{ textDecoration: "none" }}
                        key={post.$id}
                      >
                        <BlogListItem
                          title={post.title}
                          date={moment(post.$createdAt).format("DD MMMM,YYYY")}
                          username={post.name}
                        />
                      </Link>
                    ))}
                  </>
                ) : (
                  <>
                    {userPosts.map((post) => (
                      <Link
                        to={`/post/${post.$id}`}
                        style={{ textDecoration: "none" }}
                        key={post.$id}
                      >
                        <BlogListItem
                          title={post.title}
                          date={moment(post.$createdAt).format("DD MMMM,YYYY")}
                          username={post.name}
                        />
                      </Link>
                    ))}
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserProfile;
