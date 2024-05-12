import { describe, it, expect } from "vitest";
import { calculateAverage } from "@/utils/metricCalculations";
import { GMVData } from "@/components/dashboard/metric-cards/CardProps";

describe("calculateAverage", () => {
  it("should return the correct average if the input values are valid", () => {
    const mockData: GMVData = {
      api_partner_dashboard_api_pd_food_orders_aggregate: {
        aggregate: {
          count: 2,
          sum: { gmv: 400 },
        },
      },
    };

    const average = calculateAverage(mockData, 2);
    expect(average).toBe("200.00€");
  });

  it('should return "Anfrage fehlgeschlagen" when vendorIdLength is 0', () => {
    const mockData: GMVData = {
      api_partner_dashboard_api_pd_food_orders_aggregate: {
        aggregate: {
          count: 2,
          sum: { gmv: 400 },
        },
      },
    };

    const result = calculateAverage(mockData, 0);
    expect(result).toBe("Anfrage fehlgeschlagen");
  });

  it('should return "Anfrage fehlgeschlagen" when data is undefined', () => {
    const result = calculateAverage(undefined, 1);
    expect(result).toBe("Anfrage fehlgeschlagen");
  });

  it('should return "Anfrage fehlgeschlagen" when count is zero', () => {
    const mockData: GMVData = {
      api_partner_dashboard_api_pd_food_orders_aggregate: {
        aggregate: {
          count: 0,
          sum: { gmv: 400 },
        },
      },
    };
    const result = calculateAverage(mockData, 2);
    expect(result).toBe("Bisher keine Bestellungen durchgeführt");
  });
  it('should return "Anfrage fehlgeschlagen" when gmv sum is zero', () => {
    const mockData: GMVData = {
      api_partner_dashboard_api_pd_food_orders_aggregate: {
        aggregate: {
          count: 2,
          sum: { gmv: 0 },
        },
      },
    };
    const average = calculateAverage(mockData, 2);
    expect(average).toBe("Bisher keinen Umsatz generiert");
  });
});
