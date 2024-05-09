// verifies that aggregation functions for graph components return the correct aggregated data -> aggregate per date

import {
  InputType,
  OutputType,
} from "@/components/dashboard/metric-cards/CardProps";
import { describe, expect, it } from "vitest";
import { aggregateGMVData } from "./aggregateDataForGraphs";

describe("", () => {
  it("aggregates data correctly", () => {
    const data: InputType[] = [
      {
        total_gmv: "10000",
        order_count: "50",
        order_source_name: "Lieferando",
        order_date: "2024-01-01",
        brand: "Loco Chicken",
      },
      {
        total_gmv: "20000",
        order_count: "100",
        order_source_name: "Lieferando",
        order_date: "2024-01-01",
        brand: "Loco Chicken",
      },
      {
        total_gmv: "15000",
        order_count: "250",
        order_source_name: "Uber Eats",
        order_date: "2024-01-01",
        brand: "Loco Chicken",
      },
      {
        total_gmv: "5000",
        order_count: "100",
        order_source_name: "Uber Eats",
        order_date: "2024-01-02",
        brand: "Loco Chicken",
      },
      {
        total_gmv: "2500",
        order_count: "50",
        order_source_name: "Uber Eats",
        order_date: "2024-01-02",
        brand: "Loco Chicken",
      },
    ];

    const expectedAggregatedOutput: OutputType[] = [
      {
        date: "01.01.24",
        Lieferando: "30000.00",
        "Uber Eats": "15000",
      },
      {
        date: "02.01.24",
        "Uber Eats": "7500.00",
      },
    ];
    const aggregatedData = aggregateGMVData(data);
    expect(aggregatedData).toEqual(expectedAggregatedOutput);
  });
});
