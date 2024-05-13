import React from "react";
import LoadingCard from "@/components/dashboard/dashboard-helpers/Loading/LoadingCard";
import { CardComponent } from "@/components/dashboard/dashboard-helpers/CardComponent";
import { useTotalGMVData } from "../useTotalGMVData";
import { CardProps } from "../../cardProperties";

export const RevenueCard = ({
  vendorIds,
  dateRange,
  orderPortal,
}: CardProps) => {
  const { loading, error, data } = useTotalGMVData(
    vendorIds,
    dateRange,
    orderPortal
  );

  if (loading) return <LoadingCard metricTitle="Umsatz" />;

  if (error) {
    console.error("Error fetching Revenue data:", error);
    return <div>Error loading data</div>;
  }

  const gmv = data?.aggregate?.sum?.gmv;
  const formattedGMV = gmv
    ? `${parseFloat(gmv).toFixed(2)}€`
    : "Keine Umsatzdaten verfügbar";

  return <CardComponent title="Gesamtumsatz" metric={formattedGMV} />;
};

export default RevenueCard;
