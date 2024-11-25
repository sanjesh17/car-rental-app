import React, { useEffect, useState } from "react";
import {
  Check,
  Calendar,
  Clock,
  MapPin,
  Download,
  Share2,
  ChevronRight,
  Box,
  Package,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const GoodsPaymentConfirmed = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { pickup, drop, pickupDate, pickupTime, goodsDetails, paymentMethod } =
    location.state || {};

  const bookingId =
    "GD" + Math.random().toString(36).substr(2, 9).toUpperCase();

  useEffect(() => {
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  }, []);

  const SuccessHeader = () => (
    <div className="text-center mb-8">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Check className="w-8 h-8 text-green-600" />
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Payment Successful!
      </h1>
      <p className="text-gray-600">Your goods shipment is confirmed</p>
      <div className="mt-4 text-sm font-medium text-gray-600">
        Booking ID: {bookingId}
      </div>
    </div>
  );

  const BookingCard = () => (
    <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Package className="w-6 h-6 text-indigo-600" />
          <div>
            <h3 className="font-semibold">{goodsDetails.goodsType}</h3>
            <p className="text-sm text-gray-600">{`${goodsDetails.weight} kg`}</p>
          </div>
        </div>
        <span className="text-lg font-semibold text-indigo-600">
          ₹{goodsDetails.totalCost.toFixed(2)}
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <MapPin className="w-5 h-5 text-gray-400 mt-1" />
          <div>
            <div className="text-sm font-medium">Pickup</div>
            <div className="text-sm text-gray-600">{pickup}</div>
            <div className="flex items-center mt-1 text-xs text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              {pickupDate}
              <Clock className="w-4 h-4 ml-3 mr-1" />
              {pickupTime}
            </div>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <MapPin className="w-5 h-5 text-gray-400 mt-1" />
          <div>
            <div className="text-sm font-medium">Drop-off</div>
            <div className="text-sm text-gray-600">{drop}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const ActionButtons = () => (
    <div className="space-y-3">
      <button className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700">
        <Download className="w-5 h-5" />
        <span>Download Invoice</span>
      </button>

      <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 py-3 rounded-xl text-gray-700 hover:bg-gray-50">
        <Share2 className="w-5 h-5" />
        <span>Share Booking Details</span>
      </button>
    </div>
  );

  const NextSteps = () => (
    <div className="bg-gray-50 rounded-2xl p-6">
      <h3 className="font-semibold mb-4">What's Next?</h3>
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <span className="text-sm text-green-600">1</span>
          </div>
          <div>
            <p className="text-sm text-gray-600">
              You will receive a confirmation email with shipment details
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <span className="text-sm text-green-600">2</span>
          </div>
          <div>
            <p className="text-sm text-gray-600">
              Our team will contact you before pickup
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <span className="text-sm text-green-600">3</span>
          </div>
          <div>
            <p className="text-sm text-gray-600">
              Track your shipment in real-time using the booking ID
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4">
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-yellow-500 rounded-full animate-ping" />
              <div className="w-4 h-4 bg-indigo-500 rounded-full animate-ping delay-100" />
              <div className="w-4 h-4 bg-green-500 rounded-full animate-ping delay-200" />
            </div>
          </div>
        )}

        <SuccessHeader />
        <BookingCard />
        <ActionButtons />
        <div className="my-6">
          <NextSteps />
        </div>

        <button
          onClick={() => navigate("/bookings")}
          className="w-full mt-6 flex items-center justify-center space-x-2 text-indigo-600 py-3 rounded-xl hover:bg-indigo-50"
        >
          <span>View All Bookings</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default GoodsPaymentConfirmed;
