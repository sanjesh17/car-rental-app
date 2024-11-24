import React, { useState } from "react";
import { Car, IndianRupee, Calendar, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import withFadeInAnimation from "../../hooks/withFadeInAnimation";
import "../../hooks/fadeinanimation.css";

const RentalCarOnboarding = () => {
  const navigate = useNavigate();

  // Car data for dropdowns
  const carData = {
    makes: {
      Toyota: ["Camry", "Corolla", "Innova", "Fortuner"],
      Honda: ["City", "Civic", "Amaze", "WR-V"],
      Hyundai: ["i20", "Creta", "Venue", "Verna"],
      Maruti: ["Swift", "Dzire", "Ertiga", "Baleno"],
      Tata: ["Nexon", "Harrier", "Safari", "Altroz"],
      Mahindra: ["XUV700", "Thar", "Scorpio", "XUV300"],
    },
    fuelTypes: [
      "Petrol",
      "Diesel",
      "CNG",
      "Electric",
      "Hybrid",
      "Petrol + CNG",
    ],
  };

  const [formData, setFormData] = useState({
    carDetails: {
      vehicleMake: "",
      vehicleModel: "",
      vehicleYear: "",
      plateNumber: "",
      fuelType: "",
    },
    rentalDetails: {
      pricePerDay: "",
      availabilityStart: "",
      availabilityEnd: "",
      additionalInfo: "",
    },
  });

  const [availableModels, setAvailableModels] = useState([]);

  // Add new state for image
  const [carImage, setCarImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Update available models when make changes
  const handleMakeChange = (e) => {
    const make = e.target.value;
    setAvailableModels(carData.makes[make] || []);
    setFormData((prev) => ({
      ...prev,
      carDetails: { ...prev.carDetails, vehicleMake: make, vehicleModel: "" },
    }));
  };

  const handleInputChange = (section, e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [name]: value,
      },
    }));
  };

  // Add image handling function
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCarImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!carImage) {
      alert("Please upload a car image");
      return;
    }

    const { carDetails, rentalDetails } = formData;
    if (
      Object.values(carDetails).some((val) => !val) ||
      Object.values(rentalDetails).some((val) => !val)
    ) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('carImage', carImage);
      formDataToSend.append('rentalData', JSON.stringify(formData));

      const response = await fetch('http://localhost:5000/api/rental-cars', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        navigate("/rental-car-confirmation", {
          state: { 
            rentalDetails: formData,
            carId: data.carId
          }
        });
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  // Generate year options
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 31 }, (_, i) => currentYear - i);

  return (
    <div className="container mx-auto px-4 sm:px-8 lg:px-28 mt-12 mb-12">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800 flex items-center">
        <Car className="mr-4 text-indigo-600" size={40} />
        Rental Car Registration
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Car Details Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
            <Car className="mr-3 text-indigo-600" size={28} />
            Car Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Make
              </label>
              <select
                name="vehicleMake"
                value={formData.carDetails.vehicleMake}
                onChange={handleMakeChange}
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                required
              >
                <option value="">Select Make</option>
                {Object.keys(carData.makes).map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Model
              </label>
              <select
                name="vehicleModel"
                value={formData.carDetails.vehicleModel}
                onChange={(e) => handleInputChange("carDetails", e)}
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                required
                disabled={!formData.carDetails.vehicleMake}
              >
                <option value="">Select Model</option>
                {availableModels.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Year
              </label>
              <select
                name="vehicleYear"
                value={formData.carDetails.vehicleYear}
                onChange={(e) => handleInputChange("carDetails", e)}
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                required
              >
                <option value="">Select Year</option>
                {yearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fuel Type
              </label>
              <select
                name="fuelType"
                value={formData.carDetails.fuelType}
                onChange={(e) => handleInputChange("carDetails", e)}
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                required
              >
                <option value="">Select Fuel Type</option>
                {carData.fuelTypes.map((fuel) => (
                  <option key={fuel} value={fuel}>
                    {fuel}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                License Plate Number
              </label>
              <input
                type="text"
                name="plateNumber"
                value={formData.carDetails.plateNumber}
                onChange={(e) => handleInputChange("carDetails", e)}
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                required
              />
            </div>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Car Image
          </label>
          <div className="mt-1 flex items-center space-x-4">
            <div className="flex items-center justify-center w-32 h-32 border-2 border-gray-300 border-dashed rounded-lg overflow-hidden">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <Car className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-1 text-xs text-gray-500">Upload Photo</p>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100"
              required
            />
          </div>
        </div>

        {/* Rental Details Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
            <IndianRupee className="mr-3 text-indigo-600" size={28} />
            Rental Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Per Day (in ₹)
              </label>
              <input
                type="number"
                name="pricePerDay"
                value={formData.rentalDetails.pricePerDay}
                onChange={(e) => handleInputChange("rentalDetails", e)}
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                required
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability Start Date
              </label>
              <input
                type="date"
                name="availabilityStart"
                value={formData.rentalDetails.availabilityStart}
                onChange={(e) => handleInputChange("rentalDetails", e)}
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability End Date
              </label>
              <input
                type="date"
                name="availabilityEnd"
                value={formData.rentalDetails.availabilityEnd}
                onChange={(e) => handleInputChange("rentalDetails", e)}
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                required
              />
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Information
            </label>
            <textarea
              name="additionalInfo"
              value={formData.rentalDetails.additionalInfo}
              onChange={(e) => handleInputChange("rentalDetails", e)}
              className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
              rows="4"
              placeholder="Add any additional details about the car rental..."
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-800 flex items-center"
          >
            <ArrowLeft className="mr-2" />
            Back
          </Link>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-all"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default withFadeInAnimation(RentalCarOnboarding);
