import { renderHook } from '@testing-library/react-hooks';
import { describe, it, expect } from 'vitest';
import { useEventValidation } from '../useEventValidation';

describe('useEventValidation', () => {
  it('should validate a valid event', async () => {
    const { result } = renderHook(() => useEventValidation());
    const validEvent = {
      name: 'Valid Event',
      date: new Date(Date.now() + 86400000).toISOString(), // 1 day in the future
      time: '12:00',
      location: 'Valid Location',
      description: 'Valid description',
    };
    const isValid = await result.current.validateEvent(validEvent);
    expect(isValid).toBe(true);
  });

  it('should invalidate an event with a short name', async () => {
    const { result } = renderHook(() => useEventValidation());
    const invalidEvent = { name: 'No' };
    const isValid = await result.current.validateEvent(invalidEvent);
    expect(isValid).toBe(false);
  });

  // ...additional tests for other validation rules...
});
