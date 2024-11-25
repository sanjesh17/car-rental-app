import React, { useState, useEffect } from "react";
import { 
  Car, ArrowLeft, CheckCircle, Calendar, 
  Fuel, Settings, CreditCard, Users, Info
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const CarSelection = () => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [rentalCars, setRentalCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();
  const location = useLocation();

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
      setError('Error connecting to server');
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
        ...location.state
      }
    });
  };
  //   <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
  //     <div className="flex items-center justify-between mb-3">
  //       <h2 className="text-lg font-semibold">Trip Summary</h2>
  //       <Link to="/" className="text-indigo-600 text-sm font-medium">
  //         Edit
  //       </Link>
  //     </div>
  //     <div className="space-y-3">
  //       <div className="flex items-start space-x-3">
  //         <div className="mt-1">
  //           <div className="w-2 h-2 rounded-full bg-green-500" />
  //           <div className="w-0.5 h-10 bg-gray-200 mx-auto my-1" />
  //           <div className="w-2 h-2 rounded-full bg-red-500" />
  //         </div>
  //         <div className="flex-1">
  //           <div className="text-sm text-gray-500">Pickup</div>
  //           <div className="font-medium text-sm">{location.state?.pickup}</div>
  //           <div className="text-xs text-gray-500 mt-1">
  //             {location.state?.pickupDate} at {location.state?.pickupTime}
  //           </div>
  //           <div className="mt-2">
  //             <div className="text-sm text-gray-500">Drop-off</div>
  //             <div className="font-medium text-sm">{location.state?.drop}</div>
  //             <div className="text-xs text-gray-500 mt-1">
  //               {location.state?.returnDate} at {location.state?.returnTime}
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  const FilterTabs = () => {
    const filters = [
      { id: 'all', label: 'All Cars' },
      { id: 'sedan', label: 'Sedan' },
      { id: 'suv', label: 'SUV' },
      { id: 'luxury', label: 'Luxury' }
    ];

    return (
      <div className="overflow-x-auto">
        <div className="flex space-x-2 p-1">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                ${activeFilter === filter.id 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    );
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
                to="/"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </Link>
              <h1 className="text-xl font-semibold text-gray-800">
                Select Your Car
              </h1>
            </div>
            <span className="text-sm text-gray-500">
              {rentalCars.length} available
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 mt-6">
        <FilterTabs />
        
        {rentalCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {rentalCars.map((car) => (
              <div
                key={car._id}
                className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 
                  ${selectedCar?._id === car._id 
                    ? "ring-2 ring-indigo-600" 
                    : "hover:ring-1 hover:ring-gray-200"
                  }`}
              >
                <div className="relative">
                  <img
                    src={`http://localhost:5000${car.carImage}`}
                    alt={`${car.carDetails.vehicleMake} ${car.carDetails.vehicleModel}`}
                    className="w-full h-48 object-cover"
                  />
                  {selectedCar?._id === car._id && (
                    <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
                      <CheckCircle className="w-6 h-6 text-indigo-600" />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                    <h2 className="text-lg font-semibold text-white">
                      {car.carDetails.vehicleMake} {car.carDetails.vehicleModel}
                    </h2>
                    <p className="text-white/90 text-sm">
                      {car.carDetails.vehicleYear}
                    </p>
                  </div>
                </div>

                <div className="p-4">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Fuel className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{car.carDetails.fuelType}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Settings className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{car.carDetails.plateNumber}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{car.carDetails.seatingCapacity} Seats</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Info className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{car.rentalDetails.mileage} km/l</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-indigo-600">
                        ₹{car.rentalDetails.pricePerDay}
                      </span>
                      <span className="text-sm text-gray-500">/day</span>
                    </div>
                    {car.rentalDetails.discount > 0 && (
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded">
                        {car.rentalDetails.discount}% OFF
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleCarSelect(car)}
                    className={`w-full py-3 rounded-lg font-medium transition-all duration-200 
                      ${selectedCar?._id === car._id
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                      }`}
                  >
                    {selectedCar?._id === car._id ? "Selected" : "Choose Car"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm mt-4">
            <Car className="mx-auto text-gray-400 mb-3" size={48} />
            <h3 className="text-lg font-medium text-gray-900">
              No Available Cars
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Please try different dates or location
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarSelection;