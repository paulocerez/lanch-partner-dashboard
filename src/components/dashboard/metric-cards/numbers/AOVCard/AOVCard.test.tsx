import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { AOVCard } from "@/components/dashboard/metric-cards/numbers/AOVCard/AOVCard";
import { CardProps } from "../../cardProperties";
import { GET_TOTAL_GMV } from "@/utils/gqlQueries";
import { MockedProvider } from "@apollo/client/testing";

// mocks array > each defines the mock response of a single operation
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
            count: "50",
            sum: {
              gmv: "1000",
            },
          },
        },
      },
    },
  },
];

const loadingMock = [
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
      loading: true,
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

describe("AOVCard", async () => {
  const mockProps: CardProps = {
    vendorIds: ["DE_Berlin_0001", "DE_Hamburg_0001"],
    dateRange: {
      from: new Date(2024, 1, 1),
      to: new Date(2024, 1, 8),
    },
    orderPortal: ["Lieferando", "Uber Eats"],
  };

  it("should display the CardComponent with the correct average value when data is successfully fetched", async () => {
    render(
      <MockedProvider mocks={successMock} addTypename={false}>
        <AOVCard {...mockProps} />
      </MockedProvider>
    );

    await waitFor(() => {
      const titleElement = screen.getByText("Durchschn. Warenkorbwert");
      expect(titleElement).toBeDefined();

      const metricElement = screen.getByText("20.00€");
      expect(metricElement).toBeDefined();
    });
  });

  it("should display a loading state when data is being fetched", async () => {
    render(
      <MockedProvider mocks={successMock} addTypename={false}>
        <AOVCard {...mockProps} />
      </MockedProvider>
    );
    expect(
      screen.getByText("Durchschn. Warenkorb wird geladen...")
    ).toBeDefined();
  });

  it("should display an error message when there is an error fetching data", async () => {
    render(
      <MockedProvider mocks={errorMock} addTypename={false}>
        <AOVCard {...mockProps} />
      </MockedProvider>
    );
    await waitFor(() => {
      expect(screen.getByText("Error loading data")).toBeDefined();
    });
  });
});
