import { GMVData } from "@/components/dashboard/metric-cards/metrics/AOVCard/useAOVData";

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

  if (data?.aggregate?.count === 0) {
    return "Bisher keine Bestellungen durchgeführt.";
  }
  if (data?.aggregate?.sum.gmv === 0) {
    return "Bisher keinen Umsatz generiert";
  }

  if (vendorIdLength > 0 && data?.aggregate?.count) {
    const average =
      (data.aggregate.sum.gmv / data.aggregate.count).toFixed(2) + "€";
    console.log("Calculated average:", average);
    return average;
  }
  return "Anfrage fehlgeschlagen";
};
