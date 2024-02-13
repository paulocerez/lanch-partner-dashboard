
import { gql, useQuery,  } from "@apollo/client";
import { BarChart, Bold, Card, DateRangePickerValue, Flex, List, ListItem, Metric, Text, Title, BarList } from "@tremor/react";
import React from "react";
import Spinner from "../dashboard-helpers/spinner";

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
      // console.log("newRating", newRating)
      // console.log("newCount", newCount)

      temp_rating = (temp_rating * count + newRating * newCount) / (count + newCount);
      // console.log("temp_rating", temp_rating)
      count = count + newCount;
  }
  // console.log("temp_rating", temp_rating)
  let avg_rating = temp_rating.toFixed(2)

  return {avg_rating, count};
}


const RatingAverageCard = (RevenueCardProps: TopItemCardProps) => {

  const { vendorIds, dateRange, order_portal } = RevenueCardProps;

// console.log(vendorIds)
let order_portal_list: string[];

if (!order_portal) {
  order_portal_list = ["Lieferando", "Uber Eats", "Wolt", "Lanch Webshop"];
} else {
  order_portal_list = order_portal;
}


  const getRatingsQuery = gql`
query getRatingsQuery(
    $_vendor_ids: [String!] = ["DE_Berlin_0014"],
    $_order_source_names: [String!] = ["Lieferando", "Uber Eats", "Wolt", "Lanch Webshop"]
  ) {
  api_partner_dashboard_api_pd_vendor_food_ratings(
    where: {
      vendor_id: {_in: $_vendor_ids},
      order_source_name: { _in: $_order_source_names }
    }
  ) {
    vendor_id
    vendor_name
    count_reviews_last_30_days
    average_rating_last_30_days
    order_source_name
  }
}
`;

  const toISOStringLocal = (d: Date) => {
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, -5);
  }
  
  // Function to add days to a date
  const addDays = (date: Date, days: number) => {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
  }
  
  const variables = {
    _vendor_ids: vendorIds,
    _fromDate: dateRange?.from 
        ? toISOStringLocal(new Date(dateRange.from))
        : toISOStringLocal(new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 7))),
    _toDate: dateRange?.to 
        ? toISOStringLocal(new Date(addDays(new Date(dateRange.to), 1).setSeconds(-1)))
        : toISOStringLocal(new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 1))),
    _order_source_names: order_portal_list
    // Other variables can be added here
  }
    const { loading, error, data } = useQuery<GetRatingResponse>(getRatingsQuery, {
      // if one of these variables changes, the getTotalGMV query is triggered
      variables: variables
  
    });







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
      <Text>Aktuelles Rating</Text>
      <Metric>{
        display_data.avg_rating
      }</Metric>
    </Card>

  )
};

export default RatingAverageCard;