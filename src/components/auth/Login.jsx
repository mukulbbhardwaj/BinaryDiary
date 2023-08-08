import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Text,
  Image,
  Button,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import home from "../../asset/home.png";
import { useAuth } from "../../utils/AuthContext";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { user, loginUser,googleLogin } = useAuth();
  const [show, setShow] = useState(false);

  const showPass = () => {
    setShow(!show);
  };

  const guestLogin = async (e) => {
    const userInfo = {
      email: "guest@binary.com",
      password: "binarydiary",
    };
    loginUser(userInfo);
  };
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
        padding={"100px"}
        bgColor={"#1a1b1f"}
        color={"white"}
      >
        <Link to={"/"}>
          <Image src={home} width={"24px"} height={"24px"} mt={"1rem"} />
        </Link>
        <Text
          fontSize={{ base: "32px", md: "64px" }}
          fontWeight={300}
          color={"gray"}
        >
          welcome
          <Text margin={0}>back :)</Text>
        </Text>
        <FormControl>
          <FormLabel
            fontSize={{ base: "14px", md: "24px" }}
            fontWeight={300}
            marginTop={"1rem"}
          >
            email
          </FormLabel>
          <Input
            type="email"
            isRequired
            onChange={(e) => setEmail(e.target.value)}
            padding={"20px 0px 20px 10px"}
            fontSize={{ base: "14px", md: "24px" }}
            outline={"none"}
            placeholder="mukul@google.com"
            border={"1px solid gray"}
            autoComplete="email"
            name="email"
            bgColor={"inherit"}
            borderRadius={"9px"}
            width={{ base: "200px", md: "400px" }}
          />
        </FormControl>
        <FormControl>
          <FormLabel
            fontSize={{ base: "14px", md: "24px" }}
            fontWeight={300}
            marginTop={"1rem"}
          >
            password
          </FormLabel>
          <InputGroup width={{ base: "200px", md: "400px" }}>
            <Input
              type={show ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              padding={"20px 0px 20px 10px"}
              fontSize={{ base: "14px", md: "24px" }}
              border={"1px solid gray"}
              outline={"none"}
              placeholder="mukul@google.com"
              autoComplete="email"
              name="email"
              bgColor={"inherit"}
              color={"#9c99bd"}
              borderRadius={"9px"}
              width={{ base: "200px", md: "400px" }}
            />
            <InputRightElement>
              <ViewIcon onClick={showPass} color={show ? "white" : "black"} />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Box
          display={"flex"}
          alignItems={"center"}
          gap={"1rem"}
          margin={"2rem 0 2rem 0"}
        >
          <Button onClick={handleLogin}>Login</Button>
          <Button
            variant={"outline"}
            color={"#bfdbba"}
            _hover={{ color: "#a2b0de" }}
            onClick={guestLogin}
          >
            Guest Login
          </Button>
          {/* <Button onClick={handleGoogleLogin}>
            Login with Google
          </Button> */}
          {/* TODO: Add forget password */}
        </Box>

        <Box
          position={"relative"}
          bottom={"1rem"}
          display={"flex"}
          gap={"4px"}
          fontWeight={"200"}
          alignItems={"center"}
        >
          not registered?{" "}
          <Text color={"white"} _hover={{ color: "gray" }}>
            <Link to="/register">register</Link>
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default Login;
