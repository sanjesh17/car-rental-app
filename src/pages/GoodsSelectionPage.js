import React from "react";
import Navigation from "../components/Navigation/Navigation";
import FooterSection from "../components/FooterSection/FooterSection";
import GoodsSelection from "../components/goodsSelection/GoodsSelection";
import GoodsBookingConfirmation from "./GoodsBookingConfirmationPage";

const GoodsSelectionPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <GoodsSelection />
    </div>
  );
};

export default GoodsSelectionPage;