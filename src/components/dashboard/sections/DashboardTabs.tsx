import { Grid, Title } from "@tremor/react";
import RevenueCard from "../metric-cards/numbers/RevenueCard/RevenueCard";
import OrderCountCard from "../metric-cards/numbers/OrderCountCard/OrderCountCard";
import { AOVCard } from "@/components/dashboard/metric-cards/numbers/AOVCard/AOVCard";
import GMVGraphCard from "@/components/dashboard/metric-cards/graphs/GMVGraphCard/GMVGraphCard";
import LatestRatingCard from "../metric-cards/numbers/CurrentRatingCard/CurrentRatingCard";
import TopItemChartCard from "../metric-cards/graphs/TopItemsChartCard/TopItemsChartCard";
import ReviewCard from "../metric-cards/graphs/ReviewsAndRatingsCard/ReviewCard";
import OrderChartCard from "../metric-cards/graphs/OrderChartCard/OrderChartCard";
import { CardProps } from "../metric-cards/CardProps";

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
        <AOVCard vendorIds={vendorIds} dateRange={dateRange} orderPortal={[]} />
        <LatestRatingCard vendorIds={vendorIds} dateRange={dateRange} />
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
          <OrderChartCard
            vendorIds={vendorIds}
            dateRange={dateRange}
            orderPortal={orderPortal}
          />
        </div>
        <div>
          <TopItemChartCard vendorIds={vendorIds} dateRange={dateRange} />
        </div>
        <div>
          <ReviewCard vendorIds={vendorIds} dateRange={dateRange} />
        </div>
      </Grid>
    </div>
  );
};
