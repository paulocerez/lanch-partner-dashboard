import React from "react";
import { Card, Text } from "@tremor/react";
import Spinner from "./Spinner";

const LoadingCard = () => (
  <Card>
    <Text>⌀ Warenkorbwert</Text>
    <Spinner />
  </Card>
);

export default LoadingCard;
