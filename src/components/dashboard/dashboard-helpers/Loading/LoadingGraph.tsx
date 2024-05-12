import React from "react";
import { Card, Text } from "@tremor/react";
import { Spinner } from "@/components/dashboard/dashboard-helpers/Loading/Spinner";

interface LoadingCardProps {
  metricTitle: string;
}

const LoadingGraph = ({ metricTitle }: LoadingCardProps) => (
  <Card>
    <Text>{metricTitle} wird geladen...</Text>
    <br></br>
    <br></br>
    <Spinner />
    <br></br>
    <br></br>
  </Card>
);

export default LoadingGraph;
