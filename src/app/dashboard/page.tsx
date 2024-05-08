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

import { auth } from "@/firebase/config";
import { User, onAuthStateChanged } from "firebase/auth";
import GoogleAnalytics from "../../components/dashboard/dashboard-helpers/GoogleAnalytics";
import { useAuth } from "../context/AuthContext";
import { DashboardTabs } from "@/components/dashboard/sections/DashboardTabs";

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
  const [vendorIds, setVendorIds] = useState<string[]>([]);
  const updateVendorIds = (newSelectedVendors: string[]) => {
    setVendorIds(newSelectedVendors);
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
        vendorIds={vendorIds}
        updateSelectedVendorIds={updateVendorIds}
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
          {/* aggregated data for all platforms */}
          <TabPanel>
            <DashboardTabs
              vendorIds={vendorIds}
              dateRange={dateRange}
              orderPortal={[]}
            />
          </TabPanel>

          {/* individual platforms */}
          {orderPortals.map((orderPortal) => (
            <TabPanel key={orderPortal}>
              <DashboardTabs
                vendorIds={vendorIds}
                dateRange={dateRange}
                orderPortal={[orderPortal]}
              />
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default Home;
Home.requireAuth = true;
