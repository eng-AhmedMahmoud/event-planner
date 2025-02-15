import { render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EventForm } from "../EventForm";
import { useEvents } from "../../hooks/useEvents";
import { useNavigate } from "react-router-dom";
import { vi, describe, it, expect, beforeEach } from "vitest";

// Mock dependencies
vi.mock("../../hooks/useEvents", () => ({
  useEvents: vi.fn(),
}));
vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));
vi.mock("react-hot-toast", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("EventForm", () => {
  const mockAddEvent = vi.fn().mockResolvedValue(true);
  const mockUpdateEvent = vi.fn().mockResolvedValue(true);
  const mockValidateEvent = vi.fn().mockResolvedValue(true);
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useEvents as ReturnType<typeof vi.fn>).mockReturnValue({
      addEvent: mockAddEvent,
      updateEvent: mockUpdateEvent,
      validateEvent: mockValidateEvent,
    });
    (useNavigate as ReturnType<typeof vi.fn>).mockReturnValue(mockNavigate);
  });

  it("renders the form with empty fields for new event", () => {
    render(<EventForm />);
    expect(screen.getByLabelText(/Event Name/i)).toHaveValue("");
    expect(screen.getByTestId("date-button")).toHaveTextContent("Pick a date");
    expect(screen.getByLabelText(/Location/i)).toHaveValue("");
    expect(screen.getByLabelText(/Description/i)).toHaveValue("");
  });

  it("renders the form with initial data for editing event", async () => {
    const initialData = {
      id: "1",
      name: "Test Event",
      date: "2023-05-01",
      time: "14:00",
      location: "Test Location",
      description: "Test Description",
      status: "pending" as "pending" | "completed",
      lastModified: Date.now(),
      version: 1,
    };
    render(<EventForm initialData={initialData} />);

    await waitFor(() => {
      expect(screen.getByLabelText(/Event Name/i)).toHaveValue("Test Event");
      expect(screen.getByTestId("date-button")).toHaveTextContent("May 1st, 2023");
      expect(screen.getByLabelText(/Location/i)).toHaveValue("Test Location");
      expect(screen.getByLabelText(/Description/i)).toHaveValue("Test Description");
    });
  });

  it("navigates back to events page when cancel is clicked", async () => {
    const user = userEvent.setup();
    render(<EventForm />);
    await user.click(screen.getByRole("button", { name: /Cancel/i }));
    expect(mockNavigate).toHaveBeenCalledWith("/events");
  });
});