import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  Heading,
  VStack,
  Card,
  CardHeader,
  CardBody,
  SimpleGrid,
  GridItem,
  Box,
} from "@chakra-ui/react";
import { ShopItem } from "../../components/Types";

export const Shop = () => {
  const shopItems = useLoaderData() as ShopItem[];

  const navigate = useNavigate();

  const HandleSelectShopItem = (shopItemId: number) => {
    navigate(`/shop/${shopItemId}`);
  };
  return (
    <div>
      <Heading textAlign={"center"} mb={20}>
        Shop
      </Heading>
      <SimpleGrid mr={40} ml={40} columns={4} spacing="40px">
        {shopItems.map((shopItem: ShopItem) => (
          <Box>
            <Card
              onClick={() => HandleSelectShopItem(shopItem.id)}
              key={shopItem.id}
              _hover={{
                cursor: "pointer",
              }}
            >
              <CardHeader>{shopItem.title}</CardHeader>
              <CardBody>{shopItem.summary}</CardBody>
            </Card>
          </Box>
        ))}
      </SimpleGrid>
    </div>
  );
};
