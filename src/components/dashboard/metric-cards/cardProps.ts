export interface DateRangePickerValue {
  from?: Date;
  to?: Date;
}

// General Metric Card Properties
export interface CardProps {
  vendorIds: string[];
  dateRange: DateRangePickerValue;
  orderPortal?: string[];
}

// AOV, Order Count
export interface GMVData {
  aggregate: {
    count: string;
    sum: {
      gmv: string;
    };
  };
}

//
export interface DailyFoodOrderData {
  total_gmv: string;
  order_count: string;
  order_source_name: string;
  order_date: string;
  brand: string;
}

export type InputType = {
  total_gmv: string;
  order_count: string;
  order_source_name: string;
  order_date: string;
  brand: string;
};

export type OutputType = {
  date: string;
  [key: string]: string;
};

//
export interface ReviewData {
  order_id: string;
  rating_delivery: string;
  rating_food: string;
  review_customer_comment: string;
  order_source_name: string;
}
export interface VendorRatingData {
  vendor_id: string;
  order_platform_name: string;
  rating_display: string;
  rating_count: string;
}

export interface DisplayData {
  avg_rating: string;
  count: number;
}

// TopItemsChartCard
export interface TopItemCardProps {
  vendorIds: string[];
  dateRange: DateRangePickerValue;
  orderPortal?: string[];
}

export interface FoodOrderItemData {
  vendor_id: string;
  quantity: string;
  order_date: string;
  article_name: string;
}

export interface TopItems {
  name: string;
  value: number;
}
