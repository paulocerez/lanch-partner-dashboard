import {
  OutputType,
  DailyFoodOrderData,
  InputType,
} from "@/components/dashboard/metric-cards/CardProps";
import { convertDateFormat } from "./dateUtils";

export const valueFormatter = (number: number) =>
  Intl.NumberFormat("de").format(number).toString();

export const aggregateGMVData = (data: InputType[]): OutputType[] => {
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

export const aggregateOrderData = (data: InputType[]): OutputType[] => {
  const aggregate: { [key: string]: { [key: string]: string } } = {};

  data.forEach((date) => {
    const localOrderDate = convertDateFormat(date.order_date);
    if (!aggregate[localOrderDate]) {
      aggregate[localOrderDate] = {};
    }

    if (!aggregate[localOrderDate][date.order_source_name]) {
      aggregate[localOrderDate][date.order_source_name] = date.order_count;
    } else {
      aggregate[localOrderDate][date.order_source_name] = (
        parseFloat(aggregate[localOrderDate][date.order_source_name]) +
        parseFloat(date.order_count)
      )
        .toFixed(2)
        .toString();
    }
    console.log("Aggregated data so far: ", aggregate);
  });

  return Object.keys(aggregate).map((date) => {
    return { date: date, ...aggregate[date] };
  });
};
