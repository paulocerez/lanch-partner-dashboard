import { HttpResponse, graphql } from "msw";

// no specification of exact server endpoint needed, MSW intercepts matching GraphQL operations regardless of destination (could do optionally via graphql.link() API)

const queries = [
  {
    name: "getTotalGMV",
    data: {
      api_partner_dashboard_api_pd_food_orders_aggregate: {
        aggregate: {
          count: "10",
          sum: {
            gmv: "1000",
          },
        },
      },
    },
  },
  {
    name: "getFoodOrdersDaily",
    data: {
      api_partner_dashboard_api_pd_food_orders_daily: {
        total_gmv: "500",
        order_count: "25",
        order_source_name: "Lieferando",
        order_date: "2024-01-04",
        brand: "Loco Chicken",
      },
    },
  },

  {
    name: "getAllReviews",
    data: {
      api_partner_dashboard_api_pd_food_orders: {
        order_id: "447294",
        rating_delivery: "4",
        rating_food: "5",
        review_customer_comment: "Everything good",
        order_source_name: "Lieferando",
      },
    },
  },
];

export const handlers = [
  graphql.query("getTotalGMV", () => {
    return HttpResponse.json({
      data: {
        api_partner_dashboard_api_pd_food_orders_aggregate: {
          aggregate: {
            count: "10",
            sum: {
              gmv: "1000",
            },
          },
        },
      },
    });
  }),
];

// queries.forEach((element) => {
//   handlers.push(
//     graphql.query(element.name, () => {
//       return HttpResponse.json({
//         data: { element.data },
//       });
//     })
//   );
// });
