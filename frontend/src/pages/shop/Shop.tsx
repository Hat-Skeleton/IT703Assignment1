import React, { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  Heading,
  Card,
  CardHeader,
  CardBody,
  SimpleGrid,
  Box,
  Button,
} from "@chakra-ui/react";
import { ShopItem } from "../../components/Types";

export const Shop = () => {
  const navigate = useNavigate();
  const [shopItems, setShopItems] = useState<ShopItem[]>([]);

  useEffect(() => {
    // Fetch data from your API when the component mounts
    console.log(process.env.API_URL);
    fetch("https://localhost:7274/api/Products/GetProducts")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setShopItems(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const addToCart = (shopItemId: number) => {
    navigate(`/shop/${shopItemId}`);
  };

  return (
    <div>
      <Heading textAlign={"center"} mb={20}>
        Shop
      </Heading>
      <SimpleGrid mb={5} mr={40} ml={40} columns={4} spacing="40px">
        {shopItems.map((shopItem: ShopItem) => (
          <Box key={shopItem.ProductID}>
            <Card>
              <CardHeader>{shopItem.ProductName}</CardHeader>
              <CardBody>{shopItem.ProductDesc}</CardBody>
              <CardBody>${shopItem.price.toFixed(2)}</CardBody>
              <CardBody>Stock: {shopItem.CurrentStock}</CardBody>
              <Button
                onClick={() => addToCart(shopItem.ProductID)}
                _hover={{
                  cursor: "pointer",
                  background: "gold",
                }}
              >
                Add to cart
              </Button>
            </Card>
          </Box>
        ))}
      </SimpleGrid>
    </div>
  );
};
