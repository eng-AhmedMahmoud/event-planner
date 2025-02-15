import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-w-full min-h-screen overflow-hidden flex items-center justify-center p-4">
      <div className="max-w-3xl w-full text-center space-y-8 z-20">
        <div className="flex justify-center">
          <AlertTriangle className="h-20 w-20 text-red-500" />
        </div>
        <h1 className="text-4xl font-bold text-white">Oops! Page Not Found</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          The page you're looking for doesn't exist or has been moved. 
        </p>
        <div className="space-x-4">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Home
          </button>
          <button
            onClick={() => navigate("/events")}
            className="px-6 py-3 bg-gray-700 text-blue-400 rounded-md border border-blue-400 hover:bg-gray-600 transition-colors"
          >
            View Events
          </button>
        </div>
      </div>
    </div>
  );
};
