import React, { useState, useEffect } from "react";
import axios from "axios";
import { User, Phone, MapPin, Navigation, Star } from "lucide-react";

const UserAcceptedView = ({
  pickup,
  drop,
  selectedTime,
  customerData,
  selectedVehicle,
  userId,
}) => {
  const [timeToPickup, setTimeToPickup] = useState(() => {
    return parseInt(selectedVehicle?.arrivalTime || 5);
  });

  const [tripStatus, setTripStatus] = useState(null);

  useEffect(() => {
    const fetchActiveTrip = async () => {
      try {
        const response = await axios.get("/api/active-trips", {
          params: { userId },
        });

        if (!response.data.success || !response.data.data) {
          window.location.reload();
        } else {
          setTripStatus(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching active trip:", error);
      }
    };

    fetchActiveTrip();

    const timer = setInterval(() => {
      setTimeToPickup((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 60000);

    return () => clearInterval(timer);
  }, [userId, timeToPickup]);

  const formatLocation = (location = "") => {
    const parts = location.split(",");
    return parts.slice(0, 2).join(", ").trim() || "Location not specified";
  };

  const handleCall = () => {
    if (customerData?.phone) {
      window.open(`tel:${customerData.phone}`);
    }
  };

  const handleShowLocation = (location) => {
    if (location) {
      const encodedLocation = encodeURIComponent(location);
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`,
        "_blank"
      );
    }
  };

  const handleNavigateToPickup = () => {
    if (pickup) {
      const encodedPickup = encodeURIComponent(pickup);
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${encodedPickup}`,
        "_blank"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Customer Details Header */}
      <div className="bg-blue-600 text-white p-6 rounded-b-2xl shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white rounded-full overflow-hidden flex items-center justify-center">
              <User size={40} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold">
                {customerData?.name || "Passenger"}
              </h2>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Star size={20} className="text-yellow-300" />
            <span className="font-semibold">
              {customerData?.rating || "4.5"}
            </span>
          </div>
        </div>
      </div>

      {/* Trip Details */}
      <div className="p-6 bg-blue-50 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <MapPin className="text-green-600" size={24} />
            <div>
              <p className="text-xs text-gray-600">Pickup</p>
              <p className="font-semibold text-sm">{formatLocation(pickup)}</p>
            </div>
          </div>
          {selectedTime && (
            <div className="text-sm text-gray-600">
              Scheduled for: {selectedTime}
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <MapPin className="text-red-600" size={24} />
            <div>
              <p className="text-xs text-gray-600">Drop</p>
              <p className="font-semibold text-sm">{formatLocation(drop)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 grid grid-cols-2 gap-4 mt-auto">
        <button
          onClick={handleCall}
          className="bg-blue-50 text-blue-600 py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-100 transition"
          disabled={!customerData?.phone}
        >
          <Phone size={20} />
          <span>Call Passenger</span>
        </button>
        <button
          onClick={handleNavigateToPickup}
          className="bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition"
        >
          <Navigation size={20} />
          <span>Navigate to Pickup</span>
        </button>
      </div>

      {/* Location Details */}
      <div className="p-4 border-t grid grid-cols-2 gap-4">
        <button
          onClick={() => handleShowLocation(pickup)}
          className="bg-green-50 text-green-600 py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-green-100 transition"
        >
          <MapPin size={20} />
          <span>Show Pickup</span>
        </button>
        <button
          onClick={() => handleShowLocation(drop)}
          className="bg-red-50 text-red-600 py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-red-100 transition"
        >
          <MapPin size={20} />
          <span>Show Drop</span>
        </button>
      </div>
    </div>
  );
};

export default UserAcceptedView;
