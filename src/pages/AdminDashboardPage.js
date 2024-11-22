import React from "react";
import Navigation from "../components/Navigation/Navigation";
import FooterSection from "../components/FooterSection/FooterSection";
import AuthModel from "../components/AuthModel/AuthModel";
import AdminDashboard from "../components/adminDashboard/AdminDashboard";

const AdminDashboardPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <AdminDashboard />
      <FooterSection />
      <AuthModel />
    </div>
  );
};

export default AdminDashboardPage;
