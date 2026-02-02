import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import { PageLayout } from "../layout/PageLayout";

export default function Login() {
  const navigate = useNavigate();
  const { user, loginUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({ email, password });
  };

  const handleGuestLogin = (e) => {
    e.preventDefault();
    loginUser({ email: "guest@binary.com", password: "binarydiary" });
  };

  return (
    <PageLayout>
      <Box as="main" py={{ base: 8, md: 12 }} w="100%" maxW="420px" mx="auto">
        <Box
          bg="surface.card"
          border="1px solid"
          borderColor="surface.border"
          borderRadius="2xl"
          p={{ base: 6, md: 8 }}
          boxShadow="card"
        >
          <RouterLink to="/">
            <Text
              fontSize="sm"
              color="text.muted"
              _hover={{ color: "brand.400" }}
              mb={6}
              display="inline-block"
            >
              ← Back to home
            </Text>
          </RouterLink>

          <Text as="h1" fontSize={{ base: "2xl", md: "3xl" }} fontWeight="700" color="text.primary" mb={1} letterSpacing="-0.02em">
            Welcome back
          </Text>
          <Text color="text.muted" mb={8} fontSize="md">
            Sign in to continue to Binary Diary
          </Text>

          <form onSubmit={handleSubmit}>
            <VStack align="stretch" spacing={5}>
              <FormControl isRequired>
                <FormLabel fontSize="sm" fontWeight="600" color="text.secondary">
                  Email
                </FormLabel>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  size="lg"
                  borderRadius="lg"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontSize="sm" fontWeight="600" color="text.secondary">
                  Password
                </FormLabel>
                <InputGroup size="lg">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    borderRadius="lg"
                  />
                  <InputRightElement>
                    <Button
                      size="sm"
                      variant="ghost"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword((p) => !p)}
                    >
                      {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <VStack w="100%" align="stretch" spacing={3} pt={2}>
                <Button type="submit" colorScheme="brand" size="lg" w="100%">
                  Sign in
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  w="100%"
                  onClick={handleGuestLogin}
                  borderRadius="lg"
                >
                  Continue as guest
                </Button>
              </VStack>
            </VStack>
          </form>

          <Text mt={8} fontSize="sm" color="text.muted" textAlign="center">
            Don’t have an account?{" "}
            <Link as={RouterLink} to="/register" color="brand.400" fontWeight="600" _hover={{ textDecoration: "underline" }}>
              Sign up
            </Link>
          </Text>
        </Box>
      </Box>
    </PageLayout>
  );
}
