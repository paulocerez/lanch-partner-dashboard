import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  NormalizedCacheObject,
} from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  SSRMultipartLink,
  NextSSRInMemoryCache,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { useAuth } from "@/app/context/AuthContext";

const createApolloClient = (
  hasuraToken: string | null
): ApolloClient<NormalizedCacheObject> => {
  const httpLink = new HttpLink({
    uri: "https://eternal-leech-72.hasura.app/v1/graphql",
    fetchOptions: { cache: "no-store" },
  });

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        Authorization: hasuraToken ? `Bearer ${hasuraToken}` : "",
      },
    });
    return forward(operation);
  });

  // In SSR, create an instance of `NextSSRApolloClient` instead of the standard `ApolloClient`
  return typeof window === "undefined"
    ? new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link: ApolloLink.from([
          // SSR multipart link can be included or excluded based on your needs
          new SSRMultipartLink({ stripDefer: true }),
          authLink,
          httpLink,
        ]),
      })
    : new ApolloClient({
        cache: new InMemoryCache(),
        link: authLink.concat(httpLink),
      });
};

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  const { hasuraToken } = useAuth();
  const client = createApolloClient(hasuraToken);

  // When using SSR, you might not need to wrap with a Provider if the client is passed down in a different
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
