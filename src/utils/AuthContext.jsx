import { useContext, useState, useEffect, createContext } from "react";
import { account } from "../api/appwrite";
import { ID } from "appwrite";
import { Spinner, Box, useToast } from "@chakra-ui/react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);
  const toast = useToast();

  useEffect(() => {
    checkUserStatus();
  }, []);

  const loginUser = async (userInfo) => {
    setLoading(true);
    try {
      if (!userInfo.email || !userInfo.password) {
        toast({
          title: "fill password and email",
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
        setLoading(false);
        return;
      }
      if (userInfo.password.length < 8) {
        toast({
          title: "password must be atleast 8 characters",
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
        setLoading(false);
        return;
      }
      await account.createEmailSession(userInfo.email, userInfo.password);
      let accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      console.error(error);
      alert("Something went wrong try again");
      setLoading(false);
    }

    setLoading(false);
  };
  const logOutUser = async () => {
    account.deleteSession("current");
    setUser(null);
  };
  const registerUser = async (userInfo) => {
    setLoading(true);
    if (!userInfo.email || !userInfo.password || !userInfo.username) {
      toast({
        title: "fill all fields",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    if (userInfo.password.length < 8) {
      toast({
        title: "password must be atleast 8 characters",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    if (userInfo.username.length < 6) {
      toast({
        title: "username must be atleast 6 characters",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    try {
      await account.create(
        ID.unique(),
        userInfo.email,
        userInfo.password,
        userInfo.username
      );
      await account.createEmailSession(userInfo.email, userInfo.password);
      let accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      console.error(error);
      alert(error);
      setLoading(false);
    }
    setLoading(false);
  };
  const checkUserStatus = async () => {
    try {
      let accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {}

    setLoading(false);
  };
  const contextdata = {
    data: "data",
    user,
    loginUser,
    logOutUser,
    registerUser,
  };
  return (
    <AuthContext.Provider value={contextdata}>
      {loading ? (
        <Box
          height={"100vh"}
          bgColor={"black"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            size="xl"
          />
        </Box>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
