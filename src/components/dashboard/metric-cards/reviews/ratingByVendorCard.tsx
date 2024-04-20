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
import Spinner from "../../dashboard-helpers/Spinner";

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

interface RatingItem {
  vendor_id: string;
  vendor_name: string;
  rating: number;
  count: number;
}

function calculateRatingPerVendor(ratings: VendorRating[]): RatingItem[] {
  let ratingMap = new Map<string, number>();
  let countMap = new Map<string, number>();
  let nameMap = new Map<string, string>();

  // Loop through each order
  for (let rating of ratings) {
    let vendor_id = rating.vendor_id;
    let vendor_name = rating.vendor_name;
    let rating30 = parseFloat(rating.average_rating_last_30_days);
    let count30 = parseFloat(rating.count_reviews_last_30_days);
    //let plattform = rating.order_source_name;

    // If the article name is in the map, add the quantity to it
    if (ratingMap.has(vendor_id)) {
      // get old rating and old count
      let oldRating = ratingMap.get(vendor_id)!;
      let oldCount = countMap.get(vendor_id)!;
      // get rating and count from this rating
      // calculate new rating and new count
      let newRating = parseFloat(
        (
          (oldRating * oldCount + rating30 * count30) /
          (oldCount + count30)
        ).toFixed(2)
      );
      let newCount = oldCount + count30;
      ratingMap.set(vendor_id, newRating);
      countMap.set(vendor_id, newCount);
      nameMap.set(vendor_id, vendor_name);
    }
    // Else, add the article name to the map with the quantity
    else {
      ratingMap.set(vendor_id, rating30);
      countMap.set(vendor_id, count30);
      nameMap.set(vendor_id, vendor_name);
    }
  }

  // Create an array of items and their total quantities
  let result: RatingItem[] = [];
  ratingMap.forEach((value: number, key: string) => {
    result.push({
      vendor_id: key,
      vendor_name: nameMap.get(key)!,
      rating: value,
      count: countMap.get(key)!,
    });
  });

  // Sort the result array in descending order by total_count
  result.sort((a, b) => a.vendor_name.localeCompare(b.vendor_name));

  return result;
}

const RatingByVendorCard = (RevenueCardProps: TopItemCardProps) => {
  const { vendorIds, dateRange, order_portal } = RevenueCardProps;

  let order_portal_list: string[];

  if (!order_portal) {
    order_portal_list = ["Lieferando", "Uber Eats", "Wolt", "Lanch Webshop"];
  } else {
    order_portal_list = order_portal;
  }

  const getRatingsQuery = gql`
    query getRatingsQuery($_vendor_ids: [String!] = ["DE_Berlin_0014"]) {
      api_partner_dashboard_api_pd_vendor_food_ratings(
        where: { vendor_id: { _in: $_vendor_ids } }
      ) {
        vendor_id
        vendor_name
        count_reviews_last_30_days
        average_rating_last_30_days
        order_source_name
      }
    }
  `;

  const { loading, error, data } = useQuery<GetRatingResponse>(
    getRatingsQuery,
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
        // Other variables can be added here
      },
    }
  );

  let ratings: RatingItem[] = [];
  if (data?.api_partner_dashboard_api_pd_vendor_food_ratings) {
    ratings = calculateRatingPerVendor(
      data?.api_partner_dashboard_api_pd_vendor_food_ratings
    );
  }

  if (loading)
    return (
      <Card>
        <Title>Top Seller</Title>
        <br></br>
        <br></br>
        <Spinner />
        <br></br>
        <br></br>
      </Card>
    );

  return (
    <Card className="max-w">
      <Title>Ratings letzte 30 Tage</Title>
      <Flex className="mt-4">
        <Text>
          <Bold>Store</Bold>
        </Text>
        <Text>
          <Bold>Rating</Bold>
        </Text>
      </Flex>
      <BarList
        data={ratings.slice(0, 50).map((rating) => {
          return {
            name: rating.vendor_name,
            value: rating.rating,
          };
        })}
        className="mt-2"
      />
    </Card>

    //   <Card className="max-w-xs">
    //   <Title>Top Seller</Title>
    //   <List>
    //     <ListItem key="header">
    //         <span>Artikel</span>
    //         <span>Anzahl</span>
    //     </ListItem>

    //     {topItems.map((item) => (
    //       <ListItem key={item.article_name}>
    //         <span>{item.article_name}</span>
    //         <span>{item.total_count}</span>
    //       </ListItem>
    //     ))}
    //   </List>
    // </Card>
  );
};

export default RatingByVendorCard;
