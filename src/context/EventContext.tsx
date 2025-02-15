import { createContext } from "react"
import type { Event, EventState } from "../types/event"

interface EventContextType {
  state: EventState
  addEvent: (event: Omit<Event, "id" | "lastModified" | "version">) => void
  updateEvent: (event: Event) => void
  deleteEvent: (id: string) => void
  markAsCompleted: (id: string) => void
  markAsPending: (id: string) => void
  validateEvent: (event: Partial<Event>) => Promise<boolean>
}

export const EventContext = createContext<EventContextType | undefined>(undefined)

