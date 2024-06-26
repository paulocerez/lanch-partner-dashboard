import { useQuery } from "@apollo/client";
import { GET_FOOD_ORDERS_DAILY } from "@/utils/gqlQueries";
import { DateRangePickerValue } from "../cardProperties";
import { GetDailyFoodOrderDataResponse } from "../responseProperties";

// hook taking vendorIds, dateRange (from the DateRange Picker), and the list of orderPortals as an object -> eventually transforming and inserting it into the query as parameters to fetch data accordingly from the GraphQL API through Apollo Client (and useQuery)

export const useGraphData = (
  vendorIds: string[],
  dateRange: DateRangePickerValue,
  orderPortal?: string[]
) => {
  const defaultOrderPortals = [
    "Lieferando",
    "Uber Eats",
    "Wolt",
    "Lanch Webshop",
  ];

  const orderPortalFilter =
    orderPortal && orderPortal.length > 0 ? orderPortal : defaultOrderPortals;
  const variables = {
    _vendor_ids: vendorIds,
    _fromDate: dateRange?.from
      ? dateRange.from.toISOString().split("T")[0]
      : new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 8),
    _toDate: dateRange?.to
      ? dateRange.to.toISOString().split("T")[0]
      : new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 1),
    _order_source_names: orderPortalFilter,
  };

  const { loading, error, data } = useQuery<GetDailyFoodOrderDataResponse>(
    GET_FOOD_ORDERS_DAILY,
    {
      variables,
    }
  );

  return {
    loading,
    error,
    data: data?.api_partner_dashboard_api_pd_food_orders_daily,
  };
};

// <DailyGMVData> as the expected shape of the data to be returned (TS generic type), getTotalGMVQuery as the query to be performed, { variables } as the object passed to the useQuery hook and being passed to the query itself
