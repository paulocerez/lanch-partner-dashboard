import { useState } from "react";
import { DateRangePicker, DateRangePickerItem, DateRangePickerValue } from "@tremor/react";
import { de } from "date-fns/locale";


interface DatePickerProps {
  dateRange: DateRangePickerValue
  updateDateRange: (newDateRange: DateRangePickerValue) => void;
}

export function DatePicker(datePickerProbs: DatePickerProps) {

  const { dateRange, updateDateRange } = datePickerProbs;


  return (
    <DateRangePicker
      className="max-w-md mx-auto"
      value={dateRange}
      onValueChange={updateDateRange}
      locale={de}
      selectPlaceholder="Auswählen"
      color="rose"
      minDate={new Date("2023-04-25")}
      weekStartsOn={1}
    >
      <DateRangePickerItem
        key="last_week"
        value="last_week"
        from={new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 8))}
        to={new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 1))}
      >
        Letzte Woche
      </DateRangePickerItem>
      <DateRangePickerItem
        key="last_two_week"
        value="last_two_week"
        from={new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 15))}
        to={new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 1))}
      >
        Letzte zwei Wochen
      </DateRangePickerItem>
      <DateRangePickerItem
        key="last_month"
        value="last_month"
        from={new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 29))}
        to={new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 1))}
      >
        Letzte vier Wochen
      </DateRangePickerItem>
      <DateRangePickerItem
        key="last_three_month"
        value="last_three_month"
        from={new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 85))}
        to={new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 1))}
      >
        Letzte 12 Wochen
      </DateRangePickerItem>
    </DateRangePicker>
  );
}