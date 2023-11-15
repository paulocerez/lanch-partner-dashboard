
import { gql, useQuery,  } from "@apollo/client";
import { BarChart, Bold, Card, DateRangePickerValue, Flex, List, ListItem, Metric, Text, Title, BarList } from "@tremor/react";
import React from "react";
import Spinner from "./spinner";

interface TopItemCardProps {
  vendorIds: string[];
  dateRange: DateRangePickerValue;
  order_portal?: string[];
}

interface VendorRating {
  vendor_id: string;
  vendor_name: string;
  count_reviews_last_30_days: string;
  average_rating_last_30_days: string;
  order_source_name: string;
}

interface GetRatingResponse {
  api_partner_dashboard_api_pd_vendor_food_ratings: VendorRating[];
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
      let newRating = parseFloat(rating.average_rating_last_30_days);
      let newCount = parseFloat(rating.count_reviews_last_30_days);
      console.log("newRating", newRating)
      console.log("newCount", newCount)

      temp_rating = (temp_rating * count + newRating * newCount) / (count + newCount);
      console.log("temp_rating", temp_rating)
      count = count + newCount;
  }
  console.log("temp_rating", temp_rating)
  let avg_rating = temp_rating.toFixed(2)

  return {avg_rating, count};
}


const RatingAverageCard = (RevenueCardProps: TopItemCardProps) => {

  const { vendorIds, dateRange, order_portal } = RevenueCardProps;

// console.log(vendorIds)


  const getRatingsQuery = gql`
    query getRatingsQuery($_vendor_ids: [String!] = ["DE_Berlin_0014"]) {
      api_partner_dashboard_api_pd_vendor_food_ratings(where: {vendor_id: {_in: $_vendor_ids}}) {
        vendor_id
        vendor_name
        count_reviews_last_30_days
        average_rating_last_30_days
        order_source_name
      }
    }
`;

  // console.log(getTotalGMVQuery)
  const { loading, error, data } = useQuery<GetRatingResponse>(getRatingsQuery, {
    variables: {
      _vendor_ids: vendorIds,
      _fromDate: dateRange?.from ? dateRange.from.toISOString().split('T')[0] : new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 8)),
      _toDate: dateRange?.to ? dateRange.to.toISOString().split('T')[0] : new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 1)),
      // Other variables can be added here
    },
  });
  // console.log(getTotalGMVresponse?.data?.api_partner_dashboard_api_pd_food_orders_aggregate)
  //console.log(data?.api_partner_dashboard_api_pd_food_orders_daily)
  console.log("hello")
  // console.log()

  let display_data: DisplayData = {avg_rating: "0", count: 0};
  if (data?.api_partner_dashboard_api_pd_vendor_food_ratings) {
    display_data = calculateRatingPerVendor(data?.api_partner_dashboard_api_pd_vendor_food_ratings)
  } 
  




  if (loading) return (
    <Card>
      <Title>Rating</Title>
      <br></br>
      <br></br>
      <Spinner />
      <br></br>
      <br></br>
    </Card>
  )

  return (
    <Card>
      <Text>Durschnitt letzte 30 Tage Rating</Text>
      <Metric>{
        display_data.avg_rating
      }</Metric>
    </Card>

  )
};

export default RatingAverageCard;