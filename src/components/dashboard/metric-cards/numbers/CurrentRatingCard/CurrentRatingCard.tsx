import { gql, useQuery } from "@apollo/client";
import {
  BarChart,
  Bold,
  Card,
  DateRangePickerValue,
  Flex,
  List,
  ListItem,
  Metric,
  Text,
  Title,
  BarList,
} from "@tremor/react";
import React from "react";
import Spinner from "@/components/dashboard/dashboard-helpers/Spinner";

interface TopItemCardProps {
  vendorIds: string[];
  dateRange: DateRangePickerValue;
  orderPortal?: string[];
}

interface VendorRating {
  vendor_id: string;
  order_platform_name: string;
  rating_display: string;
  rating_count: string;
}

interface GetRatingResponse {
  api_partner_dashboard_api_pd_vendor_display_ratings_latest: VendorRating[];
}

interface DisplayData {
  avg_rating: string;
  count: number;
}

function calculateRatingPerVendor(ratings: VendorRating[]): DisplayData {
  let temp_rating: number = 0;
  let count: number = 0;

  // Loop through each order
  for (let rating of ratings) {
    let newRating = parseFloat(rating.rating_display);
    let newCount = parseFloat(rating.rating_display);
    // console.log("newRating", newRating)
    // console.log("newCount", newCount)

    temp_rating =
      (temp_rating * count + newRating * newCount) / (count + newCount);
    // console.log("temp_rating", temp_rating)
    count = count + newCount;
  }
  // console.log("temp_rating", temp_rating)
  let avg_rating = temp_rating.toFixed(2);

  return { avg_rating, count };
}

const LatestRatingCard = (RevenueCardProps: TopItemCardProps) => {
  const { vendorIds, dateRange, orderPortal } = RevenueCardProps;

  // console.log(vendorIds)
  let orderPortalList: string[];

  if (!orderPortal) {
    orderPortalList = ["Lieferando", "Uber Eats", "Wolt", "Lanch Webshop"];
  } else {
    orderPortalList = orderPortal;
  }

  const getRatingsQuery = gql`
    query getRatingsQuery(
      $_vendor_ids: [String!] = ["DE_Berlin_0014"]
      $_order_source_names: [String!] = [
        "Lieferando"
        "Uber Eats"
        "Wolt"
        "Lanch Webshop"
      ]
    ) {
      api_partner_dashboard_api_pd_vendor_display_ratings_latest(
        where: {
          vendor_id: { _in: $_vendor_ids }
          order_platform_name: { _in: $_order_source_names }
        }
      ) {
        vendor_id
        order_platform_name
        rating_display
        rating_count
      }
    }
  `;

  // console.log(getTotalGMVQuery)
  const { loading, error, data } = useQuery<GetRatingResponse>(
    getRatingsQuery,
    {
      variables: {
        _vendor_ids: vendorIds,
        _order_source_names: orderPortalList,
        // Other variables can be added here
      },
    }
  );
  // console.log(getTotalGMVresponse?.data?.api_partner_dashboard_api_pd_food_orders_aggregate)
  //console.log(data?.api_partner_dashboard_api_pd_food_orders_daily)
  //console.log("hello")
  // console.log()

  let display_data: DisplayData = { avg_rating: "0", count: 0 };
  if (data?.api_partner_dashboard_api_pd_vendor_display_ratings_latest) {
    display_data = calculateRatingPerVendor(
      data?.api_partner_dashboard_api_pd_vendor_display_ratings_latest
    );
  }

  if (loading)
    return (
      <Card>
        <Title>Rating</Title>
        <br></br>
        <br></br>
        <Spinner />
        <br></br>
        <br></br>
      </Card>
    );

  return (
    <Card>
      <Text>Aktuelles Rating</Text>
      <Metric>{display_data.avg_rating}</Metric>
    </Card>
  );
};

export default LatestRatingCard;
