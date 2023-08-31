import React from "react";
import { useLoaderData } from "react-router-dom";
import { Heading, VStack, Card, CardHeader, CardBody } from "@chakra-ui/react";
import { ShopItem, ShopItemData } from "../../components/Types";

export const Shop = () => {
  const { shopItems } = useLoaderData() as ShopItemData;

  const HandleSelectShopItem = (shopItemId: number) => {
    console.log(shopItemId);
  };
  return (
    <div>
      <Heading textAlign={"center"}>Shop</Heading>
      <VStack>
        {shopItems.map((shopItem: ShopItem) => (
          <Card
            onClick={() => HandleSelectShopItem(shopItem.id)}
            key={shopItem.id}
          >
            <CardHeader>{shopItem.title}</CardHeader>
            <CardBody>{shopItem.summary}</CardBody>
          </Card>
        ))}
      </VStack>
    </div>
  );
};
