import { gql } from "@apollo/client";

/**
 * 
 * @param queryInput string 
 * 
 * e.g:
 * {
 * 	aggregate {
 * 		count
 * 		sum {
 * 			gmv
 * 		}
 * 	}
 * }

 * @returns 
 */
export const getGqlQueryAggregate = (queryInput: string) => {
  return gql`
    ${BASE_QUERY}
    ${queryInput}
  `;
};

const BASE_QUERY = `
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
	  )
  `;

export const getTotalGMVQuery = gql`
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
