import React from "react";
import Navigation from "../components/Navigation/Navigation";
import DriverLogin from "../components/authPage/DriverLogin";
import FooterSection from "../components/FooterSection/FooterSection";

const DriverAuth = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <DriverLogin />
      <FooterSection />
    </div>
  );
};

export default DriverAuth;
