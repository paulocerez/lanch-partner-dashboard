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
import Spinner from "../../dashboard-helpers/Spinner";

interface RatingCardProps {
  vendorIds: string[];
  dateRange: DateRangePickerValue;
  orderPortal?: string[];
}

const RatingGraphCard = (RatingCardProps: RatingCardProps) => {
  const { vendorIds, dateRange, orderPortal } = RatingCardProps;
  //   console.log("Received props:", { vendorIds, dateRange, orderPortal });
  let orderPortalList: string[];

  if (!orderPortal) {
    orderPortalList = ["Lieferando", "Uber Eats", "Wolt", "Lanch Webshop"];
  } else {
    orderPortalList = orderPortal;
  }
  //   console.log("orderPortalList:", orderPortalList);

  const getWeeklyFoodOrderRatingsQuery = gql`
    query getWeeklyFoodOrderRatings(
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
          rating_food: { _is_null: false }
        }
      ) {
        aggregate {
          avg {
            rating_food
          }
        }
        nodes {
          ordered_at: timestamp_trunc_week
          rating_food_avg: avg_rating_food
          rating_food_count: count
        }
      }
    }
  `;

  // Define the types for your query response based on your schema
  interface RatingNode {
    orderedAt: string;
    ratingFoodAvg: number;
    ratingFoodCount: number;
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
        _fromDate: dateRange?.from?.toISOString() ?? "",
        _toDate: dateRange?.to?.toISOString() ?? "",
        _order_source_names: orderPortalList,
      },
    }
  );

  //   console.log("Query state:", { loading, error, data });

  if (error) {
    console.error("Error loading data:", error);
    // console.log("Error details:", error);

    return <Text>Error loading data</Text>;
  }

  // Process data to fit LineChart's data structure
  const chartData =
    data?.api_partner_dashboard_api_pd_food_orders_aggregate.nodes.map(
      (node) => ({
        date: node.orderedAt, // This assumes your date is already in a proper format
        Rating: node.ratingFoodAvg,
        Count: node.ratingFoodCount, // Optional: You can show this in tooltips or elsewhere if needed
      })
    );

  //   console.log("Processed chart data:", chartData);

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

  // Return some UI to let the user know they need to select a vendor
  if (vendorIds.length === 0) {
    return (
      <Card>
        <Text>
          Please select at least one vendor to display the ratings chart.
        </Text>
      </Card>
    );
  }

  return (
    <Card>
      <Title>Weekly Average Food Ratings</Title>
      <LineChart
        className="mt-4 h-80"
        data={chartData || []}
        index="date"
        categories={orderPortalList}
        colors={["blue", "red", "green", "yellow"]} // You can customize these colors
        yAxisWidth={30}
        // Add any additional props you need for the LineChart
      />
    </Card>
  );
};

export default RatingGraphCard;
