import React, { useState } from "react";
import {
  Edit2,
  Check,
  Car,
  MapPin,
  Calendar,
  Clock,
  User,
  CreditCard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import withFadeInAnimation from "../../hooks/withFadeInAnimation";
import "../../hooks/fadeinanimation.css";

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedCar = location.state?.selectedCar;
  const [bookingDetails, setBookingDetails] = useState({
    car: {
      name: "Toyota Innova",
      type: "Diesel | 7 seater",
      price: 3000.0,
      image: "/path/to/car-image.jpg", // Replace with actual image path
    },
    pickup: {
      location: "123 Downtown Street, City",
      date: "2024-02-15",
      time: "10:00 AM",
    },
    dropoff: {
      location: "456 Suburb Avenue, City",
      date: "2024-02-18",
      time: "06:00 PM",
    },
    customer: {
      name: "John Doe",
      phone: "+91 9876543210",
    },
    totalCost: 9000.0,
  });

  const handleModifyBooking = () => {
    navigate("/car-selection");
  };

  const handleConfirmBooking = () => {
    // Implement confirm booking logic (e.g., API call or local storage update)
    console.log("Booking Confirmed", bookingDetails);
  };

  if (!selectedCar) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <h1 className="text-4xl font-extrabold mb-4 text-gray-800 flex items-center">
            <Check className="mr-4 text-green-600" size={40} />
            Booking Confirmation
          </h1>
          <hr />
          <br />

          {/* Car Details */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
                <Car className="mr-3 text-indigo-600" size={28} />
                Selected Car
              </h2>
              <div className="flex flex-col md:flex-row items-center">
                <img
                  src={selectedCar.image}
                  alt={selectedCar.name}
                  className="w-48 h-36 object-cover rounded-lg mr-6 mb-4 md:mb-0"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {selectedCar.name}
                  </h3>
                  <p className="text-gray-600">{selectedCar.type}</p>
                  <div className="mt-2">
                    <span className="text-2xl font-bold text-indigo-600">
                      ₹{selectedCar.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">per day</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
                <MapPin className="mr-3 text-green-600" size={28} />
                Booking Details
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Pickup Details */}
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Pickup Details
                  </h3>
                  <div className="flex items-center mb-2">
                    <Calendar className="mr-2 text-indigo-600" size={20} />
                    <span>{bookingDetails.pickup.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 text-indigo-600" size={20} />
                    <span>{bookingDetails.pickup.time}</span>
                  </div>
                  <p className="mt-2 text-gray-600">
                    {bookingDetails.pickup.location}
                  </p>
                </div>

                {/* Drop-off Details */}
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Drop-off Details
                  </h3>
                  <div className="flex items-center mb-2">
                    <Calendar className="mr-2 text-green-600" size={20} />
                    <span>{bookingDetails.dropoff.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 text-green-600" size={20} />
                    <span>{bookingDetails.dropoff.time}</span>
                  </div>
                  <p className="mt-2 text-gray-600">
                    {bookingDetails.dropoff.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
                <User className="mr-3 text-blue-600" size={28} />
                Customer Information
              </h2>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {bookingDetails.customer.name}
                </h3>
                <p className="text-gray-600">{bookingDetails.customer.phone}</p>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
                <CreditCard className="mr-3 text-purple-600" size={28} />
                Payment Summary
              </h2>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Total Booking Cost</span>
                <span className="text-2xl font-bold text-indigo-600">
                  ₹{bookingDetails.totalCost.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
            <button
              onClick={handleModifyBooking}
              className="flex-1 flex items-center justify-center bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Edit2 className="mr-2" size={20} />
              Modify Booking
            </button>
            <button
              onClick={handleConfirmBooking}
              className="flex-1 flex items-center justify-center bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Confirm Booking
              <Check className="ml-2" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withFadeInAnimation(BookingConfirmation);
