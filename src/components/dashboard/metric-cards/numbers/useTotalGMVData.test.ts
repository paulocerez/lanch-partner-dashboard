import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { handlers } from "@/__tests__/mocks/graphqlHandlers";
import { server } from "@/__tests__/mocks/server";
import { MockedProvider, createMockClient } from "@apollo/client/testing";

describe("useTotalGMVData hook", () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  it("fetches the total GMV query correctly and returns the expected data object", async () => {});
});
