// Card component that serves as a container for metrics to be rendered in

import React from "react";
import { Card, Metric, Text } from "@tremor/react";

const CardComponent = ({ title, metric }) => (
  <Card>
    <Text>{title}</Text>
    <Metric>{metric}</Metric>
  </Card>
);

export default CardComponent;
