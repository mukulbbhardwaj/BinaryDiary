import { useEffect, useState } from "react";
import { Box, Button, Text, Spinner, Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
import { Link } from "react-router-dom";
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
            borderRadius="xl"
            p={6}
            mb={8}
            bg="surface.card"
          >
            <Text fontSize="xl" fontWeight="700" color="text.primary">
              {user?.name}
            </Text>
            <Text fontSize="sm" color="text.muted" mt={1}>
              {user?.email}
            </Text>
          </Box>

          <Text as="h2" fontSize="2xl" fontWeight="600" color="text.primary" mb={4}>
            Your articles
          </Text>

          <Box display="flex" gap={2} mb={6}>
            <Button
              size="sm"
              variant={activeTab === "published" ? "solid" : "outline"}
              colorScheme="brand"
              borderColor="surface.border"
              onClick={() => setActiveTab("published")}
            >
              Published
            </Button>
            <Button
              size="sm"
              variant={activeTab === "drafts" ? "solid" : "outline"}
              colorScheme="brand"
              borderColor="surface.border"
              onClick={() => setActiveTab("drafts")}
            >
              Drafts
            </Button>
          </Box>

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

          {!loading && !error && (
            <>
              {activeTab === "published" && (
                <>
                  {userPosts.length === 0 ? (
                    <Text color="text.muted">No published posts yet.</Text>
                  ) : (
                    <Box as="ul" listStyleType="none" m={0} p={0}>
                      {userPosts.map((post) => (
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
                </>
              )}
              {activeTab === "drafts" && (
                <>
                  {userDrafts.length === 0 ? (
                    <Text color="text.muted">No drafts.</Text>
                  ) : (
                    <Box as="ul" listStyleType="none" m={0} p={0}>
                      {userDrafts.map((post) => (
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
                </>
              )}
            </>
          )}
        </Box>
      </Box>
    </PageLayout>
  );
}
