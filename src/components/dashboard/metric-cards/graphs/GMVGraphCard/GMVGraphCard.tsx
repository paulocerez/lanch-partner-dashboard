"use client";
import { BarChart, Card, Text, Title } from "@tremor/react";
import { CardProps, OutputType, InputType } from "../../CardProps";
import React from "react";
import { useGraphData } from "../../useGraphData";
import { aggregateData, valueFormatter } from "@/utils/dataUtils";
import LoadingGraph from "@/components/dashboard/dashboard-helpers/LoadingGraph";

const GMVGraphCard = ({ vendorIds, dateRange, orderPortal }: CardProps) => {
  const { loading, error, data } = useGraphData(
    vendorIds,
    dateRange,
    orderPortal
  );

  if (loading) return <LoadingGraph metricTitle="Umsatz" />;

  if (error) {
    console.error("Error fetching AOV data:", error);
    return <div>Error loading data</div>;
  }

  const revenueData: OutputType[] =
    data?.api_partner_dashboard_api_pd_food_orders_daily.totalGMV ||
    "Anfrage fehlgeschlagen";

  return (
    <Card>
      <Title>Umsatz</Title>
      <Text>Außenumsatz nach Plattform</Text>
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
