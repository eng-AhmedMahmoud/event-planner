import { useCallback } from 'react';
import { Event } from '../types/event';

export const useEventValidation = () => {
  const validateEvent = useCallback(async (event: Partial<Event>): Promise<boolean> => {
    try {
      // Name validation
      if (!event.name || event.name.trim().length < 3) {
        throw new Error('Event name must be at least 3 characters long');
      }

      // Date validation
      if (event.date) {
        const eventDate = new Date(event.date);
        const now = new Date();
        if (eventDate < now) {
          throw new Error('Event date cannot be in the past');
        }
      }

      // Time validation
      if (event.time) {
        const [hours, minutes] = event.time.split(':').map(Number);
        if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
          throw new Error('Invalid time format');
        }
      }

      // Location validation
      if (!event.location || event.location.trim().length < 3) {
        throw new Error('Location must be at least 3 characters long');
      }

      // Description validation
      if (event.description && event.description.trim().length > 500) {
        throw new Error('Description cannot exceed 500 characters');
      }

      return true;
    } catch (error) {
      console.error('Event validation failed:', error);
      return false;
    }
  }, []);

  return { validateEvent };
};