import {
  DisplayData,
  GMVData,
  VendorRating,
} from "@/components/dashboard/metric-cards/CardProps";

export const calculateAverage = (
  data: GMVData | undefined,
  vendorIdLength: number
): string => {
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
    return average;
  }
  return "Anfrage fehlgeschlagen";
};

export const calculateRatingPerVendor = (
  ratings: VendorRating[]
): DisplayData => {
  let temp_rating: number = 0;
  let count: number = 0;

  // Loop through each order
  for (let rating of ratings) {
    let newRating = parseFloat(rating.rating_display);
    let newCount = parseFloat(rating.rating_display);

    temp_rating =
      (temp_rating * count + newRating * newCount) / (count + newCount);
    count = count + newCount;
  }
  let avg_rating = temp_rating.toFixed(2);

  return { avg_rating, count };
};
