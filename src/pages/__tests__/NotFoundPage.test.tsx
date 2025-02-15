import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { NotFoundPage } from "../NotFoundPage";

describe("NotFoundPage Component", () => {
  it("renders correctly", () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
    expect(screen.getByText("Oops! Page Not Found")).toBeInTheDocument();
    expect(screen.getByText("The page you're looking for doesn't exist or has been moved.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Go to Home/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /View Events/i })).toBeInTheDocument();
  });
});