import { useQuery } from "@apollo/client";
import { getTotalGmvQuery } from "@/utils/gqlQueries";
import { DateRangePickerValue } from "./AOVCardProps";

interface GMVData {
  aggregate: {
    count: number;
    sum: {
      gmv: number;
    };
  };
}

export const useAOVData = (
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
  return useQuery<GMVData>(getTotalGmvQuery, { variables });
};
