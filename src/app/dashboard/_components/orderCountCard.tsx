import { gql, useQuery, useSuspenseQuery } from "@apollo/client";
import { Card, DateRangePickerValue, Metric, Text } from "@tremor/react";
import React from "react";
import Spinner from "./spinner";

interface RevenueCardProps {
  vendorIds: string[];
  dateRange: DateRangePickerValue;
  order_portal?: string[];
}
const OrderCountCard = (RevenueCardProps: RevenueCardProps) => {

const { vendorIds, dateRange, order_portal } = RevenueCardProps;

if(dateRange?.from && dateRange?.to) {
  console.log("dateRange dates")
  console.log(dateRange.from)
  console.log(dateRange.to)
} else {
  console.log(dateRange.selectValue)
}

const getTotalGMVQuery = gql`
  query getTotalGMV(
  $_brands: [String!] = ["Happy Slice", "Loco Chicken"], 
  $_countries: [String!] = ["DE"], 
  $_vendor_ids: [String!] = ["DE_Berlin_0014"], 
  $_fromDate: Timestamp = "2023-09-15", 
  $_toDate: Timestamp = "2023-10-27",
  $_order_source_names: [String!] = ["Lieferando", "Uber Eats", "Wolt", "Lanch Webshop"]
) {
  api_partner_dashboard_api_pd_food_orders_aggregate(
    where: {
      brand: { _in: $_brands }, 
      country: { _in: $_countries },
      vendor_id: { _in: $_vendor_ids },
      order_source_name: { _in: $_order_source_names },
      ordered_at: { 
        _gte: $_fromDate, 
        _lte: $_toDate 
      }
    }
  ) {
    aggregate {
      count
      sum {
        gmv
      }
    }
  }
}
`;

  interface GetTotalGMVResponse {

    api_partner_dashboard_api_pd_food_orders_aggregate: {
        aggregate: {
          count: string;
          sum: {
            gmv: string;
          };
        };

    };
  }

  //const   
  const { loading, error, data } = useQuery<GetTotalGMVResponse>(getTotalGMVQuery, {
    variables: {
      _vendor_ids: vendorIds,
      _fromDate: dateRange?.from ? dateRange.from.toISOString().split('T')[0] : new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 8)),
      _toDate: dateRange?.to ? dateRange.to.toISOString().split('T')[0] : new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 1)),
    },
  });
  if (loading) return (
    <Card>
      <Text>Bestellungen</Text>
      <Spinner />
    </Card>
  )

  return (
    <Card>
      <Text>Bestellungen</Text>
      <Metric>{data?.api_partner_dashboard_api_pd_food_orders_aggregate?.aggregate?.count}</Metric>
    </Card>
  )
};

export default OrderCountCard;