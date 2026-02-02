import { useEffect, useState } from "react";
import { Box, Text, Spinner, Alert, AlertIcon, AlertTitle, VStack, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import moment from "moment";
import { Query } from "appwrite";
import { databases, DATABASE_ID, COLLECTION_ID_BLOGS } from "../api/appwrite";
import { useAuth } from "../utils/AuthContext";
import NavBar from "../components/misc/NavBar";
import HomeBanner from "../components/misc/HomeBanner";
import BlogListItem from "../components/blog/BlogListItem";
import Footer from "../components/misc/Footer";
import { PageLayout } from "../components/layout/PageLayout";

export default function Home() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchPosts() {
      try {
        setError(null);
        const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID_BLOGS, [
          Query.orderDesc("$createdAt"),
          Query.equal("isDraft", "false"),
        ]);
        if (!cancelled) setPosts(res.documents);
      } catch (err) {
        if (!cancelled) setError(err?.message ?? "Failed to load posts");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPosts();
    return () => { cancelled = true; };
  }, []);

  return (
    <PageLayout>
      <Box display="flex" flexDir="column" minH="100vh" w="100%">
        <NavBar />
        <HomeBanner />

        <Text
          as="h2"
          fontSize={{ base: "xl", lg: "2xl" }}
          fontWeight="600"
          color="text.primary"
          letterSpacing="-0.02em"
          borderBottom="1px solid"
          borderColor="surface.border"
          pb={3}
          mb={6}
        >
          Latest articles
        </Text>

        {loading && (
          <VStack py={16} spacing={4}>
            <Spinner size="xl" color="brand.500" thickness="3px" />
            <Text color="text.muted" fontSize="sm">
              Loading articles...
            </Text>
          </VStack>
        )}

        {error && (
          <Alert status="error" borderRadius="xl" mb={6} variant="subtle">
            <AlertIcon />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}

        {!loading && !error && posts.length === 0 && (
          <Box
            py={16}
            px={6}
            textAlign="center"
            borderRadius="xl"
            border="1px dashed"
            borderColor="surface.border"
            bg="surface.card"
          >
            <Text color="text.muted" mb={4} fontSize="lg">
              No articles yet.
            </Text>
            <Text color="text.secondary" fontSize="sm" mb={6}>
              {user ? "Be the first to write and share your story." : "Sign in to write and share your story."}
            </Text>
            <Link
              as={RouterLink}
              to={user ? "/write" : "/login"}
              display="inline-block"
              px={5}
              py={2.5}
              borderRadius="lg"
              bg="brand.500"
              color="white"
              fontWeight="600"
              fontSize="sm"
              _hover={{ bg: "brand.600", textDecoration: "none" }}
            >
              {user ? "Write your first post →" : "Sign in to write →"}
            </Link>
          </Box>
        )}

        {!loading && !error && posts.length > 0 && (
          <Box as="ul" listStyleType="none" m={0} p={0}>
            {posts.map((post) => (
              <Box as="li" key={post.$id}>
                <RouterLink to={`/post/${post.$id}`} style={{ textDecoration: "none" }}>
                  <BlogListItem
                    title={post.title}
                    date={moment(post.$createdAt).format("DD MMMM, YYYY")}
                    username={post.username}
                  />
                </RouterLink>
              </Box>
            ))}
          </Box>
        )}

        <Footer />
      </Box>
    </PageLayout>
  );
}
