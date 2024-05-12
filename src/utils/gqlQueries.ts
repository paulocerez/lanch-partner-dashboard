import { gql } from "@apollo/client";

export const GET_TOTAL_GMV = gql`
  query getTotalGMV(
    $_vendor_ids: [String!] = ["DE_Berlin_0014"]
    $_fromDate: Timestamp = "2023-09-15"
    $_toDate: Timestamp = "2023-10-27"
    $_order_source_names: [String!] = [
      "Lieferando"
      "Uber Eats"
      "Wolt"
      "Lanch Webshop"
    ]
  ) {
    api_partner_dashboard_api_pd_food_orders_aggregate(
      where: {
        vendor_id: { _in: $_vendor_ids }
        order_source_name: { _in: $_order_source_names }
        ordered_at: { _gte: $_fromDate, _lte: $_toDate }
      }
    ) {
      aggregate {
        count
        sum {
          gmv
        }
      }
    }
  }
`;

export const GET_FOOD_ORDERS_DAILY = gql`
  query getFoodOrdersDaily(
    $_vendor_ids: [String!] = ["DE_Berlin_0014"]
    $_fromDate: Date = "2023-09-15"
    $_toDate: Date = "2023-10-27"
    $_order_source_names: [String!] = [
      "Lieferando"
      "Uber Eats"
      "Wolt"
      "Lanch Webshop"
    ]
  ) {
    api_partner_dashboard_api_pd_food_orders_daily(
      where: {
        vendor_id: { _in: $_vendor_ids }
        order_source_name: { _in: $_order_source_names }
        order_date: { _gte: $_fromDate, _lte: $_toDate }
      }
      order_by: { order_date: asc }
    ) {
      total_gmv
      order_count
      order_source_name
      order_date
      brand
    }
  }
`;

export const GET_ALL_VENDORS = gql`
  query getAllVendors {
    api_partner_dashboard_api_pd_food_orders(
      distinct_on: vendor_id
      order_by: { vendor_id: asc }
    ) {
      vendor_id
      vendor_name
    }
  }
`;

export const GET_ASSIGNED_VENDORS = gql`
  query getVendorList($_userID: String) {
    vendors_of_user(where: { user_id: { _eq: $_userID } }) {
      vendor_id
      user_id
    }
  }
`;

export const GET_ALL_REVIEWS = gql`
  query getAllReviews(
    $_vendor_ids: [String!] = ["DE_Berlin_0014"]
    $_fromDate: Timestamp = "2023-09-15"
    $_toDate: Timestamp = "2023-10-27"
    $_order_source_names: [String!] = [
      "Lieferando"
      "Uber Eats"
      "Wolt"
      "Lanch Webshop"
    ]
  ) {
    api_partner_dashboard_api_pd_food_orders(
      where: {
        _and: [
          { vendor_id: { _in: $_vendor_ids } }
          { ordered_at: { _gte: $_fromDate, _lte: $_toDate } }
          { order_source_name: { _in: $_order_source_names } }
          {
            _or: [
              { rating_delivery: { _is_null: false } }
              { rating_food: { _is_null: false } }
              { review_customer_comment: { _is_null: false } }
            ]
          }
        ]
      }
    ) {
      order_id
      ordered_at
      rating_delivery
      rating_food
      review_customer_comment
      order_source_name
    }
  }
`;

export const GET_ALL_RATINGS = gql`
  query getRatingsQuery(
    $_vendor_ids: [String!] = ["DE_Berlin_0014"]
    $_order_source_names: [String!] = [
      "Lieferando"
      "Uber Eats"
      "Wolt"
      "Lanch Webshop"
    ]
  ) {
    api_partner_dashboard_api_pd_vendor_display_ratings_latest(
      where: {
        vendor_id: { _in: $_vendor_ids }
        order_platform_name: { _in: $_order_source_names }
      }
    ) {
      vendor_id
      order_platform_name
      rating_display
      rating_count
    }
  }
`;

export const GET_TOP_SELLING_ITEMS = gql`
  query getTopItemsQuery(
    $_vendor_ids: [String!] = ["DE_Berlin_0014"]
    $_fromDate: Date = "2023-09-15"
    $_toDate: Date = "2023-10-27"
  ) {
    api_partner_dashboard_api_pd_food_order_items_daily(
      where: {
        vendor_id: { _in: $_vendor_ids }
        order_date: { _gt: $_fromDate, _lte: $_toDate }
      }
      order_by: { order_date: asc }
    ) {
      vendor_id
      quantity
      order_date
      article_name
    }
  }
`;

export const GET_WEEKLY_RATINGS = gql`
  query getWeeklyFoodOrderRatings(
    $_vendor_ids: [String!] = ["DE_Berlin_0014"]
    $_fromDate: Timestamp = "2023-09-15"
    $_toDate: Timestamp = "2023-10-27"
    $_order_source_names: [String!] = [
      "Lieferando"
      "Uber Eats"
      "Wolt"
      "Lanch Webshop"
    ]
  ) {
    api_partner_dashboard_api_pd_food_orders_aggregate(
      where: {
        vendor_id: { _in: $_vendor_ids }
        order_source_name: { _in: $_order_source_names }
        ordered_at: { _gte: $_fromDate, _lte: $_toDate }
        rating_food: { _is_null: false }
      }
    ) {
      aggregate {
        avg {
          rating_food
        }
      }
      nodes {
        ordered_at: timestamp_trunc_week
        rating_food_avg: avg_rating_food
        rating_food_count: count
      }
    }
  }
`;
