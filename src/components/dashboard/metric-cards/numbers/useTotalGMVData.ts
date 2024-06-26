import { useQuery } from "@apollo/client";
import { GET_TOTAL_GMV } from "@/utils/gqlQueries";
import { GetGMVDataResponse } from "../responseProperties";
import { DateRangePickerValue } from "../cardProperties";

// hook taking vendorIds, dateRange (from the DateRange Picker), and the list of orderPortals as an object -> eventually transforming and inserting it into the query as parameters to fetch data accordingly from the GraphQL API through Apollo Client (and useQuery)

export const useTotalGMVData = (
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
    _fromDate: dateRange?.from?.toISOString(),
    _toDate: dateRange?.to?.toISOString(),
    _order_source_names: orderPortalFilter,
  };

  const { loading, error, data } = useQuery<GetGMVDataResponse>(GET_TOTAL_GMV, {
    variables,
  });

  return {
    loading,
    error,
    data: data?.api_partner_dashboard_api_pd_food_orders_aggregate,
  };

  // <GMVData> as the expected shape of the data to be returned (TS generic type), getTotalGMVQuery as the query to be performed, { variables } as the object passed to the useQuery hook and being passed to the query itself
};
