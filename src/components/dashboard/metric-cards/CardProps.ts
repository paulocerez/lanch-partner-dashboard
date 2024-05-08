export interface DateRangePickerValue {
  from?: Date;
  to?: Date;
}

export interface CardProps {
  vendorIds: string[];
  dateRange: DateRangePickerValue;
  orderPortal: string[];
}
export interface GMVData {
  api_partner_dashboard_api_pd_food_orders_aggregate: {
    aggregate: {
      count: number;
      sum: {
        gmv: number;
      };
    };
  };
}

export interface DailyFoodOrderData {
  total_gmv: string;
  order_count: string;
  order_source_name: string;
  order_date: string;
  brand: string;
}

export interface FoordOrderDataDaily {
  api_partner_dashboard_api_pd_food_orders_daily: DailyFoodOrderData[];
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
