import React, { useState } from "react";
import {
  Edit2, Check, MapPin, Calendar, Clock, 
  Smartphone, Banknote, CheckCircle, Car,
  ArrowRight
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const paymentMethods = [
  {
    id: 1,
    name: "UPI",
    icon: <Smartphone size={24} />,
    description: "Pay using Google Pay, PhonePe, or Paytm"
  },
  {
    id: 2,
    name: "Cash on Delivery",
    icon: <Banknote size={24} />,
    description: "Pay when your car arrives"
  }
];

const BookingConfirmation = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    pickup, drop, pickupDate, pickupTime,
    returnDate, returnTime, selectedCar
  } = location.state || {};

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
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
            2
          </div>
          <div className="text-sm font-medium">Payment</div>
        </div>
        <div className="h-0.5 w-12 bg-gray-200" />
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            3
          </div>
          <div className="text-sm text-gray-500">Confirm</div>
        </div>
      </div>
    </div>
  );

  const TripCard = () => (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Trip Details</h2>
      <div className="space-y-4">
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
              <div className="flex items-center space-x-3 mt-1 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  {returnDate}
                </div>
                <div className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  {returnTime}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const CarCard = () => (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Car Details</h2>
      <div className="flex items-start space-x-4">
        <img
          src={selectedCar.image}
          alt={selectedCar.name}
          className="w-32 h-24 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{selectedCar.name}</h3>
          <div className="mt-2 space-y-1">
            <div className="flex items-center text-sm text-gray-600">
              <Car size={14} className="mr-2" />
              {selectedCar.type}
            </div>
            <div className="text-sm text-gray-600">
              Automatic Transmission
            </div>
            <div className="text-sm text-gray-600">
              Fuel: Petrol
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PaymentMethodCard = () => {
    // Create a function to handle payment selection that creates a sanitized version
    const handlePaymentSelection = (method) => {
      const { icon, ...sanitizedMethod } = method;
      setSelectedPayment(sanitizedMethod);
    };

    return (
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              onClick={() => handlePaymentSelection(method)}
              className={`relative p-4 rounded-xl border transition-all duration-200
                ${
                  selectedPayment?.id === method.id
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-200"
                }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`text-indigo-600`}>
                  {method.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{method.name}</h3>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>
                {selectedPayment?.id === method.id && (
                  <CheckCircle className="text-indigo-600" size={20} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const PricingSummary = () => (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Price Breakdown</h2>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Car Rental Charges</span>
          <span>₹{selectedCar.price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Insurance</span>
          <span>Included</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Platform Fee</span>
          <span>₹0.00</span>
        </div>
        <div className="border-t mt-3 pt-3">
          <div className="flex justify-between font-semibold">
            <span>Total Amount</span>
            <span className="text-indigo-600">₹{selectedCar.price.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const BottomBar = () => (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4">
      <div className="max-w-md mx-auto flex space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="flex-1 py-3 px-4 rounded-xl border border-gray-300 font-medium text-gray-700"
        >
          Back
        </button>
        <button
          onClick={() => {
            if (!selectedPayment) {
              alert("Please select a payment method");
              return;
            }
            
            // Navigate with proper state structure
            navigate("/payment-confirmed", {
              state: {
                ...location.state,
                paymentMethod: { ...selectedPayment, icon : undefined}, // Already sanitized when selected
              }
            });
          }}
          className={`flex-1 py-3 px-4 rounded-xl font-medium flex items-center justify-center
            ${
              selectedPayment
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-400"
            }`}
        >
          Proceed to Pay
          <ArrowRight size={18} className="ml-2" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-24 pt-16">
      <BookingProgress />
      <div className="max-w-md mx-auto px-4 space-y-4">
        <TripCard />
        <CarCard />
        <PaymentMethodCard />
        <PricingSummary />
      </div>
      <BottomBar />
    </div>
  );
};

export default BookingConfirmation;