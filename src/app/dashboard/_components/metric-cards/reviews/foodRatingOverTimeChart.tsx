"use client";
import { gql, useQuery } from "@apollo/client";
import {
  LineChart,
  Card,
  DateRangePickerValue,
  Text,
  Title,
} from "@tremor/react";
import React from "react";
import Spinner from "../../dashboard-helpers/spinner";

interface RatingCardProps {
  vendorIds: string[];
  dateRange: DateRangePickerValue;
  orderPortal?: string[];
}

const RatingGraphCard = (RatingCardProps: RatingCardProps) => {
  const { vendorIds, dateRange, orderPortal } = RatingCardProps;
  console.log(
    "vendorIds:",
    vendorIds,
    "dateRange:",
    dateRange,
    "orderPortal:",
    orderPortal
  );

  let orderPortalList: string[];

  if (!orderPortal) {
    orderPortalList = ["Lieferando", "Uber Eats", "Wolt", "Lanch Webshop"];
  } else {
    orderPortalList = orderPortal;
  }
  console.log("order_portal_list:", orderPortalList);

  const getWeeklyFoodOrderRatingsQuery = gql`
    query getWeeklyFoodOrderRatings(
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
      api_partner_dashboard_api_pd_food_orders_aggregate(
        where: {
          vendor_id: { _eq: $_vendor_ids }
          order_source_name: { _in: $_order_source_names }
          ordered_at: { _gte: $_fromDate, _lte: $_toDate }
          rating_food: { _is_null: false }
        }
      ) {
        aggregate {
          avg {
            rating_food
          }
        }
        nodes {
          ordered_at
          rating_food
        }
      }
    }
  `;

  // Define the types for your query response based on your schema
  interface RatingNode {
    orderedAt: string;
    ratingFood: number;
  }

  interface GetWeeklyFoodOrderRatingsResponse {
    api_partner_dashboard_api_pd_food_orders_aggregate: {
      aggregate: {
        avg: {
          ratingFood: number;
        };
      };
      nodes: RatingNode[];
    };
  }

  const { loading, error, data } = useQuery<GetWeeklyFoodOrderRatingsResponse>(
    getWeeklyFoodOrderRatingsQuery,
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
      },
    }
  );

  console.log("loading:", loading, "error:", error, "data:", data);

  if (error) {
    console.error("Error loading data:", error);
    return <Text>Error loading data</Text>;
  }

  // Process data to fit LineChart's data structure
  const chartData =
    data?.api_partner_dashboard_api_pd_food_orders_aggregate.nodes.map(
      (node) => ({
        date: node.orderedAt, // Convert to a proper format if necessary
        Rating: node.ratingFood,
      })
    );

  console.log("chartData:", chartData);

  if (loading)
    return (
      <Card>
        <Text>Ratings</Text>
        <br></br>
        <br></br>
        <Spinner />
        <br></br>
        <br></br>
      </Card>
    );

  return (
    <Card>
      <Title>Weekly Average Food Ratings</Title>
      <LineChart
        className="mt-4 h-80"
        data={chartData || []}
        index="date"
        categories={["Lieferando", "Uber Eats", "Wolt", "Lanch Webshop"]}
        colors={["blue"]}
        yAxisWidth={30}
        // Add any additional props you need for the LineChart
      />
    </Card>
  );
};

export default RatingGraphCard;
