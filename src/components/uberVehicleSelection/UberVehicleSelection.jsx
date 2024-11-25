import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Autoimage from "../../assets/Auto.png";
import Sedanimage from "../../assets/Sedan1.png";
import Xuvimage from "../../assets/Premier.png";
import {
  Clock,
  Users,
  Heart,
  ChevronDown,
  ChevronUp,
  Star,
  Loader2,
} from "lucide-react";
import LoadingScreen from "../loadingScreen/LoadingScreen";

const UberVehicleSelection = ({
  pickup,
  drop,
  selectedTime,
  onVehicleSelect,
  onBack,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("recommended");
  const [showAllOptions, setShowAllOptions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [ws, setWs] = useState(null);
  const [wsConnected, setWsConnected] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Add useEffect to handle scroll locking
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
      if (!document.querySelector(".modal-open")) {
        document.body.style.overflow = originalStyle;
      }
    };
  }, []);

  useEffect(() => {
    console.log("Connecting to WebSocket...");
    const websocket = new WebSocket("ws://localhost:5000");

    websocket.onopen = () => {
      console.log("WebSocket Connected");
      setWsConnected(true);

      websocket.send(
        JSON.stringify({
          type: "register",
          role: "user",
          userId: "user-123",
        })
      );
    };

    websocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Received message:", data);

        if (data.type === "driver_accepted") {
          console.log("Driver accepted:", data.driver);
          setSelectedDriver(data.driver);
          setWaitingForDriver(false);
        }
      } catch (error) {
        console.error("Error processing message:", error);
      }
    };

    websocket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    setWs(websocket);

    return () => {
      if (websocket && websocket.readyState === WebSocket.OPEN) {
        websocket.close();
      }
    };
  }, []);

  const categories = [
    { id: "recommended", label: "Recommended" },
    { id: "popular", label: "Popular" },
    { id: "premium", label: "Premium" },
  ];

  const vehicles = [
    {
      id: 1,
      type: "Rickshaw",
      category: "recommended",
      image: Autoimage,
      arrivalTime: "4",
      price: "349",
      description: "Affordable, compact rides",
      capacity: "4",
      promoted: true,
      rating: 4.8,
      discount: "30% off",
      popular: true,
    },
    {
      id: 2,
      type: "Sedan",
      category: "premium",
      image: Sedanimage,
      arrivalTime: "5",
      price: "489",
      description: "Comfortable sedans with top drivers",
      capacity: "4",
      rating: 4.9,
    },
    {
      id: 3,
      type: "XUV",
      category: "popular",
      image: Xuvimage,
      arrivalTime: "7",
      price: "599",
      description: "SUVs and mini-vans",
      capacity: "6",
      rating: 4.7,
    },
  ];

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleConfirmRide = () => {
    if (!selectedVehicle || !wsConnected) return;

    try {
      setWaitingForDriver(true);
      ws.send(
        JSON.stringify({
          type: "ride_request",
          pickup,
          drop,
          selectedTime,
          vehicle: selectedVehicle,
          userId: "user-123", // Replace with actual user ID
          estimatedPrice: selectedVehicle.price,
          requestId: Date.now().toString(),
        })
      );
    } catch (error) {
      console.error("Error sending ride request:", error);
      setWaitingForDriver(false);
      alert("Failed to send ride request. Please try again.");
    }
  };

  const filteredVehicles = vehicles.filter((v) =>
    selectedCategory === "recommended" ? true : v.category === selectedCategory
  );

  const displayVehicles = showAllOptions
    ? filteredVehicles
    : filteredVehicles.slice(0, 3);

  const SearchingOverlay = () => (
    <div className="fixed inset-0 z-[60] bg-white flex flex-col items-center justify-center">
      <Loader2 className="w-12 h-12 animate-spin text-black mb-4" />
      <h2 className="text-xl font-semibold mb-2">Finding your ride</h2>
      <p className="text-gray-500">Connecting you with nearby drivers...</p>
    </div>
  );

  const modalContent = (
    <div
      className={`fixed inset-0 z-50 overflow-hidden modal-open transition-opacity duration-300`}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />
      <div className={`relative flex flex-col h-full justify-end transition-transform duration-300 ${isVisible ? 'transform translate-y-0' : 'transform translate-y-full'}`}>
        <div className="bg-white rounded-t-2xl shadow-2xl p-6 md:p-10 w-full transition-transform transform">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              ←
            </button>
            <h1 className="font-semibold text-2xl">Choose a ride</h1>
            <div className="w-8" />
          </div>

          {/* Category Tabs */}
          <div className="flex gap-3 overflow-x-auto hide-scrollbar mb-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-1 p-3 rounded-xl transition-colors
                  ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Vehicle List - Show all vehicles without scrolling */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {displayVehicles.map((vehicle, index) => (
              <div
                key={vehicle.id}
                className={`py-4 border rounded-lg transition-colors ${
                  selectedVehicle?.id === vehicle.id
                    ? "bg-gray-100"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => handleVehicleSelect(vehicle)}
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-[84px] h-[84px] flex-shrink-0 overflow-hidden rounded-lg">
                    <img
                      src={vehicle.image}
                      alt={vehicle.type}
                      className="w-full h-full scale-[1.4]"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold">{vehicle.type}</span>
                      <div className="font-semibold">₹{vehicle.price}</div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {vehicle.arrivalTime} min
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={14} />
                        {vehicle.capacity}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={14} />
                        {vehicle.rating}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      {vehicle.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-4">
            <button
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                selectedVehicle
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              onClick={handleConfirmRide}
              disabled={!selectedVehicle}
            >
              {selectedVehicle
                ? `Confirm ${selectedVehicle.type}`
                : "Select a ride"}
            </button>
          </div>
        </div>
      </div>

      {/* Searching Overlay */}
      {isSearching && <SearchingOverlay />}
    </div>
  );

  return (
    <>
      {!waitingForDriver && (
        <div className={`fixed inset-0 z-40 transition-opacity duration-300`}>
          {createPortal(modalContent, document.body)}
        </div>
      )}

      {/* Loading Screen */}
      {waitingForDriver && <LoadingScreen />}
    </>
  );
};

export default UberVehicleSelection;
