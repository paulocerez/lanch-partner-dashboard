import React from "react";
import { Card, Text } from "@tremor/react";
import { Spinner } from "@/components/dashboard/dashboard-helpers/Loading/Spinner";

interface LoadingCardProps {
  metricTitle: string;
}

const LoadingCard = ({ metricTitle }: LoadingCardProps) => (
  <Card>
    <Text>{metricTitle} wird geladen...</Text>
    <Spinner />
  </Card>
);

export default LoadingCard;
