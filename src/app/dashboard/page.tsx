"use client";
import React, { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useAuth } from "../context/AuthContext";
import { useDateRange } from "@/utils/dateUtils";

import GoogleAnalytics from "../../components/dashboard/dashboard-helpers/GoogleAnalytics";
import HeaderComponent from "../../components/dashboard/dashboard-helpers/Header";
import FilterBarComponent from "../../components/dashboard/dashboard-helpers/FilterBar/FilterBar";
import { DashboardTabs } from "@/components/dashboard/sections/DashboardTabs";

import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@tremor/react";

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
  const { hasuraToken } = useAuth();
  const [vendorIds, setVendorIds] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const { dateRange, updateDateRange } = useDateRange({
    from: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 8),
    to: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 1),
  });

  useEffect(() => {
    console.log("Dashboard hasuraToken:", hasuraToken);
  }, [hasuraToken]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log(
        user
          ? "local dash: user is signed in"
          : "local dash: nobody is signed in"
      );
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
        updateSelectedVendorIds={setVendorIds}
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
