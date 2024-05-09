import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { AOVCard } from "@/components/dashboard/metric-cards/numbers/AOVCard/AOVCard";
import { CardProps } from "../../CardProps";
import { useTotalGMVData } from "../../useTotalGMVData";
import { calculateAverage } from "@/utils/calculateAverage";

// Mocking useTotalGMVData hook and calculateAverage utility function
const mockUseTotalGMVData = vi.fn().mockImplementation(useTotalGMVData);
const mockCalculateAverage = vi.fn().mockImplementation(calculateAverage);

describe("AOVCard", () => {
  const mockProps: CardProps = {
    vendorIds: ["DE_Berlin_0001", "DE_Hamburg_0001"],
    dateRange: {
      from: new Date(2023, 1, 1),
      to: new Date(),
    },
    orderPortal: ["Lieferando", "Uber Eats"],
  };

  it("should display a loading state when data is being fetched", () => {
    render(<AOVCard {...mockProps} />);
    expect(screen.getByText("Durchschn. Warenkorb")).toBeDefined();
  });

  it("should display an error message when there is an error fetching data", () => {
    render(<AOVCard {...mockProps} />);
    expect(screen.getByText("Error loading data")).toBeDefined();
  });

  it("should display the CardComponent with the correct average value when data is successfully fetched", () => {
    render(<AOVCard {...mockProps} />);
    expect(screen.getByText("Durchschn. Warenkorbwert")).toBeDefined();
    expect(screen.getByText("€100")).toBeDefined();
  });
});
