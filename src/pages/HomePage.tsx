import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { VideoBackground } from '@/components/ui/video-background';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-w-full min-h-screen overflow-hidden flex items-center justify-center p-4">
      <VideoBackground videoSrc="https://assets.mixkit.co/videos/22808/22808-720.mp4" />
      <div className="max-w-3xl w-full text-center space-y-8 z-20">
        <div className="flex justify-center">
          <Calendar className="h-20 w-20 text-blue-400" />
        </div>
        <h1 className="text-4xl font-bold text-white">Welcome to Event Planner</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Organize your events efficiently with our easy-to-use event management system.
          Create, manage, and track all your events in one place.
        </p>
        <div className="space-x-4">
          <button
            onClick={() => navigate('/events')}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            View Events
          </button>
          <button
            onClick={() => navigate('/add-event')}
            className="px-6 py-3 bg-gray-700 text-blue-400 rounded-md border border-blue-400 hover:bg-gray-600 transition-colors"
          >
            Create New Event
          </button>
        </div>
      </div>
    </div>
  );
};