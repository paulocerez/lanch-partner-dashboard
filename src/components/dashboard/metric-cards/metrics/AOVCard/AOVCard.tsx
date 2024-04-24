import React from "react";
import LoadingCard from "@/components/dashboard/dashboard-helpers/LoadingCard";
import { AOVCardProps } from "./AOVCardProps";
import { useAOVData } from "./useAOVData";
import { calculateAverage } from "@/utils/calculateAverage";
import CardComponent from "@/components/dashboard/dashboard-helpers/CardComponent";

export const AOVCard = ({
  vendorIds,
  dateRange,
  orderPortal,
}: AOVCardProps) => {
  const { loading, data } = useAOVData(vendorIds, dateRange, orderPortal);

  if (loading) return <LoadingCard metricTitle="Durchschn. Warenkorb" />;

  const averageValue = calculateAverage(data, vendorIds.length);

  return (
    <CardComponent title="Durchschn. Warenkorbwert" metric={averageValue} />
  );
};
