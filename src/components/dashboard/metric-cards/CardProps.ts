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
