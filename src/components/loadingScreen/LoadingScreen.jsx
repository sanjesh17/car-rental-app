import React from 'react';
import { Car, MapPin } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
      {/* Animated car and path */}
      <div className="relative w-64 h-24 mb-8">
        <div className="absolute w-full h-0.5 bg-gray-200 top-1/2 transform -translate-y-1/2">
          <div className="absolute left-0 w-2 h-2 bg-green-500 rounded-full" />
          <div className="absolute right-0 w-2 h-2 bg-red-500 rounded-full" />
        </div>
        <Car 
          className="absolute text-indigo-600 animate-bounce-horizontal" 
          size={32}
        />
      </div>

      {/* Loading text */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Finding your driver...
        </h2>
        <p className="text-gray-600">
          Please wait while we connect you with a nearby driver
        </p>
      </div>

      {/* Loading animation */}
      <div className="mt-8 flex space-x-2">
        <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
};

export default LoadingScreen; 