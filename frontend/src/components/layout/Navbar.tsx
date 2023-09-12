import React from "react";
import { Button, HStack, Box } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const routes = [
  {
    path: "",
    display: "Home",
  },
  {
    path: "shop",
    display: "Shop",
  },
  {
    path: "signup",
    display: "Sign up",
  },
  {
    path: "login",
    display: "Login",
  },
];

export const Navbar = () => {
  const navigate = useNavigate();
  const HandleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div>
      <HStack mb={10}>
        {routes.map((route) => (
          <Link to={route.path} key={route.display}>
            <Box ml={25}>{route.display}</Box>
          </Link>
        ))}
        <Button ml={100} onClick={HandleLogout}>
          Logout
        </Button>
      </HStack>
    </div>
  );
};
