import React from "react";
import Navigation from "../components/Navigation/Navigation";
import FooterSection from "../components/FooterSection/FooterSection";
import DriverSelection from "../components/driverSelection/DriverSelection";

const DriverSelectionPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <DriverSelection />
      <FooterSection />
    </div>
  );
};

export default DriverSelectionPage;
