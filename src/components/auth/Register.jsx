import React, { useState, useEffect } from "react";
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

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { registerUser, user } = useAuth();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  const handleRegister = (e) => {
    e.preventDefault();
    const userInfo = { email, username, password };
    registerUser(userInfo);
  };

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
          new here? register now!
        </Text>
        <FormControl>
          <FormLabel fontSize={"48px"} fontWeight={100}>
            email
          </FormLabel>
          <Input
            type="text"
            padding={"10px"}
            fontSize={"32px"}
            border={"none"}
            outline={"none"}
            fontWeight={"10"}
            borderBottom="2px solid red"
            placeholder="mukul@google.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl border={"2px"} borderColor={"red"}>
          <FormLabel fontSize={"48px"} fontWeight={100}>
            username
          </FormLabel>
          <Input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            padding={"10px"}
            fontSize={"32px"}
            border={"none"}
            outline={"none"}
            borderBottom="2px solid red"
            fontWeight={"10"}
            placeholder="mukul"
          />
        </FormControl>
        <FormControl border={"2px"} borderColor={"red"}>
          <FormLabel fontSize={"48px"} fontWeight={100}>
            password
          </FormLabel>
          <Input
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            padding={"10px"}
            fontSize={"32px"}
            border={"none"}
            outline={"none"}
            fontWeight={"10"}
            borderBottom="2px solid red"
            placeholder="******"
          />
        </FormControl>
        <Text
          fontSize={"24px"}
          fontWeight={150}
          border={"2px solid green"}
          padding={"0.5rem"}
          borderRadius={"20px"}
          boxSize={"max-content"}
          onClick={handleRegister}
        >
          SignUp
        </Text>
        <Box position={"relative"} bottom={"1rem"} fontWeight={"200"}>
          already registered? <Link to="/login">Login</Link>
        </Box>
      </Box>
    </>
  );
};

export default Register;
