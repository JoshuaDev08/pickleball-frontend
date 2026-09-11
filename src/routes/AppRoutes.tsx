import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import Auth from "../pages/auth/Auth";

import CustomerLayout from "../layout/CustomerLayout";
import CustomerOverview from "../pages/customer/Dashboard/CustomerOverview";
import BookingsPage from "../pages/customer/booking/CutomerBooking.tsx";
import ActiveSessionPage from "../pages/customer/Session/ActiveSessionPage.tsx";
import SessionHistoryPage from "../pages/customer/History/HistoryPage.tsx";
import PaymentHistoryPage from "../pages/customer/Payment/Payment.tsx";
import ProfilePage from "../pages/customer/Profile/ProfilePage.tsx";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />

        {/* Authentication */}
        <Route path="/auth" element={<Auth />} />

        {/* Customer */}
        <Route path="/customer" element={<CustomerLayout />}>
          {/* /customer → /customer/dashboard */}
          <Route
            index
            element={<Navigate to="/customer/dashboard" replace />}
          />

          {/* Overview */}
          <Route path="dashboard" element={<CustomerOverview />} />

          {/* Bookings */}
          <Route path="bookings" element={<BookingsPage />} />

          {/* Active Session */}
          <Route path="sessions/active" element={<ActiveSessionPage />} />

          {/* History */}
          <Route path="sessions" element={<SessionHistoryPage />} />

          {/* Payments */}
          <Route path="payments" element={<PaymentHistoryPage />} />

          {/* Profile */}
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
