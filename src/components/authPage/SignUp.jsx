import React, { useState } from "react";
import {
  Smartphone,
  Shield,
  ArrowRight,
  Truck,
  Package,
  MapPin,
  Coffee,
  Rocket,
} from "lucide-react";

const SignUp = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  // 🕺 Dance with validation! Make sure phone number is legit
  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phone.trim() === "" || phone.length < 10) {
      alert("Oops! Looks like your phone number is playing hide and seek 🙈");
      return;
    }
    setStep(2);
  };

  // 🎉 OTP party! Let's verify this code
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp.trim() === "" || otp.length !== 6) {
      alert("6 digits of magic needed! Come on, you can do it! 🔮");
      return;
    }
    alert("🚀 Welcome aboard! Let the adventure begin!");
  };

  return (
    <div className="h-max py-40 md:min-h-screen relative bg-gradient-to-br from-indigo-50 to-white flex flex-col justify-center  overflow-hidden">
      {/* 🎨 Magical background with dancing icons */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Playful floating icons */}
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
              {step === 1 ? "Get Started" : "Enter OTP"}
            </h1>
            <p className="text-gray-600">
              {step === 1
                ? ""
                : "Verify OTP"}
            </p>
          </div>

          {step === 1 ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 group-focus-within:text-indigo-600 transition">
                    +91
                  </span>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter Your Number"
                  maxLength="10"
                  className="w-full pl-14 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-indigo-300 transition"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition transform hover:scale-105 flex items-center justify-center"
              >
                Send OTP
                <ArrowRight className="ml-2 w-5 h-5" />
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
                      newOtp[index] = e.target.value;
                      setOtp(newOtp.join(""));
                    }}
                    className="w-12 h-14 text-center border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 hover:border-indigo-300 transition"
                  />
                ))}
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition transform hover:scale-105 flex items-center justify-center"
              >
                Submit
                <Shield className="ml-2 w-5 h-5" />
              </button>
              <p className="text-center text-sm text-gray-500">
                Not Your Number?
                <button className="text-indigo-600 ml-1 font-medium hover:underline">
                  Resend OTP
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
