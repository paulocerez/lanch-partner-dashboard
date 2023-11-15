
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
      console.log("vendor_name", vendor_name)
      let rating30 = parseInt(rating.average_rating_last_30_days);
      let count30 = parseInt(rating.count_reviews_last_30_days);
      //let plattform = rating.order_source_name;


      // If the article name is in the map, add the quantity to it
      if(ratingMap.has(vendor_id)) {
          // get old rating and old count
          let oldRating = ratingMap.get(vendor_id)!;
          let oldCount = countMap.get(vendor_id)!;
          // get rating and count from this rating
          // calculate new rating and new count
          let newRating = parseFloat(((oldRating * oldCount + rating30 * count30) / (oldCount + count30)).toFixed(2));
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

  console.log("nameMap", nameMap)

  // Create an array of items and their total quantities
  let result: RatingItem[] = [];
  ratingMap.forEach((value: number, key: string) => {
      result.push({ 
        vendor_id: key, 
        vendor_name: nameMap.get(key)!,
        rating: value,
        count: countMap.get(key)!
      });
  });

  // Sort the result array in descending order by total_count
  result.sort((a, b) => a.vendor_name.localeCompare(b.vendor_name));

  return result;
}


const RatingByVendorCard = (RevenueCardProps: TopItemCardProps) => {

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

  let ratings: RatingItem[] = []
  if (data?.api_partner_dashboard_api_pd_vendor_food_ratings) {
    ratings = calculateRatingPerVendor(data?.api_partner_dashboard_api_pd_vendor_food_ratings)
  } 
  




  if (loading) return (
    <Card>
      <Title>Top Seller</Title>
      <br></br>
      <br></br>
      <Spinner />
      <br></br>
      <br></br>
    </Card>
  )

  return (
    <Card className="max-w-xs">
                        <Title>Ratings letzte 30 Tage</Title>
                  <Flex className="mt-4">
                    <Text>
                      <Bold>Store</Bold>
                    </Text>
                    <Text>
                      <Bold>Rating</Bold>
                    </Text>
                  </Flex>
                  <BarList data={ratings.slice(0,50).map(rating => {
                    return {
                      name: rating.vendor_name,
                      value: rating.rating
                    } 
                  })} className="mt-2" />
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
  )
};

export default RatingByVendorCard;