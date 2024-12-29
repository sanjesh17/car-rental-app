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
  Weight,
  Box,
  Ruler,
  ArrowRight,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const paymentMethods = [
  {
    id: 1,
    name: "UPI",
    icon: <Smartphone size={24} />,
    description: "Pay using Google Pay, PhonePe, or Paytm",
  },
  {
    id: 2,
    name: "Cash on Delivery",
    icon: <Banknote size={24} />,
    description: "Pay when your goods are delivered",
  },
];

const GoodsBookingConfirmation = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { pickup, pickupDate, pickupTime, goodsDetails, drop } = location.state || {};

  const PickupCard = () => (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Pickup Details</h2>
      <div className="flex items-start space-x-3">
        <div className="mt-1">
          <MapPin size={20} className="text-green-500" />
        </div>
        <div className="flex-1">
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
      </div>
    </div>
  );
  const DropCard = () => (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Drop Details</h2>
      <div className="flex items-start space-x-3">
        <div className="mt-1">
          <MapPin size={20} className="text-green-500" />
        </div>
        <div className="flex-1">
          <div className="text-sm text-gray-500">Drop Location</div>
          <div className="font-medium">{drop}</div>
        </div>
      </div>
    </div>
  );

  const GoodsCard = () => (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Goods Information</h2>
      <div className="space-y-3">
        <div className="flex items-center space-x-4">
          <Box size={24} className="text-indigo-600" />
          <div>
            <div className="text-sm text-gray-500">Goods Type</div>
            <div className="font-medium">{goodsDetails.goodsType}</div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Weight size={24} className="text-indigo-600" />
          <div>
            <div className="text-sm text-gray-500">Weight</div>
            <div className="font-medium">{goodsDetails.weight} kg</div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Ruler size={24} className="text-indigo-600" />
          <div>
            <div className="text-sm text-gray-500">Dimensions</div>
            <div className="font-medium">
              {goodsDetails.length}×{goodsDetails.width}×{goodsDetails.height}{" "}
              cm
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PaymentMethodCard = () => (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            onClick={() => setSelectedPayment(method)}
            className={`relative p-4 rounded-xl border transition-all duration-200
              ${
                selectedPayment?.id === method.id
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-200"
              }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`text-indigo-600`}>{method.icon}</div>
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

  const PricingSummary = () => (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Price Breakdown</h2>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Base Price</span>
          <span>₹2,000.00</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Volume Charges</span>
          <span>₹{(goodsDetails.totalVolume * 0.5).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Weight Charges</span>
          <span>₹{(goodsDetails.weight * 2).toFixed(2)}</span>
        </div>
        <div className="border-t mt-3 pt-3">
          <div className="flex justify-between font-semibold">
            <span>Total Amount</span>
            <span className="text-indigo-600">
              ₹{goodsDetails.totalCost.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const BottomBar = () => (
    <div className="fixed bottom-14 left-0 w-full bg-white border-t p-4">
      <div className="max-w-md mx-auto flex space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="flex-1 py-3 px-4 rounded-xl border border-gray-300 font-medium text-gray-700"
        >
          Modify Details
        </button>
        <button
          onClick={() => {
            if (!selectedPayment) {
              alert("Please select a payment method");
              return;
            }
            navigate("/goods/payment-confirmed", {
              state: {
                ...location.state,
                paymentMethod: { ...selectedPayment, icon: undefined },
              },
            });
          }}
          className={`flex-1 py-3 px-4 rounded-xl font-medium flex items-center justify-center
            ${
              selectedPayment
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-400"
            }`}
        >
          Confirm Booking
          <ArrowRight size={18} className="ml-2" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-24 pt-10">
      <div className="max-w-md mx-auto px-4 space-y-4">
        <PickupCard />
        <DropCard />
        <GoodsCard />
        <PaymentMethodCard />
        <PricingSummary />
      </div>
      <BottomBar />
    </div>
  );
};

export default GoodsBookingConfirmation;
