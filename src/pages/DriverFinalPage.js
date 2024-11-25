import React from "react";
import Navigation from "../components/Navigation/Navigation";
import FooterSection from "../components/FooterSection/FooterSection";
import DriverPaymentConfirmed from "../components/paymentConfirmation/DriverPaymentConfirmed";

const BookingFinalPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <DriverPaymentConfirmed />
      <FooterSection />
    </div>
  );
};

export default BookingFinalPage;
