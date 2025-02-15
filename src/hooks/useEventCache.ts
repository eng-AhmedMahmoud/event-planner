import { useCallback } from 'react';
import { Event } from '../types/event';

const CACHE_KEY = 'event_planner_cache';
const CACHE_VERSION = '1.0';

export const useEventCache = () => {
  const initializeCache = useCallback(async (): Promise<Event[]> => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) {
        return [];
      }

      const { version, data } = JSON.parse(cached);
      if (version !== CACHE_VERSION) {
        // Handle cache version mismatch
        localStorage.removeItem(CACHE_KEY);
        return [];
      }

      return data;
    } catch (error) {
      console.error('Cache initialization failed:', error);
      return [];
    }
  }, []);

  const syncToCache = useCallback(async (events: Event[]) => {
    try {
      const cacheData = {
        version: CACHE_VERSION,
        timestamp: Date.now(),
        data: events,
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Cache sync failed:', error);
    }
  }, []);

  return { initializeCache, syncToCache };
};