import React from "react";
import LoadingCard from "@/components/dashboard/dashboard-helpers/LoadingCard";
import CardComponent from "@/components/dashboard/dashboard-helpers/CardComponent";
import { useTotalGMVData } from "../../useTotalGMVData";
import { CardProps } from "../../CardProps";

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

  console.log("Revenue data:", data);

  let orderPortalList: string[];
  if (!orderPortal) {
    orderPortalList = ["Lieferando", "Uber Eats", "Wolt", "Lanch Webshop"];
  } else {
    orderPortalList = orderPortal;
  }

  if (loading) return <LoadingCard metricTitle="Umsatz" />;

  if (error) {
    console.error("Error fetching Revenue data:", error);
    return <div>Error loading data</div>;
  }

  const totalGMV =
    data?.api_partner_dashboard_api_pd_food_orders_aggregate?.aggregate.sum.gmv.toString() ||
    "Anfrage fehlgeschlagen";

  return <CardComponent title="Gesamtumsatz" metric={totalGMV} />;
};

export default RevenueCard;
