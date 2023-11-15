'use client';

import HeaderComponent from "./_components/header";
import FilterBarComponent from "./_components/filterBar";

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
  Flex,
  Bold,
  BarList,
  DateRangePickerValue
} from "@tremor/react";

import { useState } from "react";

import RevenueCard from "./_components/revenueCard";
import OrderCountCard from "./_components/orderCountCard";
import RevenueChartCard from "./_components/revenueChartCard";
import OrderChartCard from "./_components/orderChartCard";
import TopItemChartCard from "./_components/topItemsChartCard";
import RatingByVendorCard from "./_components/ratingByVendorCard";
import RatingAverageCard from "./_components/ratingAverageCard";




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


  // state management 
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const updateSelectedVendors = (newSelectedVendors: string[]) => {
    setSelectedVendors(newSelectedVendors);
  }

  const [dateRange, setDateRange] = useState<DateRangePickerValue>({
    from: new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 8)),
    to: new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 1))
  });
  const updateDateRange = (newDateRange: DateRangePickerValue) => {
    if (newDateRange?.selectValue) {
       if (newDateRange.selectValue === "last_week") {
        newDateRange.from = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 8));
        newDateRange.to = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 1));
      } else if (newDateRange.selectValue === "last_two_week") {
        newDateRange.from = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 15));
        newDateRange.to = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 1));
      } else if (newDateRange.selectValue === "last_month") {
        newDateRange.from = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 29));
        newDateRange.to = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 1));
      } else if (newDateRange.selectValue === "last_three_month") {
        newDateRange.from = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 85));
        newDateRange.to = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 1));
      }
    }
    setDateRange(newDateRange);
  }

  // const [selectFromDate, setFromDate] = useState<Date>(new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 8)));
  // const updateFromDate = (newFromDate: Date) => {
  //   setFromDate(newFromDate);
  // }

  // const [selectToDate, setToDate] = useState<Date>(new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 1)));
  // const updateToDate = (newToDate: Date) => {
  //   setToDate(newToDate);
  // }




  return (
    // <div>
    //   <h1>Home</h1>
    //   <p>{session.data?.user?.email}</p>
    //   <button onClick={()=> signOut()}>Logout</button>
      
    // </div>
    
    

      <div className="">
        <HeaderComponent/>
        <FilterBarComponent dateRange={dateRange} updateDateRange={updateDateRange} selectedVendors={selectedVendors} updateSelectedVendors={updateSelectedVendors}/>

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
                  <RevenueCard vendorIds={selectedVendors} dateRange={dateRange} />
                  <OrderCountCard vendorIds={selectedVendors} dateRange={dateRange} />
                  <RatingAverageCard vendorIds={selectedVendors} dateRange={dateRange} />
                </Grid>
                <Grid numItemsMd={1} numItemsLg={2} className="gap-6 mt-6">
                <div>
                  <RevenueChartCard vendorIds={selectedVendors} dateRange={dateRange}/>
                </div>
                <div>
                  <OrderChartCard vendorIds={selectedVendors} dateRange={dateRange}/>
                </div>
                <div>
                  <TopItemChartCard vendorIds={selectedVendors} dateRange={dateRange}/>
                </div>
                <div>
                  <RatingByVendorCard vendorIds={selectedVendors} dateRange={dateRange}/>
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