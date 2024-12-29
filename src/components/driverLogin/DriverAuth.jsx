import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../authUtils";

const DriverAuth = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  const { driverLogin } = useAuth();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/driver/send-otp",
        { phone }
      );
      if (response.data.success) {
        setStep(2);
        setError("");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error sending OTP");
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/driver/verify-otp",
        {
          phone,
          otp,
        }
      );
      if (response.data.success) {
        // Store JWT token and driver info
        driverLogin(response.data.token);

        // Redirect to driver dashboard or home page
        window.location.href = "/driver-dashboard";
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error verifying OTP");
    }
  };

  // Logout function to use in other components
  const handleLogout = () => {
    // Remove token and driver info
    localStorage.removeItem("driverToken");
    localStorage.removeItem("driverInfo");

    // Remove axios authorization header
    delete axios.defaults.headers.common["Authorization"];

    // Redirect to login page
    window.location.href = "/driver/login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {step === 1 ? "Driver Login" : "Verify OTP"}
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleSendOTP}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Phone Number</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                  +91
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  maxLength="10"
                  className="rounded-r-lg border block flex-1 min-w-0 w-full text-sm p-2.5"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Enter OTP</label>
              <div className="flex space-x-2 justify-center">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={otp[index] || ""}
                    onChange={(e) => {
                      const newOtp = otp.split("");
                      newOtp[index] = e.target.value;
                      setOtp(newOtp.join(""));
                    }}
                    className="w-10 h-10 text-center border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
            >
              Verify OTP
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full mt-2 text-blue-500 hover:underline"
            >
              Change Phone Number
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default DriverAuth;
