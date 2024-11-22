import React from "react";
import Navigation from "../components/Navigation/Navigation";
import FooterSection from "../components/FooterSection/FooterSection";
import SignUp from "../components/authPage/SignUp";

const AuthPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <SignUp />
      <FooterSection />
    </div>
  );
};

export default AuthPage;
