import {
  InMemoryCache,
  HttpLink,
  ApolloClient,
  ApolloProvider,
} from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

// have a function to create a client for you
const createApolloClient = (authToken) => {
  const httpLink = new HttpLink({
    // this needs to be an absolute url, as relative urls cannot be used in SSR
    uri: "/api/graphql",
    // you can disable result caching here if you want to
    // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
    fetchOptions: { cache: "no-store" },
    // you can override the default `fetchOptions` on a per query basis
    // via the `context` property on the options passed as a second argument
    // to an Apollo Client data fetching hook, e.g.:
    // const { data } = useSuspenseQuery(MY_QUERY, { context: { fetchOptions: { cache: "force-cache" }}});
  });

  const authLink = new ApolloLink((operation, forward) => {
    // get the authentication token from local storage if it exists

    // return the headers to the context so httpLink can read them
    const token = authToken ? `Bearer ${authToken}` : null;

    operation.setContext({
      headers: {
        Authorization: token,
      },
    });

    return forward(operation);
  });

  //   return new NextSSRApolloClient({
  //     // use the `NextSSRInMemoryCache`, not the normal `InMemoryCache`
  //     cache: new NextSSRInMemoryCache(),
  //     link:
  //       typeof window === "undefined"
  //         ? ApolloLink.from([
  //             // in a SSR environment, if you use multipart features like
  //             // @defer, you need to decide how to handle these.
  //             // This strips all interfaces with a `@defer` directive from your queries.
  //             new SSRMultipartLink({
  //               stripDefer: true,
  //             }),
  //             authLink,
  //             httpLink,
  //           ])
  //         : ApolloLink.from([authLink, httpLink]),
  //   });
};

// you need to create a component to wrap your app in
export function ApolloWrapper({ children, authToken }) {
  const client = createApolloClient(authToken);

  return (
    <ApolloNextAppProvider client={client}>{children}</ApolloNextAppProvider>
  );
}
