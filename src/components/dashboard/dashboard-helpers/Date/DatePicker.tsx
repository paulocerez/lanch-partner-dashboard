import { useState } from "react";
import { DateRangePicker, DateRangePickerItem, DateRangePickerValue } from "@tremor/react";
import { de } from "date-fns/locale";

export function DatePicker() {
  const [value, setValue] = useState<DateRangePickerValue>({
    from: new Date(2023, 1, 1),
    to: new Date(),
  });

  return (
    <DateRangePicker
      className="max-w-md mx-auto"
      value={value}
      onValueChange={setValue}
      locale={de}
      selectPlaceholder="Auswählen"
      color="rose"
    >
      <DateRangePickerItem key="ytd" value="ytd" from={new Date(2023, 0, 1)}>
        Año transcurrido
      </DateRangePickerItem>
      <DateRangePickerItem
        key="half"
        value="half"
        from={new Date(2023, 0, 1)}
        to={new Date(2023, 5, 31)}
      >
        erstes Halbjahr
      </DateRangePickerItem>
    </DateRangePicker>
  );
}