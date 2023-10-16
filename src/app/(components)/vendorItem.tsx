import { MultiSelectItem } from "@tremor/react";
import { FunctionComponent } from "react";

interface VendorProps {
  vendorName: string;
  vendorId: string;
}

const VendorItemComponent: FunctionComponent<VendorProps> = ({vendorName, vendorId}: VendorProps) => {
  // Render item data here
  return (
    <MultiSelectItem value={vendorId}>
      {vendorName}
    </MultiSelectItem>  
  );
};

export default VendorItemComponent;



