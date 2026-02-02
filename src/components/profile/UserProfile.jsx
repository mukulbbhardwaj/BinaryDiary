import { useEffect, useState } from "react";
import { Box, Button, Text, Spinner, Alert, AlertIcon, AlertTitle, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import moment from "moment";
import { Query } from "appwrite";
import { useAuth } from "../../utils/AuthContext";
import { databases, DATABASE_ID, COLLECTION_ID_BLOGS } from "../../api/appwrite";
import NavBar from "../misc/NavBar";
import BlogListItem from "../blog/BlogListItem";
import { PageLayout } from "../layout/PageLayout";

export default function UserProfile() {
  const { user } = useAuth();
  const [userPosts, setUserPosts] = useState([]);
  const [userDrafts, setUserDrafts] = useState([]);
  const [activeTab, setActiveTab] = useState("published");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const username = user?.name ?? "";

  useEffect(() => {
    if (!username) return;
    let cancelled = false;

    async function fetchPosts() {
      try {
        setError(null);
        const [publishedRes, draftsRes] = await Promise.all([
          databases.listDocuments(DATABASE_ID, COLLECTION_ID_BLOGS, [
            Query.equal("username", [username]),
            Query.orderDesc("$createdAt"),
            Query.equal("isDraft", "false"),
          ]),
          databases.listDocuments(DATABASE_ID, COLLECTION_ID_BLOGS, [
            Query.equal("username", [username]),
            Query.orderDesc("$createdAt"),
            Query.equal("isDraft", "true"),
          ]),
        ]);
        if (!cancelled) {
          setUserPosts(publishedRes.documents);
          setUserDrafts(draftsRes.documents);
        }
      } catch (err) {
        if (!cancelled) setError(err?.message ?? "Failed to load posts");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPosts();
    return () => { cancelled = true; };
  }, [username]);

  return (
    <PageLayout>
      <Box display="flex" flexDir="column" minH="100vh" w="100%">
        <NavBar />

        <Box as="main" py={8}>
          <Box
            border="1px solid"
            borderColor="surface.border"
            borderRadius="2xl"
            p={6}
            mb={8}
            bg="surface.card"
            boxShadow="card"
          >
            <Text fontSize="xl" fontWeight="700" color="text.primary" letterSpacing="-0.02em">
              {user?.name}
            </Text>
            <Text fontSize="sm" color="text.muted" mt={1}>
              {user?.email}
            </Text>
          </Box>

          <Text as="h2" fontSize="xl" fontWeight="600" color="text.primary" mb={4} letterSpacing="-0.02em">
            Your articles
          </Text>

          <Box display="flex" gap={2} mb={6}>
            <Button
              size="sm"
              variant={activeTab === "published" ? "solid" : "outline"}
              colorScheme="brand"
              borderRadius="lg"
              onClick={() => setActiveTab("published")}
            >
              Published
            </Button>
            <Button
              size="sm"
              variant={activeTab === "drafts" ? "solid" : "outline"}
              colorScheme="brand"
              borderRadius="lg"
              onClick={() => setActiveTab("drafts")}
            >
              Drafts
            </Button>
          </Box>

          {loading && (
            <VStack py={16} spacing={4}>
              <Spinner size="lg" color="brand.500" thickness="3px" />
              <Text color="text.muted" fontSize="sm">
                Loading your posts...
              </Text>
            </VStack>
          )}

          {error && (
            <Alert status="error" borderRadius="xl" mb={6} variant="subtle">
              <AlertIcon />
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}

          {!loading && !error && (
            <>
              {activeTab === "published" && (
                <>
                  {userPosts.length === 0 ? (
                    <Text color="text.muted" py={8}>
                      No published posts yet.
                    </Text>
                  ) : (
                    <Box as="ul" listStyleType="none" m={0} p={0}>
                      {userPosts.map((post) => (
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
                </>
              )}
              {activeTab === "drafts" && (
                <>
                  {userDrafts.length === 0 ? (
                    <Text color="text.muted" py={8}>
                      No drafts.
                    </Text>
                  ) : (
                    <Box as="ul" listStyleType="none" m={0} p={0}>
                      {userDrafts.map((post) => (
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
                </>
              )}
            </>
          )}
        </Box>
      </Box>
    </PageLayout>
  );
}
