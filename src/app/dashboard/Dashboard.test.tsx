import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import SignIn from "../login/page";
import Dashboard from "../dashboard/page";

describe("Dashboard End-to-End Tests", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </MemoryRouter>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("should handle user login and interact with the dashboard", async () => {
    // Simulating user login
    const userEmailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", { name: "Login" });

    await userEvent.type(userEmailInput, "testuser@example.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.click(loginButton);

    // after redirecting to Dashboard page
    await screen.findByText("Dashboard Metrics");

    // Interacting with date filters on the dashboard
    const dateFromInput = screen.getByLabelText("From Date");
    const dateToInput = screen.getByLabelText("To Date");
    await userEvent.type(dateFromInput, "2024-01-01");
    await userEvent.type(dateToInput, "2024-01-31");
    const applyFilterButton = screen.getByText("Apply Filters");
    await userEvent.click(applyFilterButton);

    // Navigating through tabs and interacting with specific elements
    const tabs = screen.getByRole("tablist");
    const uberEatsTab = within(tabs).getByText("Uber Eats");
    await userEvent.click(uberEatsTab);

    // Ensure data loads in the selected tab
    await screen.findByText("Umsatz & Performance Metriken");

    // Check if data is being displayed correctly
    const revenueCard = screen.getByText("Revenue");
    expect(revenueCard).toBeInTheDocument();
    const revenueValue = within(revenueCard).getByText("5000€");
    expect(revenueValue).toBeInTheDocument();

    // Logout
    const logoutButton = screen.getByRole("button", { name: "Logout" });
    await userEvent.click(logoutButton);
    await screen.findByText("Please log in");
  });
});
