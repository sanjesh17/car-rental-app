import React from "react";
import { User, Car, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import withFadeInAnimation from "../../hooks/withFadeInAnimation";
import "../../hooks/fadeinanimation.css";

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleSelection = (role) => {
    if (role === "Driver with Car") {
      navigate("/new/driver");
    } else if (role === "Car for Rental") {
      navigate("/new/car");
    } else if (role === "Acting Driver") {
      navigate("/new/acting-driver");
    }
  };

  const options = [
    {
      key: "actingDriver",
      title: "Acting Driver",
      description: "Register as a professional driver available for hire.",
      icon: <User className="text-indigo-600 w-12 h-12 mb-4" />,
    },
    {
      key: "driverWithCar",
      title: "Driver with Car",
      description: "Provide driving services along with your personal vehicle.",
      icon: <UserCheck className="text-indigo-600 w-12 h-12 mb-4" />,
    },
    {
      key: "carRental",
      title: "Car for Rental",
      description: "List your car for rental services without a driver.",
      icon: <Car className="text-indigo-600 w-12 h-12 mb-4" />,
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-8 lg:px-28 mt-12 mb-12">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800 text-center">
        Choose Your Role
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {options.map((option) => (
          <div
            key={option.key}
            className="flex flex-col items-center bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow cursor-pointer border-2 border-transparent hover:border-indigo-600"
            onClick={() => handleSelection(option.title)}
          >
            {option.icon}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {option.title}
            </h2>
            <p className="text-gray-600 text-center">{option.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withFadeInAnimation(RoleSelection);
