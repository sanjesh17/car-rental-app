import React from "react";
import LandingSection from "../components/LandingSection/LandingSection";
import FleetSection from "../components/FleetSection/FleetSection";
import AboutSection from "../components/AboutSection/AboutSection";
import FooterSection from "../components/FooterSection/FooterSection";
import Navigation from "../components/Navigation/Navigation";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <LandingSection />
      <FleetSection />
      <AboutSection />
      <FooterSection />
    </div>
  );
};

export default LandingPage;
