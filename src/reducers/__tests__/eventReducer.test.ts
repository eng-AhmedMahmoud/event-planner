import { describe, it, expect, vi, beforeAll } from 'vitest';
import { eventReducer } from '../eventReducer';
import { EventState, EventAction } from '@/types/event';

describe('eventReducer', () => {
  const initialState: EventState = {
    events: [],
    loading: true,
    error: null,
    lastSync: 0,
  };

  beforeAll(() => {
    vi.mock('uuid', () => ({
      v4: vi.fn(() => 'mock-uuid-1234'),
    }));
  });

  it('should add an event', () => {
    const action: EventAction = {
      type: 'ADD_EVENT',
      payload: { name: 'Test Event', date: new Date().toISOString(), time: '12:00', location: 'Location', description: 'Description', status: 'pending' },
    };

    const state = eventReducer(initialState, action);
    expect(state.events.length).toBe(1);
    expect(state.events[0].name).toBe('Test Event');
  });

  it('should update an event', () => {
    const initialStateWithEvent: EventState = {
      ...initialState,
      events: [{ id: '1', name: 'Test Event', status: 'pending', lastModified: 0, version: 1, date: new Date().toISOString(), time: '12:00', location: 'Location', description: 'Description' }],
    };

    const action: EventAction = {
      type: 'UPDATE_EVENT',
      payload: { id: '1', name: 'Updated Event', status: 'pending', lastModified: 0, version: 1, date: new Date().toISOString(), time: '12:00', location: 'Location', description: 'Description' },
    };

    const state = eventReducer(initialStateWithEvent, action);
    expect(state.events[0].name).toBe('Updated Event');
  });

  it('should delete an event', () => {
    const initialStateWithEvent: EventState = {
      ...initialState,
      events: [{ id: '1', name: 'Test Event', status: 'pending', lastModified: 0, version: 1, date: new Date().toISOString(), time: '12:00', location: 'Location', description: 'Description' }],
    };

    const action: EventAction = {
      type: 'DELETE_EVENT',
      payload: '1',
    };

    const state = eventReducer(initialStateWithEvent, action);
    expect(state.events.length).toBe(0);
  });

  it('should mark an event as completed', () => {
    const initialStateWithEvent: EventState = {
      ...initialState,
      events: [{ id: '1', name: 'Test Event', status: 'pending', lastModified: 0, version: 1, date: new Date().toISOString(), time: '12:00', location: 'Location', description: 'Description' }],
    };

    const action: EventAction = {
      type: 'MARK_COMPLETED',
      payload: '1',
    };

    const state = eventReducer(initialStateWithEvent, action);
    expect(state.events[0].status).toBe('completed');
  });

  it('should mark an event as pending', () => {
    const initialStateWithEvent: EventState = {
      ...initialState,
      events: [{ id: '1', name: 'Test Event', status: 'completed', lastModified: 0, version: 1, date: new Date().toISOString(), time: '12:00', location: 'Location', description: 'Description' }],
    };

    const action: EventAction = {
      type: 'MARK_PENDING',
      payload: '1',
    };

    const state = eventReducer(initialStateWithEvent, action);
    expect(state.events[0].status).toBe('pending');
  });

  it('should load events', () => {
    const action: EventAction = {
      type: 'LOAD_EVENTS',
      payload: [{ id: '1', name: 'Test Event', status: 'pending', lastModified: 0, version: 1, date: new Date().toISOString(), time: '12:00', location: 'Location', description: 'Description' }],
    };

    const state = eventReducer(initialState, action);
    expect(state.events.length).toBe(1);
  });

  it('should optimize cache', () => {
    const initialStateWithEvents: EventState = {
      ...initialState,
      events: Array.from({ length: 200 }, (_, i) => ({
        id: `${i}`,
        name: `Event ${i}`,
        status: 'pending',
        lastModified: i,
        version: 1,
        date: new Date().toISOString(),
        time: '12:00',
        location: 'Location',
        description: 'Description',
      })),
    };

    const action: EventAction = {
      type: 'OPTIMIZE_CACHE',
    };

    const state = eventReducer(initialStateWithEvents, action);
    expect(state.events.length).toBe(100);
  });
});
