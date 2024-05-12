// import { gql, useQuery, useSuspenseQuery } from "@apollo/client";
// import {
//   Card,
//   DateRangePickerValue,
//   Metric,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeaderCell,
//   TableRow,
//   Text,
//   Title,
// } from "@tremor/react";
// import React from "react";
// import { Spinner } from "@/components/dashboard/dashboard-helpers/Loading/Spinner";

// interface ReviewCardProps {
//   vendorIds: string[];
//   dateRange: DateRangePickerValue;
//   orderPortal?: string[];
// }

// interface Review {
//   order_id: string;
//   rating_delivery: string;
//   rating_food: string;
//   review_customer_comment: string;
//   order_source_name: string;
// }

// interface GetAllReviewsResponse {
//   api_partner_dashboard_api_pd_food_orders: Review[];
// }

// const ReviewCard = (ReviewCardProps: ReviewCardProps) => {
//   const { vendorIds, dateRange, orderPortal } = ReviewCardProps;

//   let orderPortalList: string[];

//   if (!orderPortal) {
//     orderPortalList = ["Lieferando", "Uber Eats", "Wolt", "Lanch Webshop"];
//   } else {
//     orderPortalList = orderPortal;
//   }

//   const getAllReviews = gql`
//     query getAllReviews(
//       $_vendor_ids: [String!] = ["DE_Berlin_0014"]
//       $_fromDate: Timestamp = "2023-09-15"
//       $_toDate: Timestamp = "2023-10-27"
//       $_order_source_names: [String!] = [
//         "Lieferando"
//         "Uber Eats"
//         "Wolt"
//         "Lanch Webshop"
//       ]
//     ) {
//       api_partner_dashboard_api_pd_food_orders(
//         where: {
//           _and: [
//             { vendor_id: { _in: $_vendor_ids } }
//             { ordered_at: { _gte: $_fromDate, _lte: $_toDate } }
//             { order_source_name: { _in: $_order_source_names } }
//             {
//               _or: [
//                 { rating_delivery: { _is_null: false } }
//                 { rating_food: { _is_null: false } }
//                 { review_customer_comment: { _is_null: false } }
//               ]
//             }
//           ]
//         }
//       ) {
//         order_id
//         ordered_at
//         rating_delivery
//         rating_food
//         review_customer_comment
//         order_source_name
//       }
//     }
//   `;

//   const toISOStringLocal = (d: Date) => {
//     return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
//       .toISOString()
//       .slice(0, -5);
//   };

//   // Function to add days to a date
//   const addDays = (date: Date, days: number) => {
//     var result = new Date(date);
//     result.setDate(result.getDate() + days);
//     return result;
//   };

//   const variables = {
//     _vendor_ids: vendorIds,
//     _fromDate: dateRange?.from
//       ? toISOStringLocal(new Date(dateRange.from))
//       : toISOStringLocal(
//           new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7)
//         ),
//     _toDate: dateRange?.to
//       ? toISOStringLocal(
//           new Date(addDays(new Date(dateRange.to), 1).setSeconds(-1))
//         )
//       : toISOStringLocal(
//           new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 1)
//         ),
//     _order_source_names: orderPortalList,
//     // Other variables can be added here
//   };

//   //   console.log("Query variables:", variables);

//   const { loading, error, data } = useQuery<GetAllReviewsResponse>(
//     getAllReviews,
//     {
//       // if one of these variables changes, the getTotalGMV query is triggered
//       variables: variables,
//     }
//   );

//   //   console.log("Query loading:", loading);
//   //   console.log("Query error:", error);
//   //   console.log("Query data:", data);

//   if (loading)
//     return (
//       <Card>
//         <Text>Reviews</Text>
//         <Spinner />
//       </Card>
//     );

//   if (error) {
//     return (
//       <Card>
//         <Text>Error: {error.message}</Text>
//       </Card>
//     );
//   }

//   return (
//     <Card>
//       <Title>Reviews & Ratings</Title>
//       <Text></Text>
//       <div className="mx-auto max-w-2xl">
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableHeaderCell>Order ID</TableHeaderCell>
//               <TableHeaderCell>Food Rating</TableHeaderCell>
//               <TableHeaderCell>Delivery Rating</TableHeaderCell>
//               <TableHeaderCell>Review</TableHeaderCell>
//               <TableHeaderCell>Platform</TableHeaderCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {data?.api_partner_dashboard_api_pd_food_orders.map(
//               (review: Review) => (
//                 <TableRow key={review.order_id}>
//                   <TableCell>{review.order_id}</TableCell>
//                   <TableCell>{review.rating_food}</TableCell>
//                   <TableCell>{review.rating_delivery}</TableCell>
//                   <TableCell>{review.review_customer_comment}</TableCell>
//                   <TableCell>{review.order_source_name}</TableCell>
//                 </TableRow>
//               )
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </Card>
//   );
// };

// export default ReviewCard;
