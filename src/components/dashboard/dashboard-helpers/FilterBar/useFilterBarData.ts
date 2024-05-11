// useFilterBarData: hook using Apollo Client to fetch data about vendors based on the current user ID

import { useQuery } from "@apollo/client";
import { GET_ALL_VENDORS, GET_ASSIGNED_VENDORS } from "@/utils/gqlQueries";
import {
  GetAllVendorsResponse,
  GetAssignedVendorsResponse,
} from "./FilterBarProps";

export const useFilterBarData = (userId: string | undefined) => {
  const {
    data: vendorList,
    loading: loadingVendors,
    error: errorVendors,
  } = useQuery<GetAllVendorsResponse>(GET_ALL_VENDORS);

  const {
    data: assignedVendors,
    loading: loadingAssignedVendors,
    error: errorAssignedVendors,
  } = useQuery<GetAssignedVendorsResponse>(GET_ASSIGNED_VENDORS, {
    variables: { _userID: userId || "" },
  });

  return {
    vendorList: vendorList?.api_partner_dashboard_api_pd_food_orders,
    assignedVendorList: assignedVendors?.vendors_of_user,
    loading: loadingVendors || loadingAssignedVendors,
    error: errorVendors || errorAssignedVendors,
  };
};
