import React, { useState, useCallback } from "react";
import Navigation from "../Navigation/Navigation";
import axios from "axios";
import withFadeInAnimation from "../../hooks/withFadeInAnimation";
import "../../hooks/fadeinanimation.css";
import UberVehicleSelection from "../uberVehicleSelection/UberVehicleSelection";
import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";
import {
  MapPin,
  Clock,
  RotateCw,
  Package,
  Car,
  Calendar,
  ArrowRight,
} from "lucide-react";
import carBg from "../../assets/bg.png";

const LandingSection = () => {
  const [activeTrip, setActiveTrip] = useState("quickTrip");
  const [selectedTimeOption, setSelectedTimeOption] = useState("now");
  const [withDriverMode, setWithDriverMode] = useState("withDriver");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropSuggestions, setDropSuggestions] = useState([]);
  const [showVehicleSelection, setShowVehicleSelection] = useState(false);
  const [driverMode, setDriverMode] = useState("withDriver");
  const navigate = useNavigate();

  const debouncedLocationSearch = useCallback(
    debounce(async (query, setter) => {
      if (query.length < 3) return;

      try {
        const response = await axios.get(
          `https://api.olamaps.io/places/v1/autocomplete`,
          {
            params: {
              input: query,
              api_key: process.env.REACT_APP_OLA_MAPS_API_KEY,
            },
            headers: {
              "X-Request-Id": crypto.randomUUID(),
            },
          }
        );

        if (response.data.status === "ok") {
          setter(response.data.predictions || []);
        } else {
          setter([]);
        }
      } catch (error) {
        console.error("Error fetching location data:", error);
        setter([]);
      }
    }, 300),
    []
  );

  // Update the suggestion rendering to match the API response format
  const renderLocationSuggestions = (
    suggestions,
    setValue,
    clearSuggestions
  ) => (
    <ul className="absolute bg-white shadow-lg rounded-lg mt-1 w-full max-h-48 overflow-y-auto z-50 border border-gray-100">
      {suggestions.map((place) => (
        <li
          key={place.place_id}
          className="p-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
          onClick={() => {
            setValue(place.description);
            clearSuggestions([]);
          }}
        >
          <div className="font-medium text-gray-800">
            {place.structured_formatting?.main_text}
          </div>
          <div className="text-sm text-gray-500">
            {place.structured_formatting?.secondary_text}
          </div>
        </li>
      ))}
    </ul>
  );

  // Generate time slots for scheduling
  const generateTimeSlots = () => {
    const currentTime = new Date();
    const timeSlots = ["now"];

    // Add Single Trip slots for next 4 hours
    for (let i = 1; i <= 4; i++) {
      const futureTime = new Date(currentTime);
      futureTime.setHours(currentTime.getHours() + i);
      const hours = futureTime.getHours();
      const minutes = futureTime.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

      timeSlots.push(`${formattedHours}:${formattedMinutes} ${ampm}`);
    }

    return timeSlots;
  };

  // Update the renderBookingInputs for roundTrip
  const renderBookingInputs = () => {
    const commonInputLayout = (children) => (
      <div className="space-y-6">
        {/* Location Inputs */}
        <div className="grid grid-cols-1 gap-4">
          {/* Pickup Location */}
          <div className="relative">
            <h4 className="font-semibold text-lg mb-2.5">Pick-up Location</h4>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Enter City, Airport or Station"
                value={pickup}
                onChange={(e) => {
                  setPickup(e.target.value);
                  debouncedLocationSearch(e.target.value, setPickupSuggestions);
                }}
                className="w-full pl-10 pr-4 py-3.5 rounded-xl border-2 border-gray-200 
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {renderLocationSuggestions(
                pickupSuggestions,
                setPickup,
                setPickupSuggestions
              )}
            </div>
          </div>

          {/* Drop Location */}
          <div className="relative">
            <h4 className="font-semibold text-lg mb-2.5">Drop Location</h4>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Enter City, Airport or Station"
                value={drop}
                onChange={(e) => {
                  setDrop(e.target.value);
                  debouncedLocationSearch(e.target.value, setDropSuggestions);
                }}
                className="w-full pl-10 pr-4 py-3.5 rounded-xl border-2 border-gray-200 
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {renderLocationSuggestions(
                dropSuggestions,
                setDrop,
                setDropSuggestions
              )}
            </div>
          </div>
        </div>

        {/* Additional Fields */}
        {children}
      </div>
    );

    switch (activeTrip) {
      case "quickTrip":
        return commonInputLayout(null);

      case "roundTrip":
      case "Single Trip":
      case "Goods":
        return commonInputLayout(
          <div className="space-y-4">
            {/* Date and Time Selection */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <h4 className="font-semibold text-lg mb-2.5">
                  Pick-up Date & Time
                </h4>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="date"
                      className="w-[170px] md:w-full pl-10 pr-4 py-3.5 rounded-xl border-2 border-gray-200 
                               focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="relative flex-1">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="time"
                      className="w-[145px] md:w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 
                               focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {activeTrip === "roundTrip" && (
                <div>
                  <h4 className="font-semibold text-lg mb-2.5">
                    Return Date & Time
                  </h4>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="date"
                        className="w-[170px] md:w-full pl-10 pr-4 py-3.5 rounded-xl border-2 border-gray-200 
                                 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="relative flex-1">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="time"
                        className="w-[145px] md:w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 
                                 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Driver Mode Selection for Round Trip */}
            {activeTrip === "roundTrip" && (
              <div>
                <h4 className="font-semibold text-lg mb-2.5">Driver Mode</h4>
                <div className="flex gap-3">
                  <button
                    className={`flex-1 p-3 rounded-xl flex items-center justify-center gap-2 
                               transition-all duration-200 ${
                                 driverMode === "withDriver"
                                   ? "bg-blue-600 text-white"
                                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                               }`}
                    onClick={() => setDriverMode("withDriver")}
                  >
                    <Car className="h-5 w-5" />
                    With Driver
                  </button>
                  <button
                    className={`flex-1 p-3 rounded-xl flex items-center justify-center gap-2 
                               transition-all duration-200 ${
                                 driverMode === "selfDrive"
                                   ? "bg-blue-600 text-white"
                                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                               }`}
                    onClick={() => setDriverMode("selfDrive")}
                  >
                    <Car className="h-5 w-5" />
                    Self Drive
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  // Modify the search button click handler
  const handleSearch = () => {
    if (pickup && drop) {
      if (activeTrip === "Goods") {
        // Get the date and time input values
        const pickupDateInput = document.querySelector('input[type="date"]');
        const pickupTimeInput = document.querySelector('input[type="time"]');

        if (!pickupDateInput?.value || !pickupTimeInput?.value) {
          alert("Please fill in all date and time fields");
          return;
        }

        navigate("/goods-selection", {
          state: {
            pickup,
            drop,
            pickupDate: pickupDateInput.value,
            pickupTime: pickupTimeInput.value,
          },
        });
      } else if (activeTrip === "roundTrip") {
        const pickupDateInput = document.querySelector('input[type="date"]');
        const pickupTimeInput = document.querySelector('input[type="time"]');
        const returnDateInput =
          document.querySelectorAll('input[type="date"]')[1];
        const returnTimeInput =
          document.querySelectorAll('input[type="time"]')[1];

        if (
          !pickupDateInput?.value ||
          !pickupTimeInput?.value ||
          !returnDateInput?.value ||
          !returnTimeInput?.value
        ) {
          alert("Please fill in all date and time fields");
          return;
        }

        // If driver mode is withDriver, go to driver selection first
        if (driverMode === "withDriver") {
          navigate("/driver-selection", {
            state: {
              pickup,
              drop,
              pickupDate: pickupDateInput.value,
              pickupTime: pickupTimeInput.value,
              returnDate: returnDateInput.value,
              returnTime: returnTimeInput.value,
              driverMode: true,
              tripType: "roundTrip",
            },
          });
        } else {
          // If self-drive, go directly to car selection
          navigate("/car-selection", {
            state: {
              pickup,
              drop,
              pickupDate: pickupDateInput.value,
              pickupTime: pickupTimeInput.value,
              returnDate: returnDateInput.value,
              returnTime: returnTimeInput.value,
              driverMode: false,
              tripType: "roundTrip",
            },
          });
        }
      } else {
        setShowVehicleSelection(true);
      }
    } else {
      alert("Please enter pickup and drop locations");
    }
  };

  // Update the TripTypeButton component
  const TripTypeButton = ({ type, icon, label }) => (
    <button
      className={`flex items-center justify-start w-full p-3 rounded-xl transition-all duration-200 
                  ${
                    activeTrip === type
                      ? "bg-[#6850A4] text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-100"
                  }`}
      onClick={() => setActiveTrip(type)}
    >
      <div
        className={`p-2 rounded-lg mr-3 ${
          activeTrip === type ? "bg-[#715ea1]" : "bg-blue-50"
        }`}
      >
        {icon}
      </div>
      <span className="font-medium text-sm">{label}</span>
    </button>
  );

  const InputField = ({
    label,
    icon,
    value,
    onChange,
    placeholder,
    suggestions,
    onSuggestionClick,
  }) => (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors duration-200">
          {icon}
        </div>
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3.5 rounded-xl border-2 border-gray-200 
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   hover:border-blue-300 transition-all duration-200
                   text-gray-800 placeholder-gray-400"
        />
      </div>
      {suggestions?.length > 0 && (
        <div className="absolute w-full mt-1 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => onSuggestionClick(suggestion)}
              className="p-3 hover:bg-blue-50 cursor-pointer transition-colors duration-200
                         border-b border-gray-50 last:border-b-0"
            >
              <div className="font-medium text-gray-800">
                {suggestion.main_text}
              </div>
              <div className="text-sm text-gray-500">
                {suggestion.secondary_text}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${carBg})` }}
      />
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="lg:text-4xl text-3xl font-bold text-[#0f1e35] mb-2 font-custom">
              Book Your Ride Now
            </h1>
            <p className="text-gray-600">
              Choose your trip type and get started
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-10">
            {/* Updated Trip Type Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <TripTypeButton
                type="quickTrip"
                icon={<Car className="h-5 w-5" />}
                label="Quick Trip"
              />
              <TripTypeButton
                type="Single Trip"
                icon={<MapPin className="h-5 w-5" />}
                label="Single Trip"
              />
              <TripTypeButton
                type="roundTrip"
                icon={<RotateCw className="h-5 w-5" />}
                label="Round Trip"
              />
              <TripTypeButton
                type="Goods"
                icon={<Package className="h-5 w-5" />}
                label="Goods"
              />
            </div>

            {/* Update padding in booking section */}
            <div className="space-y-6 px-1">
              {renderBookingInputs()}

              <div className="flex justify-center pt-6">
                <button
                  onClick={handleSearch}
                  className="w-full bg-[#6850A4] text-white px-6 py-4 rounded-xl font-medium 
                           hover:bg-[#B858A2] active:bg-blue-800 transition-all duration-200 
                           flex items-center justify-center gap-3 shadow-lg shadow-blue-600/30"
                >
                  <Car className="h-5 w-5" />
                  Find Available Rides
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Access Features */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { icon: <Clock className="h-5 w-5" />, label: "Recent Trips" },
              { icon: <MapPin className="h-5 w-5" />, label: "Saved Places" },
              { icon: <Package className="h-5 w-5" />, label: "Offers" },
            ].map((feature, index) => (
              <button
                key={index}
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow-sm
                         hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="p-2 bg-blue-50 rounded-lg">{feature.icon}</div>
                <span className="text-sm font-medium text-gray-700">
                  {feature.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {showVehicleSelection && (
        <UberVehicleSelection
          pickup={pickup}
          drop={drop}
          selectedTime={selectedTimeOption}
          onVehicleSelect={(vehicle) => {
            console.log("Selected vehicle:", vehicle);
          }}
          onBack={() => setShowVehicleSelection(false)}
        />
      )}
    </div>
  );
};

export default withFadeInAnimation(LandingSection);
