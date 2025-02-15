import { renderHook, act } from '@testing-library/react-hooks';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { useEventDelete } from '../useEventDelete';
import { useEvents } from '../useEvents';
import { toast } from 'react-hot-toast';

vi.mock('../useEvents');
vi.mock('react-hot-toast');

describe('useEventDelete', () => {
  const mockDeleteEvent = vi.fn();
  const mockToastSuccess = vi.fn();
  const mockToastError = vi.fn();

  beforeEach(() => {
    (useEvents as Mock).mockReturnValue({ deleteEvent: mockDeleteEvent });
    (toast.success as Mock).mockImplementation(mockToastSuccess);
    (toast.error as Mock).mockImplementation(mockToastError);
  });

  it('should handle delete event', () => {
    const { result } = renderHook(() => useEventDelete());
    act(() => {
      result.current.handleDelete('1', 'Test Event');
    });
    expect(result.current.DialogComponent).toBeDefined();
  });

  it('should confirm delete event', async () => {
    const { result } = renderHook(() => useEventDelete());
    act(() => {
      result.current.handleDelete('1', 'Test Event');
    });
    await act(async () => {
      await result.current.confirmDelete();
    });
    expect(mockDeleteEvent).toHaveBeenCalledWith('1');
    expect(mockToastSuccess).toHaveBeenCalledWith('Event deleted successfully!');
  });

  it('should cancel delete event', () => {
    const { result } = renderHook(() => useEventDelete());
    act(() => {
      result.current.handleDelete('1', 'Test Event');
    });
    act(() => {
      result.current.cancelDelete();
    });
    expect(result.current.DialogComponent).toBeDefined();
  });
});
