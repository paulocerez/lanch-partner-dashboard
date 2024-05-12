import {
  DailyFoodOrderData,
  FoodOrderItemData,
  GMVData,
  ReviewData,
  VendorRatingData,
} from "./cardProps";

export interface GetGMVDataResponse {
  api_partner_dashboard_api_pd_food_orders_aggregate: GMVData;
}

export interface GetDailyFoodOrderDataResponse {
  api_partner_dashboard_api_pd_food_orders_daily: DailyFoodOrderData[];
}

export interface GetAllReviewDataResponse {
  api_partner_dashboard_api_pd_food_orders: ReviewData[];
}

export interface GetAllVendorRatingDataResponse {
  api_partner_dashboard_api_pd_vendor_display_ratings_latest: VendorRatingData[];
}

export interface GetTopItemsResponse {
  api_partner_dashboard_api_pd_food_order_items_daily: FoodOrderItemData[];
}
