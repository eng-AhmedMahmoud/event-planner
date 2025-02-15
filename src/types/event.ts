export interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  status: 'pending' | 'completed';
  lastModified: number;
  version: number;
}

export type EventAction =
  | { type: 'ADD_EVENT'; payload: Omit<Event, 'id' | 'lastModified' | 'version'> }
  | { type: 'UPDATE_EVENT'; payload: Event }
  | { type: 'DELETE_EVENT'; payload: string }
  | { type: 'MARK_COMPLETED'; payload: string }
  | { type: 'MARK_PENDING'; payload: string }
  | { type: 'LOAD_EVENTS'; payload: Event[] }
  | { type: 'OPTIMIZE_CACHE' };

export interface EventState {
  events: Event[];
  loading: boolean;
  error: string | null;
  lastSync: number;
}