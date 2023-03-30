import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  it("renders login form", () => {
    render(<App />);
    const usernameInput = screen.getByText(/username/i);
    expect(usernameInput).toBeInTheDocument();
    const passwordInput = screen.getByText(/password/i);
    expect(usernameInput).toBeInTheDocument();
  });

  it("renders logged in", () => {
    React.useState = jest.fn().mockReturnValue([true, {}]);
    render(<App />);
    const usernameInput = screen.getByText(/Logged In!/i);
    expect(usernameInput).toBeInTheDocument();
  });
});
