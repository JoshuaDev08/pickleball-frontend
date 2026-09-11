import { useNavigate } from "react-router-dom";
import { Bell, CalendarDays, LogOut, Menu, User, X } from "lucide-react";
import { useState } from "react";

interface CustomerNavProps {
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

const CustomerNav = ({ isLoggedIn = false, onLogout }: CustomerNavProps) => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigation = (path: string) => {
    setMobileOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* Navbar */}
      <div className="fixed left-0 top-0 z-50 w-full">
        <div className="navbar min-h-[72px] bg-secondary px-5 text-white shadow-md lg:px-8">
          {/* =========================
              NAVBAR START
          ========================== */}
          <div className="navbar-start">
            {/* Mobile Menu Button */}
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

            {/* Logo */}
            <button
              type="button"
              onClick={() => handleNavigation("/")}
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 3C12 3 8.5 7.5 8.5 12s3.5 9 3.5 9" />
                  <path d="M12 3C12 3 15.5 7.5 15.5 12s-3.5 9-3.5 9" />
                  <path d="M3 12h18" />
                </svg>
              </div>

              <div className="text-left">
                <div className="font-display text-lg font-bold leading-none">
                  PicklePro
                </div>

                <div className="mt-1 text-[10px] uppercase tracking-[0.15em] text-white/45">
                  Court Booking
                </div>
              </div>
            </button>
          </div>

          {/* =========================
              NAVBAR CENTER
          ========================== */}
          <div className="navbar-center hidden md:flex">
            <ul className="menu menu-horizontal gap-2 px-1">
              <li>
                <button
                  type="button"
                  onClick={() => handleNavigation("/courts")}
                  className="text-sm text-white/70 hover:bg-white/10 hover:text-white"
                >
                  Courts
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => handleNavigation("/#pricing")}
                  className="text-sm text-white/70 hover:bg-white/10 hover:text-white"
                >
                  Pricing
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => handleNavigation("/#events")}
                  className="text-sm text-white/70 hover:bg-white/10 hover:text-white"
                >
                  Events
                </button>
              </li>
            </ul>
          </div>

          {/* =========================
              NAVBAR END
          ========================== */}
          <div className="navbar-end gap-4">
            {isLoggedIn ? (
              <>
                {/* Notifications */}
                <div className="indicator">
                  <button
                    onClick={() => handleNavigation("/customer/notifications")}
                    className="btn btn-ghost  text-white hover:bg-white/10"
                    aria-label="Notifications"
                  >
                    <span className="indicator-item badge badge-primary badge-xs">12</span>
                    <Bell className="h-5 w-5" />
                  </button>
                </div>

                {/* Book a Court */}
                <button
                  type="button"
                  onClick={() => handleNavigation("/booking")}
                  className="btn btn-primary hidden h-10 min-h-10 rounded-box px-5 text-sm font-semibold text-white shadow-none sm:flex"
                >
                  Book a Court
                </button>

                {/* Profile Dropdown */}
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost h-auto min-h-10 gap-2 px-2 text-white hover:bg-white/10"
                  >
                    {/* Avatar */}
                    <div className="avatar">
                      <div className="w-9 flex items-center justify-center rounded-full bg-primary text-white">
                        <span className="text-xs font-bold">SC</span>
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="hidden text-left lg:block">
                      <div className="text-xs font-semibold">Sarah Chen</div>

                      <div className="text-[10px] text-white/40">Member</div>
                    </div>
                  </div>

                  {/* Dropdown Menu */}
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content z-[1] mt-3 w-60 rounded-2xl border border-base-200 bg-base-100 p-2 text-ink shadow-xl"
                  >
                    {/* User Header */}
                    <li className="pointer-events-none">
                      <div className="flex flex-col items-start px-3 py-3">
                        <span className="font-semibold">Sarah Chen</span>

                        <span className="text-xs text-gray-400">
                          sarah.chen@email.com
                        </span>
                      </div>
                    </li>

                    <div className="divider my-1" />

                    {/* Dashboard */}
                    <li>
                      <button
                        type="button"
                        onClick={() => handleNavigation("/customer/dashboard")}
                      >
                        <User className="h-4 w-4" />
                        Dashboard
                      </button>
                    </li>

                    {/* Bookings */}
                    <li>
                      <button
                        type="button"
                        onClick={() => handleNavigation("/customer/bookings")}
                      >
                        <CalendarDays className="h-4 w-4" />
                        My Bookings
                      </button>
                    </li>

                    {/* Profile */}
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

                    {/* Logout */}
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
                </div>
              </>
            ) : (
              <>
                {/* Sign In */}
                <button
                  type="button"
                  onClick={() => handleNavigation("/auth")}
                  className="btn btn-ghost hidden text-sm text-white/70 hover:bg-white/10 hover:text-white sm:flex"
                >
                  Sign In
                </button>

                {/* Book a Court */}
                <button
                  type="button"
                  onClick={() => handleNavigation("/booking")}
                  className="btn btn-primary h-10 min-h-10 rounded-xl px-5 text-sm font-semibold text-white shadow-none"
                >
                  Book a Court
                </button>
              </>
            )}
          </div>
        </div>

        {/* =========================
            MOBILE MENU
        ========================== */}
        {mobileOpen && (
          <div className="border-t border-white/10 bg-secondary px-5 py-4 text-white shadow-lg md:hidden">
            <ul className="menu w-full gap-1 p-0">
              {/* Public Links */}
              <li>
                <button
                  type="button"
                  onClick={() => handleNavigation("/courts")}
                  className="rounded-xl text-white/70 hover:bg-white/10 hover:text-white"
                >
                  Courts
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => handleNavigation("/#pricing")}
                  className="rounded-xl text-white/70 hover:bg-white/10 hover:text-white"
                >
                  Pricing
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => handleNavigation("/#events")}
                  className="rounded-xl text-white/70 hover:bg-white/10 hover:text-white"
                >
                  Events
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

              {/* Mobile Booking Button */}
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
          </div>
        )}
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-[72px]" />
    </>
  );
};

export default CustomerNav;
