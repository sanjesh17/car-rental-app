import React from "react";
import Navigation from "../components/Navigation/Navigation";
import FooterSection from "../components/FooterSection/FooterSection";
import AuthModel from "../components/AuthModel/AuthModel";
import BookingConfirmation from "../components/bookingConfirmation/BookingConfirmation";

const BookingConfirmationPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <BookingConfirmation />
    </div>
  );
};

export default BookingConfirmationPage;
