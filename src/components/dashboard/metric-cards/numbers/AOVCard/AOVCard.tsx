import React from "react";
import LoadingCard from "@/components/dashboard/dashboard-helpers/Loading/LoadingCard";
import { CardProps } from "../../cardProps";
import { useTotalGMVData } from "../useTotalGMVData";
import { calculateAverage } from "@/utils/metricCalculations";
import { CardComponent } from "@/components/dashboard/dashboard-helpers/CardComponent";

export const AOVCard = ({ vendorIds, dateRange, orderPortal }: CardProps) => {
  const { loading, error, data } = useTotalGMVData(
    vendorIds,
    dateRange,
    orderPortal ?? []
  );

  if (loading) return <LoadingCard metricTitle="Durchschn. Warenkorb" />;

  if (error) {
    console.error("Error fetching AOV data:", error);
    return <div>Error loading data</div>;
  }

  const aggregateData =
    data?.api_partner_dashboard_api_pd_food_orders_aggregate;
  const averageValue = calculateAverage(aggregateData, vendorIds.length);

  return (
    <CardComponent title="Durchschn. Warenkorbwert" metric={averageValue} />
  );
};
