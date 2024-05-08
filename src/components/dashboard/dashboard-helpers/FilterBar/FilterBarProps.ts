import { DateRangePickerValue } from "@tremor/react";
import { User } from "firebase/auth";

export interface FoodOrder {
  vendor_id: string;
  vendor_name: string;
}

export interface GetAllVendorsResponse {
  api_partner_dashboard_api_pd_food_orders: FoodOrder[];
}

export interface GetAssignedVendorsResponse {
  vendors_of_user: VendorOfUser[];
}

export interface VendorOfUser {
  vendor_id: string;
  user_id: string;
}

export interface FilterBarProps {
  vendorIds: string[];
  updateSelectedVendorIds: (vendors: string[]) => void;
  dateRange: DateRangePickerValue;
  updateDateRange: (dateRange: DateRangePickerValue) => void;
  user: User | null;
}
