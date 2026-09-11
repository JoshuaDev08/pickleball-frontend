import { motion, type Variants } from "framer-motion";
import {
  LayoutDashboard,
  CalendarCheck,
  CalendarDays,
  Users,
  MapPin,
  Play,
  List,
  ShoppingBag,
  CreditCard,
  Package,
  Warehouse,
  BarChart3,
  Bell,
  Shield,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: React.ElementType;
  badge?: string;
  badgeType?: "warning" | "error";
}

interface NavSection {
  label: string;
  items: NavItem[];
}

/* -------------------------------------------------------------------------- */
/* Navigation                                                                 */
/* -------------------------------------------------------------------------- */

const navSections: NavSection[] = [
  {
    label: "MAIN",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        path: "/admin/dashboard",
        icon: LayoutDashboard,
      },
      {
        id: "bookings",
        label: "Bookings",
        path: "/admin/bookings",
        icon: CalendarCheck,
      },
      {
        id: "calendar",
        label: "Calendar",
        path: "/admin/calendar",
        icon: CalendarDays,
      },
    ],
  },

  {
    label: "OPERATIONS",
    items: [
      {
        id: "queue",
        label: "Queue",
        path: "/admin/queue",
        icon: List,
        badge: "12",
        badgeType: "warning",
      },
      {
        id: "sessions",
        label: "Sessions",
        path: "/admin/sessions",
        icon: Play,
      },
      {
        id: "courts",
        label: "Courts",
        path: "/admin/courts",
        icon: MapPin,
      },
    ],
  },

  {
    label: "CUSTOMERS",
    items: [
      {
        id: "customers",
        label: "Customers",
        path: "/admin/customers",
        icon: Users,
      },
      {
        id: "payments",
        label: "Payments",
        path: "/admin/payments",
        icon: CreditCard,
      },
    ],
  },

  {
    label: "SYSTEM",
    items: [
      {
        id: "notifications",
        label: "Notifications",
        path: "/admin/notifications",
        icon: Bell,
        badge: "3",
        badgeType: "error",
      },
      {
        id: "audit-logs",
        label: "Audit Logs",
        path: "/admin/audit-logs",
        icon: Shield,
      },
      {
        id: "settings",
        label: "Settings",
        path: "/admin/settings",
        icon: Settings,
      },
    ],
  },

  {
    label: "ADMINISTRATION",
    items: [
      {
        id: "users",
        label: "Users & Roles",
        path: "/admin/users",
        icon: Shield,
      },
    ],
  },

  {
    label: "POS & INVENTORY",
    items: [
      {
        id: "orders",
        label: "Orders / POS",
        path: "/admin/orders",
        icon: ShoppingBag,
      },
      {
        id: "products",
        label: "Products",
        path: "/admin/products",
        icon: Package,
      },
      {
        id: "inventory",
        label: "Inventory",
        path: "/admin/inventory",
        icon: Warehouse,
      },
    ],
  },

  {
    label: "REPORTING",
    items: [
      {
        id: "reports",
        label: "Reports",
        path: "/admin/reports",
        icon: BarChart3,
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Framer Motion                                                             */
/* -------------------------------------------------------------------------- */

const sidebarVariants: Variants = {
  hidden: {
    x: -20,
    opacity: 0,
  },

  visible: {
    x: 0,
    opacity: 1,

    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

const sectionVariants: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    x: -8,
    opacity: 0,
  },

  visible: {
    x: 0,
    opacity: 1,

    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
};

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleExitAdmin = () => {
    navigate("/");
  };

  return (
    <motion.aside
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      className="flex h-screen w-60 shrink-0 flex-col overflow-hidden border-r border-white/5 bg-[#0F2218]"
    >
      {/* ------------------------------------------------------------------ */}
      {/* Logo                                                               */}
      {/* ------------------------------------------------------------------ */}

      <div className="shrink-0 border-b border-white/5 px-5 py-5">
        <div className="flex items-center gap-3">
          {/* PicklePro Logo */}
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="9" />

              <path d="M12 3C12 3 8.5 7.5 8.5 12s3.5 9 3.5 9" />

              <path d="M12 3C12 3 15.5 7.5 15.5 12s-3.5 9-3.5 9" />

              <path d="M3 12h18" />
            </svg>
          </div>

          {/* Brand */}
          <div>
            <div className="font-display text-base font-bold leading-none text-white">
              PicklePro
            </div>

            <div className="mt-0.5 font-mono-data text-xs text-[#E8A020]">
              Admin Panel
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Navigation                                                         */}
      {/* ------------------------------------------------------------------ */}

      <div className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
        {navSections.map((section) => (
          <motion.div
            key={section.label}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="mb-5 last:mb-0"
          >
            {/* Section Label */}
            <div className="mb-2 px-3">
              <span className="font-mono-data text-[10px] font-semibold tracking-[0.12em] text-white/30">
                {section.label}
              </span>
            </div>

            {/* Section Items */}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.div key={item.id} variants={itemVariants}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        [
                          "group relative flex w-full items-center gap-3",
                          "rounded-xl px-3 py-2.5",
                          "text-left text-sm font-medium",
                          "transition-colors duration-200",

                          isActive
                            ? "bg-primary/15 text-[#38A066]"
                            : "text-white/55 hover:bg-white/5 hover:text-white/85",
                        ].join(" ")
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {/* Active Indicator */}
                          {isActive && (
                            <motion.span
                              layoutId="admin-sidebar-active"
                              className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-r-full bg-primary"
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 30,
                              }}
                            />
                          )}

                          {/* Icon */}
                          <Icon
                            className={[
                              "h-4 w-4 shrink-0 transition-colors",
                              isActive ? "text-[#38A066]" : "text-current",
                            ].join(" ")}
                            strokeWidth={1.8}
                          />

                          {/* Label */}
                          <span className="truncate">{item.label}</span>

                          {/* Badge */}
                          {item.badge && (
                            <span
                              className={[
                                "ml-auto min-w-[20px] rounded-full",
                                "px-1.5 py-0.5 text-center",
                                "text-[10px] font-bold",

                                item.badgeType === "warning"
                                  ? "bg-[#E8A020] text-[#0F2218]"
                                  : "bg-[#E06020] text-white",
                              ].join(" ")}
                            >
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Footer                                                             */}
      {/* ------------------------------------------------------------------ */}

      <div className="shrink-0 border-t border-white/5 px-3 py-4">
        {/* Admin Profile */}
        <button
          type="button"
          className="mb-2 flex w-full items-center gap-3 rounded-xl bg-white/5 px-3 py-2 text-left transition-colors hover:bg-white/10"
        >
          {/* Avatar */}
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
            AD
          </div>

          {/* User Info */}
          <div className="min-w-0 flex-1">
            <div className="truncate text-xs font-semibold text-white">
              Admin User
            </div>

            <div className="truncate text-xs text-white/40">
              admin@picklepro.com
            </div>
          </div>

          <ChevronDown className="h-3.5 w-3.5 shrink-0 text-white/30" />
        </button>

        {/* Exit */}
        <motion.button
          type="button"
          onClick={handleExitAdmin}
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.98 }}
          className="flex w-full items-center justify-center gap-2 rounded-lg py-2 text-xs text-white/40 transition-colors hover:bg-white/5 hover:text-white/70"
        >
          <LogOut className="h-3.5 w-3.5" />

          <span>Exit to Customer Site</span>
        </motion.button>
      </div>
    </motion.aside>
  );
};

export default AdminSidebar;
