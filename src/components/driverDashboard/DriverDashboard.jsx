import React, { useState, useEffect } from "react";
import {
  Wallet,
  Star,
  Route,
  Clock,
  MapPin,
  Calendar,
  TrendingUp,
} from "lucide-react";

const DriverDashboard = () => {
  const [ws, setWs] = useState(null);
  const [bookingRequests, setBookingRequests] = useState([]);
  const [upcomingTrips, setUpcomingTrips] = useState([]);

  const analytics = {
    totalEarnings: 12500,
    todayEarnings: 2100,
    weeklyEarnings: 8400,
    monthlyEarnings: 32000,
    totalTrips: 45,
    rating: 4.8,
    completionRate: 95,
    onlineHours: 180,
  };

  useEffect(() => {
    const websocket = new WebSocket("ws://localhost:5000");

    websocket.onopen = () => {
      websocket.send(
        JSON.stringify({
          type: "register",
          role: "driver",
          driverId: "driver-123",
        })
      );
    };

    websocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === "new_ride_request") {
          setBookingRequests((prev) => {
            const requestExists = prev.some(
              (req) => req.requestId === data.rideDetails.requestId
            );
            if (!requestExists) {
              return [...prev, data.rideDetails];
            }
            return prev;
          });
        }
      } catch (error) {
        console.error("Error processing message:", error);
      }
    };

    setWs(websocket);

    return () => {
      if (websocket && websocket.readyState === WebSocket.OPEN) {
        websocket.close();
      }
    };
  }, []);

  const handleAcceptBooking = (request) => {
    if (!ws) return;

    ws.send(
      JSON.stringify({
        type: "driver_response",
        status: "accepted",
        userId: request.userId,
        requestId: request.requestId,
        driverInfo: {
          id: "driver-123",
          name: "John Doe",
          vehicle: "Toyota Camry",
          rating: 4.8,
          phone: "123-456-7890",
        },
      })
    );

    setBookingRequests((prev) =>
      prev.filter((req) => req.requestId !== request.requestId)
    );

    const newTrip = {
      id: request.requestId,
      pickup: request.pickup,
      dropoff: request.drop,
      time: request.selectedTime,
      status: "upcoming",
      customer: {
        id: request.userId,
        price: request.estimatedPrice,
      },
    };

    setUpcomingTrips((prev) => [...prev, newTrip]);
  };

  const StatCard = ({ icon, title, value, subtitle, color }) => (
    <div className="bg-white rounded-xl shadow-md p-4 flex items-center space-x-4">
      <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
      <div>
        <p className="text-xs text-gray-500 uppercase">{title}</p>
        <h3 className="text-lg font-bold text-gray-800">{value}</h3>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </div>
  );

  const ProgressBar = ({ value, color }) => (
    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
      <div
        className={`h-2 rounded-full ${color}`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen p-4 space-y-6">
      <header className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome, John Doe</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        </div>
      </header>

      {/* Earnings Grid */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          icon={<Wallet className="text-green-500" size={24} />}
          title="Today's Earnings"
          value={`₹${analytics.todayEarnings}`}
          subtitle={`${upcomingTrips.length} trips`}
          color="bg-green-100"
        />
        <StatCard
          icon={<TrendingUp className="text-purple-500" size={24} />}
          title="Monthly Earnings"
          value={`₹${analytics.monthlyEarnings}`}
          subtitle="This month"
          color="bg-purple-100"
        />
      </div>

      {/* Performance Metrics */}
      <div className="space-y-4">
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-3">
              <Star className="text-yellow-500" size={24} />
              <span className="font-semibold text-gray-700">Rating</span>
            </div>
            <span className="text-lg font-bold">{analytics.rating}/5.0</span>
          </div>
          <ProgressBar
            value={(analytics.rating / 5) * 100}
            color="bg-yellow-500"
          />
        </div>

        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-3">
              <Route className="text-green-500" size={24} />
              <span className="font-semibold text-gray-700">
                Completion Rate
              </span>
            </div>
            <span className="text-lg font-bold">
              {analytics.completionRate}%
            </span>
          </div>
          <ProgressBar value={analytics.completionRate} color="bg-green-500" />
        </div>
      </div>

      {/* Ride Requests */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          New Ride Requests
        </h2>
        {bookingRequests.length === 0 ? (
          <div className="bg-white rounded-xl p-4 text-center text-gray-500">
            No new ride requests
          </div>
        ) : (
          bookingRequests.map((request) => (
            <div
              key={request.requestId}
              className="bg-white rounded-xl shadow-md p-4 mb-4"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {request.vehicle.type}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Price: ₹{request.estimatedPrice}
                  </p>
                </div>
                <MapPin className="text-gray-400" size={20} />
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-sm text-gray-600">{request.pickup}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <p className="text-sm text-gray-600">{request.drop}</p>
                </div>
              </div>

              <button
                onClick={() => handleAcceptBooking(request)}
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Accept Request
              </button>
            </div>
          ))
        )}
      </section>

      {/* Upcoming Trips */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-800">Upcoming Trips</h2>
        {upcomingTrips.length === 0 ? (
          <div className="bg-white rounded-xl p-4 text-center text-gray-500">
            No upcoming trips
          </div>
        ) : (
          upcomingTrips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white rounded-xl shadow-md p-4 mb-4"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Trip #{trip.id.slice(-4)}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Price: ₹{trip.customer.price}
                  </p>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  {trip.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-sm text-gray-600">{trip.pickup}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <p className="text-sm text-gray-600">{trip.dropoff}</p>
                </div>
                <div className="text-sm text-gray-600 flex items-center space-x-2">
                  <Clock size={16} className="text-gray-400" />
                  <span>{trip.time}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default DriverDashboard;
