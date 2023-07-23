import { useContext, useState, useEffect, createContext } from "react";
import { account } from "../api/appwrite";
import { ID } from "appwrite";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const loginUser = async (userInfo) => {
    setLoading(true);
    try {
      await account.createEmailSession(
        userInfo.email,
        userInfo.password
      );
      let accountDetails = await account.get();
      console.log("account details:", accountDetails);
      setUser(accountDetails);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };
  const logOutUser = async () => {
    account.deleteSession("current");
    setUser(null);
  };
  const registerUser = async (userInfo) => {
    setLoading(true);
    try {
      await account.create(
        ID.unique(),
        userInfo.email,
        userInfo.password,
        userInfo.username
      );
      await account.createEmailSession(userInfo.email, userInfo.password);
      let accountDetails = await account.get();
      console.log("account details:", accountDetails);
      setUser(accountDetails);
    } catch (error) {
      console.error(error);
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
      {loading ? "loading..." : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
