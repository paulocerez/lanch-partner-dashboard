import {
  GMVData,
  VendorRatingData,
  DisplayData,
  FoodOrderItemData,
  TopItems,
} from "@/components/dashboard/metric-cards/cardProperties";

export const calculateAverage = (
  data: GMVData | undefined,
  vendorIdLength: number
): string => {
  const dataObject = data?.aggregate;

  if (dataObject?.count === "0") {
    return "Bisher keine Bestellungen durchgeführt";
  }
  if (dataObject?.sum.gmv === "0") {
    return "Bisher keinen Umsatz generiert";
  }

  if (vendorIdLength > 0 && dataObject?.count) {
    const totalGMV = parseFloat(dataObject.sum.gmv);
    const count = parseInt(dataObject.count);

    if (!isNaN(totalGMV) && !isNaN(count) && count > 0) {
      const average = (totalGMV / count).toFixed(2) + "€";
      return average;
    }
  }
  return "Anfrage fehlgeschlagen";
};

export const calculateRatingPerVendor = (
  ratings: VendorRatingData[]
): DisplayData => {
  let totalRating: number = 0;
  let totalCount: number = 0;

  // Loop through each order
  for (let rating of ratings) {
    let newRating = parseFloat(rating.rating_display);
    let newCount = parseFloat(rating.rating_count);

    totalRating += newRating * newCount;
    totalCount += newCount;
  }
  let avg_rating = totalCount ? (totalRating / totalCount).toFixed(2) : "0";

  return { avg_rating, count: totalCount };
};

export const calculateTotal = (items: FoodOrderItemData[]): TopItems[] => {
  let map = new Map<string, number>();

  // Loop through each order
  for (let item of items) {
    let articleName = item.article_name;
    let quantity = parseInt(item.quantity);

    // If the article name is in the map, add the quantity to it
    if (map.has(articleName)) {
      map.set(articleName, map.get(articleName)! + quantity);
    }
    // Else, add the article name to the map with the quantity
    else {
      map.set(articleName, quantity);
    }
  }

  // Create an array of items and their total quantities
  let result: TopItems[] = [];
  map.forEach((value: number, key: string) => {
    result.push({ name: key, value: value });
  });

  // Sort the result array in descending order by total_count
  result.sort((a, b) => b.value - a.value);

  return result;
};
