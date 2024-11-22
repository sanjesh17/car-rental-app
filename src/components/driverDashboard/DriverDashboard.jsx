import React, { useState, useEffect, useRef } from "react";
import {
  Activity,
  Clock,
  MapPin,
  CreditCard,
  Star,
  Navigation,
  DollarSign,
  CheckCircle,
  XCircle,
} from "lucide-react";

const DriverDashboard = () => {
  const [earnings, setEarnings] = useState({
    total: 5420,
    daily: 780,
    weekly: 3200,
    monthly: 12500,
  });

  const [trips, setTrips] = useState([
    {
      id: 1,
      pickup: "Tech Innovation Park",
      dropoff: "Downtown Central",
      distance: 12.5,
      earnings: 45,
      status: "completed",
    },
    {
      id: 2,
      pickup: "University Campus",
      dropoff: "Business District",
      distance: 8.2,
      earnings: 32,
      status: "upcoming",
    },
  ]);

  const [bookingRequests, setBookingRequests] = useState([
    {
      id: 1,
      pickup: "Suburban Complex",
      dropoff: "Shopping Mall",
      distance: 7.3,
      estimatedEarnings: 28,
    },
    {
      id: 2,
      pickup: "Airport Terminals",
      dropoff: "City Center",
      distance: 15.6,
      estimatedEarnings: 52,
    },
  ]);

  const handleAcceptBooking = (request) => {
    setBookingRequests((prev) => prev.filter((req) => req.id !== request.id));
    setTrips((prev) => [
      ...prev,
      {
        ...request,
        status: "upcoming",
        id: prev.length + 1,
      },
    ]);
  };

  const CircularProgressBar = ({ value, max, color, size = 120 }) => {
    const percentage = (value / max) * 100;
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            className="text-gray-200 stroke-current"
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            stroke={color}
            strokeLinecap="round"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold">{percentage.toFixed(0)}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f7fa] to-[#e6eaf0] p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
            Driver Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <div className="bg-white shadow-md rounded-full p-3">
              <Star className="text-yellow-500" size={24} />
            </div>
            <div className="bg-white shadow-md rounded-full p-3">
              <Navigation className="text-blue-500" size={24} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Earnings Overview */}
          <div className="bg-white shadow-lg rounded-2xl p-6 col-span-1 flex flex-col items-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <DollarSign className="mr-2 text-green-500" size={20} />
              Earnings Overview
            </h2>
            <CircularProgressBar
              value={earnings.daily}
              max={1000}
              color="#10b981"
              size={200}
            />
            <div className="mt-4 text-center">
              <p className="text-2xl font-bold text-gray-800">
                ${earnings.daily}
              </p>
              <p className="text-sm text-gray-500">Daily Earnings</p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                <div>
                  <p className="text-sm font-medium">Weekly</p>
                  <p className="text-green-600">${earnings.weekly}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Monthly</p>
                  <p className="text-blue-600">${earnings.monthly}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Total</p>
                  <p className="text-purple-600">${earnings.total}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Requests */}
          <div className="bg-white shadow-lg rounded-2xl p-6 col-span-1">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <MapPin className="mr-2 text-indigo-500" size={20} />
              Booking Requests
            </h2>
            {bookingRequests.map((request) => (
              <div
                key={request.id}
                className="p-4 bg-gray-100 rounded-lg mb-4 flex items-center justify-between hover:bg-gray-200 transition"
              >
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {request.pickup} → {request.dropoff}
                  </p>
                  <p className="text-xs text-gray-500">
                    {request.distance} km | Est. ${request.estimatedEarnings}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAcceptBooking(request)}
                    className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
                  >
                    <CheckCircle size={20} />
                  </button>
                  <button className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition">
                    <XCircle size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Upcoming Trips */}
          <div className="bg-white shadow-lg rounded-2xl p-6 col-span-1">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <Clock className="mr-2 text-blue-500" size={20} />
              Upcoming Trips
            </h2>
            {trips
              .filter((trip) => trip.status === "upcoming")
              .map((trip) => (
                <div
                  key={trip.id}
                  className="p-4 bg-gray-100 rounded-lg mb-4 hover:bg-gray-200 transition"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {trip.pickup} → {trip.dropoff}
                      </p>
                      <p className="text-xs text-gray-500">
                        {trip.distance} km | Estimated ${trip.earnings}
                      </p>
                    </div>
                    <div className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                      Upcoming
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
