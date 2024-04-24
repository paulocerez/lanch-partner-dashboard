export const calculateAverage = (data, vendorIdLength) => {
  if (vendorIdLength > 0 && data?.aggregate?.count) {
    return (data.aggregate.sum.gmv / data.aggregate.count).toFixed(2) + "€";
  }
  return "Wähle Restaurants";
};
