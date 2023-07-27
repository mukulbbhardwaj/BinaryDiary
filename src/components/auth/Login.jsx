import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Text,
  Image,

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
    console.log(show)
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
        margin={"1rem"}
      >
        <Link to={"/"}>
          <Image src={home} width={"2rem"} height={"2rem"} mt={"1rem"} />
        </Link>
        <Text
          fontSize={'64px'}
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
          />
        </FormControl>
        <FormControl>
          <FormLabel fontSize={"32px"} fontWeight={300}>
            password
          </FormLabel>
          <Input
            type={show ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            padding={"10px"}
            fontSize={"24px"}
            border={"none"}
            outline={"none"}
            placeholder="******"
            borderBottom="1px solid #e86f66"
            name="password"
            autoComplete="password"
            bgColor={"inherit"}
            color={"#9c99bd"}
          />
          <ViewIcon onClick={showPass} color={show ? "white" : "black"} />
        </FormControl>
        <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
          <Text
            fontSize={"24px"}
            fontWeight={150}
            border={"2px solid green"}
            padding={"0.5rem"}
            borderRadius={"20px"}
            boxSize={"max-content"}
            onClick={handleLogin}
            cursor={"pointer"}
          >
            Login
          </Text>
          <Link>forget password?</Link>
        </Box>

        <Box position={"relative"} bottom={"1rem"} fontWeight={"200"}>
          not registered? <Link to="/register">register</Link>
        </Box>
      </Box>
    </>
  );
};

export default Login;
