import React from "react";
import { CardProps, DisplayData } from "../../CardProps";
import { useRatingData } from "../useRatingData";
import LoadingCard from "@/components/dashboard/dashboard-helpers/Loading/LoadingCard";
import CardComponent from "@/components/dashboard/dashboard-helpers/CardComponent";
import { calculateRatingPerVendor } from "@/utils/metricCalculations";

export const CurrentRatingCard = ({
  vendorIds,
  dateRange,
  orderPortal,
}: CardProps) => {
  const { loading, error, data } = useRatingData(
    vendorIds,
    dateRange,
    orderPortal
  );

  let displayData: DisplayData = { avg_rating: "0", count: 0 };
  if (data) {
    displayData = calculateRatingPerVendor(data);
  }
  if (loading)
    return <LoadingCard metricTitle="Aktuelles Durchschnittsrating" />;

  if (error) {
    console.error("Error fetching Rating data:", error);
    return <div>Error loading data</div>;
  }

  return (
    <CardComponent
      title="Aktuelles Durchschnittsrating"
      metric={displayData.avg_rating}
    />
  );
};
