import React from "react";
import LoadingCard from "@/components/dashboard/dashboard-helpers/LoadingCard";
import CardComponent from "@/components/dashboard/dashboard-helpers/CardComponent";
import { useOrderCountData } from "./useOrderCountData";
import { CardProps } from "../../CardProps";

export const OrderCountCard = ({
  vendorIds,
  dateRange,
  orderPortal,
}: CardProps) => {
  const { loading, data } = useOrderCountData(
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

  if (loading) return <LoadingCard metricTitle="Anz. Bestellungen" />;
  const orderCount =
    data?.aggregate?.count?.toString() || "Anfrage fehlgeschlagen";

  return <CardComponent title="Anz. Bestellungen" metric={orderCount} />;
};

export default OrderCountCard;
