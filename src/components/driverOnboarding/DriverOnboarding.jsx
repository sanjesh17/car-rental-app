import React, { useState, useEffect } from "react";
import { UserPlus, ArrowLeft, Car, IdCard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import withFadeInAnimation from "../../hooks/withFadeInAnimation";
import "../../hooks/fadeinanimation.css";

const DriverOnboarding = () => {
  const navigate = useNavigate();

  // Vehicle data for dropdowns
  const vehicleData = {
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
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "", // Add password field
    },
    driverInfo: {
      licenseNumber: "",
      licenseExpiry: "",
      experience: "",
      preferredArea: ""
    },
    vehicleInfo: {
      vehicleMake: "",
      vehicleModel: "",
      vehicleYear: "",
      plateNumber: "",
      fuelType: ""
    }
  });

  // State for available models based on selected make
  const [availableModels, setAvailableModels] = useState([]);

  // Add new state for image
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Update available models when make changes
  useEffect(() => {
    if (formData.vehicleInfo.vehicleMake) {
      setAvailableModels(
        vehicleData.makes[formData.vehicleInfo.vehicleMake] || []
      );
      // Reset model if make changes
      if (
        !vehicleData.makes[formData.vehicleInfo.vehicleMake]?.includes(
          formData.vehicleInfo.vehicleModel
        )
      ) {
        setFormData((prev) => ({
          ...prev,
          vehicleInfo: {
            ...prev.vehicleInfo,
            vehicleModel: "",
          },
        }));
      }
    }
  }, [formData.vehicleInfo.vehicleMake]);

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
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const { personalInfo, driverInfo, vehicleInfo } = formData;
    if (
      Object.values(personalInfo).some((val) => !val) ||
      Object.values(driverInfo).some((val) => !val) ||
      Object.values(vehicleInfo).some((val) => !val) ||
      !profileImage
    ) {
      alert("Please fill in all required fields and upload a profile image");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('profileImage', profileImage);
      formDataToSend.append('driverData', JSON.stringify(formData));

      const response = await fetch('https://dropx-backend.onrender.com/api/driver-registration', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        navigate("/driver-verification", {
          state: {
            driverDetails: formData,
            driverId: data.driverId
          },
        });
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  // Generate year options (last 30 years)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 31 }, (_, i) => currentYear - i);

  // Add this to your JSX, inside the Personal Information section
  const imageUploadSection = (
    <div className="col-span-2">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Profile Image
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
              <UserPlus className="mx-auto h-12 w-12 text-gray-400" />
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
  );

  return (
    <div className="container mx-auto px-4 sm:px-8 lg:px-28 mt-12 mb-12">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800 flex items-center">
        <UserPlus className="mr-4 text-indigo-600" size={40} />
        Driver Registration
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
            <UserPlus className="mr-3 text-indigo-600" size={28} />
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.personalInfo.firstName}
                onChange={(e) => handleInputChange("personalInfo", e)}
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.personalInfo.lastName}
                onChange={(e) => handleInputChange("personalInfo", e)}
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.personalInfo.email}
                onChange={(e) => handleInputChange("personalInfo", e)}
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.personalInfo.phone}
                onChange={(e) => handleInputChange("personalInfo", e)}
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.personalInfo.password}
                onChange={(e) => handleInputChange("personalInfo", e)}
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                required
              />
            </div>
            {imageUploadSection}
          </div>
        </div>

        {/* Driver License Information */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
            <IdCard className="mr-3 text-indigo-600" size={28} />
            Driver License Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                License Number
              </label>
              <input
                type="text"
                name="licenseNumber"
                value={formData.driverInfo.licenseNumber}
                onChange={(e) => handleInputChange("driverInfo", e)}
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                License Expiry Date
              </label>
              <input
                type="date"
                name="licenseExpiry"
                value={formData.driverInfo.licenseExpiry}
                onChange={(e) => handleInputChange("driverInfo", e)}
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Years of Experience
              </label>
              <input
                type="number"
                name="experience"
                value={formData.driverInfo.experience}
                onChange={(e) => handleInputChange("driverInfo", e)}
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                required
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Service Area
              </label>
              <input
                type="text"
                name="preferredArea"
                value={formData.driverInfo.preferredArea}
                onChange={(e) => handleInputChange("driverInfo", e)}
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                required
              />
            </div>
          </div>
        </div>

        {/* Vehicle Information */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
            <Car className="mr-3 text-indigo-600" size={28} />
            Vehicle Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Make
              </label>
              <select
                name="vehicleMake"
                value={formData.vehicleInfo.vehicleMake}
                onChange={(e) => handleInputChange("vehicleInfo", e)}
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                required
              >
                <option value="">Select Make</option>
                {Object.keys(vehicleData.makes).map((make) => (
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
                value={formData.vehicleInfo.vehicleModel}
                onChange={(e) => handleInputChange("vehicleInfo", e)}
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                required
                disabled={!formData.vehicleInfo.vehicleMake}
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
                value={formData.vehicleInfo.vehicleYear}
                onChange={(e) => handleInputChange("vehicleInfo", e)}
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
                value={formData.vehicleInfo.fuelType}
                onChange={(e) => handleInputChange("vehicleInfo", e)}
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                required
              >
                <option value="">Select Fuel Type</option>
                {vehicleData.fuelTypes.map((fuel) => (
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
                value={formData.vehicleInfo.plateNumber}
                onChange={(e) => handleInputChange("vehicleInfo", e)}
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                required
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="order-2 sm:order-1">
            <Link to="/">
              <button
                type="button"
                className="w-full sm:w-auto flex items-center justify-center bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300"
              >
                <ArrowLeft className="mr-2" size={20} />
                Back
              </button>
            </Link>
          </div>
          <button
            type="submit"
            className="order-1 sm:order-2 w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center"
          >
            Submit Registration
          </button>
        </div>
      </form>
    </div>
  );
};

export default withFadeInAnimation(DriverOnboarding);
