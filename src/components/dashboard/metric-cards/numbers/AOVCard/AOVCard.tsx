import React from "react";
import LoadingCard from "@/components/dashboard/dashboard-helpers/LoadingCard";
import { CardProps } from "../../CardProps";
import { useAOVData } from "./useAOVData";
import { calculateAverage } from "@/utils/calculateAverage";
import CardComponent from "@/components/dashboard/dashboard-helpers/CardComponent";

export const AOVCard = ({ vendorIds, dateRange, orderPortal }: CardProps) => {
  const { loading, error, data } = useAOVData(
    vendorIds,
    dateRange,
    orderPortal
  );

  console.log("Loading status:", loading);
  console.log("Data:", data);

  let orderPortalList: string[];

  if (!orderPortal) {
    orderPortalList = ["Lieferando", "Uber Eats", "Wolt", "Lanch Webshop"];
  } else {
    orderPortalList = orderPortal;
  }

  if (loading) return <LoadingCard metricTitle="Durchschn. Warenkorb" />;

  if (error) {
    console.error("Error fetching AOV data:", error);
    return <div>Error loading data</div>;
  }

  const averageValue = calculateAverage(data, vendorIds.length);
  console.log("Average value:", averageValue);

  return (
    <CardComponent title="Durchschn. Warenkorbwert" metric={averageValue} />
  );
};
