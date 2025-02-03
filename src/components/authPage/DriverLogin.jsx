import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authUtils";

const DriverLogin = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { driverLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/driver/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, password }),
      });

      const data = await response.json();

      if (data.success) {
        driverLogin(data.token, data.driver);
        navigate("/driver-dashboard");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-8 lg:px-28 mt-12 mb-12">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800">Driver Login</h1>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-center">
          {error}
        </div>
      )}
      <form onSubmit={handleLogin} className="space-y-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-1 gap-6">
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
                className="w-full p-3 pl-12 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Your Password"
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                required
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default DriverLogin;