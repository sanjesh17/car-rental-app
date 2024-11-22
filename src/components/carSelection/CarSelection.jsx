import React, { useState } from "react";
import { Car, ArrowLeft, CheckCircle } from "lucide-react";
import carImg from "../../assets/landing.jpg";
import { Link } from "react-router-dom";

const carData = [
  {
    id: 1,
    name: "Toyota Innova",
    image: "/path/to/innova.jpg",
    type: "Diesel | 7 seater",
    price: 3000.0,
  },
  {
    id: 2,
    name: "Honda City",
    image: "/path/to/honda-city.jpg",
    type: "Petrol | 5 seater",
    price: 2500.0,
  },
  {
    id: 3,
    name: "Maruti Swift",
    image: { carImg },
    type: "Petrol | 5 seater",
    price: 2000.0,
  },
  {
    id: 4,
    name: "Maruti Swift",
    image: { carImg },
    type: "Petrol | 5 seater",
    price: 2000.0,
  },
  {
    id: 5,
    name: "Maruti Swift",
    image: { carImg },
    type: "Petrol | 5 seater",
    price: 2000.0,
  },
  {
    id: 6,
    name: "Maruti Swift",
    image: { carImg },
    type: "Petrol | 5 seater",
    price: 2000.0,
  },
  // Add more cars as needed
];

const CarSelection = () => {
  const [selectedCar, setSelectedCar] = useState(null);

  const handleCarSelect = (car) => {
    setSelectedCar(car);
  };

  return (
    <div className="container mx-auto px-4 sm:px-8 lg:px-28 mt-12 mb-12">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-800 flex items-center">
        <Car className="mr-4 text-indigo-600" size={40} />
        Select Your Car
      </h1>
      <hr />
      <br />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {carData.map((car) => (
          <div
            key={car.id}
            className={`
              bg-white rounded-xl shadow-lg overflow-hidden 
              transform transition-all duration-300 
              hover:scale-[1.03] hover:cursor-pointer hover:shadow-2xl
              ${selectedCar?.id === car.id ? "ring-4 ring-indigo-500" : ""}
            `}
          >
            <div className="relative">
              <img
                src={carImg}
                alt={car.name}
                className="w-full h-56 object-cover"
              />
              {selectedCar?.id === car.id && (
                <div className="absolute top-4 right-4 text-indigo-500">
                  <CheckCircle size={32} className="drop-shadow-md" />
                </div>
              )}
            </div>
            <div className="p-5">
              <h2 className="font-bold text-2xl mb-2 text-gray-800">
                {car.name}
              </h2>
              <p className="text-gray-600 mb-3">{car.type}</p>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-3xl font-extrabold text-indigo-600">
                    ₹{car.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">per day</span>
                </div>
              </div>
              <button
                onClick={() => handleCarSelect(car)}
                className={`
                  w-full p-3 rounded-lg transition-all duration-300 
                  ${
                    selectedCar?.id === car.id
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-indigo-100"
                  }
                  focus:outline-none focus:ring-2 focus:ring-indigo-400
                `}
              >
                {selectedCar?.id === car.id ? "Selected" : "Select"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center lg:justify-end">
        <Link to="/">
          <button
            className="
            flex items-center 
            bg-gray-800 text-white 
            px-6 py-3 
            rounded-lg 
            hover:bg-gray-700 
            transition-colors 
            duration-300
          "
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Search
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CarSelection;
