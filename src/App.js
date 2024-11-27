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

function App() {
  return (
    <div className="font-custom">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" index={true} element={<LandingPage />} />
          <Route path="/driver-dashboard" element={<DriverDashboardPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
          <Route path="/car-selection" element={<CarSelectionPage />} />
          <Route path="/driver-selection" element={<DriverSelectionPage />} />

          <Route
            path="/booking-confirmation"
            element={<BookingConfirmationPage />}
          />
          <Route
            path="/driver-confirmation"
            element={<DriverConfirmationPage />}
          />

          <Route path="/auth/signup" element={<AuthPage />} />
          <Route path="/goods-selection" element={<GoodsSelectionPage />} />
          <Route
            path="/goods-booking-confirmation"
            element={<GoodsBookingConfirmationPage />}
          />
          <Route
            path="/round-trip-selection"
            element={<RoundTripSelection />}
          />
          <Route path="/get-started" element={<RoleSelection />} />
          <Route path="/new/driver" element={<DriverRegistrationPage />} />
          <Route path="/new/car" element={<RentalCarOnboardingPage />} />
          <Route path="/payment-confirmed" element={<BookingFinalPage />} />
          <Route path="/goods/payment-confirmed" element={<GoodsFinalPage />} />
          <Route
            path="/driver/payment-confirmed"
            element={<DriverFinalPage />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
