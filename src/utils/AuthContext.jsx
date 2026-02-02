import { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { account } from "../api/appwrite";
import { ID } from "appwrite";
import { Spinner, Box } from "@chakra-ui/react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const toast = useToast();

  const checkUserStatus = async () => {
    try {
      const accountDetails = await account.get();
      setUser(accountDetails);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  const loginUser = async (userInfo) => {
    setLoading(true);
    try {
      if (!userInfo?.email || !userInfo?.password) {
        toast({ title: "Please enter email and password", status: "warning", duration: 3000, isClosable: true });
        setLoading(false);
        return;
      }
      if (userInfo.password.length < 8) {
        toast({ title: "Password must be at least 8 characters", status: "warning", duration: 3000, isClosable: true });
        setLoading(false);
        return;
      }
      await account.createEmailSession(userInfo.email, userInfo.password);
      const accountDetails = await account.get();
      setUser(accountDetails);
      toast({ title: "Welcome back!", status: "success", duration: 2000, isClosable: true });
    } catch (error) {
      const message = error?.message?.toLowerCase?.().includes("invalid") ? "Invalid email or password" : "Something went wrong. Please try again.";
      toast({ title: message, status: "error", duration: 4000, isClosable: true });
    } finally {
      setLoading(false);
    }
  };

  const logOutUser = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
      toast({ title: "Signed out", status: "info", duration: 2000, isClosable: true });
    } catch {
      setUser(null);
    }
  };

  const registerUser = async (userInfo) => {
    setLoading(true);
    try {
      if (!userInfo?.email || !userInfo?.password || !userInfo?.username) {
        toast({ title: "Please fill all fields", status: "warning", duration: 3000, isClosable: true });
        setLoading(false);
        return;
      }
      if (userInfo.password.length < 8) {
        toast({ title: "Password must be at least 8 characters", status: "warning", duration: 3000, isClosable: true });
        setLoading(false);
        return;
      }
      if (userInfo.username.length < 6) {
        toast({ title: "Username must be at least 6 characters", status: "warning", duration: 3000, isClosable: true });
        setLoading(false);
        return;
      }
      await account.create(ID.unique(), userInfo.email, userInfo.password, userInfo.username);
      await account.createEmailSession(userInfo.email, userInfo.password);
      const accountDetails = await account.get();
      setUser(accountDetails);
      toast({ title: "Account created. Welcome!", status: "success", duration: 2000, isClosable: true });
    } catch (error) {
      const msg = error?.message ?? "Registration failed. Please try again.";
      toast({ title: msg, status: "error", duration: 4000, isClosable: true });
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loginUser,
    logOutUser,
    registerUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <Box h="100vh" bg="surface.bg" display="flex" alignItems="center" justifyContent="center">
          <Spinner size="xl" color="brand.500" thickness="3px" />
        </Box>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export default AuthContext;
