import { Event, EventAction, EventState } from '../types/event';

export const eventReducer = (state: EventState, action: EventAction): EventState => {
  switch (action.type) {
    case 'ADD_EVENT': {
      const newEvent: Event = {
        ...action.payload,
        id: crypto.randomUUID(),
        status: "pending",
        lastModified: Date.now(),
        version: 1,
      };
      return {
        ...state,
        events: [...state.events, newEvent],  
        lastSync: Date.now(),
      };
    }

    case 'UPDATE_EVENT':
      return {
        ...state,
        events: state.events.map(event =>
          event.id === action.payload.id
            ? {
              ...action.payload,
              lastModified: Date.now(),
              version: event.version + 1,
            }
            : event
        ),
        lastSync: Date.now(),
      };

    case 'DELETE_EVENT':
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.payload),
        lastSync: Date.now(),
      };

    case 'MARK_COMPLETED':
      return {
        ...state,
        events: state.events.map(event =>
          event.id === action.payload
            ? {
              ...event,
              status: 'completed',
              lastModified: Date.now(),
              version: event.version + 1,
            }
            : event
        ),
        lastSync: Date.now(),
      };

    case 'MARK_PENDING':
      return {
        ...state,
        events: state.events.map(event =>
          event.id === action.payload
            ? {
              ...event,
              status: 'pending',
              lastModified: Date.now(),
              version: event.version + 1,
            }
            : event
        ),
        lastSync: Date.now(),
      };

    case 'LOAD_EVENTS':
      return {
        ...state,
        events: action.payload,
        loading: false,
        lastSync: Date.now(),
      };

    case 'OPTIMIZE_CACHE':
      // Sort events by lastModified and limit cache size
      {
        const sortedEvents = [...state.events].sort(
          (a, b) => b.lastModified - a.lastModified
        );
        return {
          ...state,
          events: sortedEvents.slice(0, 100), // Limit to 100 most recent events
          lastSync: Date.now(),
        };
      }

    default:
      return state;
  }
};