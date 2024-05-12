import {
  ADD_VENDOR_TO_USER,
  GET_ASSIGNED_VENDORS,
  GET_VENDOR_LIST,
  REMOVE_VENDOR_FROM_USER,
} from "@/utils/gqlQueries";
import { useQuery, useMutation } from "@apollo/client";
import {
  GetVendorListResponse,
  GetAssignedVendorsResponse,
} from "./adminProps";

export const useAdminData = (userID: string) => {
  const {
    loading: loadingVendorList,
    data: dataVendorList,
    error: errorVendorList,
  } = useQuery<GetVendorListResponse>(GET_VENDOR_LIST);
  const {
    loading: loadingAssigned,
    data: dataAssigned,
    error: errorAssigned,
  } = useQuery<GetAssignedVendorsResponse>(GET_ASSIGNED_VENDORS, {
    variables: { _userID: userID },
  });
  const [addVendorToUser] = useMutation(ADD_VENDOR_TO_USER);
  const [removeVendorFromUser] = useMutation(REMOVE_VENDOR_FROM_USER);

  return {
    loadingVendorList,
    dataVendorList,
    errorVendorList,
    loadingAssigned,
    dataAssigned,
    errorAssigned,
    addVendorToUser,
    removeVendorFromUser,
  };
};
