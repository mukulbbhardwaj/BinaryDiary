import { useEffect, useState } from "react";
import { Box, Spinner, Alert, AlertIcon, AlertTitle, Tooltip } from "@chakra-ui/react";
import { ChevronUpIcon } from "@chakra-ui/icons";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { databases, DATABASE_ID, COLLECTION_ID_BLOGS } from "../../../api/appwrite";
import { useAuth } from "../../../utils/AuthContext";
import NavBar from "../../misc/NavBar";
import PostHeading from "./PostHeading";
import PostBody from "./PostBody";
import Footer from "../../misc/Footer";
import { PageLayout } from "../../layout/PageLayout";

export default function Main() {
  const { postId } = useParams();
  const { user } = useAuth();
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!postId) return;
    let cancelled = false;

    async function fetchPost() {
      try {
        setError(null);
        const res = await databases.getDocument(DATABASE_ID, COLLECTION_ID_BLOGS, postId);
        if (!cancelled) setPostData(res);
      } catch (err) {
        if (!cancelled) setError(err?.message ?? "Failed to load post");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPost();
    return () => { cancelled = true; };
  }, [postId]);

  if (loading) {
    return (
      <PageLayout>
        <Box py={20} display="flex" justifyContent="center">
          <Spinner size="xl" color="brand.500" />
        </Box>
      </PageLayout>
    );
  }

  if (error || !postData) {
    return (
      <PageLayout>
        <Box py={12}>
          <Alert status="error" borderRadius="lg">
            <AlertIcon />
            <AlertTitle>{error ?? "Post not found"}</AlertTitle>
          </Alert>
        </Box>
      </PageLayout>
    );
  }

  const date = moment(postData.$createdAt).format("DD MMMM, YYYY");
  const isAuthor = user?.name === postData.username;

  return (
    <PageLayout>
      <Box id="top" display="flex" flexDir="column" minH="100vh" w="100%">
        <NavBar />
        <PostHeading
          postData={postData}
          documentId={postData.$id}
          date={date}
          isAuthor={isAuthor}
        />
        <PostBody postData={postData} />

        <Tooltip label="Back to top" hasArrow placement="left">
          <Box
            as={Link}
            to="#top"
            aria-label="Go to top"
            position="fixed"
            bottom={{ base: 6, lg: 8 }}
            right={{ base: 6, lg: 8 }}
            w={12}
            h={12}
            borderRadius="full"
            bg="surface.card"
            border="1px solid"
            borderColor="surface.border"
            color="text.primary"
            display="flex"
            alignItems="center"
            justifyContent="center"
            _hover={{ bg: "surface.muted" }}
            boxShadow="lg"
            transition="all 0.15s"
          >
            <ChevronUpIcon boxSize={6} />
          </Box>
        </Tooltip>

        <Footer />
      </Box>
    </PageLayout>
  );
}
