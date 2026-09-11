import { Outlet, NavLink } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import CustomerNav from "../components/layout/customer/CustomerNav";

const customerTabs = [
  { label: "Overview", path: "/customer/dashboard", end: true },
  { label: "Bookings", path: "/customer/bookings", end: true },
  { label: "Active Session", path: "/customer/sessions/active", end: true },
  { label: "History", path: "/customer/sessions", end: true },
  { label: "Payments", path: "/customer/payments", end: true },
  { label: "Profile", path: "/customer/profile", end: true },
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

const statsVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: 0.15,
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
      delay: 0.2,
      ease: "easeOut",
    },
  },
};

const CustomerLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-base-100">
      {/* Customer Navigation */}
      <CustomerNav isLoggedIn />

      {/* Customer Header */}
      <motion.section
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="border-b border-base-200 bg-white px-6 py-4"
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.15,
                ease: "easeOut",
              }}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-primary font-bold text-white"
            >
              SC
            </motion.div>

            {/* Customer Information */}
            <div>
              <h1 className="font-display text-lg font-bold text-ink">
                Sarah Chen
              </h1>

              <p className="text-sm text-gray-400">
                sarah.chen@email.com · Member since Jan 2024
              </p>
            </div>

            {/* Customer Statistics */}
            <motion.div
              variants={statsVariants}
              initial="hidden"
              animate="visible"
              className="ml-auto hidden gap-8 text-center sm:flex"
            >
              <div>
                <div className="font-display text-lg font-bold text-ink">
                  34
                </div>

                <div className="text-xs text-gray-400">Sessions</div>
              </div>

              <div>
                <div className="font-display text-lg font-bold text-ink">
                  $847
                </div>

                <div className="text-xs text-gray-400">Spent</div>
              </div>

              <div>
                <div className="font-display text-lg font-bold text-ink">
                  1,240
                </div>

                <div className="text-xs text-gray-400">Points</div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Customer Tabs */}
      <motion.div
        variants={tabsVariants}
        initial="hidden"
        animate="visible"
        className="border-b border-base-200 bg-white px-6"
      >
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto py-2">
          {customerTabs.map((tab, index) => (
            <motion.div
              key={tab.path}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.25 + index * 0.05,
                ease: "easeOut",
              }}
            >
              <NavLink
                to={tab.path}
                end={tab.end}
                className={({ isActive }) =>
                  `block whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-secondary text-white"
                      : "text-gray-500 hover:bg-base-100 hover:text-ink"
                  }`
                }
              >
                {tab.label}
              </NavLink>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Page Content */}
      <main className="flex-1 px-6 py-8">
        <div className="mx-auto max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default CustomerLayout;
