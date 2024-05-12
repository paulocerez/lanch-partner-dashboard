import React from "react";
import LoadingCard from "@/components/dashboard/dashboard-helpers/Loading/LoadingCard";
import CardComponent from "@/components/dashboard/dashboard-helpers/CardComponent";
import { useTotalGMVData } from "../useTotalGMVData";
import { CardProps } from "../../CardProps";

export const RevenueCard = ({
  vendorIds,
  dateRange,
  orderPortal,
}: CardProps) => {
  const { loading, error, data } = useTotalGMVData(
    vendorIds,
    dateRange,
    orderPortal ?? []
  );

  if (loading) return <LoadingCard metricTitle="Umsatz" />;

  if (error) {
    console.error("Error fetching Revenue data:", error);
    return <div>Error loading data</div>;
  }

  const gmv =
    data?.api_partner_dashboard_api_pd_food_orders_aggregate?.aggregate?.sum
      ?.gmv;
  const formattedGMV = gmv
    ? `${parseFloat(gmv).toFixed(2)}€`
    : "Anfrage fehlgeschlagen";

  return <CardComponent title="Gesamtumsatz" metric={formattedGMV} />;
};

export default RevenueCard;
