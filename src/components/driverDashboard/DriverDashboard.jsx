import React, { useState, useEffect, useRef } from "react";
import withFadeInAnimation from "../../hooks/withFadeInAnimation";
import "../../hooks/fadeinanimation.css";
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
  IndianRupee,
  TrendingUp,
  Car,
  Route,
  Calendar
} from "lucide-react";

const DriverDashboard = () => {
  const [ws, setWs] = useState(null);
  const [wsConnected, setWsConnected] = useState(false);
  const [bookingRequests, setBookingRequests] = useState([]);
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  
  // Analytics data (you should fetch this from your backend)
  const analytics = {
    totalEarnings: 12500,
    todayEarnings: 2100,
    weeklyEarnings: 8400,
    monthlyEarnings: 32000,
    totalTrips: 45,
    rating: 4.8,
    completionRate: 95,
    averagePerTrip: 750,
    onlineHours: 180
  };

  useEffect(() => {
    console.log("Connecting to WebSocket...");
    const websocket = new WebSocket('ws://localhost:5000');
    
    websocket.onopen = () => {
      console.log('WebSocket Connected');
      setWsConnected(true);
      
      websocket.send(JSON.stringify({
        type: 'register',
        role: 'driver',
        driverId: 'driver-123'
      }));
    };

    websocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Received message:', data);
        
        if (data.type === 'new_ride_request') {
          setBookingRequests(prev => {
            const requestExists = prev.some(req => req.requestId === data.rideDetails.requestId);
            if (!requestExists) {
              return [...prev, data.rideDetails];
            }
            return prev;
          });
        }
      } catch (error) {
        console.error('Error processing message:', error);
      }
    };

    websocket.onerror = (error) => {
      console.error('WebSocket Error:', error);
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

    ws.send(JSON.stringify({
      type: 'driver_response',
      status: 'accepted',
      userId: request.userId,
      requestId: request.requestId,
      driverInfo: {
        id: 'driver-123',
        name: 'John Doe',
        vehicle: 'Toyota Camry',
        rating: 4.8,
        phone: '123-456-7890'
      }
    }));

    // Remove from booking requests
    setBookingRequests(prev => 
      prev.filter(req => req.requestId !== request.requestId)
    );

    // Add to upcoming trips
    const newTrip = {
      id: request.requestId,
      pickup: request.pickup,
      dropoff: request.drop,
      time: request.selectedTime,
      status: 'upcoming',
      customer: {
        id: request.userId,
        price: request.estimatedPrice
      }
    };

    setUpcomingTrips(prev => [...prev, newTrip]);
  };

  return (
    <div className="p-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Today's Earnings */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm">Today's Earnings</h3>
            <IndianRupee className="text-green-500" size={20} />
          </div>
          <p className="text-2xl font-bold">₹{analytics.todayEarnings}</p>
          <div className="mt-2 text-sm text-gray-600">
            From {upcomingTrips.length} trips
          </div>
        </div>

        {/* Weekly Earnings */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm">Weekly Earnings</h3>
            <Calendar className="text-blue-500" size={20} />
          </div>
          <p className="text-2xl font-bold">₹{analytics.weeklyEarnings}</p>
          <div className="mt-2 text-sm text-gray-600">
            Last 7 days
          </div>
        </div>

        {/* Monthly Earnings */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm">Monthly Earnings</h3>
            <TrendingUp className="text-purple-500" size={20} />
          </div>
          <p className="text-2xl font-bold">₹{analytics.monthlyEarnings}</p>
          <div className="mt-2 text-sm text-gray-600">
            This month
          </div>
        </div>

        {/* Total Earnings */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm">Total Earnings</h3>
            <IndianRupee className="text-indigo-500" size={20} />
          </div>
          <p className="text-2xl font-bold">₹{analytics.totalEarnings}</p>
          <div className="mt-2 text-sm text-gray-600">
            Lifetime earnings
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Star className="text-yellow-500" size={24} />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm">Rating</h3>
              <p className="text-xl font-bold">{analytics.rating}/5.0</p>
            </div>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className="h-2 bg-yellow-500 rounded-full" 
              style={{ width: `${(analytics.rating/5)*100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Route className="text-green-500" size={24} />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm">Completion Rate</h3>
              <p className="text-xl font-bold">{analytics.completionRate}%</p>
            </div>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className="h-2 bg-green-500 rounded-full" 
              style={{ width: `${analytics.completionRate}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Clock className="text-blue-500" size={24} />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm">Online Hours</h3>
              <p className="text-xl font-bold">{analytics.onlineHours}h</p>
            </div>
          </div>
          <div className="text-sm text-gray-600 mt-2">
            Average {(analytics.onlineHours/30).toFixed(1)}h per day
          </div>
        </div>
      </div>

      {/* Requests and Upcoming Trips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Booking Requests Section */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            New Ride Requests
          </h2>
          
          {bookingRequests.length === 0 ? (
            <p className="text-gray-500">No new requests</p>
          ) : (
            bookingRequests.map((request) => (
              <div 
                key={request.requestId}
                className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200"
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
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 bg-green-500 rounded-full"></div>
                    <p className="ml-2 text-sm text-gray-600">{request.pickup}</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 bg-red-500 rounded-full"></div>
                    <p className="ml-2 text-sm text-gray-600">{request.drop}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleAcceptBooking(request)}
                  className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Accept Request
                </button>
              </div>
            ))
          )}
        </div>

        {/* Upcoming Trips Section */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Upcoming Trips
          </h2>
          
          {upcomingTrips.length === 0 ? (
            <p className="text-gray-500">No upcoming trips</p>
          ) : (
            upcomingTrips.map((trip) => (
              <div 
                key={trip.id}
                className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200"
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
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {trip.status}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 bg-green-500 rounded-full"></div>
                    <p className="ml-2 text-sm text-gray-600">{trip.pickup}</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 bg-red-500 rounded-full"></div>
                    <p className="ml-2 text-sm text-gray-600">{trip.dropoff}</p>
                  </div>
                  <div className="text-sm text-gray-600">
                    Time: {trip.time}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
