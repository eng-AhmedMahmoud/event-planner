import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, List, PlusCircle, Home } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Navigation Bar */}
      <nav className="bg-gray-800 shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center">
                <Calendar className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-xl font-semibold text-white">
                  Event Planner
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <div className="mx-auto">
          {children}
        </div>
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="bg-gray-800 shadow-lg fixed bottom-0 w-full border-t border-gray-700 z-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-around h-16">
            <Link
              to="/"
              className={`flex flex-col items-center justify-center w-full hover:text-blue-400 transition-colors ${
                isActive('/') ? 'text-blue-400' : 'text-gray-400'
              }`}
            >
              <Home className="h-6 w-6" />
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link
              to="/events"
              className={`flex flex-col items-center justify-center w-full hover:text-blue-400 transition-colors ${
                isActive('/events') ? 'text-blue-400' : 'text-gray-400'
              }`}
            >
              <List className="h-6 w-6" />
              <span className="text-xs mt-1">Events</span>
            </Link>
            <Link
              to="/add-event"
              className={`flex flex-col items-center justify-center w-full hover:text-blue-400 transition-colors ${
                isActive('/add-event') ? 'text-blue-400' : 'text-gray-400'
              }`}
            >
              <PlusCircle className="h-6 w-6" />
              <span className="text-xs mt-1">Add Event</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};