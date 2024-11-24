import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Autoimage from "../../assets/Auto.jpg";
import Sedanimage from "../../assets/Sedan.png";
import Xuvimage from "../../assets/Xuv.avif";
import {
  Clock,
  Users,
  Heart,
  ChevronDown,
  ChevronUp,
  Star,
  Loader2,
} from "lucide-react";
import LoadingScreen from '../loadingScreen/LoadingScreen';

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
    const websocket = new WebSocket('ws://localhost:5000');
    
    websocket.onopen = () => {
      console.log('WebSocket Connected');
      setWsConnected(true);
      
      websocket.send(JSON.stringify({
        type: 'register',
        role: 'user',
        userId: 'user-123'
      }));
    };

    websocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Received message:', data);
        
        if (data.type === 'driver_accepted') {
          console.log('Driver accepted:', data.driver);
          setSelectedDriver(data.driver);
          setWaitingForDriver(false);
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

  const categories = [
    { id: "recommended", label: "Recommended" },
    { id: "popular", label: "Popular" },
    { id: "premium", label: "Premium" },
    { id: "economy", label: "Economy" },
  ];

  const vehicles = [
    {
      id: 1,
      type: "UberGo",
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
      type: "Premier",
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
      type: "UberXL",
      category: "popular",
      image: Xuvimage,
      arrivalTime: "7",
      price: "599",
      description: "SUVs and mini-vans",
      capacity: "6",
      rating: 4.7,
    },
    {
      id: 4,
      type: "Auto",
      category: "economy",
      image: "/api/placeholder/84/84",
      arrivalTime: "3",
      price: "189",
      description: "Auto rickshaw rides",
      capacity: "3",
      rating: 4.6,
    },
  ];

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleConfirmRide = () => {
    if (!selectedVehicle || !wsConnected) return;
    
    try {
      setWaitingForDriver(true);
      ws.send(JSON.stringify({
        type: 'ride_request',
        pickup,
        drop,
        selectedTime,
        vehicle: selectedVehicle,
        userId: 'user-123', // Replace with actual user ID
        estimatedPrice: selectedVehicle.price,
        requestId: Date.now().toString()
      }));
    } catch (error) {
      console.error('Error sending ride request:', error);
      setWaitingForDriver(false);
      alert('Failed to send ride request. Please try again.');
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
    <div className="fixed inset-0 z-50 overflow-hidden modal-open">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />
      <div className="relative h-full w-full flex items-end sm:items-center justify-center">
        <div className="bg-white w-full h-[85vh] sm:h-auto sm:max-h-[85vh] sm:w-[560px] sm:rounded-xl overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 bg-white z-10 px-4 py-3 border-b">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                ←
              </button>
              <div>
                <h1 className="font-semibold text-2xl">Choose a ride</h1>
                <p className="text-sm text-gray-500">
                  {selectedTime === "now" ? "Now" : selectedTime} •{" "}
                  {pickup.split(",")[0]} to {drop.split(",")[0]}
                </p>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="mt-4 flex gap-3 overflow-x-auto hide-scrollbar">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap text-sm transition-colors
                    ${
                      selectedCategory === category.id
                        ? "bg-black text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Vehicle List */}
          <div className="overflow-y-auto h-[calc(100%-180px)] px-4">
            {displayVehicles.map((vehicle, index) => (
              <div
                key={vehicle.id}
                className={`py-4 ${
                  index !== displayVehicles.length - 1 ? "border-b" : ""
                }`}
              >
                <div
                  className={`flex items-center gap-4 cursor-pointer p-2 rounded-lg transition-colors ${
                    selectedVehicle?.id === vehicle.id
                      ? "bg-gray-100"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => handleVehicleSelect(vehicle)}
                >
                  {/* Vehicle Image */}
                  <div className="relative w-[84px] h-[84px] flex-shrink-0">
                    <img
                      src={vehicle.image}
                      alt={vehicle.type}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    {vehicle.discount && (
                      <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-2 py-1 rounded-tr-lg rounded-bl-lg">
                        {vehicle.discount}
                      </div>
                    )}
                  </div>

                  {/* Vehicle Info */}
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{vehicle.type}</span>
                      {vehicle.popular && (
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                          Popular
                        </span>
                      )}
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

                  {/* Price */}
                  <div className="text-right">
                    <div className="font-semibold">₹{vehicle.price}</div>
                    <button className="text-sm text-gray-400 hover:text-black">
                      <Heart size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Show More/Less Button */}
            {filteredVehicles.length > 3 && (
              <button
                onClick={() => setShowAllOptions(!showAllOptions)}
                className="w-full py-4 text-center text-gray-500 hover:text-black flex items-center justify-center gap-1"
              >
                {showAllOptions ? (
                  <>
                    See less options <ChevronUp size={16} />
                  </>
                ) : (
                  <>
                    See more options <ChevronDown size={16} />
                  </>
                )}
              </button>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t px-4 py-3">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
              <span>Cash</span>
              <button className="flex items-center gap-1 hover:text-black">
                Change <ChevronDown size={14} />
              </button>
            </div>
            <button
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                selectedVehicle
                  ? "bg-black text-white hover:bg-gray-800"
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
        <div className="fixed inset-0 bg-white z-40">
          {createPortal(modalContent, document.body)}
        </div>
      )}

      {/* Loading Screen */}
      {waitingForDriver && <LoadingScreen />}
    </>
  );
};

export default UberVehicleSelection;
