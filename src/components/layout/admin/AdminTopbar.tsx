import { Bell } from "lucide-react";
import { useLocation } from "react-router-dom";
import { motion, type Variants } from "framer-motion";

const viewTitles: Record<string, string> = {
  dashboard: "Dashboard",
  bookings: "Bookings",
  calendar: "Calendar",
  customers: "Customers",
  courts: "Courts",
  sessions: "Sessions",
  queue: "Queue",
  orders: "Orders",
  payments: "Payments",
  reports: "Reports",
  notifications: "Notifications",
  users: "Users",
  settings: "Settings",
  products: "Products",
  inventory: "Inventory",
};

const topbarVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const titleVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -8,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      delay: 0.1,
      ease: "easeOut",
    },
  },
};

const actionsVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 8,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      delay: 0.15,
      ease: "easeOut",
    },
  },
};

const AdminTopbar = () => {
  const location = useLocation();

  const currentView =
    location.pathname.split("/").filter(Boolean).pop() ?? "dashboard";

  const title = viewTitles[currentView] ?? "Admin";

  return (
    <motion.header
      variants={topbarVariants}
      initial="hidden"
      animate="visible"
      className="flex shrink-0 items-center justify-between border-b border-base-200 bg-white px-6 py-4"
    >
      {/* Page Information */}
      <motion.div variants={titleVariants} initial="hidden" animate="visible">
        <h1 className="font-display text-xl font-bold leading-none text-ink">
          {title}
        </h1>

        <p className="mt-1 text-xs text-gray-400">
          PicklePro Admin · Aug 27, 2026
        </p>
      </motion.div>

      {/* Actions */}
      <motion.div
        variants={actionsVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center gap-3"
      >
        {/* Notifications */}
        <motion.button
          type="button"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
          className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-base-200 bg-base-100 text-gray-500 transition-colors hover:border-primary/40 hover:text-primary"
        >
          <Bell className="h-4 w-4" />

          <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-orange-600 text-[8px] font-bold text-white">
            3
          </span>
        </motion.button>

        {/* Admin Profile */}
        <motion.button
          type="button"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 rounded-xl border border-base-200 bg-base-100 px-3 py-1.5 transition-colors hover:border-primary/40"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
            A
          </div>

          <span className="text-sm font-medium text-ink">Admin</span>
        </motion.button>
      </motion.div>
    </motion.header>
  );
};

export default AdminTopbar;
