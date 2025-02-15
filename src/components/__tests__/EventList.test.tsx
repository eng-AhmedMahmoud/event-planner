import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { EventList } from "../EventList"
import { useEvents } from "../../hooks/useEvents"
import { useEventDelete } from "../../hooks/useEventDelete"
import { BrowserRouter } from "react-router-dom"
import { vi, describe, beforeEach, it, expect } from "vitest"

// Mock the hooks
vi.mock("../../hooks/useEvents")
vi.mock("../../hooks/useEventDelete")

// Mock the toast function
vi.mock("react-hot-toast", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

const mockEvents = [
  {
    id: "1",
    name: "Test Event 1",
    date: "2023-05-01",
    time: "14:00",
    location: "Test Location 1",
    description: "Test Description 1",
    status: "pending",
    lastModified: Date.now(),
  },
  {
    id: "2",
    name: "Test Event 2",
    date: "2023-05-02",
    time: "15:00",
    location: "Test Location 2",
    description: "Test Description 2",
    status: "completed",
    lastModified: Date.now(),
  },
]

describe("EventList", () => {
  beforeEach(() => {
    ; (useEvents as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: { events: mockEvents, loading: false, error: null },
      markAsCompleted: vi.fn(),
      markAsPending: vi.fn(),
    })
      ; (useEventDelete as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        handleDelete: vi.fn(),
        DialogComponent: () => null,
      })
  })

  it("renders the event list", () => {
    render(
      <BrowserRouter>
        <EventList />
      </BrowserRouter>,
    )

    expect(screen.getByText("Test Event 1")).toBeInTheDocument()
    expect(screen.getByText("Test Event 2")).toBeInTheDocument()
  })

  it("filters events correctly", async () => {
    render(
      <BrowserRouter>
        <EventList />
      </BrowserRouter>
    );

    // Get tab elements with their full names (including counts)
    const getTab = (name: string) =>
      screen.getByRole("tab", { name: new RegExp(name, "i") });

    const allTab = getTab("All 2");
    const pendingTab = getTab("Pending 1");
    const completedTab = getTab("Completed 1");

    // Initial state check
    await waitFor(() => {
      expect(allTab).toHaveAttribute("data-state", "active");
      expect(screen.getByText("Test Event 1")).toBeInTheDocument();
      expect(screen.getByText("Test Event 2")).toBeInTheDocument();
    });

    // Test Pending filter
    await userEvent.click(pendingTab);

    await waitFor(() => {
      expect(pendingTab).toHaveAttribute("data-state", "active");
      expect(screen.getByText("Test Event 1")).toBeInTheDocument();
      expect(screen.queryByText("Test Event 2")).not.toBeInTheDocument();
    });

    // Test Completed filter
    await userEvent.click(completedTab);

    await waitFor(() => {
      expect(completedTab).toHaveAttribute("data-state", "active");
      expect(screen.queryByText("Test Event 1")).not.toBeInTheDocument();
      expect(screen.getByText("Test Event 2")).toBeInTheDocument();
    });

    // Test returning to All filter
    await userEvent.click(allTab);

    await waitFor(() => {
      expect(allTab).toHaveAttribute("data-state", "active");
      expect(screen.getByText("Test Event 1")).toBeInTheDocument();
      expect(screen.getByText("Test Event 2")).toBeInTheDocument();
    });
  });

  it("handles marking an event as completed", async () => {
    const mockMarkAsCompleted = vi.fn()
      ; (useEvents as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        state: { events: mockEvents, loading: false, error: null },
        markAsCompleted: mockMarkAsCompleted,
        markAsPending: vi.fn(),
      })

    render(
      <BrowserRouter>
        <EventList />
      </BrowserRouter>,
    )

    fireEvent.click(screen.getAllByRole("button", { name: /Mark as completed/i })[0])
    expect(mockMarkAsCompleted).toHaveBeenCalledWith("1")
  })

  it("handles marking an event as pending", async () => {
    const mockMarkAsPending = vi.fn()
      ; (useEvents as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        state: { events: mockEvents, loading: false, error: null },
        markAsCompleted: vi.fn(),
        markAsPending: mockMarkAsPending,
      })

    render(
      <BrowserRouter>
        <EventList />
      </BrowserRouter>,
    )

    fireEvent.click(screen.getAllByRole("button", { name: /Mark as pending/i })[0])
    expect(mockMarkAsPending).toHaveBeenCalledWith("2")
  })

  it("handles deleting an event", async () => {
    const mockHandleDelete = vi.fn()
      ; (useEventDelete as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        handleDelete: mockHandleDelete,
        DialogComponent: () => null,
      })

    render(
      <BrowserRouter>
        <EventList />
      </BrowserRouter>,
    )

    fireEvent.click(screen.getAllByRole("button", { name: /Delete event/i })[0])
    expect(mockHandleDelete).toHaveBeenCalledWith("1", "Test Event 1")
  })

  it("displays loading state", () => {
    ; (useEvents as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: { events: [], loading: true, error: null },
      markAsCompleted: vi.fn(),
      markAsPending: vi.fn(),
    })

    render(
      <BrowserRouter>
        <EventList />
      </BrowserRouter>,
    )

    expect(screen.getByText("Loading events...")).toBeInTheDocument()
  })

  it("displays error state", () => {
    ; (useEvents as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      state: { events: [], loading: false, error: "Test error" },
      markAsCompleted: vi.fn(),
      markAsPending: vi.fn(),
    })

    render(
      <BrowserRouter>
        <EventList />
      </BrowserRouter>,
    )

    expect(screen.getByText("Error: Test error")).toBeInTheDocument()
  })
})

