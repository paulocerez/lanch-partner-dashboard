import React from "react";
import Spinner from "@/components/dashboard/dashboard-helpers/Spinner";
import { gql, useQuery, useSuspenseQuery } from "@apollo/client";
import { Card, DateRangePickerValue, Metric, Text } from "@tremor/react";

interface AOVCardProps {
  vendorIds: string[];
  dateRange: DateRangePickerValue;
  order_portal?: string[];
}

const AOVCard = (AOVCardProps: AOVCardProps) => {
  const { vendorIds, dateRange, order_portal } = AOVCardProps;

  let order_portal_list: string[];

  if (!order_portal) {
    order_portal_list = ["Lieferando", "Uber Eats", "Wolt", "Lanch Webshop"];
  } else {
    order_portal_list = order_portal;
  }

  const getTotalGMVQuery = gql`
    query getTotalGMV(
      $_vendor_ids: [String!] = ["DE_Berlin_0014"]
      $_fromDate: Timestamp = "2023-09-15"
      $_toDate: Timestamp = "2023-10-27"
      $_order_source_names: [String!] = [
        "Lieferando"
        "Uber Eats"
        "Wolt"
        "Lanch Webshop"
      ]
    ) {
      api_partner_dashboard_api_pd_food_orders_aggregate(
        where: {
          vendor_id: { _in: $_vendor_ids }
          order_source_name: { _in: $_order_source_names }
          ordered_at: { _gte: $_fromDate, _lte: $_toDate }
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

  const toISOStringLocal = (d: Date) => {
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, -5);
  };

  // Function to add days to a date
  const addDays = (date: Date, days: number) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const variables = {
    _vendor_ids: vendorIds,
    _fromDate: dateRange?.from
      ? toISOStringLocal(new Date(dateRange.from))
      : toISOStringLocal(
          new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7)
        ),
    _toDate: dateRange?.to
      ? toISOStringLocal(
          new Date(addDays(new Date(dateRange.to), 1).setSeconds(-1))
        )
      : toISOStringLocal(
          new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 1)
        ),
    _order_source_names: order_portal_list,
    // Other variables can be added here
  };
  const { loading, error, data } = useQuery<GetTotalGMVResponse>(
    getTotalGMVQuery,
    {
      // if one of these variables changes, the getTotalGMV query is triggered
      variables: variables,
    }
  );

  if (loading)
    return (
      <Card>
        <Text>⌀ Warenkorbwert</Text>
        <Spinner />
      </Card>
    );

  return (
    <Card>
      <Text>⌀ Warenkorbwert</Text>
      <Metric>
        {vendorIds.length > 0
          ? (
              parseFloat(
                data?.api_partner_dashboard_api_pd_food_orders_aggregate
                  ?.aggregate.sum.gmv || "0"
              ) /
              parseInt(
                data?.api_partner_dashboard_api_pd_food_orders_aggregate
                  ?.aggregate.count || "0"
              )
            )
              .toFixed(2)
              .toLocaleString() + "€"
          : "Wähle Restaurants"}
      </Metric>
    </Card>
  );
};

export default AOVCard;
