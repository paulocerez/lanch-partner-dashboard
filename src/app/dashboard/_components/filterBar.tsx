import React from 'react';
import { DatePicker } from './datepicker';
import {
  DateRangePickerValue,
  MultiSelect,
  MultiSelectItem,
} from "@tremor/react";

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

import { gql } from "@apollo/client";

// TODO filter here by permission for vendors
const getAllVendorsQuery = gql`
  query getAllVendors(
    $_brands: [String!] = ["Happy Slice", "Loco Chicken"]
    $_countries: [String!] = ["DE"]
  ) {
    api_partner_dashboard_api_pd_food_orders(
      limit: 100
      distinct_on: vendor_id
      order_by: { vendor_id: asc }
      where: { brand: { _in: $_brands }, country: { _in: $_countries } }
    ) {
      vendor_id
      vendor_name
    }
  }
`;

interface FoodOrder {
  vendor_id: string;
  vendor_name: string;
}

interface GetAllVendorsResponse {
  api_partner_dashboard_api_pd_food_orders: FoodOrder[];
}

interface FilterBarProps {
  selectedVendors: string[];
  updateSelectedVendors: (vendors: string[]) => void;
  dateRange: DateRangePickerValue;
  updateDateRange: (dateRange: DateRangePickerValue) => void;
}

const FilterBarComponent = (filterBarPops: FilterBarProps) => {
  const { selectedVendors, updateSelectedVendors, dateRange, updateDateRange } = filterBarPops;

  const vendorlist = useSuspenseQuery<GetAllVendorsResponse>(getAllVendorsQuery);

  React.useEffect(() => {

    if (vendorlist?.data?.api_partner_dashboard_api_pd_food_orders) {
      updateSelectedVendors(vendorlist.data.api_partner_dashboard_api_pd_food_orders.map((vendor) => vendor.vendor_id));
    }
  }, []);

  return (
    <div>
      <div className="flex items-start md:items-center pt-6 flex-col md:flex-row">
        <div>
          <DatePicker dateRange={dateRange} updateDateRange={updateDateRange}/>
        </div>
        <div className="md:w-80 md:mx-6 space-y-6 w-auto mt-4 md:mt-0">
          <MultiSelect
            value={selectedVendors}
            onValueChange={updateSelectedVendors}
          >
            {vendorlist?.data?.api_partner_dashboard_api_pd_food_orders.map(
              (vendor) => (
                <MultiSelectItem key={vendor.vendor_id} value={vendor.vendor_id}>
                  {vendor.vendor_name}
                </MultiSelectItem>
              )
            )}
          </MultiSelect>
        </div>
      </div>
    </div>
  );
};

export default FilterBarComponent;
