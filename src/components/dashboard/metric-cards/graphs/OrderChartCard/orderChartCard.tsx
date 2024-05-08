import { BarChart, Card, Text, Title } from "@tremor/react";
import { CardProps, OutputType } from "../../CardProps";
import React from "react";
import { useGraphData } from "../../useGraphData";
import {
  aggregateOrderData,
  valueFormatter,
} from "@/utils/aggregateDataForGraphs";
import LoadingGraph from "@/components/dashboard/dashboard-helpers/LoadingGraph";

const OrderChartCard = ({ vendorIds, dateRange, orderPortal }: CardProps) => {
  const { loading, error, data } = useGraphData(
    vendorIds,
    dateRange,
    orderPortal
  );

  let orderData: OutputType[] = [];
  if (data) {
    orderData = aggregateOrderData(data);
  }

  console.log(orderData);
  if (loading) return <LoadingGraph metricTitle="Umsatz" />;

  if (error) {
    console.error("Error fetching AOV data:", error);
    return <div>Error loading data</div>;
  }

  return (
    <Card>
      <Title>Orders</Title>
      <Text>Orderanzahl nach Plattform (absolut)</Text>
      <BarChart
        className="mt-4 h-80"
        data={orderData}
        index="date"
        categories={["Lieferando", "Uber Eats", "Wolt", "Lanch Webshop"]}
        colors={["amber", "lime", "sky"]}
        valueFormatter={valueFormatter}
        stack={true}
        relative={true}
      />
    </Card>
  );
};

export default OrderChartCard;
