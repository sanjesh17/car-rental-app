import React from "react";
import Navigation from "../components/Navigation/Navigation";
import FooterSection from "../components/FooterSection/FooterSection";
import AuthModel from "../components/AuthModel/AuthModel";
import GoodsBookingConfirmation from "../components/goodsBookingConfirmation/GoodsBookingConfirmation";

const GoodsBookingConfirmationPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <GoodsBookingConfirmation />
    </div>
  );
};

export default GoodsBookingConfirmationPage;
