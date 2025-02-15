import type React from "react"
import { useReducer, useEffect, useCallback } from "react"
import type { Event, EventState } from "../types/event"
import { eventReducer } from "../reducers/eventReducer"
import { useEventCache } from "../hooks/useEventCache"
import { useEventValidation } from "../hooks/useEventValidation"
import { EventContext } from "./EventContext"

const initialState: EventState = {
  events: [],
  loading: true,
  error: null,
  lastSync: Date.now(),
}

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, initialState)
  const { initializeCache, syncToCache } = useEventCache()
  const { validateEvent } = useEventValidation()

  useEffect(() => {
    const loadInitialEvents = async () => {
      try {
        const cachedEvents = await initializeCache()
        dispatch({ type: "LOAD_EVENTS", payload: cachedEvents })
      } catch (error) {
        console.error("Failed to load events:", error)
      }
    }
    loadInitialEvents()
  }, [initializeCache])

  useEffect(() => {
    if (!state.loading) {
      syncToCache(state.events)
    }
  }, [state.events, state.loading, syncToCache])

  useEffect(() => {
    const optimizationInterval = setInterval(() => {
      dispatch({ type: "OPTIMIZE_CACHE" })
    }, 300000)

    return () => clearInterval(optimizationInterval)
  }, [])

  const addEvent = useCallback(async (eventData: Omit<Event, "id" | "lastModified" | "version">) => {
    dispatch({
      type: "ADD_EVENT",
      payload: eventData,
    })
  }, [])

  const updateEvent = useCallback(async (event: Event) => {
    dispatch({
      type: "UPDATE_EVENT",
      payload: event,
    })
  }, [])

  const deleteEvent = useCallback((id: string) => {
    dispatch({
      type: "DELETE_EVENT",
      payload: id,
    })
  }, [])

  const markAsCompleted = useCallback((id: string) => {
    dispatch({
      type: "MARK_COMPLETED",
      payload: id,
    })
  }, [])

  const markAsPending = useCallback((id: string) => {
    dispatch({
      type: "MARK_PENDING",
      payload: id,
    })
  }, [])

  const value = {
    state,
    addEvent,
    updateEvent,
    deleteEvent,
    markAsCompleted,
    markAsPending,
    validateEvent,
  }

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>
}

