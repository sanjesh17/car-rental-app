import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const RoundSelection = () => {
  const cars = [
    {
      id: 1,
      name: "Toyota Innova",
      type: "Diesel",
      seats: 7,
      price: 3000,
      image: "/api/placeholder/400/320"
    },
    {
      id: 2,
      name: "Honda City",
      type: "Petrol",
      seats: 5,
      price: 2500,
      image: "/api/placeholder/400/320"
    },
    {
      id: 3,
      name: "Honda City",
      type: "Petrol",
      seats: 5,
      price: 2500,
      image: "/api/placeholder/400/320"
    },
    {
      id: 4,
      name: "Honda City",
      type: "Petrol",
      seats: 5,
      price: 2500,
      image: "/api/placeholder/400/320"
    },
    {
      id: 5,
      name: "Honda City",
      type: "Petrol",
      seats: 5,
      price: 2500,
      image: "/api/placeholder/400/320"
    },
    {
      id: 6,
      name: "Maruti Swift",
      type: "Petrol",
      seats: 5,
      price: 2000,
      image: "/api/placeholder/400/320"
    },
    {
      id: 7,
      name: "Maruti Swift",
      type: "Petrol",
      seats: 5,
      price: 2000,
      image: "/api/placeholder/400/320"
    },
    {
      id: 8,
      name: "Maruti Swift",
      type: "Petrol",
      seats: 5,
      price: 2000,
      image: "/api/placeholder/400/320"
    }
  ];

  const [selectedCar, setSelectedCar] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const handleSelect = (carId) => {
    setSelectedCar(carId);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-6"
      >
        Select Your Car
      </motion.h1>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {cars.map((car) => (
          <motion.div
            key={car.id}
            variants={cardVariants}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
            className={`bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 ${
              selectedCar === car.id ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <motion.img
              src={car.image}
              alt={car.name}
              className="w-full h-48 object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            <div className="p-4">
              <h2 className="font-semibold text-xl mb-2">{car.name}</h2>
              <p className="text-gray-600 mb-2">
                {car.type} | {car.seats} seater
              </p>
              <div className="flex justify-between items-center mb-4">
                <motion.span 
                  className="text-2xl font-bold"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  ₹{car.price.toFixed(2)}
                </motion.span>
                <span className="text-sm text-gray-500">per day</span>
              </div>
              <motion.button
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: '#1a202c'
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelect(car.id)}
                className={`w-full p-2 rounded-lg transition-colors duration-300 ${
                  selectedCar === car.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {selectedCar === car.id ? 'Selected' : 'Select'}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-8 flex justify-center lg:justify-end"
      >
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: '#1a202c' }}
          whileTap={{ scale: 0.95 }}
          className="bg-gray-900 text-white p-2 rounded-lg px-4 hover:bg-gray-800 transition duration-300 flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Search</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default RoundSelection;