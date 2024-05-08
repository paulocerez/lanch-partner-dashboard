import React, { useEffect } from "react";
import { DatePicker } from "./DatePickerFilter";
import {
  MultiSelect,
  MultiSelectItem,
  DateRangePickerValue,
} from "@tremor/react";
import { useFilterBarData } from "./useFilterBarData";
import { FilterBarProps } from "./FilterBar/FilterBarProps";

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

  useEffect(() => {
    // Get the current list of vendor IDs
    const currentVendorIds = assignedVendorList.map(
      (vendor) => vendor.vendor_id
    );

    // Check if the current list of vendor IDs is different from the previously selected ones
    const hasVendorIdsChanged =
      vendorIds.length !== currentVendorIds.length ||
      vendorIds.some((id, index) => id !== currentVendorIds[index]);

    // Update the selected vendor IDs only if they have changed
    if (hasVendorIdsChanged) {
      updateSelectedVendorIds(currentVendorIds);
    }
  }, [assignedVendorList, vendorIds, updateSelectedVendorIds]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  // Filter the vendor list to include only those that are assigned to the user
  const filteredVendorList = vendorList.filter((vendor) =>
    assignedVendorList.some(
      (assignedVendor) => assignedVendor.vendor_id === vendor.vendor_id
    )
  );

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
            {filteredVendorList.map((vendor) => (
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
