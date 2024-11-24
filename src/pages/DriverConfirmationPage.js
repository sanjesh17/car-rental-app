import React from "react";
import Navigation from "../components/Navigation/Navigation";
import FooterSection from "../components/FooterSection/FooterSection";
import DriverBookingConfirmation from "../components/driverBookingConfirmation/DriverBookingConfirmation";

const DriverConfirmationPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <DriverBookingConfirmation />
      <FooterSection />
    </div>
  );
};

export default DriverConfirmationPage;
