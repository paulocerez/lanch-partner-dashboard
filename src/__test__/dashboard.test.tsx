import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import SignIn from "../app/login/page";

test("SignIn", () => {
  render(<SignIn />);
  expect(
    screen.getByRole("heading", { level: 2, name: "Einloggen" })
  ).toBeDefined();
});
