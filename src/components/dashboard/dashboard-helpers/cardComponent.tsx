// Card component that serves as a container for metrics to be rendered in

import React from "react";
import { Card, Metric, Text } from "@tremor/react";

interface CardComponentProps {
  title: string;
  metric: string;
}

const CardComponent: React.FC<CardComponentProps> = ({ title, metric }) => (
  <Card>
    <Text>{title}</Text>
    <Metric>{metric}</Metric>
  </Card>
);

export default CardComponent;
