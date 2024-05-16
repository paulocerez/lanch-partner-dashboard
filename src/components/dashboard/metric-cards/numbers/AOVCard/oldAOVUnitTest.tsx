// import { describe, expect, it, vi } from "vitest";
// import { render, screen } from "@testing-library/react";
// import { AOVCard } from "@/components/dashboard/metric-cards/numbers/AOVCard/AOVCard";
// import "@testing-library/jest-dom";

// vi.mock("@/hooks/useAOVData", () => ({
//   useAOVData: () => ({
//     loading: false,
//     error: null,
//     data: { averageOrderValue: "100.00" },
//   }),
// }));

// const mockDateRange = {
//   from: new Date("2024-01-01"),
//   to: new Date("2024-01-08"),
// };

// describe("AOVCard", () => {
//   it("renders correctly with given data", () => {
//     render(<AOVCard vendorIds={[]} dateRange={mockDateRange} />);

//     const valueElement = screen.getByText("€100.00");
//     expect(valueElement).toBeInTheDocument();

//     const titleElement = screen.getByText(/average order value/i);
//     expect(titleElement).toBeInTheDocument();
//   });

//   it("displays a loading state", () => {
//     vi.mock("@/hooks/useAOVData", () => ({
//       useAOVData: () => ({
//         loading: true,
//         error: null,
//         data: null,
//       }),
//     }));

//     render(<AOVCard vendorIds={[]} dateRange={mockDateRange} />);
//     const loadingElement = screen.getByText(/loading.../i);
//     expect(loadingElement).toBeInTheDocument();
//   });

//   it("handles error state", () => {
//     vi.mock("@/hooks/useAOVData", () => ({
//       useAOVData: () => ({
//         loading: false,
//         error: new Error("Failed to fetch data"),
//         data: null,
//       }),
//     }));

//     render(<AOVCard vendorIds={[]} dateRange={mockDateRange} />);
//     const errorElement = screen.getByText(/failed to fetch data/i);
//     expect(errorElement).toBeInTheDocument();
//   });
// });
