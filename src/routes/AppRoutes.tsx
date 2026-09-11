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

import BookingLayout from "../layout/BookingLayout.tsx";
import BookingCourtPage from "../pages/booking/BookingCourtPage.tsx";
import BookingSchedulePage from "../pages/booking/BookingSchedulePage.tsx";
import BookingDetailsPage from "../pages/booking/BookingDetailsPage.tsx";
import AdminDashboard from "../pages/admin/main/AdminOverview.tsx";

import AdminLayout from "../layout/AdminLayout.tsx";
import AdminBookings from "../pages/admin/main/AdminBooking.tsx";
import AdminCalendar from "../pages/admin/main/AdminCalendar.tsx";
import AdminCourts from "../pages/admin/operations/AdminCourts.tsx";
import AdminSessions from "../pages/admin/operations/AdminSessions.tsx";
import AdminQueue from "../pages/admin/operations/AdminQueue.tsx";
import AdminCustomers from "../pages/admin/customers.tsx/AdminCustomer.tsx";
import AdminPayments from "../pages/admin/customers.tsx/AdminPayments.tsx";

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
          <Route
            index
            element={<Navigate to="/customer/dashboard" replace />}
          />
          <Route path="dashboard" element={<CustomerOverview />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="sessions/active" element={<ActiveSessionPage />} />
          <Route path="sessions" element={<SessionHistoryPage />} />
          <Route path="payments" element={<PaymentHistoryPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Booking */}
        <Route path="/booking" element={<BookingLayout />}>
          <Route index element={<Navigate to="/booking/court" replace />} />
          <Route path="court" element={<BookingCourtPage />} />
          <Route path="schedule" element={<BookingSchedulePage />} />
          <Route path="details" element={<BookingDetailsPage />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="calendar" element={<AdminCalendar />} />
          <Route path="courts" element={<AdminCourts />} />
          <Route path="sessions" element={<AdminSessions />} />
          <Route path="queue" element={<AdminQueue />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="payments" element={<AdminPayments />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
