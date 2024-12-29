import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DriverDashboardPage from "./pages/DriverDashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import CarSelectionPage from "./pages/CarSelectionPage";
import BookingConfirmationPage from "./pages/BookingConfirmationPage";
import AuthPage from "./pages/AuthPage";
import ScrollToTop from "./hooks/ScrollToTop";
import RoundTripSelection from "./pages/RoundTripSelection";
import GoodsSelectionPage from "./pages/GoodsSelectionPage";
import DriverRegistrationPage from "./pages/DriverRegistrationPage";
import RentalCarOnboardingPage from "./pages/RentalCarOnboardingPage";
import GoodsBookingConfirmationPage from "./pages/GoodsBookingConfirmationPage";
import RoleSelection from "./components/roleSelection/RoleSelection";
import DriverSelectionPage from "./pages/DriverSelectionPage";
import DriverConfirmationPage from "./pages/DriverConfirmationPage";
import BookingFinalPage from "./pages/BookingFinalPage";
import DriverFinalPage from "./pages/DriverFinalPage";
import GoodsFinalPage from "./pages/GoodsFinalPage";
import TrackPage from "./pages/TrackPage";
import { AuthProvider, ProtectedRoute } from "./authUtils";
import { setupAxiosInterceptors } from "./authUtils";
import { useAuth } from "./authUtils";
import { useEffect } from "react";
import DriverAuth from "./pages/DriverAuth";

function App() {
  const { logout } = useAuth();

  useEffect(() => {
    setupAxiosInterceptors(logout);
  }, [logout]);

  return (
    <div className="font-custom">
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route
              path="/"
              index={true}
              element={
                <ProtectedRoute type="user">
                  <LandingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/driver-dashboard"
              element={
                <ProtectedRoute type="driver">
                  <DriverDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
            <Route
              path="/car-selection"
              element={
                <ProtectedRoute type="user">
                  <CarSelectionPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/driver-selection"
              element={
                <ProtectedRoute type="user">
                  <DriverSelectionPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/booking-confirmation"
              element={
                <ProtectedRoute type="user">
                  <BookingConfirmationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/driver-confirmation"
              element={
                <ProtectedRoute type="user">
                  <DriverConfirmationPage />
                </ProtectedRoute>
              }
            />

            <Route path="/auth/signup" element={<AuthPage />} />
            <Route path="/auth/driver/signup" element={<DriverAuth />} />
            <Route
              path="/goods-selection"
              element={
                <ProtectedRoute type="user">
                  <GoodsSelectionPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/goods-booking-confirmation"
              element={
                <ProtectedRoute type="user">
                  <GoodsBookingConfirmationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/round-trip-selection"
              element={
                <ProtectedRoute type="user">
                  <RoundTripSelection />
                </ProtectedRoute>
              }
            />
            <Route path="/get-started" element={<RoleSelection />} />
            <Route path="/new/driver" element={<DriverRegistrationPage />} />
            <Route path="/new/car" element={<RentalCarOnboardingPage />} />
            <Route
              path="/payment-confirmed"
              element={
                <ProtectedRoute type="user">
                  <BookingFinalPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/goods/payment-confirmed"
              element={
                <ProtectedRoute type="user">
                  <GoodsFinalPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/driver/payment-confirmed"
              element={
                <ProtectedRoute type="user">
                  <DriverFinalPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tracking"
              element={
                <ProtectedRoute>
                  <TrackPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
