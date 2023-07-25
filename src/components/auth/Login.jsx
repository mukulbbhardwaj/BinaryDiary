import React, { useEffect, useState} from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Text,
  Image,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import home from "../../asset/home.png";
import { useAuth } from "../../utils/AuthContext";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { user, loginUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    const userInfo = { email, password };
    loginUser(userInfo);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  return (
    <>
      <Box
        display={"flex"}
        alignItems={"left"}
        flexDir={"column"}
        justifyContent={"center"}
        mx={"4rem"}
      >
        <Link to={"/"}>
          <Image src={home} width={"2rem"} height={"2rem"} mt={"1rem"} />
        </Link>
        <Text fontSize={"64px"} fontWeight={200} color={"red"}>
          welcome back :){" "}
        </Text>
        <FormControl>
          <FormLabel fontSize={"48px"} fontWeight={100}>
            email
          </FormLabel>
          <Input
            type="text"
            isRequired
            onChange={(e) => setEmail(e.target.value)}
            padding={"10px"}
            fontSize={"32px"}
            border={"none"}
            outline={"none"}
            fontWeight={"10"}
            placeholder="mukul@google.com"
            borderBottom="2px solid red"
            autoComplete="email"
            name="email"
          />
        </FormControl>
        <FormControl>
          <FormLabel fontSize={"48px"} fontWeight={100}>
            password
          </FormLabel>
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            padding={"10px"}
            fontSize={"32px"}
            border={"none"}
            outline={"none"}
            placeholder="******"
            borderBottom="2px solid red"
            name="password"
            autoComplete="password"
          />
        </FormControl>
        <Text
          fontSize={"24px"}
          fontWeight={150}
          border={"2px solid green"}
          padding={"0.5rem"}
          borderRadius={"20px"}
          boxSize={"max-content"}
          onClick={handleLogin}
        >
          Login
        </Text>
        <Box position={"relative"} bottom={"1rem"} fontWeight={"200"}>
          not registered? <Link to="/register">register</Link>
        </Box>
      </Box>
    </>
  );
};

export default Login;
