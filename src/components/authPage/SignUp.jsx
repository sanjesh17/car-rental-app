import React, { useState } from "react";
import landingimage from "../../assets/landing.jpg";
import withFadeInAnimation from "../../hooks/withFadeInAnimation";
import "../../hooks/fadeinanimation.css";

const SignUp = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1 for phone input, 2 for OTP verification

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phone.trim() === "" || phone.length < 10) {
      alert("Please enter a valid phone number");
      return;
    }
    setStep(2); // Proceed to OTP step
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp.trim() === "" || otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }
    alert("Sign-Up Successful!");
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${landingimage})` }}
    >
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg scale-[1.2] mt-[-120px]">
        <h1 className="text-2xl font-bold mb-6 text-center ">
          {step === 1 ? "Sign Up" : "Verify OTP"}
        </h1>

        {step === 1 ? (
          <form onSubmit={handlePhoneSubmit}>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter your phone number
            </label>
            <div className="relative mb-6">
              <span className="absolute left-3 top-[9px] text-gray-900">
                +91
              </span>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="123 456 7890"
                className="w-full pl-12 pr-4 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                maxLength="10"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition duration-300"
            >
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit}>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter the OTP
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="6-digit OTP"
              className="w-full border rounded-lg py-2 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent mb-6"
              maxLength="6"
            />
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition duration-300"
            >
              Verify & Sign Up
            </button>
          </form>
        )}

        <p className="text-center text-sm text-gray-600 mt-4">
          By continuing, you agree to our{" "}
          <a
            href="#"
            className="text-gray-900 font-medium underline hover:no-underline"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="text-gray-900 font-medium underline hover:no-underline"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default withFadeInAnimation(SignUp);
