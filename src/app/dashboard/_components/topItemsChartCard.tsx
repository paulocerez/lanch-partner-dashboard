
import { gql, useQuery,  } from "@apollo/client";
import { BarChart, Bold, Card, DateRangePickerValue, Flex, List, ListItem, Metric, Text, Title, BarList } from "@tremor/react";
import React from "react";
import Spinner from "./spinner";

interface TopItemCardProps {
  vendorIds: string[];
  dateRange: DateRangePickerValue;
  order_portal?: string[];
}

interface FoodOrderItem {
  vendor_id: string;
  quantity: string;
  order_date: string;
  article_name: string;
}

interface GetTopItemsResponse {
  api_partner_dashboard_api_pd_food_order_items_daily: FoodOrderItem[];
}

// interface InputType {
//   data: Data;
// }

const valueFormatter = (number:number) => Intl.NumberFormat("de").format(number).toString();



interface TopItems {
  name: string;
  value: number;
}

function calculateTotal(items: FoodOrderItem[]): TopItems[] {
  let map = new Map<string, number>();

  // Loop through each order
  for (let item of items) {
      let articleName = item.article_name;
      let quantity = parseInt(item.quantity);

      // If the article name is in the map, add the quantity to it
      if(map.has(articleName)) {
          map.set(articleName, map.get(articleName)! + quantity);
      }
      // Else, add the article name to the map with the quantity
      else {
          map.set(articleName, quantity);
      }
  }

  // Create an array of items and their total quantities
  let result: TopItems[] = [];
  map.forEach((value: number, key: string) => {
      result.push({ name: key, value: value });
  });

  // Sort the result array in descending order by total_count
  result.sort((a, b) => b.value - a.value);

  return result;
}


const TopItemChartCard = (RevenueCardProps: TopItemCardProps) => {

  const { vendorIds, dateRange, order_portal } = RevenueCardProps;

// console.log(vendorIds)

let order_portal_list: string[];

if (!order_portal) {
  order_portal_list = ["Lieferando", "Uber Eats", "Wolt", "Lanch Webshop"];
} else {
  order_portal_list = order_portal;
}


  const getTopItemsQuery = gql`
query getTopItemsQuery(
    $_vendor_ids: [String!] = ["DE_Berlin_0014"], 
    $_fromDate: Date = "2023-09-15", 
    $_toDate: Date = "2023-10-27", 
  ) {
  api_partner_dashboard_api_pd_food_order_items_daily(
    where: {

      vendor_id: {
        _in: $_vendor_ids
        }, 

      order_date: {
        _gt: $_fromDate, _lte: $_toDate
        }
      },
    order_by: {order_date: asc}
    ) {
    vendor_id
    quantity
    order_date
    article_name
  }
}
`;



  // console.log(getTotalGMVQuery)
  const { loading, error, data } = useQuery<GetTopItemsResponse>(getTopItemsQuery, {
    variables: {
      _vendor_ids: vendorIds,
      _fromDate: dateRange?.from ? dateRange.from.toISOString().split('T')[0] : new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 8)),
      _toDate: dateRange?.to ? dateRange.to.toISOString().split('T')[0] : new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 1)),
      _order_source_names: order_portal_list
      // Other variables can be added here
    },
  });
  // console.log(getTotalGMVresponse?.data?.api_partner_dashboard_api_pd_food_orders_aggregate)
  //console.log(data?.api_partner_dashboard_api_pd_food_orders_daily)
  console.log("hello")
  // console.log()

  let topItems: TopItems[] = []
  if (data?.api_partner_dashboard_api_pd_food_order_items_daily) {
    topItems = calculateTotal(data?.api_partner_dashboard_api_pd_food_order_items_daily)
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
    <Card className="max-w">
                        <Title>Top Selling Products</Title>
                  <Flex className="mt-4">
                    <Text>
                      <Bold>Item</Bold>
                    </Text>
                    <Text>
                      <Bold>Verkäufe</Bold>
                    </Text>
                  </Flex>
                  <BarList data={topItems.slice(0,10)} className="mt-2" />
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

export default TopItemChartCard;