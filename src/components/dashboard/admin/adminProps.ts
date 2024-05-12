export interface Vendor {
  vendor_id: string;
  vendor_name: string;
  vendor_region: string;
}

export interface GetVendorListResponse {
  api_partner_dashboard_api_pd_food_order_items: Vendor[];
}

export interface GetAssignedVendorsResponse {
  vendors_of_user: VendorOfUser[];
}

export interface VendorOfUser {
  vendor_id: string;
  user_id: string;
}

export interface AdminEditUserProps {
  userID: string;
}
