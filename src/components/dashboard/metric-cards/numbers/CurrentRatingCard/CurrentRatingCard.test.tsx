import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { GET_ALL_RATINGS } from "@/utils/gqlQueries";
import { CurrentRatingCard } from "./CurrentRatingCard";
import { CardProps } from "../../cardProperties";
import { calculateRatingPerVendor } from "@/utils/metricCalculations"; // Make sure this path is correct

const successMock = [
  {
    request: {
      query: GET_ALL_RATINGS,
      variables: {
        _vendor_ids: ["DE_Berlin_0001", "DE_Hamburg_0001"],
        _fromDate: "2024-01-31T00:00:00Z",
        _toDate: "2024-02-07T23:59:59Z",
        _order_platform_names: ["Lieferando", "Uber Eats"],
      },
    },
    result: {
      data: {
        api_partner_dashboard_api_pd_vendor_display_ratings_latest: [
          {
            vendor_id: "DE_Berlin_0001",
            order_platform_name: "Lieferando",
            rating_display: "4.5",
            rating_count: "10",
          },
          {
            vendor_id: "DE_Hamburg_0001",
            order_platform_name: "Uber Eats",
            rating_display: "4.0",
            rating_count: "5",
          },
        ],
      },
    },
  },
];

const errorMock = [
  {
    request: {
      query: GET_ALL_RATINGS,
      variables: {
        vendorIds: ["DE_Berlin_0001", "DE_Hamburg_0001"],
        dateRange: {
          from: new Date(2024, 1, 1).toISOString(),
          to: new Date(2024, 1, 8).toISOString(),
        },
        orderPortal: ["Lieferando", "Uber Eats"],
      },
    },
    error: new Error("An error occurred"),
  },
];

describe("CurrentRatingCard", async () => {
  const mockProps: CardProps = {
    vendorIds: ["DE_Berlin_0001", "DE_Hamburg_0001"],
    dateRange: {
      from: new Date(2024, 1, 1),
      to: new Date(2024, 1, 8),
    },
    orderPortal: ["Lieferando", "Uber Eats"],
  };

  it("should display the CardComponent with the correct average value when data is successfully fetched", async () => {
    const expectedData =
      successMock[0].result.data
        .api_partner_dashboard_api_pd_vendor_display_ratings_latest;
    const expectedAverage = calculateRatingPerVendor(expectedData);

    render(
      <MockedProvider mocks={successMock} addTypename={false}>
        <CurrentRatingCard {...mockProps} />
      </MockedProvider>
    );

    await waitFor(() => {
      const titleElement = screen.getByText("Aktuelles Durchschnittsrating");
      expect(titleElement).toBeDefined();

      const metricElement = screen.getByText(expectedAverage.avg_rating);
      expect(metricElement).toBeDefined();
    });
  });

  it("should display a loading state when data is being fetched", async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <CurrentRatingCard {...mockProps} />
      </MockedProvider>
    );
    const loadingText = await screen.findByText(
      "Aktueller Ratingdurchschnitt wird geladen..."
    );
    expect(loadingText).toBeDefined();
  });

  it("should display an error message when there is an error fetching data", async () => {
    render(
      <MockedProvider mocks={errorMock} addTypename={false}>
        <CurrentRatingCard {...mockProps} />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Error loading data")).toBeDefined();
    });
  });
});
