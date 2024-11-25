import React from "react";
import Navigation from "../components/Navigation/Navigation";
import RentalCarOnboarding from "../components/rentalCarOnboarding/RentalCarOnboarding";
import FooterSection from "../components/FooterSection/FooterSection";

const RentalCarOnboardingPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <RentalCarOnboarding />
    </div>
  );
};

export default RentalCarOnboardingPage;
