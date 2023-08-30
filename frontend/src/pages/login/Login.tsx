import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Heading, Input, Button, VStack } from "@chakra-ui/react";

export const Login = () => {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const HandleLogin = () => {
    const user = username.current?.value ?? "";
    const pass = password.current?.value ?? "";

    const token = user + pass;
    sessionStorage.setItem("token", token);
    navigate("/");
  };

  return (
    <div>
      <VStack spacing={10}>
        <Heading textAlign={"center"}>Login</Heading>
        <Input
          w={0.6}
          ref={username}
          type="text"
          placeholder="Enter username"
        />
        <Input
          w={0.6}
          ref={password}
          type="password"
          placeholder="Enter password"
        />
        <Button onClick={HandleLogin}>Login</Button>
      </VStack>
    </div>
  );
};
