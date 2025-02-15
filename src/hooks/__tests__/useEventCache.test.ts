import { renderHook, act } from "@testing-library/react-hooks"
import { useEventCache } from "../useEventCache"
import { vi, describe, it, expect, beforeEach } from "vitest"
import { Event } from "../../types/event"

const mockGetItem = vi.fn()
const mockSetItem = vi.fn()

// Mock localStorage globally
vi.stubGlobal("localStorage", {
  getItem: mockGetItem,
  setItem: mockSetItem,
})

describe("useEventCache", () => {
  beforeEach(() => {
    mockGetItem.mockClear()
    mockSetItem.mockClear()
  })

  it("initializes cache with events", async () => {
    // Mock localStorage to return a cached event
    const mockEvents: Event[] = [{ id: "1", name: "Test Event", date: "2023-01-01", time: "10:00", location: "Test Location", description: "Test Description", status: "pending", lastModified: Date.parse("2023-01-01T10:00:00Z"), version: 1 }]

    mockGetItem.mockReturnValueOnce(JSON.stringify({ version: "1.0", data: mockEvents }))

    const { result } = renderHook(() => useEventCache())

    let events: Event[] = []
    await act(async () => {
      events = await result.current.initializeCache()
    })

    expect(events).toEqual(mockEvents)
    expect(mockGetItem).toHaveBeenCalledWith("event_planner_cache")
  })

  it("syncs events to cache", async () => {
    const { result } = renderHook(() => useEventCache())

    const eventData: Event[] = [
      {
        id: "1",
        name: "Test Event",
        date: "2023-01-01",
        time: "10:00",
        location: "Test Location",
        description: "Test Description",
        status: "pending",
        lastModified: Date.parse("2023-01-01T10:00:00Z"),
        version: 1
      }
    ]

    act(() => {
      result.current.syncToCache(eventData)
    })

    // Extract the actual stored data
    const storedData = JSON.parse(mockSetItem.mock.calls[0][1])

    expect(storedData).toMatchObject({
      version: "1.0",
      data: expect.any(Array), // Ensure data exists
      timestamp: expect.any(Number) // Ignore exact timestamp match
    })

    // Verify the event data inside the stored object
    expect(storedData.data).toEqual(eventData)
  })
})
