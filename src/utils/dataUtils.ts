import {
  DailyGMVData,
  InputType,
  OutputType,
} from "@/components/dashboard/metric-cards/CardProps";

export const toISOStringLocal = (d: Date) => {
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, -5);
};

// Function to add days to a date
export const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const aggregateData = (data: InputType[]): OutputType[] => {
  const aggregate: { [key: string]: { [key: string]: string } } = {};

  data.forEach((date) => {
    const localOrderDate = convertDateFormat(date.order_date);
    if (!aggregate[localOrderDate]) {
      aggregate[localOrderDate] = {};
    }

    if (!aggregate[localOrderDate][date.order_source_name]) {
      aggregate[localOrderDate][date.order_source_name] = date.total_gmv;
    } else {
      aggregate[localOrderDate][date.order_source_name] = (
        parseFloat(aggregate[localOrderDate][date.order_source_name]) +
        parseFloat(date.total_gmv)
      )
        .toFixed(2)
        .toString();
    }
  });

  return Object.keys(aggregate).map((date) => {
    return { date: date, ...aggregate[date] };
  });
};

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

export const valueFormatter = (number: number) =>
  Intl.NumberFormat("de").format(number).toString();
