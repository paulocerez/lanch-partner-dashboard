import { gql, useQuery } from "@apollo/client";
import {
  BarChart,
  Card,
  DateRangePickerValue,
  Text,
  Title,
} from "@tremor/react";
import React from "react";
import Spinner from "@/components/dashboard/dashboard-helpers/Spinner";

interface RevenueCardProps {
  vendorIds: string[];
  dateRange: DateRangePickerValue;
  orderPortal?: string[];
}

type InputType = {
  total_gmv: string;
  order_count: string;
  order_source_name: string;
  order_date: string;
  brand: string;
};
const valueFormatter = (number: number) =>
  Intl.NumberFormat("de").format(number).toString();

type OutputType = {
  date: string;
  [key: string]: string;
};

function aggregateData(data: InputType[]): OutputType[] {
  const aggregate: { [key: string]: { [key: string]: string } } = {};

  data.forEach((date) => {
    const local_order_date = convertDateFormat(date.order_date);
    if (!aggregate[local_order_date]) {
      aggregate[local_order_date] = {};
    }

    if (!aggregate[local_order_date][date.order_source_name]) {
      aggregate[local_order_date][date.order_source_name] = date.total_gmv;
    } else {
      // Convert the total_gmv to a number, add the current total_gmv, then convert it back to a string
      aggregate[local_order_date][date.order_source_name] = (
        parseFloat(aggregate[local_order_date][date.order_source_name]) +
        parseFloat(date.total_gmv)
      )
        .toFixed(2)
        .toString();
    }
  });

  return Object.keys(aggregate).map((date) => {
    return { date: date, ...aggregate[date] };
  });
}

function convertDateFormat(inputDate: string): string {
  // Create a new date object from the input string
  let date = new Date(inputDate);

  // Extract the day, month and year from the date object
  let day = String(date.getDate()).padStart(2, "0");
  let month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0 based in JavaScript
  let year = String(date.getFullYear()).slice(-2); // Get the last two digits of the year

  // Return the date in "dd.mm.yy" format
  return `${day}.${month}.${year}`;
}

const RevenueChartCard = (RevenueCardProps: RevenueCardProps) => {
  const { vendorIds, dateRange, orderPortal } = RevenueCardProps;

  let orderPortalList: string[];

  if (!orderPortal) {
    orderPortalList = ["Lieferando", "Uber Eats", "Wolt", "Lanch Webshop"];
  } else {
    orderPortalList = orderPortal;
  }

  // console.log(vendorIds)

  const getGMVperDayQuery = gql`
    query getGMVperDay(
      $_vendor_ids: [String!] = ["DE_Berlin_0014"]
      $_fromDate: Date = "2023-09-15"
      $_toDate: Date = "2023-10-27"
      $_order_source_names: [String!] = [
        "Lieferando"
        "Uber Eats"
        "Wolt"
        "Lanch Webshop"
      ]
    ) {
      api_partner_dashboard_api_pd_food_orders_daily(
        where: {
          vendor_id: { _in: $_vendor_ids }
          order_source_name: { _in: $_order_source_names }
          order_date: { _gt: $_fromDate, _lte: $_toDate }
        }
        order_by: { order_date: asc }
      ) {
        total_gmv
        order_count
        order_source_name
        order_date
        brand
      }
    }
  `;

  interface GMVperDay {
    total_gmv: string;
    order_count: string;
    order_source_name: string;
    order_date: string;
    brand: string;
  }

  interface GetGMVperDailyResponse {
    api_partner_dashboard_api_pd_food_orders_daily: GMVperDay[];
  }

  // console.log(getTotalGMVQuery)
  const { loading, error, data } = useQuery<GetGMVperDailyResponse>(
    getGMVperDayQuery,
    {
      variables: {
        _vendor_ids: vendorIds,
        _fromDate: dateRange?.from
          ? dateRange.from.toISOString().split("T")[0]
          : new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 8),
        _toDate: dateRange?.to
          ? dateRange.to.toISOString().split("T")[0]
          : new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 1),
        _order_source_names: orderPortalList,
        // Other variables can be added here
      },
    }
  );
  // console.log(getTotalGMVresponse?.data?.api_partner_dashboard_api_pd_food_orders_aggregate)
  //console.log(data?.api_partner_dashboard_api_pd_food_orders_daily)
  // console.log()

  let revenueData: OutputType[] = [];
  if (data?.api_partner_dashboard_api_pd_food_orders_daily) {
    revenueData = aggregateData(
      data?.api_partner_dashboard_api_pd_food_orders_daily
    );
  }

  if (loading)
    return (
      <Card>
        <Text>Umsatz</Text>
        <br></br>
        <br></br>
        <Spinner />
        <br></br>
        <br></br>
      </Card>
    );

  return (
    <Card>
      <Title>Umsatz</Title>
      <Text>Außenumsatz nach Plattform (relativ)</Text>
      {/* <p>lol</p>
    <p>
      {
        JSON.stringify(revenueData)
      }
    </p> */}
      <BarChart
        className="mt-4 h-80"
        data={revenueData}
        index="date"
        categories={["Lieferando", "Uber Eats", "Wolt", "Lanch Webshop"]}
        colors={["amber", "lime", "sky"]}
        valueFormatter={valueFormatter}
        stack={true}
        relative={true}
      />
    </Card>
  );
};

export default RevenueChartCard;