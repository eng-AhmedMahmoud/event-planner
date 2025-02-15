import React from 'react';
import { EventList } from '@/components/EventList';

export const EventsPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Events</h1>
      <EventList />
    </div>
  );
};