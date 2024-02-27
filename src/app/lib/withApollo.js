// // lib/withApollo.js
// import React from "react";
// import { ApolloProvider } from "@apollo/client";
// import createApolloClient from "./apolloClient";

// let globalApolloClient = null;

// const initApolloClient = (initialState, headers) => {
//   if (typeof window === "undefined") {
//     return createApolloClient(initialState, headers);
//   }

//   if (!globalApolloClient) {
//     globalApolloClient = createApolloClient(initialState, headers);
//   }

//   return globalApolloClient;
// };

// export const withApollo =
//   ({ ssr = false } = {}) =>
//   (PageComponent) => {
//     const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
//       const client = apolloClient || initApolloClient(apolloState, undefined);
//       return (
//         <ApolloProvider client={client}>
//           <PageComponent {...pageProps} />
//         </ApolloProvider>
//       );
//     };

//     if (process.env.NODE_ENV !== "production") {
//       const displayName =
//         PageComponent.displayName || PageComponent.name || "Component";
//       WithApollo.displayName = `withApollo(${displayName})`;
//     }

//     if (ssr || PageComponent.getInitialProps) {
//       WithApollo.getInitialProps = async (ctx) => {
//         const apolloClient = initApolloClient(null, undefined);
//         ctx.apolloClient = apolloClient;
//         let pageProps = {};
//         if (PageComponent.getInitialProps) {
//           pageProps = await PageComponent.getInitialProps(ctx);
//         }

//         if (typeof window === "undefined") {
//           const { getDataFromTree } = await import("@apollo/client/react/ssr");
//           try {
//             await getDataFromTree(
//               <PageComponent {...pageProps} apolloClient={apolloClient} />
//             );
//           } catch (error) {
//             console.error("Error while running `getDataFromTree`", error);
//           }
//           Head.rewind();
//         }

//         const apolloState = apolloClient.extract();
//         return { ...pageProps, apolloState };
//       };
//     }

//     return WithApollo;
//   };
