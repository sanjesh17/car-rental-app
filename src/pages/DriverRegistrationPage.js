import React from "react";
import Navigation from "../components/Navigation/Navigation";
import DriverOnboarding from "../components/driverOnboarding/DriverOnboarding";
import FooterSection from "../components/FooterSection/FooterSection";

const DriverRegistrationPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <DriverOnboarding />
      <FooterSection />
    </div>
  );
};

export default DriverRegistrationPage;
