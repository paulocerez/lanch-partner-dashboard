import { GMVData } from "@/components/dashboard/metric-cards/CardProps";

export const calculateAverage = (
  data: GMVData | undefined,
  vendorIdLength: number
): string => {
  console.log(
    "Inside calculateAverage, data:",
    data,
    "vendorIdLength:",
    vendorIdLength
  );

  const dataObject =
    data?.api_partner_dashboard_api_pd_food_orders_aggregate.aggregate;

  if (dataObject?.count === 0) {
    return "Bisher keine Bestellungen durchgeführt";
  }
  if (dataObject?.sum.gmv === 0) {
    return "Bisher keinen Umsatz generiert";
  }

  if (vendorIdLength > 0 && dataObject?.count) {
    const average = (dataObject.sum.gmv / dataObject.count).toFixed(2) + "€";
    console.log("Calculated average:", average);
    return average;
  }
  return "Anfrage fehlgeschlagen";
};
