// ApolloWrapper.tsx
import React, { useMemo } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  NormalizedCacheObject,
} from "@apollo/client";
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { useAuth } from "@/app/context/AuthContext";

// Define the structure of your initial state (if you have any)
interface InitialStateType {
  [key: string]: any;
}

// Function to create Apollo Client with TypeScript return type
const createApolloClient = (
  hasuraToken: string | null,
  initialState?: InitialStateType
): ApolloClient<NormalizedCacheObject> => {
  const httpLink = new HttpLink({
    uri:
      typeof window === "undefined"
        ? "https://eternal-leech-72.hasura.app/v1/graphql" // Absolute URL for server-side
        : "/api/graphql", // Relative URL for client-side
  });

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        Authorization: hasuraToken ? `Bearer ${hasuraToken}` : "",
      },
    });
    return forward(operation);
  });

  const cache = new NextSSRInMemoryCache().restore(initialState || {});

  return new NextSSRApolloClient({
    ssrMode: typeof window === "undefined",
    link: authLink.concat(httpLink),
    cache,
  });
};

// Define the props for the ApolloWrapper component
interface ApolloWrapperProps {
  children: React.ReactNode;
  initialState?: InitialStateType; // Optional prop for initial state
}

// ApolloWrapper component with TypeScript
export const ApolloWrapper: React.FC<ApolloWrapperProps> = ({
  children,
  initialState,
}) => {
  const { hasuraToken } = useAuth(); // Your useAuth hook should return a valid token

  // Use useMemo to avoid recreating the Apollo client on every render
  const client = useMemo(
    () => createApolloClient(hasuraToken, initialState),
    [hasuraToken, initialState]
  );

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
