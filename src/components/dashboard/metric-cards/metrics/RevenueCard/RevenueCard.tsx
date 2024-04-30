import React from "react";
import { CardProps } from "../CardProps";
import { useRevenueData } from "./useRevenueData";
import LoadingCard from "@/components/dashboard/dashboard-helpers/LoadingCard";
import CardComponent from "@/components/dashboard/dashboard-helpers/CardComponent";

const RevenueCard = ({ vendorIds, dateRange, orderPortal }: CardProps) => {
  const { loading, data } = useRevenueData(vendorIds, dateRange, orderPortal);

  let orderPortalList: string[];
  if (!orderPortal) {
    orderPortalList = ["Lieferando", "Uber Eats", "Wolt", "Lanch Webshop"];
  } else {
    orderPortalList = orderPortal;
  }

  if (loading) return <LoadingCard metricTitle="Umsatz" />;
  const totalGMV = data?.aggregate?.sum?.toString() || "Anfrage fehlgeschlagen";

  return <CardComponent title="Anz. Bestellungen" metric={totalGMV} />;
};

export default RevenueCard;
