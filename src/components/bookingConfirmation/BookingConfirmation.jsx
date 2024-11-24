import React, { useState } from "react";
import {
  Edit2,
  Check,
  MapPin,
  Calendar,
  Clock,
  Package,
  Smartphone,
  Banknote,
  CheckCircle,
  Car,
  User
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import withFadeInAnimation from "../../hooks/withFadeInAnimation";
import "../../hooks/fadeinanimation.css";

const paymentMethods = [
  {
    id: 1,
    name: "UPI",
    icon: <Smartphone size={28} />,
    description: "Pay using Google Pay, PhonePe, or Paytm",
  },
  {
    id: 2,
    name: "Cash on Delivery",
    icon: <Banknote size={28} />,
    description: "Pay when your car arrives",
  }
];

const BookingConfirmation = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { pickup, drop, pickupDate, pickupTime, returnDate, returnTime, selectedCar } = location.state || {};

  const renderTitle = () => (
    <h1 className="text-4xl font-extrabold mb-4 text-gray-800 flex items-center">
      <Car className="mr-4 text-indigo-600" size={40} />
      Car Rental Confirmation
    </h1>
  );

  const renderBookingDetails = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
          <MapPin className="mr-3 text-green-600" size={28} />
          Trip Details
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">From</h3>
            <p className="text-gray-600 mb-3">{pickup}</p>
            <div className="flex items-center mb-2">
              <Calendar className="mr-2 text-indigo-600" size={20} />
              <span>{pickupDate}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 text-indigo-600" size={20} />
              <span>{pickupTime}</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">To</h3>
            <p className="text-gray-600 mb-3">{drop}</p>
            <div className="flex items-center mb-2">
              <Calendar className="mr-2 text-indigo-600" size={20} />
              <span>{returnDate}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 text-indigo-600" size={20} />
              <span>{returnTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCarDetails = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
          <Car className="mr-3 text-indigo-600" size={28} />
          Car Details
        </h2>
        <div className="flex gap-96">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{selectedCar.name}</h3>
            <p className="text-gray-600 mt-2">{selectedCar.type}</p>
          </div>
          <div>
            <img 
              src={selectedCar.image} 
              alt={selectedCar.name}
              className="w-40 h-40 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaymentSummary = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
          <Banknote className="mr-3 text-purple-600" size={28} />
          Payment Summary
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Car Rental Charges</span>
            <span className="text-lg font-semibold">₹{selectedCar.price.toFixed(2)}</span>
          </div>
          <hr className="my-3" />
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-semibold">Total Amount</span>
            <span className="text-2xl font-bold text-indigo-600">
              ₹{selectedCar.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {renderTitle()}
          <hr />
          <br />
          {renderBookingDetails()}
          {renderCarDetails()}
          {renderPaymentSummary()}

          {/* Payment Methods */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <Banknote className="mr-3 text-purple-600" size={28} />
                Select Payment Method
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setSelectedPayment(method)}
                    className={`relative p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer transform hover:scale-[1.02]
                      ${selectedPayment?.id === method.id 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-200 hover:border-indigo-200 hover:bg-gray-50'}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className={`p-2 rounded-lg ${
                        selectedPayment?.id === method.id ? 'text-indigo-600' : 'text-gray-600'
                      }`}>
                        {method.icon}
                      </div>
                      {selectedPayment?.id === method.id && (
                        <CheckCircle className="text-indigo-500" size={24} />
                      )}
                    </div>
                    <h3 className="mt-4 font-semibold text-gray-900">{method.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{method.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 flex items-center justify-center bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Edit2 className="mr-2" size={20} />
              Modify Details
            </button>
            <button
              onClick={() => {
                if (!selectedPayment) {
                  alert("Please select a payment method");
                  return;
                }
                console.log("Booking confirmed", { 
                  ...location.state, 
                  paymentMethod: selectedPayment 
                });
              }}
              className={`flex-1 flex items-center justify-center py-3 rounded-lg transition-colors ${
                selectedPayment 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-gray-400 text-gray-200 cursor-not-allowed'
              }`}
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
