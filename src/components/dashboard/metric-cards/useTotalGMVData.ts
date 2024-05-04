import { useQuery } from "@apollo/client";
import { getTotalGMVQuery } from "@/utils/gqlQueries";
import { DateRangePickerValue } from "./CardProps";
import { GMVData } from "./CardProps";

// hook taking vendorIds, dateRange (from the DateRange Picker), and the list of orderPortals as an object -> eventually transforming and inserting it into the query as parameters to fetch data accordingly from the GraphQL API through Apollo Client (and useQuery)

export const useTotalGMVData = (
  vendorIds: string[],
  dateRange: DateRangePickerValue,
  orderPortalList: string[]
) => {
  const variables = {
    _vendor_ids: vendorIds,
    _fromDate: dateRange?.from?.toISOString(),
    _toDate: dateRange?.to?.toISOString(),
    _order_source_name: orderPortalList,
  };

  const { loading, error, data } = useQuery<GMVData>(getTotalGMVQuery, {
    variables,
  });
  console.log("GraphQL Error:", error);
  return { loading, error, data };

  // <GMVData> as the expected shape of the data to be returned (TS generic type), getTotalGMVQuery as the query to be performed, { variables } as the object passed to the useQuery hook and being passed to the query itself
};
