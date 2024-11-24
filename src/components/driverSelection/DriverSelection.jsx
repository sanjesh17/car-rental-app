import React, { useState, useEffect } from "react";
import { User, ArrowLeft, CheckCircle } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import withFadeInAnimation from "../../hooks/withFadeInAnimation";
import "../../hooks/fadeinanimation.css";

const DriverSelection = () => {
  const [selectedDriver, setSelectedDriver] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError("Failed to fetch drivers");
      }
    } catch (error) {
      setError("Error fetching drivers");
      console.error("Error:", error);
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
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600 p-4">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 lg:px-28 mt-12 mb-12">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-800 flex items-center">
        <User className="mr-4 text-indigo-600" size={40} />
        Select Your Driver
      </h1>
      <hr />
      <br />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {drivers.map((driver) => (
          <div
            key={driver._id}
            className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.03] hover:cursor-pointer hover:shadow-2xl ${
              selectedDriver?._id === driver._id ? "ring-4 ring-indigo-500" : ""
            }`}
          >
            <div className="relative">
              <img
                src={`http://localhost:5000${driver.profileImage}`}
                alt={`${driver.personalInfo.firstName} ${driver.personalInfo.lastName}`}
                className="w-full h-40 object-cover"
              />
              {selectedDriver?._id === driver._id && (
                <div className="absolute top-4 right-4 text-indigo-500">
                  <CheckCircle size={32} className="drop-shadow-md" />
                </div>
              )}
            </div>
            <div className="p-5">
              <h2 className="font-bold text-2xl mb-2 text-gray-800">
                {driver.personalInfo.firstName} {driver.personalInfo.lastName}
              </h2>
              <p className="text-gray-600 mb-2">
                Experience: {driver.driverInfo.experience} years
              </p>
              <p className="text-gray-600 mb-2">
                Area: {driver.driverInfo.preferredArea}
              </p>
              <p className="text-gray-600 mb-3">
                Vehicle: {driver.vehicleInfo.vehicleMake}{" "}
                {driver.vehicleInfo.vehicleModel}
              </p>
              <button
                onClick={() => handleDriverSelect(driver)}
                className={`w-full p-3 rounded-lg transition-all duration-300 ${
                  selectedDriver?._id === driver._id
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-indigo-100"
                } focus:outline-none focus:ring-2 focus:ring-indigo-400`}
              >
                {selectedDriver?._id === driver._id ? "Selected" : "Select"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {drivers.length === 0 && (
        <div className="text-center py-12">
          <User className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-medium text-gray-600">
            No drivers available at the moment
          </h3>
        </div>
      )}

      <div className="mt-8 flex justify-center lg:justify-end">
        <Link to="/car-selection">
          <button className="flex items-center bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300">
            <ArrowLeft className="mr-2" size={20} />
            Back to Car Selection
          </button>
        </Link>
      </div>
    </div>
  );
};

export default withFadeInAnimation(DriverSelection);
