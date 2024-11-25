import React from "react";
import Navigation from "../components/Navigation/Navigation";
import FooterSection from "../components/FooterSection/FooterSection";
import PaymentConfirmed from "../components/paymentConfirmation/PaymentConfirmation";

const BookingFinalPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <PaymentConfirmed />
      <FooterSection />
    </div>
  );
};

export default BookingFinalPage;
