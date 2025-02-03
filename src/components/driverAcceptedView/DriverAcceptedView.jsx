import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Car,
  User,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Navigation,
  Star,
} from "lucide-react";

const DriverAcceptedView = ({
  pickup,
  drop,
  selectedTime,
  driverData,
  selectedVehicle,
}) => {
  const [timeToPickup, setTimeToPickup] = useState(() => {
    return parseInt(selectedVehicle?.arrivalTime || 5);
  });
  const [showCancelPopup, setShowCancelPopup] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeToPickup((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 60000);

    return () => clearInterval(timer);
  }, [timeToPickup]);

  const formatLocation = (location = "") => {
    const parts = location.split(",");
    return parts.slice(0, 2).join(", ").trim() || "Location not specified";
  };

  const handleCall = () => {
    if (driverData?.phone) {
      window.open(`tel:${driverData.phone}`);
    }
  };

  const handleTrackDriver = () => {
    console.log("Tracking driver location");
  };

  const confirmCancel = async (userId) => {
    if (!userId) {
      alert("User ID is required to delete a trip.");
      return;
    }

    try {
      const response = await axios.delete("/api/active-trips", {
        params: { userId },
      });

      if (response.data.success) {
        alert(response.data.message || "Trip deleted successfully.");
      } else {
        alert(response.data.message || "Failed to delete the trip.");
      }
    } catch (error) {
      console.error("Error deleting trip:", error);
      alert("An error occurred while deleting the trip.");
    }

    setShowCancelPopup(false);
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Driver Details Header */}
      <div className="bg-blue-600 text-white p-6 rounded-b-2xl shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white rounded-full overflow-hidden flex items-center justify-center">
              <User size={40} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold">
                {driverData?.driverInfo.name || "Driver"}
              </h2>
              <div className="flex items-center space-x-2 text-sm">
                <Car size={16} className="text-blue-200" />
                <span>{selectedVehicle?.type || "Vehicle"}</span>
                {driverData?.driverInfo.vehicle && (
                  <span>({driverData.driverInfo.vehicle})</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Star size={20} className="text-yellow-300" />
            <span className="font-semibold">
              {driverData?.driverInfo.rating || "4.5"}
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

      {/* Arrival Estimation */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Clock className="text-blue-600" size={24} />
            <div>
              <p className="text-gray-600">Estimated Arrival</p>
              <p className="text-xl font-bold text-blue-800">
                {timeToPickup} mins
              </p>
            </div>
          </div>
          <div>
            <p className="text-gray-600 text-right">Fare</p>
            <p className="text-xl font-bold text-green-800">
              ₹{selectedVehicle?.price || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 grid grid-cols-2 gap-4 mt-auto">
        <button
          onClick={handleCall}
          className="bg-blue-50 text-blue-600 py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-100 transition"
          disabled={!driverData?.phone}
        >
          <Phone size={20} />
          <span>Call Driver</span>
        </button>
        <button
          onClick={handleTrackDriver}
          className="bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition"
        >
          <Navigation size={20} />
          <span>Track Ride</span>
        </button>
      </div>

      {/* Cancel Ride Button */}
      <div className="p-4 border-t">
        <button
          onClick={() => setShowCancelPopup(true)}
          className="w-full bg-red-50 text-red-600 py-3 rounded-lg hover:bg-red-100 transition"
        >
          Cancel Ride
        </button>
      </div>

      {/* Cancel Confirmation Popup */}
      {showCancelPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 space-y-4 shadow-xl">
            <h3 className="text-xl font-bold text-gray-800">
              Confirm Cancellation
            </h3>
            <p className="text-gray-600">
              Are you sure you want to cancel the ride?
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => confirmCancel(driverData?.userId)}
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
              >
                Yes, Cancel
              </button>
              <button
                onClick={() => setShowCancelPopup(false)}
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
              >
                No, Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverAcceptedView;
