import React from "react";
import LandingSection from "../components/LandingSection/LandingSection";
import FleetSection from "../components/FleetSection/FleetSection";
import OrderSection from "../components/OrderSection/OrderSection";
import AboutSection from "../components/AboutSection/AboutSection";
import FooterSection from "../components/FooterSection/FooterSection";
import AuthModel from "../components/AuthModel/AuthModel";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <LandingSection />
      <FleetSection />
      <OrderSection />
      <AboutSection />
      <FooterSection />
      <AuthModel />
    </div>
  );
};

export default LandingPage;
