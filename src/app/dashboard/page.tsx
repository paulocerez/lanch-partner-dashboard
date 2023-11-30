'use client';

import HeaderComponent from "./_components/header";
import FilterBarComponent from "./_components/filterBar";

import {
  Grid,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
  DateRangePickerValue
} from "@tremor/react";

import { useEffect, useState } from "react";

import RevenueCard from "./_components/revenueCard";
import OrderCountCard from "./_components/orderCountCard";
import RevenueChartCard from "./_components/revenueChartCard";
import OrderChartCard from "./_components/orderChartCard";
import TopItemChartCard from "./_components/topItemsChartCard";
import RatingByVendorCard from "./_components/ratingByVendorCard";
import RatingAverageCard from "./_components/ratingAverageCard";

import { auth } from "@/firebase/config"
import { User, onAuthStateChanged } from "firebase/auth";
import AOVCard from "./_components/AOVCard";


enum OrderPortal {
  "LIEFERANDO" = "Lieferando",
  "UBER" = "Uber Eats",
  "WOLT" = "Wolt",
  "LANCH" = "Lanch Webshop",
  "POS" = "FH Store",
  "restablo" = "Restablo",
  "Lieferservice.de" = "Lieferservice.de",
  "Foodpanda" = "Foodpanda",
}

export default function Home(){
  // const session = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect("/login");
  //   },
  // });

  console.log( "AUTHuser",auth.currentUser)


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

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log("local dash: user is signed in");
      } else {
        console.log("local dash: nope nobody is signed in");
      }
    });
  
    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);


  const order_portals = [OrderPortal.LIEFERANDO, OrderPortal.UBER, OrderPortal.WOLT, OrderPortal.LANCH];

  return (
    // <div>
    //   <h1>Home</h1>
    //   <p>{session.data?.user?.email}</p>
    //   <button onClick={()=> signOut()}>Logout</button>
      
    // </div>
    
    

      <div className="">
        <HeaderComponent/>
        <FilterBarComponent 
          user={user}
          dateRange={dateRange} 
          updateDateRange={updateDateRange} 
          selectedVendors={selectedVendors} 
          updateSelectedVendors={updateSelectedVendors}
          />

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
                  <AOVCard vendorIds={selectedVendors} dateRange={dateRange}/>
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
                  
                </div>
                </Grid>
              </TabPanel>

              {order_portals.map((order_portal) => (
                <TabPanel key={order_portal}>
                  <Grid numItemsMd={2} numItemsLg={4} className="gap-6 mt-6">
                    <RevenueCard vendorIds={selectedVendors} dateRange={dateRange} order_portal={[order_portal]} />
                    <OrderCountCard vendorIds={selectedVendors} dateRange={dateRange} order_portal={[order_portal]} />
                    <RatingAverageCard vendorIds={selectedVendors} dateRange={dateRange} order_portal={[order_portal]} />
                  </Grid>
                  <Grid numItemsMd={1} numItemsLg={2} className="gap-6 mt-6">
                    <div>
                      <RevenueChartCard vendorIds={selectedVendors} dateRange={dateRange} order_portal={[order_portal]} />
                    </div>
                    <div>
                      <OrderChartCard vendorIds={selectedVendors} dateRange={dateRange} order_portal={[order_portal]} />
                    </div>
                    <div>
                      <TopItemChartCard vendorIds={selectedVendors} dateRange={dateRange} order_portal={[order_portal]} />
                    </div>
                    <div>
                    </div>
                  </Grid>
                </TabPanel>
              ))}
                      
            </TabPanels>
          </TabGroup>
        </div>

  )
}

Home.requireAuth = true;