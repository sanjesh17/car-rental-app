import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authUtils";
import axios from "axios";
import {
  Smartphone,
  Shield,
  ArrowRight,
  Truck,
  Package,
  MapPin,
  Coffee,
  Rocket,
  Loader2,
} from "lucide-react";

const SignUp = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
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
      const response = await axios.post("/api/user/check", {
        phone: cleanedPhone,
      });

      if (response.data.exists) {
        setStep(2); // User exists, ask for password
      } else {
        setStep(3); // User does not exist, ask to create password
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Network error. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/user/login", {
        phone: phone.replace(/\D/g, ""),
        password,
      });

      if (response.data.success) {
        // Use login method from AuthContext
        login(response.data.token, response.data.user);

        // Navigate to profile or dashboard
        navigate("/");
      } else {
        setError(response.data.message || "Failed to log in");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Network error. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, password, fullName, dob }),
      });

      const data = await response.json();

      if (data.success) {
        login(data.token, data.user);
        navigate("/user-dashboard");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-max py-40 md:min-h-screen relative bg-gradient-to-br from-indigo-50 to-white flex flex-col justify-center overflow-hidden">
      {/* Background Icons */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute animate-bounce top-10 left-10">
            <Truck className="w-24 h-24 text-indigo-300" />
          </div>
          <div className="absolute animate-ping bottom-10 right-10">
            <Package className="w-24 h-24 text-indigo-300" />
          </div>
          <div className="absolute animate-spin top-1/3 left-1/4">
            <MapPin className="w-24 h-24 text-indigo-300" />
          </div>
          <div className="absolute animate-pulse bottom-1/4 right-1/3">
            <Coffee className="w-24 h-24 text-indigo-300" />
          </div>
          <div className="absolute animate-bounce top-1/2 right-1/4">
            <Rocket className="w-24 h-24 text-indigo-300" />
          </div>
        </div>
      </div>

      <div className="max-w-sm md:max-w-md mx-auto w-full relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6 border border-indigo-100">
          <div className="text-center">
            <div className="bg-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 hover:rotate-45 transition-transform duration-300">
              <Smartphone className="w-10 h-10 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {step === 1
                ? "Get Started"
                : step === 2
                ? "Log In"
                : "Create Account"}
            </h1>
            <p className="text-gray-600">
              {step === 1
                ? "Enter your phone number"
                : step === 2
                ? "Enter your password"
                : "Create your account"}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          {step === 1 ? (
            <form
              onSubmit={handlePhoneSubmit}
              className="space-y-4"
            >
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 group-focus-within:text-indigo-600 transition">
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
                  placeholder="Enter Your Number"
                  maxLength="10"
                  className="w-full pl-14 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-indigo-300 transition"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition transform hover:scale-105 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" /> Checking...
                  </>
                ) : (
                  <>
                    Next <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          ) : step === 2 ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 group-focus-within:text-indigo-600 transition">
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
                  placeholder="Enter Your Number"
                  maxLength="10"
                  className="w-full pl-14 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-indigo-300 transition"
                  disabled
                />
              </div>
              <div className="relative group">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Your Password"
                  className="w-full pl-4 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-indigo-300 transition"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition transform hover:scale-105 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" /> Logging in...
                  </>
                ) : (
                  <>
                    Log In <Shield className="ml-2 w-5 h-5" />
                  </>
                )}
              </button>
              <p className="text-center text-sm text-gray-500">
                Not Your Number?
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-indigo-600 ml-1 font-medium hover:underline"
                >
                  Change Number
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleSignUpSubmit} className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 group-focus-within:text-indigo-600 transition">
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
                  placeholder="Enter Your Number"
                  maxLength="10"
                  className="w-full pl-14 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-indigo-300 transition"
                  disabled
                />
              </div>
              <div className="relative group">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter Your Full Name"
                  className="w-full pl-4 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-indigo-300 transition"
                />
              </div>
              <div className="relative group">
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  placeholder="Enter Your Date of Birth"
                  className="w-full pl-4 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-indigo-300 transition"
                />
              </div>
              <div className="relative group">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a Password"
                  className="w-full pl-4 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-indigo-300 transition"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition transform hover:scale-105 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" /> Signing up...
                  </>
                ) : (
                  <>
                    Sign Up <Shield className="ml-2 w-5 h-5" />
                  </>
                )}
              </button>
              <p className="text-center text-sm text-gray-500">
                Not Your Number?
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-indigo-600 ml-1 font-medium hover:underline"
                >
                  Change Number
                </button>
              </p>
            </form>
          )}

          <div className="text-center text-xs text-gray-500 mt-4">
            By continuing, you're joining our
            <button className="text-indigo-600 ml-1 font-medium hover:underline">
              User Club
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
