import { BarChart, Card, Text, Title } from "@tremor/react";
import { CardProps, OutputType } from "../../cardProps";
import React from "react";
import { useGraphData } from "../useGraphData";
import {
  aggregateGMVData,
  valueFormatter,
} from "@/utils/aggregateDataForGraphs";
import LoadingGraph from "@/components/dashboard/dashboard-helpers/Loading/LoadingGraph";

const GMVGraphCard = ({ vendorIds, dateRange, orderPortal }: CardProps) => {
  const { loading, error, data } = useGraphData(
    vendorIds,
    dateRange,
    orderPortal
  );

  let revenueData: OutputType[] = [];
  if (data) {
    revenueData = aggregateGMVData(data);
  }

  console.log(revenueData);
  if (loading) return <LoadingGraph metricTitle="Umsatz" />;

  if (error) {
    console.error("Error fetching GMV graph data:", error);
    return <div>Error loading data</div>;
  }

  return (
    <Card>
      <Title>Umsatz</Title>
      <Text>Außenumsatz nach Plattform (relativ)</Text>
      <BarChart
        className="mt-4 h-80"
        data={revenueData}
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

export default GMVGraphCard;
