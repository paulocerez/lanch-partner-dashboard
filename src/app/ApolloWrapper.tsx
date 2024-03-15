import React, { useMemo } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  NormalizedCacheObject,
} from "@apollo/client";
import { useAuth } from "./context/AuthContext";

const createApolloClient = (
  hasuraToken: string | null
): ApolloClient<NormalizedCacheObject> => {
  const httpLink = new HttpLink({
    uri: "https://eternal-leech-72.hasura.app/v1/graphql",
  });

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        Authorization: hasuraToken ? `Bearer ${hasuraToken}` : "",
      },
    });
    return forward(operation);
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  const { hasuraToken } = useAuth();

  const client = useMemo(() => createApolloClient(hasuraToken), [hasuraToken]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
