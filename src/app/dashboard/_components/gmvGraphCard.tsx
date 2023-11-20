'use client'
import { gql, useSuspenseQuery } from "@apollo/client";
import { BarChart, Card, DateRangePickerValue, Metric, Text, Title } from "@tremor/react";
import React from "react";

interface RevenueCardProps {
  vendorIds: string[];
  dateRange: DateRangePickerValue;
  order_portal?: string[];
}
const GmvGraphCard = (RevenueCardProps: RevenueCardProps) => {

const { vendorIds, dateRange, order_portal } = RevenueCardProps;

let order_portal_list: string[];

if (!order_portal) {
  order_portal_list = ["Lieferando", "Uber Eats", "Wolt", "Lanch Webshop"];
} else {
  order_portal_list = order_portal;
}


const getGmvPerDayQuery = gql`
  query getGMVperDay(
    $_brands: [String!] = ["Happy Slice", "Loco Chicken"], 
    $_vendor_ids: [String!] = ["DE_Berlin_0014"], 
    $_fromDate: Date = "2023-09-15", 
    $_toDate: Date = "2023-10-27", 
    $_order_source_names: [String!] = ["Lieferando", "Uber Eats", "Wolt", "Lanch Webshop"]
  ) {
  api_partner_dashboard_api_pd_food_orders_daily(
    where: {
      brand: {
        _in: $_brands
      }, 
      vendor_id: {
        _in: $_vendor_ids
      }, 
      order_source_name: {
        _in: $_order_source_names
      }, 
      order_date: {
        _gte: $_fromDate, _lte: $_toDate
      }}) {
    total_gmv
    order_count
    order_source_name
    order_date
    brand
  }
}
`;

  interface GetGmvPerDayResponse {
    api_partner_dashboard_api_pd_food_orders_daily: {
      total_gmv: string;
      order_count: string;
      order_source_name: string;
      order_date: string;
      brand: string;
    };
  }



  // console.log(getTotalGMVQuery)
  const getGmvPerDayresponse = useSuspenseQuery<GetGmvPerDayResponse>(getGmvPerDayQuery, {
    variables: {
      _vendor_ids: vendorIds,
      _fromDate: dateRange?.from ? dateRange.from.toISOString().split('T')[0] : new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 8)),
      _toDate: dateRange?.to ? dateRange.to.toISOString().split('T')[0] : new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 1)),
      _order_source_names: order_portal_list
      // Other variables can be added here
    },
  });
  // console.log(getTotalGMVresponse?.data?.api_partner_dashboard_api_pd_food_orders_aggregate)

  return (
    <Card>
      <Title>Umsatz</Title>
      <Text>Außenumsatz nach Plattform</Text>
      {/* <Text>{JSON.stringify(getGmvPerDayresponse?.data?.api_partner_dashboard_api_pd_food_orders_daily) }</Text> */}
      {/* <BarChart
        className="mt-4 h-80"
        data={revenueData}
        index="Month"
        categories={["Lieferando", "Uber Eats", "Wolt"]}
        colors={["amber", "lime", "sky"]}
        valueFormatter={valueFormatter}
        stack={true}
        relative={true}
      /> */}
    </Card>


    // <Card>
    //   <Text>Umsatz</Text>
    //   <Metric>{
    //     vendorIds.length > 0 ?
    //     getTotalGMVresponse?.data?.api_partner_dashboard_api_pd_food_orders_daily?.total_gmv
    //     :
    //       "Wähle Restaurants"
    //   }</Metric>
    // </Card>

  )
};

export default GmvGraphCard;