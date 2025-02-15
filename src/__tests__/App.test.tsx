import type React from "react"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, it, expect, vi, beforeAll, afterAll } from "vitest"
import App from "../App"

// Mock the EventProvider context
vi.mock("../context/EventProvider", () => ({
  EventProvider: ({ children }: { children: React.ReactNode }) => children,
}))

// Mock the Layout component
vi.mock("../components/Layout", () => ({
  Layout: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

// Mock the ErrorBoundary component
vi.mock("../components/ErrorBoundary", () => ({
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

// Mock all page components with named exports
vi.mock("../pages/HomePage", () => ({
  HomePage: () => <div data-testid="home-page">Welcome to Event Planner</div>,
}))

vi.mock("../pages/EventsPage", () => ({
  EventsPage: () => <div data-testid="events-page">Events</div>,
}))

vi.mock("../pages/AddEventPage", () => ({
  AddEventPage: () => <div data-testid="add-event-page">Create New Event</div>,
}))

vi.mock("../pages/EditEventPage", () => ({
  EditEventPage: () => <div data-testid="edit-event-page">Edit Event</div>,
}))

vi.mock("../pages/NotFoundPage", () => ({
  NotFoundPage: () => <div data-testid="not-found-page">Oops! Page Not Found</div>,
}))

// Suppress console errors in tests
const originalError = console.error
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && /Warning.*not wrapped in act/.test(args[0])) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})

describe("App Component", () => {
  it("renders Home Page by default", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    )
    expect(screen.getByTestId("home-page")).toBeInTheDocument()
  })

  it("renders Events Page when navigating to /events", () => {
    render(
      <MemoryRouter initialEntries={["/events"]}>
        <App />
      </MemoryRouter>,
    )
    expect(screen.getByTestId("events-page")).toBeInTheDocument()
  })

  it("renders Add Event Page when navigating to /add-event", () => {
    render(
      <MemoryRouter initialEntries={["/add-event"]}>
        <App />
      </MemoryRouter>,
    )
    expect(screen.getByTestId("add-event-page")).toBeInTheDocument()
  })

  it("renders Edit Event Page when navigating to /edit-event/:id", () => {
    render(
      <MemoryRouter initialEntries={["/edit-event/123"]}>
        <App />
      </MemoryRouter>,
    )
    expect(screen.getByTestId("edit-event-page")).toBeInTheDocument()
  })

  it("renders 404 Page when navigating to an unknown route", () => {
    render(
      <MemoryRouter initialEntries={["/unknown"]}>
        <App />
      </MemoryRouter>,
    )
    expect(screen.getByTestId("not-found-page")).toBeInTheDocument()
  })
})

