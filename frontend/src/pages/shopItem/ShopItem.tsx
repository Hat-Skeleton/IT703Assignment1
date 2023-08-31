import React from "react";
import { useParams } from "react-router-dom";

export const ShopItem = () => {
  const { shopId } = useParams();

  return <div>pro {shopId}</div>;
};
