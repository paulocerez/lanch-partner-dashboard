"use client";

import HeaderComponent from "../../components/dashboard/dashboard-helpers/Header";
import FilterBarComponent from "../../components/dashboard/dashboard-helpers/FilterBar";

import {
  Grid,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
  DateRangePickerValue,
  Title,
} from "@tremor/react";

import { useEffect, useState } from "react";

import RevenueCard from "../../components/dashboard/metric-cards/numbers/RevenueCard/RevenueCard";
import OrderCountCard from "../../components/dashboard/metric-cards/numbers/OrderCountCard/OrderCountCard";
import ReviewCard from "../../components/dashboard/metric-cards/numbers/ReviewCard";
import OrderChartCard from "@/components/dashboard/metric-cards/graphs/OrderChartCard/orderChartCard";
import TopItemChartCard from "../../components/dashboard/metric-cards/graphs/TopItemsChartCard/TopItemsChartCard";

import { auth } from "@/firebase/config";
import { User, onAuthStateChanged } from "firebase/auth";
import { AOVCard } from "@/components/dashboard/metric-cards/numbers/AOVCard/AOVCard";
import LatestRatingCard from "../../components/dashboard/metric-cards/numbers/CurrentRatingCard/CurrentRatingCard";
import GoogleAnalytics from "../../components/dashboard/dashboard-helpers/GoogleAnalytics";
import { useAuth } from "../context/AuthContext";
import GMVGraphCard from "@/components/dashboard/metric-cards/graphs/GMVGraphCard/GMVGraphCard";

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

const Home = () => {
  // state management
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const updateSelectedVendors = (newSelectedVendors: string[]) => {
    setSelectedVendors(newSelectedVendors);
  };

  const { hasuraToken } = useAuth();

  useEffect(() => {
    console.log("Dashboard hasuraToken:", hasuraToken);
  }, [hasuraToken]);

  const [dateRange, setDateRange] = useState<DateRangePickerValue>({
    from: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 8),
    to: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 1),
  });

  const updateDateRange = (newDateRange: DateRangePickerValue) => {
    if (newDateRange?.selectValue) {
      if (newDateRange.selectValue === "last_week") {
        newDateRange.from = new Date(
          new Date().getTime() - 1000 * 60 * 60 * 24 * 8
        );
        newDateRange.to = new Date(
          new Date().getTime() - 1000 * 60 * 60 * 24 * 1
        );
      } else if (newDateRange.selectValue === "last_two_week") {
        newDateRange.from = new Date(
          new Date().getTime() - 1000 * 60 * 60 * 24 * 15
        );
        newDateRange.to = new Date(
          new Date().getTime() - 1000 * 60 * 60 * 24 * 1
        );
      } else if (newDateRange.selectValue === "last_month") {
        newDateRange.from = new Date(
          new Date().getTime() - 1000 * 60 * 60 * 24 * 29
        );
        newDateRange.to = new Date(
          new Date().getTime() - 1000 * 60 * 60 * 24 * 1
        );
      } else if (newDateRange.selectValue === "last_three_month") {
        newDateRange.from = new Date(
          new Date().getTime() - 1000 * 60 * 60 * 24 * 85
        );
        newDateRange.to = new Date(
          new Date().getTime() - 1000 * 60 * 60 * 24 * 1
        );
      }
    }
    setDateRange(newDateRange);
  };

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

  const orderPortals = [
    OrderPortal.LIEFERANDO,
    OrderPortal.UBER,
    OrderPortal.WOLT,
    OrderPortal.LANCH,
  ];

  return (
    <div className="">
      <GoogleAnalytics />
      <HeaderComponent />
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
            <Title>Umsatz</Title>
            <Grid numItemsMd={2} numItemsLg={4} className="gap-6 mt-6">
              <RevenueCard
                vendorIds={selectedVendors}
                dateRange={dateRange}
                orderPortal={[]}
              />
              <OrderCountCard
                vendorIds={selectedVendors}
                dateRange={dateRange}
                orderPortal={[]}
              />
              <AOVCard
                vendorIds={selectedVendors}
                dateRange={dateRange}
                orderPortal={[]}
              />
              <LatestRatingCard
                vendorIds={selectedVendors}
                dateRange={dateRange}
              />
            </Grid>
            <Grid numItemsMd={1} numItemsLg={2} className="gap-6 mt-6">
              <div>
                <GMVGraphCard
                  vendorIds={selectedVendors}
                  dateRange={dateRange}
                  orderPortal={[]}
                />
              </div>
              <div>
                <OrderChartCard
                  vendorIds={selectedVendors}
                  dateRange={dateRange}
                  orderPortal={[]}
                />
              </div>
              <div>
                <TopItemChartCard
                  vendorIds={selectedVendors}
                  dateRange={dateRange}
                />
              </div>
            </Grid>
            <Title className="mt-6">Performance</Title>
            <Grid numItemsMd={1} numItemsLg={2} className="gap-6 mt-6">
              <div>
                <ReviewCard vendorIds={selectedVendors} dateRange={dateRange} />
              </div>
            </Grid>
          </TabPanel>

          {orderPortals.map((orderPortal) => (
            <TabPanel key={orderPortal}>
              <Title>Umsatz</Title>
              <Grid numItemsMd={2} numItemsLg={4} className="gap-6 mt-6">
                <RevenueCard
                  vendorIds={selectedVendors}
                  dateRange={dateRange}
                  orderPortal={[orderPortal]}
                />
                <OrderCountCard
                  vendorIds={selectedVendors}
                  dateRange={dateRange}
                  orderPortal={[orderPortal]}
                />
                <AOVCard
                  vendorIds={selectedVendors}
                  dateRange={dateRange}
                  orderPortal={[orderPortal]}
                />
                <LatestRatingCard
                  vendorIds={selectedVendors}
                  dateRange={dateRange}
                  orderPortal={[orderPortal]}
                />
              </Grid>
              <Grid numItemsMd={1} numItemsLg={2} className="gap-6 mt-6">
                <div>
                  <GMVGraphCard
                    vendorIds={selectedVendors}
                    dateRange={dateRange}
                    orderPortal={[orderPortal]}
                  />
                </div>
                <div>
                  <OrderChartCard
                    vendorIds={selectedVendors}
                    dateRange={dateRange}
                    orderPortal={[orderPortal]}
                  />
                </div>
                <div>
                  <TopItemChartCard
                    vendorIds={selectedVendors}
                    dateRange={dateRange}
                    orderPortal={[orderPortal]}
                  />
                </div>
              </Grid>
              <Title className="mt-6">Performance</Title>
              <Grid numItemsMd={1} numItemsLg={2} className="gap-6 mt-6">
                <div>
                  <ReviewCard
                    vendorIds={selectedVendors}
                    dateRange={dateRange}
                    orderPortal={[orderPortal]}
                  />
                </div>
              </Grid>
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default Home;
Home.requireAuth = true;
