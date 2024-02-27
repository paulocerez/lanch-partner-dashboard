// import fetch from "isomorphic-unfetch";
// import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
// import { WebSocketLink } from "@apollo/client/link/ws";
// import { SubscriptionClient } from "subscriptions-transport-ws";

// const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET;
// let accessToken = null;

// const requestAccessToken = async () => {
//   if (accessToken) return;
//   const res = await fetch(`${process.env.NEXT_PUBLIC_APP_HOST}/api/session`);
//   if (res.ok) {
//     const json = await res.json();
//     accessToken = json.accessToken;
//   } else {
//     accessToken = "public";
//   }
// };

// // Function to create the HTTP Link
// const createHttpLink = (headers) => {
//   const httpLink = new HttpLink({
//     uri: "https://eternal-leech-72.hasura.app/v1/graphql",
//     credentials: "include",
//     headers: {
//       ...headers,
//       "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
//     },
//     fetch,
//   });
//   return httpLink;
// };

// // Function to create the WebSocket Link
// const createWSLink = () => {
//   return new WebSocketLink(
//     new SubscriptionClient("https://eternal-leech-72.hasura.app/v1/graphql", {
//       lazy: true,
//       reconnect: true,
//       connectionParams: async () => {
//         await requestAccessToken();
//         return {
//           headers: {
//             authorization: accessToken ? `Bearer ${accessToken}` : "",
//           },
//         };
//       },
//     })
//   );
// };

// export default function createApolloClient(initialState, headers) {
//   const ssrMode = typeof window === "undefined";
//   let link;
//   if (ssrMode) {
//     link = createHttpLink(headers);
//   } else {
//     link = createWSLink();
//   }
//   return new ApolloClient({
//     ssrMode,
//     link,
//     cache: new InMemoryCache().restore(initialState),
//   });
// }
