import React, { useEffect } from 'react';
import { DatePicker } from './datepicker';
import {
  DateRangePickerValue,
  MultiSelect,
  MultiSelectItem,
} from "@tremor/react";

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

import { gql, useQuery } from "@apollo/client";
import { User } from 'firebase/auth';

// TODO filter here by permission for vendors
const getAllVendorsQuery = gql`
  query getAllVendors {
    api_partner_dashboard_api_pd_food_orders(
      distinct_on: vendor_id
      order_by: { vendor_id: asc }
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


interface getAssignedVendorsResponse {
  vendors_of_user: VendorOfUser[];
}

interface VendorOfUser {
  vendor_id: string;
  user_id: string;
}

const getAssignedVendors = gql`
  query getVendorList($_userID: String) {
    vendors_of_user(where: {user_id: {_eq: $_userID}}) {
      vendor_id
      user_id
    }
  }
`;


interface FilterBarProps {
  selectedVendors: string[];
  updateSelectedVendors: (vendors: string[]) => void;
  dateRange: DateRangePickerValue;
  updateDateRange: (dateRange: DateRangePickerValue) => void;
  user: User | null;
}

const FilterBarComponent = (filterBarPops: FilterBarProps) => {
  const { selectedVendors, updateSelectedVendors, dateRange, updateDateRange } = filterBarPops;

  const vendorlist = useSuspenseQuery<GetAllVendorsResponse>(getAllVendorsQuery);
  // const assignedVendors = useSuspenseQuery<getAssignedVendorsResponse>(getAssignedVendors,
  //   {
  //     variables: {
  //       _userID: filterBarPops.user?.uid || ""
  //     }
  //   });

  const { loading, error, data: assignedVendors } = useQuery<getAssignedVendorsResponse>(getAssignedVendors,
    {
      variables: {
        _userID: filterBarPops.user?.uid || ""
      }
    });

    
    useEffect(() => {
      //console.log("assigned", assignedVendors?.vendors_of_user);
      if (assignedVendors?.vendors_of_user) {
        const vendorIds = assignedVendors.vendors_of_user.map((vendor) => vendor.vendor_id);
        updateSelectedVendors(vendorIds);
      }
    }, [assignedVendors]);
    
    //console.log(vendorlist?.data?.api_partner_dashboard_api_pd_food_orders)

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
            {vendorlist?.data?.api_partner_dashboard_api_pd_food_orders
            .filter((vendor) => {
              return assignedVendors?.vendors_of_user?.some((vendorOfUser) => vendorOfUser.vendor_id === vendor.vendor_id);
            })
            .map(
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
