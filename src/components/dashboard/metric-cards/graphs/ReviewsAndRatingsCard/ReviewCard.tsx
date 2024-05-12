import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
} from "@tremor/react";
import React from "react";
import LoadingCard from "../../../dashboard-helpers/Loading/LoadingCard";
import { useReviewData } from "../useReviewData";
import { CardProps, ReviewData } from "../../CardProps";

const ReviewCard = ({ vendorIds, dateRange, orderPortal }: CardProps) => {
  const { loading, error, data } = useReviewData(
    vendorIds,
    dateRange,
    orderPortal
  );

  if (loading) return <LoadingCard metricTitle="Reviews & Ratings" />;

  if (error) {
    console.error("Error fetching Reviews & Ratings data:", error);
    return <div>Error loading data</div>;
  }

  return (
    <Card>
      <Title>Reviews & Ratings</Title>
      <Text></Text>
      <div className="mx-auto max-w-2xl">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Order ID</TableHeaderCell>
              <TableHeaderCell>Food Rating</TableHeaderCell>
              <TableHeaderCell>Delivery Rating</TableHeaderCell>
              <TableHeaderCell>Review</TableHeaderCell>
              <TableHeaderCell>Platform</TableHeaderCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.api_partner_dashboard_api_pd_food_orders.map(
              (review: ReviewData) => (
                <TableRow key={review.order_id}>
                  <TableCell>{review.order_id}</TableCell>
                  <TableCell>{review.rating_food}</TableCell>
                  <TableCell>{review.rating_delivery}</TableCell>
                  <TableCell>{review.review_customer_comment}</TableCell>
                  <TableCell>{review.order_source_name}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default ReviewCard;
