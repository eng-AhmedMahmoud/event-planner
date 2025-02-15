import { renderHook } from '@testing-library/react-hooks';
import { describe, it, expect, vi } from 'vitest';
import { EventContext } from '../../context/EventContext';
import { useEvents } from '../useEvents';

describe('useEvents', () => {
  it('should throw an error if used outside of EventProvider', () => {
    const { result } = renderHook(() => useEvents());
    expect(result.error).toEqual(new Error("useEvents must be used within an EventProvider"));
  });

  it('should return context value if used within EventProvider', () => {
    const mockContextValue = { 
      events: [], 
      addEvent: vi.fn(), 
      deleteEvent: vi.fn(),
      state: { events: [], loading: false, error: null, lastSync: Date.now() }, 
      updateEvent: vi.fn(), 
      markAsCompleted: vi.fn(), 
      markAsPending: vi.fn(), 
      validateEvent: vi.fn() 
    };
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <EventContext.Provider value={mockContextValue}>{children}</EventContext.Provider>
    );
    const { result } = renderHook(() => useEvents(), { wrapper });
    expect(result.current).toEqual(mockContextValue);
  });
});
