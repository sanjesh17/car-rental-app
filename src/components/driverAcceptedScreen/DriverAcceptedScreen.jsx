import React from 'react';
import { User, Car, Phone, CheckCircle } from 'lucide-react';

const DriverAcceptedScreen = ({ driver }) => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-6">
      {/* Success Animation */}
      <div className="mb-8">
        <CheckCircle className="w-20 h-20 text-green-500 animate-bounce" />
      </div>

      {/* Success Message */}
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        Driver Accepted Your Ride!
      </h2>

      {/* Driver Details Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        {/* Driver Info */}
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-gray-500" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-gray-800">{driver.name}</h3>
            <div className="flex items-center text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-lg">★</span>
              ))}
              <span className="text-gray-600 ml-1">{driver.rating}</span>
            </div>
          </div>
        </div>

        {/* Vehicle Details */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center">
            <Car className="w-6 h-6 text-gray-500 mr-3" />
            <div>
              <p className="text-gray-800 font-medium">{driver.vehicle}</p>
              <p className="text-gray-500">{driver.vehicleNumber}</p>
            </div>
          </div>
        </div>

        {/* Contact Button */}
        <button 
          onClick={() => window.location.href = `tel:${driver.phone}`}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-indigo-700 transition-colors"
        >
          <Phone className="w-5 h-5" />
          <span>Contact Driver</span>
        </button>
      </div>

      {/* Ride Status */}
      <div className="mt-8 text-center text-gray-600">
        <p>Your driver is on the way</p>
        <p className="text-sm">Please be ready at the pickup location</p>
      </div>
    </div>
  );
};

export default DriverAcceptedScreen; 