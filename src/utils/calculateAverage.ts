export const calculateAverage = (
  data: GMVData | undefined,
  vendorIdLength: number
): string => {
  if (vendorIdLength > 0 && data?.aggregate?.count) {
    return (data.aggregate.sum.gmv / data.aggregate.count).toFixed(2) + "€";
  }
  return "Wähle Restaurants";
};
