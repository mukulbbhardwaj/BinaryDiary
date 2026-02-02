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

export default function Register() {
  const navigate = useNavigate();
  const { user, registerUser } = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser({ email, username, password });
  };

  return (
    <PageLayout>
      <Box as="main" py={{ base: 8, md: 12 }} maxW="400px" mx="auto">
        <RouterLink to="/">
          <Text
            fontSize="sm"
            color="text.muted"
            _hover={{ color: "brand.400" }}
            mb={8}
            display="inline-block"
          >
            ← Back to home
          </Text>
        </RouterLink>

        <Text as="h1" fontSize={{ base: "2xl", md: "4xl" }} fontWeight="600" color="text.primary" mb={1}>
          Create an account
        </Text>
        <Text color="text.muted" mb={8}>
          Join Binary Diary to write and share your stories
        </Text>

        <form onSubmit={handleSubmit}>
          <VStack align="stretch" spacing={5}>
            <FormControl isRequired>
              <FormLabel fontSize="sm" fontWeight="500" color="text.secondary">
                Email
              </FormLabel>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                bg="surface.card"
                borderColor="surface.border"
                _focus={{ borderColor: "brand.500", boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)" }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" fontWeight="500" color="text.secondary">
                Username
              </FormLabel>
              <Input
                type="text"
                placeholder="yourname"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                bg="surface.card"
                borderColor="surface.border"
                _focus={{ borderColor: "brand.500", boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)" }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" fontWeight="500" color="text.secondary">
                Password
              </FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  bg="surface.card"
                  borderColor="surface.border"
                  _focus={{ borderColor: "brand.500", boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)" }}
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

            <Button type="submit" colorScheme="brand" size="lg" w="100%" mt={2}>
              Sign up
            </Button>
          </VStack>
        </form>

        <Text mt={8} fontSize="sm" color="text.muted">
          Already have an account?{" "}
          <Link as={RouterLink} to="/login" color="brand.400" fontWeight="500" _hover={{ textDecoration: "underline" }}>
            Sign in
          </Link>
        </Text>
      </Box>
    </PageLayout>
  );
}
