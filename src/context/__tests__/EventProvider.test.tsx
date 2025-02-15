import { render, screen, waitFor } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { EventProvider } from "../../context/EventProvider"
import { EventContext } from "../../context/EventContext"
import { vi } from "vitest"

const mockInitializeCache = vi.fn().mockResolvedValue([])
const mockSyncToCache = vi.fn()
const mockValidateEvent = vi.fn()

vi.mock("../../hooks/useEventCache", () => ({
  useEventCache: () => ({
    initializeCache: mockInitializeCache,
    syncToCache: mockSyncToCache,
  }),
}))

vi.mock("../../hooks/useEventValidation", () => ({
  useEventValidation: () => ({
    validateEvent: mockValidateEvent,
  }),
}))

describe("EventProvider", () => {
  it("loads initial events and provides context", async () => {
    render(
      <EventProvider>
        <EventContext.Consumer>
          {(value) => (
            <>
              {value?.state.loading ? "Loading..." : "Loaded"}
            </>
          )}
        </EventContext.Consumer>
      </EventProvider>
    )

    expect(screen.getByText("Loading...")).toBeInTheDocument()
    await waitFor(() => expect(screen.getByText("Loaded")).toBeInTheDocument())
    await waitFor(() => expect(screen.getByText("Loaded")).toBeInTheDocument())
    expect(mockSyncToCache).toHaveBeenCalled()
  })

  it("syncs events to cache after loading", async () => {
    render(
      <EventProvider>
        <EventContext.Consumer>
          {(value) => (
            <div>
              {value?.state.loading ? "Loading..." : "Loaded"}
            </div>
          )}
        </EventContext.Consumer>
      </EventProvider>
    )

    await waitFor(() => expect(screen.getByText("Loaded")).toBeInTheDocument())
    expect(mockSyncToCache).toHaveBeenCalled()
  })
})
