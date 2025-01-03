import React from "react";
import Navigation from "../components/Navigation/Navigation";
import RoundSelection from "../components/roundTripSelection/RoundTripSelection";
import FooterSection from "../components/FooterSection/FooterSection";

const RoundTripSelection = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <RoundSelection />
    </div>
  );
};

export default RoundTripSelection;
