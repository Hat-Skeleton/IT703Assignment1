import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Heading, Input, Button, VStack, HStack } from "@chakra-ui/react";

export const Signup = () => {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const HandleSignin = () => {
    const user = username.current?.value ?? "";
    const pass = password.current?.value ?? "";

    const token = user + pass;
    console.log(token);
    //sessionStorage.setItem("token", token);
    navigate("/login");
  };

  return (
    <div>
      <VStack spacing={8}>
        <Heading textAlign={"center"}>Sign Up</Heading>
        <Input w={0.25} type="text" placeholder="Enter username" />
        <Input w={0.25} type="password" placeholder="Enter password" />
        <HStack>
          <Input w={0.9} type="text" placeholder="Enter first name" />
          <Input w={0.9} type="text" placeholder="Enter lastname" />
        </HStack>
        <Input w={0.25} type="text" placeholder="Enter address" />
        <HStack>
          <Input w={0.6} type="text" placeholder="Enter postcode" />
          <Input w={0.9} type="text" placeholder="Enter city" />
        </HStack>
        <Input w={0.25} type="text" placeholder="Enter country" />
        <Button onClick={HandleSignin}>Sign Up</Button>
      </VStack>
    </div>
  );
};
