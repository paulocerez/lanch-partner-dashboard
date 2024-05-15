import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { GET_TOTAL_GMV } from "@/utils/gqlQueries";
import RevenueCard from "./RevenueCard"; // Correct import if necessary
import { CardProps } from "../../cardProperties";

const successMock = [
  {
    request: {
      query: GET_TOTAL_GMV,
      variables: {
        _vendor_ids: ["DE_Berlin_0001", "DE_Hamburg_0001"],
        _fromDate: new Date(2024, 1, 1).toISOString(),
        _toDate: new Date(2024, 1, 8).toISOString(),
        _order_source_names: ["Lieferando", "Uber Eats"],
      },
    },
    result: {
      data: {
        api_partner_dashboard_api_pd_food_orders_aggregate: {
          aggregate: {
            sum: {
              gmv: "1000",
            },
          },
        },
      },
    },
  },
];

const errorMock = [
  {
    request: {
      query: GET_TOTAL_GMV,
      variables: {
        _vendor_ids: ["DE_Berlin_0001", "DE_Hamburg_0001"],
        _fromDate: new Date(2024, 1, 1).toISOString(),
        _toDate: new Date(2024, 1, 8).toISOString(),
        _order_source_names: ["Lieferando", "Uber Eats"],
      },
    },
    error: new Error("An error occurred"),
  },
];

describe("RevenueCard", async () => {
  const mockProps: CardProps = {
    vendorIds: ["DE_Berlin_0001", "DE_Hamburg_0001"],
    dateRange: {
      from: new Date(2024, 1, 1),
      to: new Date(2024, 1, 8),
    },
    orderPortal: ["Lieferando", "Uber Eats"],
  };

  it("should display the CardComponent with the correct revenue when data is successfully fetched", async () => {
    render(
      <MockedProvider mocks={successMock} addTypename={false}>
        <RevenueCard {...mockProps} />
      </MockedProvider>
    );

    await waitFor(() => {
      const titleElement = screen.getByText("Gesamtumsatz");
      expect(titleElement).toBeDefined();

      const metricElement = screen.getByText("1000.00€");
      expect(metricElement).toBeDefined();
    });
  });

  it("should display a loading state when data is being fetched", async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <RevenueCard {...mockProps} />
      </MockedProvider>
    );
    const loadingText = await screen.findByText("Umsatz");
    expect(loadingText).toBeDefined();
  });

  it("should display an error message when there is an error fetching data", async () => {
    render(
      <MockedProvider mocks={errorMock} addTypename={false}>
        <RevenueCard {...mockProps} />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Error loading data")).toBeDefined();
    });
  });
});
