import React, { useState } from "react";
import landingimage from "../../assets/landing.jpg";
import Navigation from "../Navigation/Navigation";
import axios from "axios";
import withFadeInAnimation from "../../hooks/withFadeInAnimation";
import "../../hooks/fadeinanimation.css";
import UberVehicleSelection from "../uberVehicleSelection/UberVehicleSelection";

const LandingSection = () => {
  const [activeTrip, setActiveTrip] = useState("quickTrip");
  const [selectedTimeOption, setSelectedTimeOption] = useState("now");
  const [withDriverMode, setWithDriverMode] = useState("withDriver");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropSuggestions, setDropSuggestions] = useState([]);
  const [showVehicleSelection, setShowVehicleSelection] = useState(false);

  const handleLocationSearch = async (query, setter) => {
    if (query.length < 3) return; // Only search for queries with 3+ characters
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json`
      );
      setter(response.data || []);
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

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

  // Render input fields based on active trip type
  const renderBookingInputs = () => {
    switch (activeTrip) {
      case "quickTrip":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Pick-up Location */}
            <div className="relative">
              <h4 className="font-semibold text-xl mb-2.5">Pick-up Location</h4>
              <input
                type="text"
                placeholder="Enter City, Airport or Station"
                value={pickup}
                onChange={(e) => {
                  setPickup(e.target.value);
                  handleLocationSearch(e.target.value, setPickupSuggestions);
                }}
                className="border-solid border-2 border-gray-900 h-10 py-5 px-3 w-full"
              />
              {pickupSuggestions.length > 0 && (
                <ul className="absolute bg-white border mt-2 w-full max-h-40 overflow-y-auto">
                  {pickupSuggestions.map((place) => (
                    <li
                      key={place.place_id}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        setPickup(place.display_name);
                        setPickupSuggestions([]);
                      }}
                    >
                      {place.display_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Drop Location */}
            <div className="relative">
              <h4 className="font-semibold text-xl mb-2.5">Drop Location</h4>
              <input
                type="text"
                placeholder="Enter City, Airport or Station"
                value={drop}
                onChange={(e) => {
                  setDrop(e.target.value);
                  handleLocationSearch(e.target.value, setDropSuggestions);
                }}
                className="border-solid border-2 border-gray-900 h-10 py-5 px-3 w-full"
              />
              {dropSuggestions.length > 0 && (
                <ul className="absolute bg-white border mt-2 w-full max-h-40 overflow-y-auto">
                  {dropSuggestions.map((place) => (
                    <li
                      key={place.place_id}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        setDrop(place.display_name);
                        setDropSuggestions([]);
                      }}
                    >
                      {place.display_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Time Selection */}
            <div>
              <h4 className="font-semibold text-xl mb-2.5">Time</h4>
              <div className="flex flex-wrap gap-2">
                {generateTimeSlots().map((time) => (
                  <button
                    key={time}
                    className={`p-1.5 rounded-lg px-2.5 border-2 border-gray-900 transition-all duration-500 ${
                      selectedTimeOption === time
                        ? "bg-gray-900 text-white"
                        : "bg-white text-gray-900"
                    }`}
                    onClick={() => setSelectedTimeOption(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case "roundTrip":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <h4 className="font-semibold text-xl mb-2.5">Pick-up Location</h4>
              <input
                type="text"
                placeholder="Enter City, Airport or Station"
                value={pickup}
                onChange={(e) => {
                  setPickup(e.target.value);
                  handleLocationSearch(e.target.value, setPickupSuggestions);
                }}
                className="border-solid border-2 border-gray-900 h-10 py-5 px-3 w-full"
              />
              {pickupSuggestions.length > 0 && (
                <ul className="absolute bg-white border mt-2 w-full max-h-40 overflow-y-auto">
                  {pickupSuggestions.map((place) => (
                    <li
                      key={place.place_id}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        setPickup(place.display_name);
                        setPickupSuggestions([]);
                      }}
                    >
                      {place.display_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* Drop Location */}
            <div className="relative">
              <h4 className="font-semibold text-xl mb-2.5">Drop Location</h4>
              <input
                type="text"
                placeholder="Enter City, Airport or Station"
                value={drop}
                onChange={(e) => {
                  setDrop(e.target.value);
                  handleLocationSearch(e.target.value, setDropSuggestions);
                }}
                className="border-solid border-2 border-gray-900 h-10 py-5 px-3 w-full"
              />
              {dropSuggestions.length > 0 && (
                <ul className="absolute bg-white border mt-2 w-full max-h-40 overflow-y-auto">
                  {dropSuggestions.map((place) => (
                    <li
                      key={place.place_id}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        setDrop(place.display_name);
                        setDropSuggestions([]);
                      }}
                    >
                      {place.display_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <h4 className="font-semibold text-xl mb-2.5">
                Pick-up Date & Time
              </h4>
              <div className="flex flex-wrap gap-2">
                <input
                  type="date"
                  className="border-solid border-2 border-gray-900 h-10 py-5 px-3 flex-grow"
                />
                <input
                  type="time"
                  className="border-solid border-2 border-gray-900 h-10 py-5 px-3 flex-grow"
                />
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-xl mb-2.5">
                Return Date & Time
              </h4>
              <div className="flex flex-wrap gap-2">
                <input
                  type="date"
                  className="border-solid border-2 border-gray-900 h-10 py-5 px-3 flex-grow"
                />
                <input
                  type="time"
                  className="border-solid border-2 border-gray-900 h-10 py-5 px-3 flex-grow"
                />
              </div>
            </div>
          </div>
        );

      case "Single Trip":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Pick-up Location */}
            <div className="relative">
              <h4 className="font-semibold text-xl mb-2.5">Pick-up Location</h4>
              <input
                type="text"
                placeholder="Enter City, Airport or Station"
                value={pickup}
                onChange={(e) => {
                  setPickup(e.target.value);
                  handleLocationSearch(e.target.value, setPickupSuggestions);
                }}
                className="border-solid border-2 border-gray-900 h-10 py-5 px-3 w-full"
              />
              {pickupSuggestions.length > 0 && (
                <ul className="absolute bg-white border mt-2 w-full max-h-40 overflow-y-auto">
                  {pickupSuggestions.map((place) => (
                    <li
                      key={place.place_id}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        setPickup(place.display_name);
                        setPickupSuggestions([]);
                      }}
                    >
                      {place.display_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Drop Location */}
            <div className="relative">
              <h4 className="font-semibold text-xl mb-2.5">Drop Location</h4>
              <input
                type="text"
                placeholder="Enter City, Airport or Station"
                value={drop}
                onChange={(e) => {
                  setDrop(e.target.value);
                  handleLocationSearch(e.target.value, setDropSuggestions);
                }}
                className="border-solid border-2 border-gray-900 h-10 py-5 px-3 w-full"
              />
              {dropSuggestions.length > 0 && (
                <ul className="absolute bg-white border mt-2 w-full max-h-40 overflow-y-auto">
                  {dropSuggestions.map((place) => (
                    <li
                      key={place.place_id}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        setDrop(place.display_name);
                        setDropSuggestions([]);
                      }}
                    >
                      {place.display_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <h4 className="font-semibold text-xl mb-2.5">
                Pick-up Date & Time
              </h4>
              <div className="flex flex-wrap gap-2">
                <input
                  type="date"
                  className="border-solid border-2 border-gray-900 h-10 py-5 px-3 flex-grow"
                />
                <input
                  type="time"
                  className="border-solid border-2 border-gray-900 h-10 py-5 px-3 flex-grow"
                />
              </div>
            </div>
          </div>
        );

      case "Goods":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Pick-up Location */}
            <div className="relative">
              <h4 className="font-semibold text-xl mb-2.5">Pick-up Location</h4>
              <input
                type="text"
                placeholder="Enter City, Airport or Station"
                value={pickup}
                onChange={(e) => {
                  setPickup(e.target.value);
                  handleLocationSearch(e.target.value, setPickupSuggestions);
                }}
                className="border-solid border-2 border-gray-900 h-10 py-5 px-3 w-full"
              />
              {pickupSuggestions.length > 0 && (
                <ul className="absolute bg-white border mt-2 w-full max-h-40 overflow-y-auto">
                  {pickupSuggestions.map((place) => (
                    <li
                      key={place.place_id}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        setPickup(place.display_name);
                        setPickupSuggestions([]);
                      }}
                    >
                      {place.display_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Drop Location */}
            <div className="relative">
              <h4 className="font-semibold text-xl mb-2.5">Drop Location</h4>
              <input
                type="text"
                placeholder="Enter City, Airport or Station"
                value={drop}
                onChange={(e) => {
                  setDrop(e.target.value);
                  handleLocationSearch(e.target.value, setDropSuggestions);
                }}
                className="border-solid border-2 border-gray-900 h-10 py-5 px-3 w-full"
              />
              {dropSuggestions.length > 0 && (
                <ul className="absolute bg-white border mt-2 w-full max-h-40 overflow-y-auto">
                  {dropSuggestions.map((place) => (
                    <li
                      key={place.place_id}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        setDrop(place.display_name);
                        setDropSuggestions([]);
                      }}
                    >
                      {place.display_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <h4 className="font-semibold text-xl mb-2.5">
                Pick-up Date & Time
              </h4>
              <div className="flex flex-wrap gap-2">
                <input
                  type="date"
                  className="border-solid border-2 border-gray-900 h-10 py-5 px-3 flex-grow"
                />
                <input
                  type="time"
                  className="border-solid border-2 border-gray-900 h-10 py-5 px-3 flex-grow"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${landingimage})` }}
    >
      <Navigation />
      <div className="text-gray-900 mt-16 sm:mt-24 md:mt-36 md:text-white px-4 sm:px-6 lg:px-8">
        <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl mb-6">
          Make Your Memories With
          <br />
          Us, Enjoy Comfortable
          <br />
          Travel
        </h1>
      </div>

      {/* Trip Type Buttons */}
      <div className="btn-class flex flex-wrap gap-4 mt-10 mb-4 px-4 sm:px-6 lg:px-8">
        {["quickTrip", "Single Trip", "roundTrip", "Goods"].map((trip) => (
          <button
            key={trip}
            className={`trip-btn p-2 font-semibold rounded-lg transition-all duration-300 
                  ${
                    activeTrip === trip
                      ? "bg-gray-900 text-white"
                      : "bg-white text-gray-900"
                  }`}
            onClick={() => setActiveTrip(trip)}
          >
            {trip === "quickTrip"
              ? "Quick Trip"
              : trip === "Single Trip"
              ? "Single Trip"
              : trip === "roundTrip"
              ? "Round Trip"
              : "Goods"}
          </button>
        ))}
      </div>

      {/* Booking Form */}
      <div className="w-full px-4 sm:px-6 pb-4 lg:px-8 mb-10">
        <div className="bg-white rounded-xl p-4 sm:p-6 relative z-10">
          {/* Dynamically rendered inputs based on trip type */}
          {renderBookingInputs()}

          {/* Location and Driver Mode Selection */}
          <div className="flex flex-wrap justify-between mt-6">
            {/* Search Button */}
            <div className="flex md:justify-start w-52 mx-auto lg:mx-0">
              <button
                className="bg-gray-900 font-semibold text-white hover:bg-white border-2 border-solid border-gray-900 hover:text-gray-900 w-full sm:w-36 p-1.5 rounded-lg px-4 max-w-xs transition-all duration-300"
                onClick={() => {
                  if (pickup && drop) {
                    setShowVehicleSelection(true);
                  }
                }}
              >
                Search <i className="fa-solid fa-magnifying-glass text-sm"></i>
              </button>
            </div>
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
