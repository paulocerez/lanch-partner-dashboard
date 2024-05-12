import { Bold, Card, Flex, Text, Title, BarList } from "@tremor/react";
import React from "react";
import LoadingCard from "@/components/dashboard/dashboard-helpers/Loading/LoadingCard";
import { calculateTotal } from "@/utils/metricCalculations";
import { CardProps, TopItems } from "../../CardProps";
import { useTopItemsData } from "../useTopItemsData";

const valueFormatter = (number: number) =>
  Intl.NumberFormat("de").format(number).toString();

export const TopItemChartCard = ({
  vendorIds,
  dateRange,
  orderPortal,
}: CardProps) => {
  const { loading, error, data } = useTopItemsData(
    vendorIds,
    dateRange,
    orderPortal
  );

  let topItems: TopItems[] = [];
  if (data?.api_partner_dashboard_api_pd_food_order_items_daily) {
    topItems = calculateTotal(
      data?.api_partner_dashboard_api_pd_food_order_items_daily
    );
  }

  if (loading) return <LoadingCard metricTitle="Top-Sellers" />;

  if (error) {
    console.error("Error fetching top sales data:", error);
    return <div>Error loading data</div>;
  }

  return (
    <Card className="max-w">
      <Title>Top Selling Products</Title>
      <Flex className="mt-4">
        <Text>
          <Bold>Item</Bold>
        </Text>
        <Text>
          <Bold>Verkäufe</Bold>
        </Text>
      </Flex>
      <BarList data={topItems.slice(0, 10)} className="mt-2" />
    </Card>
  );
};
