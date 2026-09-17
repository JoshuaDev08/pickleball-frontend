import { Outlet, NavLink } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import CustomerNav from "../components/layout/customer/CustomerNav";

const receptionistTabs = [
  {
    label: "Find Booking",
    path: "/staff/find-booking",
    end: true,
  },
  {
    label: "QR Check-In",
    path: "/staff/qr-checkin",
    end: true,
  },

  {
    label: "Join Queue",
    path: "/staff/walk-in",
    end: true,
  },
];

const headerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const tabsVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: 0.15,
      ease: "easeOut",
    },
  },
};

export default function ReceptionistLayout() {
  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ backgroundColor: "#F7F5F0" }}
    >
      {/* Customer Navigation */}
      <CustomerNav />

      {/* Receptionist Header */}
      <main className="flex-1 px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            className="mb-8 text-center"
          >
            <h1
              className="mb-2 text-3xl font-bold"
              style={{
                color: "#1B2B2B",
                fontFamily: "Outfit, sans-serif",
              }}
            >
              Walk-In & Check-In
            </h1>

            <p className="text-sm" style={{ color: "#9CA3AF" }}>
              Find your booking, scan your QR code, or join the walk-in queue.
            </p>
          </motion.div>

          {/* Receptionist Tabs */}
          <motion.div
            variants={tabsVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto mb-8 max-w-md"
          >
            <div
              className="flex rounded-2xl p-1.5"
              style={{
                backgroundColor: "#EDE9DF",
              }}
            >
              {receptionistTabs.map((tab) => (
                <NavLink
                  key={tab.path}
                  to={tab.path}
                  end={tab.end}
                  className="flex-1 rounded-xl py-2.5 text-center text-sm font-semibold transition-all"
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? "white" : "transparent",
                    color: isActive ? "#1B2B2B" : "#9CA3AF",
                    boxShadow: isActive ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                  })}
                >
                  {tab.label}
                </NavLink>
              ))}
            </div>
          </motion.div>

          {/* Page Content */}
          <Outlet />
        </div>
      </main>
    </div>
  );
}
