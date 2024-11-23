import React, { useState } from 'react';
import { Package, ArrowLeft } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import withFadeInAnimation from "../../hooks/withFadeInAnimation";
import "../../hooks/fadeinanimation.css";

const GoodsSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pickup, drop, pickupDate, pickupTime } = location.state || {};

  const [formData, setFormData] = useState({
    goodsType: '',
    weight: '',
    length: '',
    width: '',
    height: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.goodsType || !formData.weight || 
        !formData.length || !formData.width || !formData.height) {
      alert("Please fill in all fields");
      return;
    }

    // Calculate total volume and cost
    const totalVolume = formData.length * formData.width * formData.height;
    const basePrice = 2000; // Base price for goods transport
    const volumePrice = totalVolume * 0.5; // ₹0.5 per cubic cm
    const weightPrice = formData.weight * 2; // ₹2 per kg
    const totalCost = basePrice + volumePrice + weightPrice;

    // Changed navigation path to /goods-booking-confirmation
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
          totalCost
        }
      }
    });
  };

  return (
    <div className="container mx-auto px-4 sm:px-8 lg:px-28 mt-12 mb-12">
      {/* Search Summary */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Search Details</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-gray-600">Pickup</p>
            <p className="font-semibold">{pickup}</p>
          </div>
          <div>
            <p className="text-gray-600">Drop-off</p>
            <p className="font-semibold">{drop}</p>
          </div>
          <div>
            <p className="text-gray-600">Date</p>
            <p className="font-semibold">{pickupDate}</p>
          </div>
          <div>
            <p className="text-gray-600">Time</p>
            <p className="font-semibold">{pickupTime}</p>
          </div>
        </div>
      </div>

      <h1 className="text-4xl font-extrabold mb-8 text-gray-800 flex items-center">
        <Package className="mr-4 text-indigo-600" size={40} />
        Enter Goods Details
      </h1>
      
      {/* Goods Details Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
          <Package className="mr-3 text-indigo-600" size={28} />
          Goods Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="goodsType" className="block text-sm font-medium text-gray-700 mb-2">
              Type of Goods
            </label>
            <select
              id="goodsType"
              name="goodsType"
              value={formData.goodsType}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
              required
            >
              <option value="" disabled>Select the type of Goods</option>
              <option value="general-merchandise">General Merchandise</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="perishables">Perishables</option>
              <option value="construction-materials">Construction Materials</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
              Weight (kg)
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
              placeholder="Enter weight in kg"
              required
              min="1"
            />
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dimensions (L x W x H in cm)
          </label>
          <div className="grid grid-cols-3 gap-4">
            {['length', 'width', 'height'].map((dim) => (
              <input
                key={dim}
                type="number"
                name={dim}
                value={formData[dim]}
                onChange={handleInputChange}
                placeholder={dim.charAt(0).toUpperCase() + dim.slice(1)}
                className="p-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                required
                min="1"
              />
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
          <div className="order-2 sm:order-1">
            <Link to="/">
              <button 
                type="button" 
                className="w-full sm:w-auto flex items-center justify-center bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300"
              >
                <ArrowLeft className="mr-2" size={20} />
                Back to Search
              </button>
            </Link>
          </div>
          <button
            type="submit"
            className="order-1 sm:order-2 w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center"
          >
            Continue to Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default withFadeInAnimation(GoodsSelection);