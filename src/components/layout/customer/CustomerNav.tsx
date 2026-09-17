import { useState } from "react";
import { Bell, CalendarDays, LogOut, Menu, User, X } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface CustomerNavProps {
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

const navItems = [
  { label: "Courts", href: "#courts" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Features", href: "#features" },
  { label: "Testimonials", href: "#testimonials" },
];

const navItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const navContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const logoVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const CustomerNav = ({ isLoggedIn = false, onLogout }: CustomerNavProps) => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigation = (path: string) => {
    setMobileOpen(false);
    navigate(path);
  };

  const handleAnchorNavigation = (href: string) => {
    setMobileOpen(false);

    if (href.startsWith("#")) {
      navigate(`/${href}`);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
        className="fixed left-0 top-0 z-50 w-full"
      >
        <div className="navbar min-h-[72px] bg-secondary px-5 text-white lg:px-8">
          {/* =========================
              LOGO
          ========================== */}
          <div className="navbar-start relative z-10">
            {/* Mobile Menu */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="btn btn-ghost btn-circle mr-2 text-white md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

            <motion.div
              className="flex cursor-pointer items-center gap-3"
              variants={logoVariants}
              initial="hidden"
              animate="visible"
              onClick={() => {
                navigate("/");
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              <motion.div
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary"
                whileHover={{
                  scale: 1.08,
                  rotate: -3,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 3C12 3 8.5 7.5 8.5 12s3.5 9 3.5 9" />
                  <path d="M12 3C12 3 15.5 7.5 15.5 12s-3.5 9-3.5 9" />
                  <path d="M3 12h18" />
                </svg>
              </motion.div>

              <div className="text-left">
                <div className="font-display text-lg font-bold leading-none text-white">
                  PicklePro
                </div>

                <div className="mt-1 text-xs leading-none text-accent">
                  Court Booking
                </div>
              </div>
            </motion.div>
          </div>

          {/* =========================
              DESKTOP NAVIGATION
          ========================== */}
          <motion.div
            className="navbar-center relative z-10 hidden md:flex"
            variants={navContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex items-center gap-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.label}
                  type="button"
                  variants={navItemVariants}
                  onClick={() => handleAnchorNavigation(item.href)}
                  className="cursor-pointer text-sm text-white/70 transition-colors hover:text-white"
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* =========================
              DESKTOP ACTIONS
          ========================== */}
          <motion.div
            className="navbar-end relative z-10 gap-3"
            variants={navContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {isLoggedIn ? (
              <>
                {/* Notifications */}
                <motion.div variants={navItemVariants} className="indicator">
                  <button
                    type="button"
                    onClick={() => handleNavigation("/customer/notifications")}
                    className="btn btn-ghost btn-sm text-white/75 hover:bg-white/10 hover:text-white"
                    aria-label="Notifications"
                  >
                    <span className="indicator-item badge badge-primary badge-xs">
                      12
                    </span>

                    <Bell className="h-5 w-5" />
                  </button>
                </motion.div>

                {/* Book a Court */}
                <motion.button
                  type="button"
                  variants={navItemVariants}
                  onClick={() => handleNavigation("/booking")}
                  className="btn btn-primary btn-sm hidden sm:flex"
                >
                  Book a Court
                </motion.button>

                {/* Profile Dropdown */}
                <motion.div
                  variants={navItemVariants}
                  className="dropdown dropdown-end"
                >
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost h-auto min-h-10 gap-2 px-2 text-white hover:bg-white/10"
                  >
                    <div className="avatar">
                      <div className="flex w-9 items-center justify-center rounded-full bg-primary text-white">
                        <span className="text-xs font-bold">SC</span>
                      </div>
                    </div>

                    <div className="hidden text-left lg:block">
                      <div className="text-xs font-semibold">Sarah Chen</div>

                      <div className="text-[10px] text-white/40">Member</div>
                    </div>
                  </div>

                  <ul
                    tabIndex={0}
                    className="menu dropdown-content z-[1] mt-3 w-60 rounded-2xl border border-base-200 bg-base-100 p-2 text-ink shadow-xl"
                  >
                    <li className="pointer-events-none">
                      <div className="flex flex-col items-start px-3 py-3">
                        <span className="font-semibold">Sarah Chen</span>

                        <span className="text-xs text-gray-400">
                          sarah.chen@email.com
                        </span>
                      </div>
                    </li>

                    <div className="divider my-1" />

                    <li>
                      <button
                        type="button"
                        onClick={() => handleNavigation("/customer/dashboard")}
                      >
                        <User className="h-4 w-4" />
                        Dashboard
                      </button>
                    </li>

                    <li>
                      <button
                        type="button"
                        onClick={() => handleNavigation("/customer/bookings")}
                      >
                        <CalendarDays className="h-4 w-4" />
                        My Bookings
                      </button>
                    </li>

                    <li>
                      <button
                        type="button"
                        onClick={() => handleNavigation("/customer/profile")}
                      >
                        <User className="h-4 w-4" />
                        Profile
                      </button>
                    </li>

                    <div className="divider my-1" />

                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          onLogout?.();
                        }}
                        className="text-error hover:bg-error/10"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </motion.div>
              </>
            ) : (
              <>
                <motion.button
                  type="button"
                  variants={navItemVariants}
                  onClick={() => handleNavigation("/auth")}
                  className="btn btn-ghost btn-sm text-white/75 hover:bg-white/10 hover:text-white"
                >
                  Sign In
                </motion.button>

                <motion.button
                  type="button"
                  variants={navItemVariants}
                  onClick={() => handleNavigation("/booking")}
                  className="btn btn-primary btn-sm"
                >
                  Book a Court
                </motion.button>
              </>
            )}
          </motion.div>
        </div>

        {/* =========================
            MOBILE MENU
        ========================== */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="border-t border-white/10 bg-secondary px-5 py-4 text-white shadow-lg md:hidden"
          >
            <ul className="menu w-full gap-1 p-0">
              {navItems.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => handleAnchorNavigation(item.href)}
                    className="rounded-xl text-white/70 hover:bg-white/10 hover:text-white"
                  >
                    {item.label}
                  </button>
                </li>
              ))}

              <li>
                <button
                  type="button"
                  className="rounded-xl text-white/70 hover:bg-white/10 hover:text-white"
                >
                  Check-In
                </button>
              </li>

              {isLoggedIn && (
                <>
                  <li className="menu-title mt-3 border-t border-white/10 pt-3">
                    <span className="text-white/40">My Account</span>
                  </li>

                  <li>
                    <button
                      type="button"
                      onClick={() => handleNavigation("/customer/dashboard")}
                      className="rounded-xl text-white/70 hover:bg-white/10 hover:text-white"
                    >
                      <User className="h-4 w-4" />
                      Dashboard
                    </button>
                  </li>

                  <li>
                    <button
                      type="button"
                      onClick={() => handleNavigation("/customer/bookings")}
                      className="rounded-xl text-white/70 hover:bg-white/10 hover:text-white"
                    >
                      <CalendarDays className="h-4 w-4" />
                      My Bookings
                    </button>
                  </li>

                  <li>
                    <button
                      type="button"
                      onClick={() =>
                        handleNavigation("/customer/notifications")
                      }
                      className="rounded-xl text-white/70 hover:bg-white/10 hover:text-white"
                    >
                      <Bell className="h-4 w-4" />
                      Notifications
                    </button>
                  </li>

                  <li>
                    <button
                      type="button"
                      onClick={() => handleNavigation("/customer/profile")}
                      className="rounded-xl text-white/70 hover:bg-white/10 hover:text-white"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </button>
                  </li>

                  <li className="mt-2 border-t border-white/10 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setMobileOpen(false);
                        onLogout?.();
                      }}
                      className="rounded-xl text-error hover:bg-error/10"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </li>
                </>
              )}

              {!isLoggedIn && (
                <li className="mt-3 border-t border-white/10 pt-3">
                  <button
                    type="button"
                    onClick={() => handleNavigation("/auth")}
                    className="rounded-xl text-white/70 hover:bg-white/10 hover:text-white"
                  >
                    <User className="h-4 w-4" />
                    Sign In
                  </button>
                </li>
              )}

              <li className="mt-3">
                <button
                  type="button"
                  onClick={() => handleNavigation("/booking")}
                  className="btn btn-primary w-full rounded-xl font-semibold text-white shadow-none"
                >
                  Book a Court
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </motion.nav>

      {/* Fixed navbar spacer */}
      <div className="h-[72px]" />
    </>
  );
};

export default CustomerNav;
