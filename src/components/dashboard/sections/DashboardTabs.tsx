import { Grid, Title } from "@tremor/react";
import { CardProps } from "../metric-cards/cardProps";
import { AOVCard } from "@/components/dashboard/metric-cards/numbers/AOVCard/AOVCard";
import { TopItemChartCard } from "../metric-cards/graphs/TopItemsChartCard/TopItemsChartCard";
import { CurrentRatingCard } from "../metric-cards/numbers/CurrentRatingCard/CurrentRatingCard";
import RevenueCard from "../metric-cards/numbers/RevenueCard/RevenueCard";
import ReviewCard from "../metric-cards/graphs/ReviewsAndRatingsCard/ReviewCard";
import OrderCountCard from "../metric-cards/numbers/OrderCountCard/OrderCountCard";
import GMVGraphCard from "@/components/dashboard/metric-cards/graphs/GMVGraphCard/GMVGraphCard";
import { OrderGraphCard } from "../metric-cards/graphs/OrderGraphCard/OrderGraphCard";

export const DashboardTabs = ({
  vendorIds,
  dateRange,
  orderPortal,
}: CardProps) => {
  return (
    <div className="py-8">
      <Title>Umsatz & Performance Metriken</Title>
      <Grid numItemsMd={2} numItemsLg={4} className="gap-6 mt-6">
        <RevenueCard
          vendorIds={vendorIds}
          dateRange={dateRange}
          orderPortal={orderPortal}
        />
        <OrderCountCard
          vendorIds={vendorIds}
          dateRange={dateRange}
          orderPortal={orderPortal}
        />
        <AOVCard
          vendorIds={vendorIds}
          dateRange={dateRange}
          orderPortal={orderPortal}
        />
        <CurrentRatingCard
          vendorIds={vendorIds}
          dateRange={dateRange}
          orderPortal={orderPortal}
        />
      </Grid>
      <Grid numItemsMd={1} numItemsLg={2} className="gap-6 mt-6">
        <div>
          <GMVGraphCard
            vendorIds={vendorIds}
            dateRange={dateRange}
            orderPortal={orderPortal}
          />
        </div>
        <div>
          <OrderGraphCard
            vendorIds={vendorIds}
            dateRange={dateRange}
            orderPortal={orderPortal}
          />
        </div>
        <div>
          <TopItemChartCard
            vendorIds={vendorIds}
            dateRange={dateRange}
            orderPortal={orderPortal}
          />
        </div>
        <div>
          <ReviewCard
            vendorIds={vendorIds}
            dateRange={dateRange}
            orderPortal={orderPortal}
          />
        </div>
      </Grid>
    </div>
  );
};
