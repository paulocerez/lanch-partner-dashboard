export interface DateRangePickerValue {
  from?: Date;
  to?: Date;
}

export interface AOVCardProps {
  vendorIds: string[];
  dateRange: DateRangePickerValue;
  orderPortal: string[];
}
