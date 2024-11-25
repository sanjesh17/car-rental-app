import React from "react";
import FooterSection from "../components/FooterSection/FooterSection";
import AuthModel from "../components/AuthModel/AuthModel";
import Navigation from "../components/Navigation/Navigation";
import DriverDashboard from "../components/driverDashboard/DriverDashboard";

const DriverDashboardPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <DriverDashboard />
    </div>
  );
};

export default DriverDashboardPage;
