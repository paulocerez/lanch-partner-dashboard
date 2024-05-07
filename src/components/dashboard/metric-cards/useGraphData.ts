import { useQuery, useSuspenseQuery } from "@apollo/client";
import { GET_GMV_PER_DAY } from "@/utils/gqlQueries";
import { DailyGMVData, DateRangePickerValue } from "./CardProps";

// hook taking vendorIds, dateRange (from the DateRange Picker), and the list of orderPortals as an object -> eventually transforming and inserting it into the query as parameters to fetch data accordingly from the GraphQL API through Apollo Client (and useQuery)

export const useGraphData = (
  vendorIds: string[],
  dateRange: DateRangePickerValue,
  orderPortalList: string[]
) => {
  const variables = {
    _vendor_ids: vendorIds,
    _fromDate: dateRange?.from
      ? dateRange.from.toISOString().split("T")[0]
      : new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 8),
    _toDate: dateRange?.to
      ? dateRange.to.toISOString().split("T")[0]
      : new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 1),
    _order_source_names: orderPortalList,
  };

  const { loading, error, data } = useQuery<DailyGMVData>(GET_GMV_PER_DAY, {
    variables,
  });
  return { loading, error, data };

  // <DailyGMVData> as the expected shape of the data to be returned (TS generic type), getTotalGMVQuery as the query to be performed, { variables } as the object passed to the useQuery hook and being passed to the query itself
};
