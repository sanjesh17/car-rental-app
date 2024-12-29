import React, { useState, useCallback } from "react";
import {
  Package,
  ArrowLeft,
  ArrowRight,
  Info,
  CheckCircle,
  MapPin,
  Calendar,
  Clock,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const BookingProgress = () => (
  <div className="w-full bg-white px-4 py-3 fixed top-0 left-0 z-10 shadow-sm">
    <div className="flex items-center justify-between max-w-md mx-auto">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
          1
        </div>
        <div className="text-sm font-medium">Details</div>
      </div>
      <div className="h-0.5 w-12 bg-indigo-600" />
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
          2
        </div>
        <div className="text-sm text-gray-500">Confirmation</div>
      </div>
    </div>
  </div>
);

const SearchSummary = ({ pickup, drop, pickupDate, pickupTime }) => (
  <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
    <div className="flex items-start space-x-3">
      <div className="mt-1">
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <div className="w-0.5 h-12 bg-gray-200 mx-auto my-1" />
        <div className="w-3 h-3 rounded-full bg-red-500" />
      </div>
      <div className="flex-1 space-y-4">
        <div>
          <div className="text-sm text-gray-500">Pickup Location</div>
          <div className="font-medium">{pickup}</div>
          <div className="flex items-center space-x-3 mt-1 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar size={14} className="mr-1" />
              {pickupDate}
            </div>
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              {pickupTime}
            </div>
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Drop Location</div>
          <div className="font-medium">{drop}</div>
        </div>
      </div>
    </div>
  </div>
);

const GoodsSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pickup, drop, pickupDate, pickupTime } = location.state || {};

  const [formData, setFormData] = useState({
    goodsType: "",
    weight: "",
    length: "",
    width: "",
    height: "",
  });

  const [errors, setErrors] = useState({});

  const goodsTypes = [
    {
      value: "general-merchandise",
      label: "General Merchandise",
      description: "Standard items with no special handling",
    },
    {
      value: "electronics",
      label: "Electronics",
      description: "Fragile electronic devices",
    },

    {
      value: "other",
      label: "Other",
      description: "Goods not fitting other categories",
    },
    {
      value: "perishables",
      label: "Perishables",
      description: "Time-sensitive goods",
    },
  ];

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.goodsType) newErrors.goodsType = "Select goods type";
    if (!formData.weight) newErrors.weight = "Weight is required";
    if (!formData.length) newErrors.length = "Length is required";
    if (!formData.width) newErrors.width = "Width is required";
    if (!formData.height) newErrors.height = "Height is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const updatedErrors = { ...prev };
        delete updatedErrors[name];
        return updatedErrors;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const totalVolume = formData.length * formData.width * formData.height;
      const basePrice = 2000;
      const volumePrice = totalVolume * 0.5;
      const weightPrice = formData.weight * 2;
      const totalCost = basePrice + volumePrice + weightPrice;

      navigate("/goods-booking-confirmation", {
        state: {
          pickup,
          drop,
          pickupDate,
          pickupTime,
          tripType: "goods",
          goodsDetails: {
            ...formData,
            totalVolume,
            totalCost,
          },
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 pt-16">
      <BookingProgress />
      <div className="max-w-md mx-auto px-4 space-y-4">
        <SearchSummary
          pickup={pickup}
          drop={drop}
          pickupDate={pickupDate}
          pickupTime={pickupTime}
        />

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Goods Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type of Goods
              </label>
              <div className="grid grid-cols-2 gap-4">
                {goodsTypes.map((type) => (
                  <div
                    key={type.value}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        goodsType: type.value,
                      }))
                    }
                    className={`relative p-4 rounded-xl border transition-all duration-200
                      ${
                        formData.goodsType === type.value
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-gray-200"
                      }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Package className="text-indigo-600" size={24} />
                      <div className="flex-1">
                        <h3 className="font-medium">{type.label}</h3>
                        <p className="text-sm text-gray-500">
                          {type.description}
                        </p>
                      </div>
                      {formData.goodsType === type.value && (
                        <CheckCircle className="text-indigo-600" size={20} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {errors.goodsType && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <Info size={14} className="mr-1" /> {errors.goodsType}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Package Dimensions (L x W x H in cm)
              </label>
              <div className="grid grid-cols-3 gap-3">
                {["length", "width", "height"].map((dim) => (
                  <div key={dim}>
                    <input
                      type="number"
                      name={dim}
                      value={formData[dim]}
                      onChange={handleInputChange}
                      placeholder={dim.charAt(0).toUpperCase() + dim.slice(1)}
                      className={`w-full p-3 rounded-lg border 
                        ${errors[dim] ? "border-red-500" : "border-gray-300"}
                        focus:ring-2 focus:ring-blue-200 transition-all`}
                      min="1"
                    />
                    {errors[dim] && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <Info size={14} className="mr-1" /> {errors[dim]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pb-16 lg:pb-0">
              <label
                htmlFor="weight"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Total Weight (kg)
              </label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className={`w-full p-3 rounded-lg border 
                  ${errors.weight ? "border-red-500" : "border-gray-300"}
                  focus:ring-2 focus:ring-blue-200 transition-all`}
                placeholder="Enter package weight"
                min="1"
              />
              {errors.weight && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <Info size={14} className="mr-1" /> {errors.weight}
                </p>
              )}
            </div>
          </form>
        </div>

        <div className="fixed bottom-16 lg:bottom-0 left-0 w-full bg-white border-t p-4">
          <div className="max-w-md mx-auto flex space-x-4">
            <Link to="/" className="flex-1">
              <button
                type="button"
                className="w-full flex items-center justify-center py-3 px-4 rounded-xl border border-gray-300 font-medium text-gray-700"
              >
                <ArrowLeft className="mr-2" size={18} />
                Back
              </button>
            </Link>
            <button
              onClick={handleSubmit}
              className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 text-white font-medium flex items-center justify-center"
            >
              Continue
              <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoodsSelection;
