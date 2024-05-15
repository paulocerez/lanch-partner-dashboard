// tests/mocks/server.js
import { setupServer } from "msw/node";
import { handlers } from "./graphqlHandlers";
import { afterAll, afterEach, beforeAll } from "vitest";

export const server = setupServer(...handlers);

// Start server before all tests
// onUnhandledRequest > error is thrown whenever there is a request that does not have a corresponding request handler
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());
