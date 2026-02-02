import { useEffect, useState } from "react";
import { Box, Text, Spinner, Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Query } from "appwrite";
import { databases, DATABASE_ID, COLLECTION_ID_BLOGS } from "../api/appwrite";
import NavBar from "../components/misc/NavBar";
import HomeBanner from "../components/misc/HomeBanner";
import BlogListItem from "../components/blog/BlogListItem";
import Footer from "../components/misc/Footer";
import { PageLayout } from "../components/layout/PageLayout";

export default function Home() {
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
          fontSize={{ base: "2xl", lg: "3xl" }}
          fontWeight="600"
          color="text.primary"
          borderBottom="1px solid"
          borderColor="surface.border"
          pb={3}
          mb={6}
        >
          Latest articles
        </Text>

        {loading && (
          <Box py={12} display="flex" justifyContent="center">
            <Spinner size="lg" color="brand.500" />
          </Box>
        )}

        {error && (
          <Alert status="error" borderRadius="lg" mb={6}>
            <AlertIcon />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}

        {!loading && !error && posts.length === 0 && (
          <Text color="text.muted" py={8}>
            No articles yet. Be the first to write one!
          </Text>
        )}

        {!loading && !error && posts.length > 0 && (
          <Box as="ul" listStyleType="none" m={0} p={0}>
            {posts.map((post) => (
              <Box as="li" key={post.$id}>
                <Link to={`/post/${post.$id}`} style={{ textDecoration: "none" }}>
                  <BlogListItem
                    title={post.title}
                    date={moment(post.$createdAt).format("DD MMMM, YYYY")}
                    username={post.username}
                  />
                </Link>
              </Box>
            ))}
          </Box>
        )}

        <Footer />
      </Box>
    </PageLayout>
  );
}
