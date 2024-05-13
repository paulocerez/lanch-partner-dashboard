import React from "react";
import LoadingCard from "@/components/dashboard/dashboard-helpers/Loading/LoadingCard";
import { CardProps, DisplayData } from "../../cardProperties";
import { useRatingData } from "../useRatingData";
import { CardComponent } from "@/components/dashboard/dashboard-helpers/CardComponent";
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

  if (loading)
    return <LoadingCard metricTitle="Aktuelles Durchschnittsrating" />;

  if (error) {
    console.error("Error fetching Rating data:", error);
    return <div>Error loading data</div>;
  }

  let displayData: DisplayData = { avg_rating: "0", count: 0 };
  if (data) {
    displayData = calculateRatingPerVendor(data);
  }

  return (
    <CardComponent
      title="Aktuelles Durchschnittsrating"
      metric={displayData.avg_rating}
    />
  );
};
