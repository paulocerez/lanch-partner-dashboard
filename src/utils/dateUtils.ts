import { DateRangePickerValue } from "@tremor/react";
import { useState } from "react";

export const convertDateFormat = (inputDate: string): string => {
  // Create a new date object from the input string
  let date = new Date(inputDate);

  // Extract the day, month and year from the date object
  let day = String(date.getDate()).padStart(2, "0");
  let month = String(date.getMonth() + 1).padStart(2, "0");
  let year = String(date.getFullYear()).slice(-2);

  // Return the date in "dd.mm.yy" format
  return `${day}.${month}.${year}`;
};

export const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const toISOStringLocal = (d: Date) => {
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, -5);
};

export const getUpdatedDateRange = (
  selectedValue: string
): DateRangePickerValue => {
  let fromDate = new Date();
  let toDate = new Date();

  switch (selectedValue) {
    case "last_week":
      fromDate = addDays(toDate, -7);
      break;
    case "last_two_weeks":
      fromDate = addDays(toDate, -14);
      break;
    case "last_month":
      fromDate = addDays(toDate, -30);
      break;
    case "last_three_months":
      fromDate = addDays(toDate, -90);
      break;
    default:
      console.error("Time range selection error");
      break;
  }

  toDate = addDays(toDate, -1); // Set 'to' date to yesterday
  return { from: fromDate, to: toDate };
};

export const useDateRange = (initialDateRange: DateRangePickerValue) => {
  const [dateRange, setDateRange] =
    useState<DateRangePickerValue>(initialDateRange);

  // This function now directly accepts and sets the DateRangePickerValue
  const updateDateRange = (newDateRange: DateRangePickerValue) => {
    setDateRange(newDateRange);
  };

  return { dateRange, updateDateRange };
};
