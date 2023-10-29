'use client';

import HeaderComponent from "./_components/header";
import FilterBarComponent from "./_components/filterBar";

import Test from "./_components/test";
import DisplayTest from "./_components/displayTest";


import { signOut, useSession } from "next-auth/react";
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
  BarList,
  DateRangePickerValue
} from "@tremor/react";


import { useState } from "react";


import { gql } from "@apollo/client";




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






  // some mock data
  const top_seller = [
    { name: "Pizza", value: 1230 },
    { name: "Chicken", value: 751 },
    { name: "Rolls", value: 471 },
    { name: "Waffel", value: 280 },
    { name: "Drinks", value: 78 },
  ];
  
  const vendors = [
    { name: "Berlin Mitte", value: "DE_Berlin_0001"},
    { name: "Berlin Prenzlauer Berg", value: "DE_Berlin_0002"},
    { name: "Berlin Friedrichshain", value: "DE_Berlin_0003"},
    { name: "Berlin Kreuzberg", value: "DE_Berlin_0004"},
    { name: "Berlin Neukölln", value: "DE_Berlin_0005"},
    { name: "Berlin Schöneberg", value: "DE_Berlin_0006"},
    { name: "Berlin Charlottenburg", value: "DE_Berlin_0007"},
    { name: "Berlin Spandau", value: "DE_Berlin_0008"},
    { name: "Berlin Steglitz", value: "DE_Berlin_0009"},
    { name: "Berlin Tempelhof", value: "DE_Berlin_0010"},
    { name: "Berlin Wedding", value: "DE_Berlin_0011"},
    { name: "Berlin Reinickendorf", value: "DE_Berlin_0012"},
  ]

  

const categories = [
  {
    title: "Umsatz",
    metric: "3.832,29€",
  },
  {
    title: "Bestellungen",
    metric: "234",
  },
  {
    title: "Dursch. Wahrebkorb",
    metric: "27,54€",
  },
  {
    title: "Rating",
    metric: "4,1",
  },
];

const revenueData = [
  {
    Month: "Jan 22",
    Lieferando: 3890,
    "Uber Eats": 2980,
    Wolt: 2645,
  },
  {
    Month: "Jan 23",
    Lieferando: 4200,
    "Uber Eats": 3100,
    Wolt: 2800,
  },
  {
    Month: "Jan 24",
    Lieferando: 3500,
    "Uber Eats": 2700,
    Wolt: 2400,
  },
  {
    Month: "Jan 25",
    Lieferando: 3900,
    "Uber Eats": 2900,
    Wolt: 2600,
  },
  {
    Month: "Jan 26",
    Lieferando: 4100,
    "Uber Eats": 3000,
    Wolt: 2700,
  },
  {
    Month: "Jan 27",
    Lieferando: 4300,
    "Uber Eats": 3200,
    Wolt: 2900,
  },
  {
    Month: "Jan 28",
    Lieferando: 4500,
    "Uber Eats": 3400,
    Wolt: 3100,
  },
  {
    Month: "Jan 29",
    Lieferando: 4700,
    "Uber Eats": 3600,
    Wolt: 3300,
  },
  {
    Month: "Jan 30",
    Lieferando: 4900,
    "Uber Eats": 3800,
    Wolt: 3500,
  },
  {
    Month: "Jan 31",
    Lieferando: 5100,
    "Uber Eats": 4000,
    Wolt: 3700,
  },
  {
    Month: "Feb 1",
    Lieferando: 5300,
    "Uber Eats": 6200,
    Wolt: 3900,
  },
  {
    Month: "Feb 2",
    Lieferando: 6500,
    "Uber Eats": 7800,
    Wolt: 4100,
  },
  {
    Month: "Feb 3",
    Lieferando: 5700,
    "Uber Eats": 7200,
    Wolt: 4300,
  },
  {
    Month: "Feb 4",
    Lieferando: 6900,
    "Uber Eats": 7100,
    Wolt: 4500,
  },
  {
    Month: "Feb 5",
    Lieferando: 6100,
    "Uber Eats": 5000,
    Wolt: 4700,
  },
  {
    Month: "Feb 6",
    Lieferando: 6300,
    "Uber Eats": 5200,
    Wolt: 4900,
  },
  {
    Month: "Feb 7",
    Lieferando: 6500,
    "Uber Eats": 5400,
    Wolt: 5100,
  },
  {
    Month: "Feb 8",
    Lieferando: 6700,
    "Uber Eats": 5600,
    Wolt: 5300,
  },
  {
    Month: "Feb 9",
    Lieferando: 6900,
    "Uber Eats": 5800,
    Wolt: 5500,
  },
  {
    Month: "Feb 10",
    Lieferando: 7100,
    "Uber Eats": 6000,
    Wolt: 5700,
  },
];
const valueFormatter = (number:number) => Intl.NumberFormat("de").format(number).toString();

const itemsSoled = [
  {
    name: "Pizza",
    value: 456,   
  },
  {
    name: "Pasta",
    value: 321,
  },
  {
    name: "Burger",
    value: 234,
  },
  {
    name: "Chicken",
    value: 123,
  },
  {
    name: "Fries",
    value: 89,
  },
  {
    name: "Rolls",
    value: 78,
  },
  {
    name: "Waffel",
    value: 45,
  },
  {
    name: "Drinks",
    value: 12,
  },
];

export default function Home(){
  // const session = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect("/login");
  //   },
  // });


  const [counter, setCounter] = useState<number>(0);

  const updateCounter = (newCounter: number) => {
    setCounter(newCounter);
  };

  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);

  const updateSelectedVendors = (newSelectedVendors: string[]) => {
    setSelectedVendors(newSelectedVendors);
  }

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const updateSelectedDate = (newSelectedDate: Date | null) => {
    setSelectedDate(newSelectedDate);
  }

  const [dateRange, setDateRange] = useState<DateRangePickerValue>({
    selectValue: "last_week",
  });
  const updateDateRange = (newDateRange: DateRangePickerValue) => {
    setDateRange(newDateRange);
  }






  return (
    // <div>
    //   <h1>Home</h1>
    //   <p>{session.data?.user?.email}</p>
    //   <button onClick={()=> signOut()}>Logout</button>
      
    // </div>
    
    

      <div className="">
        <HeaderComponent/>
        <FilterBarComponent dateRange={dateRange} updateDateRange={updateDateRange} selectedVendors={selectedVendors} updateSelectedVendors={updateSelectedVendors}/>
        <div>
          <Test counter={counter} updateCounter={updateCounter}/>
          <DisplayTest counter={counter}/>
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