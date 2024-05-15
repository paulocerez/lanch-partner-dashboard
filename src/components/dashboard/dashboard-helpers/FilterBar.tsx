import React, { useEffect } from "react";
import { DatePicker } from "./DatePickerFilter";
import {
  MultiSelect,
  MultiSelectItem,
  DateRangePickerValue,
} from "@tremor/react";
import { useFilterBarData } from "./useFilterBarData";
import { FilterBarProps } from "./FilterBar/FilterBarProps";
import { getUpdatedDateRange, useDateRange } from "@/utils/dateUtils";

const FilterBarComponent = ({
  vendorIds,
  updateSelectedVendorIds,
  user,
}: FilterBarProps) => {
  const initialDateRange = {
    from: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 8),
    to: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 1),
  };

  const { dateRange, updateDateRange } = useDateRange(initialDateRange);

  const {
    assignedVendorList = [],
    vendorList = [],
    loading,
    error,
  } = useFilterBarData(user?.uid);

  const handleDateRangeUpdate = (selectedValue: string) => {
    const newDateRange = getUpdatedDateRange(selectedValue);
    updateDateRange(newDateRange);
  };

  // Handle the vendor selection update logic
  const handleVendorSelectionChange = (selectedVendorIds: string[]) => {
    updateSelectedVendorIds(selectedVendorIds);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div>
      <div className="flex items-start md:items-center pt-6 flex-col md:flex-row">
        <div>
          <DatePicker dateRange={dateRange} updateDateRange={updateDateRange} />
        </div>
        <div className="md:w-80 md:mx-6 space-y-6 w-auto mt-4 md:mt-0">
          <MultiSelect
            value={vendorIds}
            onValueChange={updateSelectedVendorIds}
          >
            {vendorList.map((vendor) => (
              <MultiSelectItem key={vendor.vendor_id} value={vendor.vendor_id}>
                {vendor.vendor_name}
              </MultiSelectItem>
            ))}
          </MultiSelect>
        </div>
      </div>
    </div>
  );
};

export default FilterBarComponent;
