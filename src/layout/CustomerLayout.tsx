import { Outlet } from "react-router-dom";
import CustomerNav from "../components/layout/customer/CustomerNav";
import { NavLink } from "react-router-dom";

const CustomerLayout = () => {
  const customerTabs = [
    { label: "Overview", path: "/customer/dashboard", end: true },
    { label: "Bookings", path: "/customer/bookings", end: true },
    { label: "Active Session", path: "/customer/sessions/active", end: true },
    { label: "History", path: "/customer/sessions", end: true },
    { label: "Payments", path: "/customer/payments", end: true },
    { label: "Profile", path: "/customer/profile", end: true },
  ];

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ backgroundColor: "#F7F5F0" }}
    >
      {/* Customer Navigation */}
      <CustomerNav isLoggedIn />

      {/* Customer Header */}
      <section
        className="border-b px-6 py-4"
        style={{
          backgroundColor: "white",
          borderColor: "#EDE9DF",
        }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div
              className="flex h-11 w-11 items-center justify-center rounded-full font-bold text-white"
              style={{ backgroundColor: "#2D8653" }}
            >
              SC
            </div>

            {/* Customer Information */}
            <div>
              <div
                className="text-lg font-bold"
                style={{
                  color: "#1B2B2B",
                  fontFamily: "Outfit, sans-serif",
                }}
              >
                Sarah Chen
              </div>

              <div className="text-sm" style={{ color: "#9CA3AF" }}>
                sarah.chen@email.com · Member since Jan 2024
              </div>
            </div>

            {/* Customer Statistics */}
            <div className="ml-auto hidden gap-8 text-center sm:flex">
              <div>
                <div
                  className="text-lg font-bold"
                  style={{
                    color: "#1B2B2B",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  34
                </div>

                <div className="text-xs" style={{ color: "#9CA3AF" }}>
                  Sessions
                </div>
              </div>

              <div>
                <div
                  className="text-lg font-bold"
                  style={{
                    color: "#1B2B2B",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  $847
                </div>

                <div className="text-xs" style={{ color: "#9CA3AF" }}>
                  Spent
                </div>
              </div>

              <div>
                <div
                  className="text-lg font-bold"
                  style={{
                    color: "#1B2B2B",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  1,240
                </div>

                <div className="text-xs" style={{ color: "#9CA3AF" }}>
                  Points
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Navigation */}
      <div
        className="border-b bg-white px-6"
        style={{ borderColor: "#EDE9DF" }}
      >
        <div
          className="border-b bg-white px-6"
          style={{ borderColor: "#EDE9DF" }}
        >
          <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto py-2">
            {customerTabs.map((tab) => (
              <NavLink
                key={tab.path}
                to={tab.path}
                end={tab.end}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-[#1A3828] text-white"
                      : "text-[#6B7280] hover:bg-[#F7F5F0]"
                  }`
                }
              >
                {tab.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

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
