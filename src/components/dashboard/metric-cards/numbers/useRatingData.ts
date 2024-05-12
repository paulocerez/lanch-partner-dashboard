import { useQuery } from "@apollo/client";
import { GET_ALL_RATINGS, GET_ALL_REVIEWS } from "@/utils/gqlQueries";
import {
  DateRangePickerValue,
  GetAllRatingsResponse,
  GetAllReviewsResponse,
  Review,
} from "../cardProps";
import { addDays, toISOStringLocal } from "@/utils/dateUtils";

// hook taking vendorIds, dateRange (from the DateRange Picker), and the list of orderPortals as an object -> eventually transforming and inserting it into the query as parameters to fetch data accordingly from the GraphQL API through Apollo Client (and useQuery)

export const useRatingData = (
  vendorIds: string[],
  dateRange: DateRangePickerValue,
  orderPortalList: string[] = []
) => {
  const portalFilter = orderPortalList.length > 0 ? orderPortalList : undefined;
  const variables = {
    _vendor_ids: vendorIds,
    _fromDate: dateRange?.from
      ? toISOStringLocal(new Date(dateRange.from))
      : toISOStringLocal(
          new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7)
        ),
    _toDate: dateRange?.to
      ? toISOStringLocal(
          new Date(addDays(new Date(dateRange.to), 1).setSeconds(-1))
        )
      : toISOStringLocal(
          new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 1)
        ),
    _order_source_name: portalFilter,
  };

  const { loading, error, data } = useQuery<GetAllRatingsResponse>(
    GET_ALL_RATINGS,
    {
      variables,
    }
  );
  return { loading, error, data };

  // <GMVData> as the expected shape of the data to be returned (TS generic type), getTotalGMVQuery as the query to be performed, { variables } as the object passed to the useQuery hook and being passed to the query itself
};
