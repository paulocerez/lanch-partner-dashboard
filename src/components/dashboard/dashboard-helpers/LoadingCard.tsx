import React from "react";
import { Card, Text } from "@tremor/react";
import Spinner from "./Spinner";

interface LoadingCardProps {
  metricTitle: string;
}

const LoadingCard = ({ metricTitle }: LoadingCardProps) => (
  <Card>
    <Text>{metricTitle}</Text>
    <Spinner />
  </Card>
);

export default LoadingCard;
