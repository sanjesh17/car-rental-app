import React, { useState, useEffect } from "react";
import { Car, ArrowLeft, CheckCircle } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import withFadeInAnimation from "../../hooks/withFadeInAnimation";
import "../../hooks/fadeinanimation.css";

const CarSelection = () => {
  const [selectedCar, setSelectedCar] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Add new states for rental cars
  const [rentalCars, setRentalCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch rental cars when component mounts
  useEffect(() => {
    fetchRentalCars();
  }, []);

  const fetchRentalCars = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/rental-cars');
      const data = await response.json();

      if (data.success) {
        setRentalCars(data.data);
      } else {
        setError('Failed to fetch cars');
      }
    } catch (error) {
      setError('Error fetching cars');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCarSelect = (car) => {
    setSelectedCar(car);
    navigate("/booking-confirmation", { 
      state: { 
        selectedCar: {
          name: `${car.carDetails.vehicleMake} ${car.carDetails.vehicleModel}`,
          type: car.carDetails.fuelType,
          image: `http://localhost:5000${car.carImage}`,
          price: parseFloat(car.rentalDetails.pricePerDay),
          _id: car._id
        },
        pickup: location.state?.pickup,
        drop: location.state?.drop,
        pickupDate: location.state?.pickupDate,
        pickupTime: location.state?.pickupTime,
        returnDate: location.state?.returnDate,
        returnTime: location.state?.returnTime,
        driverMode: location.state?.driverMode,
        tripType: "rental"
      } 
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
    return (
      <div className="text-center text-red-600 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 lg:px-28 mt-12 mb-12">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-800 flex items-center">
        <Car className="mr-4 text-indigo-600" size={40} />
        Select Your Car
      </h1>
      <hr />
      <br />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {rentalCars.map((car) => (
          <div
            key={car._id}
            className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.03] hover:cursor-pointer hover:shadow-2xl ${
              selectedCar?._id === car._id ? "ring-4 ring-indigo-500" : ""
            }`}
          >
            <div className="relative">
              <img
                src={`http://localhost:5000${car.carImage}`}
                alt={`${car.carDetails.vehicleMake} ${car.carDetails.vehicleModel}`}
                className="w-full h-40 object-cover"
              />
              {selectedCar?._id === car._id && (
                <div className="absolute top-4 right-4 text-indigo-500">
                  <CheckCircle size={32} className="drop-shadow-md" />
                </div>
              )}
            </div>
            <div className="p-5">
              <h2 className="font-bold text-2xl mb-2 text-gray-800">
                {car.carDetails.vehicleMake} {car.carDetails.vehicleModel}
              </h2>
              <p className="text-gray-600 mb-3">
                {car.carDetails.fuelType} | {car.carDetails.vehicleYear}
              </p>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-3xl font-extrabold text-indigo-600">
                    ₹{car.rentalDetails.pricePerDay}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">per day</span>
                </div>
              </div>
              <button
                onClick={() => handleCarSelect(car)}
                className={`w-full p-3 rounded-lg transition-all duration-300 ${
                  selectedCar?._id === car._id
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-indigo-100"
                } focus:outline-none focus:ring-2 focus:ring-indigo-400`}
              >
                {selectedCar?._id === car._id ? "Selected" : "Select"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {rentalCars.length === 0 && (
        <div className="text-center py-12">
          <Car className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-medium text-gray-600">
            No cars available at the moment
          </h3>
        </div>
      )}

      <div className="mt-8 flex justify-center lg:justify-end">
        <Link to="/">
          <button className="flex items-center bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300">
            <ArrowLeft className="mr-2" size={20} />
            Back to Search
          </button>
        </Link>
      </div>
    </div>
  );
};

export default withFadeInAnimation(CarSelection);
