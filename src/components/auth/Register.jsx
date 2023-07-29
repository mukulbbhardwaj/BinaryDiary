import React, { useState, useEffect } from "react";
import { ViewIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Text,
  Image,
  InputGroup,
  InputRightElement,
  Button,
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

  const [show, setShow] = useState(false);

  const showPass = () => {
    setShow(!show);
    console.log(show);
  };

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
        padding={"100px"}
        color={"#838a8f"}
        bgColor={"#22293e"}
      >
        <Link to={"/"}>
          <Image src={home} width={"24px"} height={"24px"} mt={"1rem"} />
        </Link>
        <Text
          fontSize={{ base: "32px", md: "64px" }}
          fontWeight={900}
          color={"#e86f66"}
        >
          new here?
          <Text margin={0} color={"#c7f2c9"}>
            register now!
          </Text>
        </Text>
        <FormControl>
          <FormLabel
            fontSize={{ base: "18px", md: "32px" }}
            fontWeight={300}
            marginTop={"1rem"}
          >
            email
          </FormLabel>
          <Input
            type="text"
            padding={"10px"}
            fontSize={{ base: "18px", md: "32px" }}
            border={"none"}
            outline={"none"}
            placeholder="mukul@google.com"
            onChange={(e) => setEmail(e.target.value)}
            bgColor={"inherit"}
            borderBottom="1px solid #e86f66"
            borderRadius={0}
            width={{ base: "200px", md: "400px" }}
          />
        </FormControl>
        <FormControl>
          <FormLabel
            fontSize={{ base: "18px", md: "32px" }}
            fontWeight={300}
            marginTop={"1rem"}
          >
            username
          </FormLabel>
          <Input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            padding={"10px"}
            fontSize={{ base: "18px", md: "32px" }}
            border={"none"}
            outline={"none"}
            borderBottom="1px solid #e86f66"
            placeholder="mukul"
            bgColor={"inherit"}
            borderRadius={0}
            width={{ base: "200px", md: "400px" }}
          />
        </FormControl>
        <FormControl>
          <FormLabel
            fontSize={{ base: "18px", md: "32px" }}
            fontWeight={300}
            marginTop={"1rem"}
          >
            password
          </FormLabel>

          <InputGroup width={{ base: "200px", md: "400px" }}>
            <Input
              type={show ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              padding={"10px"}
              border={"none"}
              outline={"none"}
              placeholder="******"
              borderBottom="1px solid #e86f66"
              name="password"
              autoComplete="password"
              bgColor={"inherit"}
              color={"#9c99bd"}
              borderRadius={0}
              fontSize={{ base: "18px", md: "32px" }}
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
          <Button onClick={handleRegister}>register!</Button>
        </Box>
        <Box
          position={"relative"}
          bottom={"1rem"}
          display={"flex"}
          gap={"4px"}
          fontWeight={"200"}
          alignItems={"center"}
        >
          already registered?{" "}
          <Text color={"white"} _hover={{ color: "gray" }}>
            <Link to="/login" style={{ cursor: "pointer" }}>
              login
            </Link>
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default Register;
