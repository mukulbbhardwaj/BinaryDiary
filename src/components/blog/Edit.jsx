import { useState, useEffect } from "react";
import {
  Box,
  Textarea,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  VStack,
  Text,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useParams } from "react-router-dom";
import { databases, DATABASE_ID, COLLECTION_ID_BLOGS } from "../../api/appwrite";
import EditPostNavBar from "../misc/EditPostNavBar";
import Info from "../misc/Info";
import Footer from "../misc/Footer";
import { PageLayout } from "../layout/PageLayout";

export default function Edit() {
  const { postId } = useParams();
  const [postData, setPostData] = useState(null);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!postId) return;
    let cancelled = false;

    async function fetchPost() {
      try {
        setError(null);
        const res = await databases.getDocument(DATABASE_ID, COLLECTION_ID_BLOGS, postId);
        if (!cancelled) {
          setPostData(res);
          setPostTitle(res.title ?? "");
          setPostBody(res.body ?? "");
        }
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
        <VStack py={24} spacing={4}>
          <Spinner size="xl" color="brand.500" thickness="3px" />
          <Text color="text.muted" fontSize="sm">
            Loading post...
          </Text>
        </VStack>
      </PageLayout>
    );
  }

  if (error || !postData) {
    return (
      <PageLayout>
        <Box py={12}>
          <Alert status="error" borderRadius="xl" variant="subtle">
            <AlertIcon />
            <AlertTitle>{error ?? "Post not found"}</AlertTitle>
          </Alert>
        </Box>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Box display="flex" flexDir="column" minH="100vh" w="100%" color="text.secondary">
        <EditPostNavBar postBody={postBody} postTitle={postTitle} postId={postId} />

        <Box as="main" display="flex" flexDir="column" alignItems="center" w="100%" flex="1" py={6}>
          <Textarea
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            placeholder="Title..."
            fontSize={{ base: "2xl", md: "4xl" }}
            fontWeight="700"
            color="text.primary"
            bg="transparent"
            border="none"
            borderBottom="2px solid"
            borderColor="surface.border"
            borderRadius={0}
            resize="none"
            _focus={{ boxShadow: "none", borderColor: "brand.500" }}
            w="100%"
            maxW="800px"
            py={4}
            mb={4}
            letterSpacing="-0.02em"
          />

          <Box display="flex" gap={2} mb={6} flexWrap="wrap">
            <Button
              size="sm"
              variant="outline"
              borderRadius="lg"
              onClick={() => setPreview((p) => !p)}
            >
              {preview ? "Edit" : "Preview"}
            </Button>
            <Button size="sm" variant="outline" borderRadius="lg" onClick={onOpen}>
              Info
            </Button>
          </Box>

          <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent bg="surface.card" border="1px solid" borderColor="surface.border" borderRadius="2xl">
              <ModalBody py={6} display="flex" justifyContent="center">
                <Info />
              </ModalBody>
              <ModalFooter borderTop="1px solid" borderColor="surface.border" pt={4}>
                <Button colorScheme="brand" onClick={onClose} borderRadius="lg">
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {preview ? (
            <Box w="100%" maxW="800px" className="markdown" color="text.secondary" fontSize="lg" lineHeight="1.75">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{postBody}</ReactMarkdown>
            </Box>
          ) : (
            <Textarea
              value={postBody}
              onChange={(e) => setPostBody(e.target.value)}
              placeholder="Write your post in Markdown..."
              resize="none"
              minH="60vh"
              bg="transparent"
              color="text.secondary"
              fontSize="lg"
              border="none"
              _focus={{ boxShadow: "none" }}
              w="100%"
              maxW="800px"
              fontFamily="body"
              lineHeight="1.75"
            />
          )}
        </Box>

        <Footer />
      </Box>
    </PageLayout>
  );
}
