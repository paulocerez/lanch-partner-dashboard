import React from "react";
import { DatePicker } from "../Date/DatePickerFilter";
import { MultiSelect, MultiSelectItem } from "@tremor/react";
import { useFilterBarData } from "./useFilterBarData";
import { FilterBarProps } from "./FilterBarProps";

const FilterBarComponent = ({
  vendorIds,
  updateSelectedVendorIds,
  dateRange,
  updateDateRange,
  user,
}: FilterBarProps) => {
  const {
    assignedVendorList = [],
    vendorList = [],
    loading,
    error,
  } = useFilterBarData(user?.uid);

  // update selectedVendorIds
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
            onValueChange={handleVendorSelectionChange}
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
