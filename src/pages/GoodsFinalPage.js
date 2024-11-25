import React from "react";
import Navigation from "../components/Navigation/Navigation";
import GoodsPaymentConfirmed from "../components/paymentConfirmation/GoodsPaymentConfirmed";
import FooterSection from "../components/FooterSection/FooterSection";

const GoodsFinalPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <GoodsPaymentConfirmed />
      <FooterSection />
    </div>
  );
};

export default GoodsFinalPage;
