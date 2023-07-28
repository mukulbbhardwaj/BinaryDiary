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
  const { user, loginUser } = useAuth();
  const [show, setShow] = useState(false);

  const showPass = () => {
    setShow(!show);
  }
  const guestLogin = async(e) => {
    const userInfo = {
      email: "guest@binary.com",
      password: "binarydiary"
    };
    loginUser(userInfo)
  }
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
        color={"#838a8f"}
        bgColor={"#22293e"}
      >
        <Link to={"/"}>
          <Image src={home} width={"2rem"} height={"2rem"} mt={"1rem"} />
        </Link>
        <Text
          fontSize={"64px"}
          // fontSize={"64px"}
          fontWeight={900}
          color={"#e86f66"}
        >
          welcome
          <Text margin={0} color={"#c7f2c9"}>
            back :)
          </Text>
        </Text>
        <FormControl>
          <FormLabel fontSize={"32px"} fontWeight={300}>
            email
          </FormLabel>
          <Input
            type="email"
            isRequired
            onChange={(e) => setEmail(e.target.value)}
            padding={"10px"}
            fontSize={"24px"}
            border={"none"}
            outline={"none"}
            fontWeight={"10"}
            placeholder="mukul@google.com"
            borderBottom="1px solid #e86f66"
            autoComplete="email"
            name="email"
            bgColor={"inherit"}
            color={"#9c99bd"}
            width={"400px"}
            borderRadius={0}
          />
        </FormControl>
        <FormControl>
          <FormLabel fontSize={"32px"} fontWeight={300}>
            password
          </FormLabel>
          <InputGroup width={"400px"}>
            <Input
              type={show ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              padding={""}
              fontSize={"24px"}
              border={"none"}
              outline={"none"}
              placeholder="******"
              borderBottom="1px solid #e86f66"
              name="password"
              autoComplete="password"
              bgColor={"inherit"}
              color={"#9c99bd"}
              borderRadius={0}
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
            guest login
          </Button>
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
