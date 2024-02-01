'use client';

import { Button } from "@tremor/react";

import Image from "next/image";
import { redirect } from "next/navigation"
import {
  Card,
  Grid,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
  Metric,
  BarChart,
  Flex,
  Bold,
  BarList
} from "@tremor/react";
import { DatePicker } from "./(components)/datepicker";
import { useState } from "react";
import {
  MultiSelect,
  MultiSelectItem,
} from "@tremor/react";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";
import * as data from "./data";








const query = gql`query getAllVendors($_brands: [String!] = ["Happy Slice", "Loco Chicken"], $_countries: [String!] = ["DE"]) {
  api_partner_dashboard_api_pd_food_orders(limit: 100, distinct_on: vendor_id, order_by: {vendor_id: asc}, where: {brand: {_in: $_brands}, country: {_in: $_countries}}) {
    vendor_id
  }
}`;

interface FoodOrder {
  vendor_id: string;
}

interface GetAllVendorsResponse {
  api_partner_dashboard_api_pd_food_orders: FoodOrder[];
}

const getTotalGMVQuery = gql`
  query getTotalGMV($_brands: [String!] = ["Happy Slice", "Loco Chicken"], $_countries: [String!] = ["DE"], $_vendor_ids: [String!] = ["DE_Berlin_0014"], $_fromDate: Timestamp = "2023-07-15", $_toDate: Timestamp = "2023-10-27") {
    api_partner_dashboard_api_pd_food_orders_aggregate(where: {brand: {_in: $_brands}, country: {_in: $_countries}, vendor_id: {_in: $_vendor_ids}, _and: {ordered_at: {_gte: $_fromDate}}, ordered_at: {_lte: $_toDate}}) {
    aggregate {
      count
      sum {
        gmv
      }
    }
  }
}`;

interface GetTotalGMVResponse {
  data: {
    other_api_pd_food_orders_aggregate: {
      aggregate: {
        count: string;
        sum: {
          gmv: string;
        };
      };
    };
  };
}

export default function Home(){
  // const session = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect("/login");
  //   },
  // });
  const { data } = useSuspenseQuery<GetAllVendorsResponse>(query);

  //const { data } = useSuspenseQuery<GetTotalGMVResponse>(getTotalGMVQuery);

  let MultiSelectItemArray = data?.api_partner_dashboard_api_pd_food_orders.map((vendor) => (
    <MultiSelectItem key={vendor.vendor_id} value={vendor.vendor_id}>
        {vendor.vendor_id}
    </MultiSelectItem>
  ));

  //const vendors = data.other_api_pd_food_orders.

  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);

  // const handleValueChange = (values: string[]) => {
  //   setSelectedVendors(values);


  return (
    // <div>
    //   <h1>Home</h1>
    //   <p>{session.data?.user?.email}</p>
    //   <button onClick={()=> signOut()}>Logout</button>
      
    // </div>
    
    

      <div className="">
          <div className="flex justify-between">
            <div className="flex items-center">
              <Image src="/lanch_logo.png" alt="" width="30" height="30"/>
              <Title>LANCH Dashboard</Title>
            </div>
            
            <Button onClick={()=> {}}>Logout</Button>
          </div>
          
          <div>
            <div className="flex items-start md:items-center pt-6 flex-col md:flex-row">
              <div>
               <DatePicker/>
              </div>
              <div className="md:w-80 md:mx-6 space-y-6 w-auto mt-4 md:mt-0">
                <MultiSelect value={selectedVendors} onValueChange={setSelectedVendors}>
                  
                  {MultiSelectItemArray}
                  
                </MultiSelect>
              </div>
              
            </div>
            
          </div>
          <TabGroup className="mt-6">
            <TabList>
              <Tab>Alle Plattformen</Tab>
              <Tab>Lieferando</Tab>
              <Tab>Uber Eats</Tab>
              <Tab>Wolt</Tab>
              <Tab>LANCH Shop</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Grid numItemsMd={2} numItemsLg={4} className="gap-6 mt-6">
                {categories.map((item) => (
                  <Card key={item.title}>
                    <Text>{item.title}</Text>
                    <Metric>{item.metric}</Metric>
                  </Card>
                ))}
                </Grid>
                <Grid numItemsMd={1} numItemsLg={2} className="gap-6 mt-6">
                <div className="mt-6">
                  <Card>
                    <Title>Umsatz</Title>
                    <Text>Außenumsatz nach Plattform</Text>
                    <BarChart
                      className="mt-4 h-80"
                      data={revenueData}
                      index="Month"
                      categories={["Lieferando", "Uber Eats", "Wolt"]}
                      colors={["amber", "lime", "sky"]}
                      valueFormatter={valueFormatter}
                      stack={true}
                      relative={true}
                    />
                  </Card>
                </div>
                <div className="mt-6">
                  <Card>
                  <Title>Top Seller</Title>
                  <Flex className="mt-4">
                    <Text>
                      <Bold>Item</Bold>
                    </Text>
                    <Text>
                      <Bold>Verkäufe</Bold>
                    </Text>
                  </Flex>
                  <BarList data={itemsSoled} className="mt-2" />
                  </Card>
                </div>
                </Grid>
              </TabPanel>
              <TabPanel>
                <div className="mt-6">
                  <Card>
                    <div className="h-96" />
                  </Card>
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>

  )
}

Home.requireAuth = true;