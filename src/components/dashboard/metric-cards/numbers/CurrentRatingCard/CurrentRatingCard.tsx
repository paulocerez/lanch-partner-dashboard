import React from "react";
import { CardProps, DisplayData } from "../../CardProps";
import { useRatingData } from "../useRatingData";
import LoadingCard from "@/components/dashboard/dashboard-helpers/Loading/LoadingCard";
import CardComponent from "@/components/dashboard/dashboard-helpers/CardComponent";
import { calculateRatingPerVendor } from "@/utils/metricCalculations";

const LatestRatingCard = ({ vendorIds, dateRange, orderPortal }: CardProps) => {
  const { loading, error, data } = useRatingData(
    vendorIds,
    dateRange,
    orderPortal
  );

  let orderPortalList: string[];

  if (!orderPortal) {
    orderPortalList = ["Lieferando", "Uber Eats", "Wolt", "Lanch Webshop"];
  } else {
    orderPortalList = orderPortal;
  }

  let displayData: DisplayData = { avg_rating: "0", count: 0 };
  if (data?.api_partner_dashboard_api_pd_vendor_display_ratings_latest) {
    displayData = calculateRatingPerVendor(
      data?.api_partner_dashboard_api_pd_vendor_display_ratings_latest
    );
  }
  if (loading)
    return <LoadingCard metricTitle="Aktuelles Durchschnittsrating" />;

  if (error) {
    console.error("Error fetching Rating data:", error);
    return <div>Error loading data</div>;
  }

  return (
    <CardComponent title="Anz. Bestellungen" metric={displayData.avg_rating} />
  );
};

export default LatestRatingCard;
