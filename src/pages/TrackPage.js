import React from "react";
import DriverAcceptedView from "../components/driverAcceptedView/DriverAcceptedView";
import Navigation from "../components/Navigation/Navigation";

const TrackPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <DriverAcceptedView />
    </div>
  );
};

export default TrackPage;
