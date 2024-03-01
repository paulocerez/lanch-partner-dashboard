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
  order_portal?: string[];
}

const RatingGraphCard = (RatingCardProps: RatingCardProps) => {
  const { vendorIds, dateRange, order_portal } = RatingCardProps;

  let order_portal_list: string[];

  if (!order_portal) {
    order_portal_list = ["Lieferando", "Uber Eats", "Wolt", "Lanch Webshop"];
  } else {
    order_portal_list = order_portal;
  }
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
    ordered_at: string;
    rating_food: number;
  }

  interface GetWeeklyFoodOrderRatingsResponse {
    api_partner_dashboard_api_pd_food_orders_aggregate: {
      aggregate: {
        avg: {
          rating_food: number;
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
        _order_source_names: order_portal_list,
      },
    }
  );

  if (loading) return <Spinner />;
  if (error) return <Text>Error loading data</Text>;

  // Process data to fit LineChart's data structure
  const chartData =
    data?.api_partner_dashboard_api_pd_food_orders_aggregate.nodes.map(
      (node) => ({
        date: node.ordered_at, // Convert to a proper format if necessary
        Rating: node.rating_food,
      })
    );

  return (
    <Card>
      <Title>Weekly Average Food Ratings</Title>
      <LineChart
        className="mt-4 h-80"
        data={chartData || []}
        index="date"
        categories={["Rating"]}
        colors={["blue"]}
        yAxisWidth={30}
        // Add any additional props you need for the LineChart
      />
    </Card>
  );
};

export default RatingGraphCard;
