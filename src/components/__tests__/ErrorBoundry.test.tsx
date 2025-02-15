import { render, screen, fireEvent } from "@testing-library/react"
import { ErrorBoundary } from "../ErrorBoundary"
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"

describe("ErrorBoundary", () => {
  // Mock console.error to prevent it from cluttering the test output
  const originalConsoleError = console.error
  beforeEach(() => {
    console.error = vi.fn()
  })
  afterEach(() => {
    console.error = originalConsoleError
  })

  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <div>Test Content</div>
      </ErrorBoundary>,
    )
    expect(screen.getByText("Test Content")).toBeDefined()
  })

  it("renders error message when there is an error", () => {
    const ErrorComponent = () => {
      throw new Error("Test error")
    }

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>,
    )

    expect(screen.getByText("Something went wrong")).toBeDefined()
    expect(screen.getByText("We're sorry, but something went wrong.")).toBeDefined()
  })

  it("provides buttons to refresh and go to home page", () => {
    const ErrorComponent = () => {
      throw new Error("Test error")
    }

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>,
    )

    expect(screen.getByText("Refresh Page")).toBeDefined()
    expect(screen.getByText("Back to Home Page")).toBeDefined()
  })

  it("calls window.location.reload when refresh button is clicked", () => {
    const ErrorComponent = () => {
      throw new Error("Test error")
    }

    const mockReload = vi.fn()
    Object.defineProperty(window, "location", {
      value: { reload: mockReload },
      writable: true,
    })

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>,
    )

    fireEvent.click(screen.getByText("Refresh Page"))
    expect(mockReload).toHaveBeenCalled()
  })

  it("navigates to home page when back to home button is clicked", () => {
    const ErrorComponent = () => {
      throw new Error("Test error")
    }

    let hrefValue = ""
    Object.defineProperty(window, "location", {
      value: {
        set href(value: string) {
          hrefValue = value
        },
        get href() {
          return hrefValue
        },
      },
      writable: true,
    })

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>,
    )

    fireEvent.click(screen.getByText("Back to Home Page"))
    expect(window.location.href).toBe("/")
  })
})

