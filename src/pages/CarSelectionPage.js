import React from "react";
import Navigation from "../components/Navigation/Navigation";
import FooterSection from "../components/FooterSection/FooterSection";
import AuthModel from "../components/AuthModel/AuthModel";
import CarSelection from "../components/carSelection/CarSelection";

const CarSelectionPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <CarSelection />
      <FooterSection />
    </div>
  );
};

export default CarSelectionPage;
