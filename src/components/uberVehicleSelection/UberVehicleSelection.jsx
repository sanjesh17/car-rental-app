import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Autoimage from "../../assets/Auto.png";
import Sedanimage from "../../assets/Sedan1.png";
import Xuvimage from "../../assets/Premier.png";
import { useSpring, animated } from "react-spring";
import {
  Clock,
  Users,
  Heart,
  ChevronDown,
  ChevronUp,
  Star,
  Loader2,
  MapPin,
} from "lucide-react";
import "./searching.css";
import DriverAcceptedView from "../driverAcceptedView/DriverAcceptedView";
import { useAuth } from "../../authUtils";

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
  const [isAccepted, setAccepted] = useState(false);
  const [driverData, setDriverData] = useState("");
  const [userData, setUserData] = useState("");

  const { user } = useAuth();
  useEffect(() => {
    setUserData(user);
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
          userId: userData,
        })
      );
    };

    websocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Received message:", data);

        if (data.type === "driver_response" && data.status === "accepted") {
          console.log("Driver accepted:", data);
          setWaitingForDriver(false);
          setAccepted(true);
          setDriverData(data);
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
  }, [userData]);

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
          userId: userData,
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

  const SearchingOverlay = ({ pickup, drop }) => {
    // Animation for entry fade-in
    const fadeStyles = useSpring({
      from: { opacity: 0, transform: "scale(0.9)" },
      to: { opacity: 1, transform: "scale(1)" },
      config: { duration: 300 },
    });

    return (
      <animated.div
        style={fadeStyles}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md"
      >
        <div className="bg-white w-[95%] max-w-sm sm:max-w-md md:max-w-lg rounded-xl shadow-lg p-6 sm:p-8 relative text-center">
          <div className="absolute -top-12 -left-12 w-36 h-36 bg-blue-200 opacity-30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-300 opacity-20 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <div className="mb-6">
              <Loader2 className="w-14 h-14 animate-spin text-blue-500 mx-auto" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Searching for a Driver
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2">
              Connecting you with nearby drivers. Please wait a moment...
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 shadow-sm mt-6 text-left">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-700">From</span>
              <span className="text-gray-600 truncate max-w-[180px] text-right">
                {pickup}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">To</span>
              <span className="text-gray-600 truncate max-w-[180px] text-right">
                {drop}
              </span>
            </div>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-2">
            <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse"></span>
            <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse animation-delay-200"></span>
            <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse animation-delay-400"></span>
          </div>
        </div>
      </animated.div>
    );
  };

  const modalContent = (
    <div
      className={`fixed inset-0 z-50 overflow-hidden modal-open transition-opacity duration-300`}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />
      <div
        className={`relative flex flex-col h-full justify-end transition-transform duration-300 ${
          isVisible ? "transform translate-y-0" : "transform translate-y-full"
        }`}
      >
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {displayVehicles.map((vehicle, index) => (
              <div
                key={vehicle.id}
                className={`py-4 px-3 border rounded-lg transition-colors ${
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
    </div>
  );

  return (
    <>
      {isAccepted ? (
        <DriverAcceptedView
          pickup={pickup}
          drop={drop}
          selectedTime={selectedTime}
          driverData={driverData}
          selectedVehicle={selectedVehicle}
        />
      ) : (
        <>
          {!waitingForDriver && (
            <div
              className={`fixed inset-0 z-40 transition-opacity duration-300`}
            >
              {createPortal(modalContent, document.body)}
            </div>
          )}

          {waitingForDriver && <SearchingOverlay pickup={pickup} drop={drop} />}
        </>
      )}
    </>
  );
};

export default UberVehicleSelection;
