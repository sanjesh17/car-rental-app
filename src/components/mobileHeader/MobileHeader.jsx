import React, { useState, useEffect } from "react";
import { MapPin, User, RefreshCw } from "lucide-react";
import axios from "axios";
import userIcon from "../../assets/userIcon.png";

const MobileHeader = ({ onProfileClick }) => {
  const [location, setLocation] = useState({
    displayName: "Fetching...",
    loading: false,
    error: null,
  });

  const parseLocationFromResponse = (data) => {
    // Prioritize location parsing based on Ola Maps API response
    if (data.results && data.results.length > 0) {
      const firstResult = data.results[0];

      // Try to construct a meaningful location name
      const addressComponents = firstResult.address_components;
      const neighborhood = addressComponents.find(
        (component) =>
          component.types.includes("sublocality") ||
          component.types.includes("neighborhood")
      )?.long_name;

      const locality = addressComponents.find((component) =>
        component.types.includes("locality")
      )?.long_name;

      const area = addressComponents.find((component) =>
        component.types.includes("administrative_area_level_3")
      )?.long_name;

      return (
        neighborhood ||
        locality ||
        area ||
        firstResult.formatted_address ||
        "Unknown Location"
      );
    }
    return "Unknown Location";
  };

  const fetchLocation = () => {
    setLocation((prev) => ({ ...prev, loading: true }));

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const latlng = `${latitude},${longitude}`;

          axios
            .get(`https://dropx-backend.onrender.com/api/proxy/ola-maps/reverse-geocode`, {
              params: { latlng },
            })
            .then((response) => {
              if (response.data.success && response.data.results.length > 0) {
                const displayName = parseLocationFromResponse(response.data);
                setLocation({
                  displayName,
                  loading: false,
                  error: null,
                });
              } else {
                setLocation({
                  displayName: "Location Unavailable",
                  loading: false,
                  error: null,
                });
              }
            })
            .catch((error) => {
              console.error("Error fetching location:", error);
              setLocation({
                displayName: "Error Fetching Location",
                loading: false,
                error: error.message || "An unknown error occurred",
              });
            });
        },
        (error) => {
          setLocation({
            displayName: "Permission Denied",
            loading: false,
            error: error,
          });
        }
      );
    } else {
      setLocation({
        displayName: "Geolocation Not Supported",
        loading: false,
        error: new Error("Geolocation not supported"),
      });
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <nav className="font-custom lg:hidden sticky top-0 left-0 w-full bg-white shadow-lg z-50 h-16 flex items-center justify-between px-4 border-b border-gray-200/50">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <MapPin
            className={`text-[#6850A4] w-6 h-6 ${
              location.loading ? "animate-pulse" : ""
            }`}
          />
          {location.loading && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#6850A4] rounded-full animate-ping"></div>
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-800 tracking-tight max-w-[200px] truncate">
            {location.displayName}
          </span>
          <button
            onClick={fetchLocation}
            disabled={location.loading}
            className="text-xs text-[#6850A4] hover:text-[#6d5b9a] flex items-center space-x-1 opacity-70 hover:opacity-100 transition-all"
          >
            <RefreshCw
              className={`w-3 h-3 ${location.loading ? "animate-spin" : ""}`}
            />
            <span>Refresh Location</span>
          </button>
        </div>
      </div>

      <button
        onClick={onProfileClick}
        className="rounded-full hover:bg-gray-200/70 transition-all transform hover:scale-105"
        aria-label="Profile"
      >
        <img src={userIcon} className="h-14 w-14" />
      </button>
    </nav>
  );
};

export default MobileHeader;
