import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authUtils";
import {
  Truck,
  Shield,
  ArrowRight,
  Package,
  MapPin,
  Coffee,
  Rocket,
  Loader2,
} from "lucide-react";

const DriverLogin = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Use authentication context
  const { driverLogin } = useAuth();
  const navigate = useNavigate();

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();

    // Phone number validation
    const cleanedPhone = phone.replace(/\D/g, "");
    if (cleanedPhone.length !== 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      console.log("Sending OTP to phone:", cleanedPhone); // Add this line
      const response = await axios.post("/api/driver/send-otp", {
        phone: cleanedPhone,
      });

      if (response.data.success) {
        setStep(2);
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Network error. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    // OTP validation
    const cleanedOtp = otp.replace(/\D/g, "");
    if (cleanedOtp.length !== 6) {
      setError("Please enter a 6-digit OTP");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      console.log("Verifying OTP with phone:", phone, "and OTP:", otp);
      const response = await axios.post("/api/driver/verify-otp", {
        phone: phone.replace(/\D/g, ""),
        otp: cleanedOtp,
      });

      if (response.data.success) {
        driverLogin(response.data.token);
        navigate("/driver-dashboard");
      } else {
        setError(response.data.message || "OTP verification failed");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Network error. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/driver/send-otp", {
        phone: phone.replace(/\D/g, ""),
      });

      if (response.data.success) {
        alert("OTP Resent Successfully!");
      } else {
        setError(response.data.message || "Failed to resend OTP");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Network error. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-max py-40 md:min-h-screen relative bg-gradient-to-br from-green-50 to-white flex flex-col justify-center overflow-hidden">
      {/* Background Icons */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute animate-bounce top-10 left-10">
            <Truck className="w-24 h-24 text-green-300" />
          </div>
          <div className="absolute animate-ping bottom-10 right-10">
            <Package className="w-24 h-24 text-green-300" />
          </div>
          <div className="absolute animate-spin top-1/3 left-1/4">
            <MapPin className="w-24 h-24 text-green-300" />
          </div>
          <div className="absolute animate-pulse bottom-1/4 right-1/3">
            <Coffee className="w-24 h-24 text-green-300" />
          </div>
          <div className="absolute animate-bounce top-1/2 right-1/4">
            <Rocket className="w-24 h-24 text-green-300" />
          </div>
        </div>
      </div>

      <div className="max-w-sm md:max-w-md mx-auto w-full relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6 border border-green-100">
          <div className="text-center">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 hover:rotate-45 transition-transform duration-300">
              <Truck className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {step === 1 ? "Driver Login" : "Enter OTP"}
            </h1>
            <p className="text-gray-600">
              {step === 1
                ? "Enter your registered phone number"
                : "Verify OTP sent to your number"}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 group-focus-within:text-green-600 transition">
                    +91
                  </span>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    // Only allow digits
                    const value = e.target.value.replace(/\D/g, "");
                    setPhone(value);
                  }}
                  placeholder="Enter Your Registered Number"
                  maxLength="10"
                  className="w-full pl-14 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent hover:border-green-300 transition"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition transform hover:scale-105 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    Send OTP <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div className="flex space-x-2 justify-center">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={otp[index] || ""}
                    onChange={(e) => {
                      const newOtp = otp.split("");
                      newOtp[index] = e.target.value.replace(/\D/g, "");
                      setOtp(newOtp.join(""));
                    }}
                    className="w-12 h-14 text-center border-2 rounded-lg focus:ring-2 focus:ring-green-500 hover:border-green-300 transition"
                  />
                ))}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition transform hover:scale-105 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" /> Verifying...
                  </>
                ) : (
                  <>
                    Submit <Shield className="ml-2 w-5 h-5" />
                  </>
                )}
              </button>
              <p className="text-center text-sm text-gray-500">
                Not Your Number?
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-green-600 ml-1 font-medium hover:underline"
                >
                  Change Number
                </button>
              </p>
              <p className="text-center text-sm text-gray-500">
                Didn't Receive OTP?
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isLoading}
                  className="text-green-600 ml-1 font-medium hover:underline"
                >
                  Resend OTP
                </button>
              </p>
            </form>
          )}

          <div className="text-center text-xs text-gray-500 mt-4">
            By continuing, you're joining our
            <button className="text-green-600 ml-1 font-medium hover:underline">
              Driver Network
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverLogin;
