import React, { useState, useEffect } from "react";
import {
  User,
  ArrowLeft,
  CheckCircle,
  MapPin,
  Calendar,
  Car,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const DriverSelection = () => {
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/drivers");
      const data = await response.json();

      if (data.success) {
        setDrivers(data.data);
      } else {
        setError("Unable to load drivers at this time");
      }
    } catch (error) {
      setError("Connection error. Please try again");
    } finally {
      setLoading(false);
    }
  };

  const handleDriverSelect = (driver) => {
    setSelectedDriver(driver);
    navigate("/driver-confirmation", {
      state: {
        ...location.state,
        selectedDriver: {
          name: `${driver.personalInfo.firstName} ${driver.personalInfo.lastName}`,
          experience: driver.driverInfo.experience,
          image: `http://localhost:5000${driver.profileImage}`,
          phone: driver.personalInfo.phone,
          email: driver.personalInfo.email,
          preferredArea: driver.driverInfo.preferredArea,
          vehicleInfo: {
            make: driver.vehicleInfo.vehicleMake,
            model: driver.vehicleInfo.vehicleModel,
            year: driver.vehicleInfo.vehicleYear,
            fuelType: driver.vehicleInfo.fuelType,
          },
          _id: driver._id,
        },
      },
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 relative">
          <div className="absolute w-full h-full border-4 border-indigo-200 rounded-full animate-pulse" />
          <div className="absolute w-full h-full border-t-4 border-indigo-600 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 max-w-md mx-auto mt-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link
                to="/car-selection"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </Link>
              <h1 className="text-xl font-semibold text-gray-800">
                Select Driver
              </h1>
            </div>
            <span className="text-sm text-gray-500">
              {drivers.length} available
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 mt-6">
        {drivers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {drivers.map((driver) => (
              <div
                key={driver._id}
                className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg ${
                  selectedDriver?._id === driver._id
                    ? "ring-2 ring-indigo-600"
                    : "hover:ring-1 hover:ring-gray-200"
                }`}
              >
                <div className="relative">
                  <img
                    src={`http://localhost:5000${driver.profileImage}`}
                    alt={`${driver.personalInfo.firstName} ${driver.personalInfo.lastName}`}
                    className="w-full h-48 object-cover"
                  />
                  {selectedDriver?._id === driver._id && (
                    <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
                      <CheckCircle className="w-6 h-6 text-indigo-600" />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                    <h2 className="text-lg font-semibold text-white">
                      {driver.personalInfo.firstName}{" "}
                      {driver.personalInfo.lastName}
                    </h2>
                  </div>
                </div>

                <div className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>
                        {driver.driverInfo.experience} years experience
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{driver.driverInfo.preferredArea}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Car className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>
                        {driver.vehicleInfo.vehicleMake}
                        {driver.vehicleInfo.vehicleModel}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDriverSelect(driver)}
                    className={`w-full mt-4 px-4 py-3 rounded-lg font-medium transition-all duration-200 
                      ${
                        selectedDriver?._id === driver._id
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                      }`}
                  >
                    {selectedDriver?._id === driver._id
                      ? "Selected"
                      : "Choose Driver"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <User className="mx-auto text-gray-400 mb-3" size={48} />
            <h3 className="text-lg font-medium text-gray-900">
              No Available Drivers
            </h3>
            <p className="mt-2 text-sm text-gray-500">Please try again later</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverSelection;
