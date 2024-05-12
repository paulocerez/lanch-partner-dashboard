import React from "react";
import LoadingCard from "@/components/dashboard/dashboard-helpers/Loading/LoadingCard";
import CardComponent from "@/components/dashboard/dashboard-helpers/CardComponent";
import { useTotalGMVData } from "../useTotalGMVData";
import { CardProps } from "../../CardProps";

export const OrderCountCard = ({
  vendorIds,
  dateRange,
  orderPortal,
}: CardProps) => {
  const { loading, error, data } = useTotalGMVData(
    vendorIds,
    dateRange,
    orderPortal ?? []
  );

  if (loading) return <LoadingCard metricTitle="Anz. Bestellungen" />;

  if (error) {
    console.error("Error fetching Order count data:", error);
    return <div>Error loading data</div>;
  }

  const orderCount =
    data?.api_partner_dashboard_api_pd_food_orders_aggregate.aggregate?.count?.toString() ||
    "Anfrage fehlgeschlagen";

  return <CardComponent title="Anz. Bestellungen" metric={orderCount} />;
};

export default OrderCountCard;
