export interface DateRangePickerValue {
  from?: Date;
  to?: Date;
}

export interface CardProps {
  vendorIds: string[];
  dateRange: DateRangePickerValue;
  orderPortal: string[];
}
