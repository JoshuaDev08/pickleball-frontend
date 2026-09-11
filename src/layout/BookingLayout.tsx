import { Outlet, useLocation } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import CustomerNav from "../components/layout/customer/CustomerNav";

const bookingSteps = [
  {
    number: 1,
    label: "Court",
    path: "/booking/court",
  },
  {
    number: 2,
    label: "Time",
    path: "/booking/schedule",
  },
  {
    number: 3,
    label: "Players",
    path: "/booking/details",
  },
  {
    number: 4,
    label: "Payment",
    path: "/booking/payment",
  },
  {
    number: 5,
    label: "Confirmed",
    path: "/booking/confirmation",
  },
];

const progressVariants: Variants = {
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

const BookingLayout = () => {
  const location = useLocation();

  const currentStep =
    bookingSteps.findIndex((step) => location.pathname.startsWith(step.path)) +
    1;

  const isConfirmation = location.pathname.startsWith("/booking/confirmation");

  return (
    <div className="flex min-h-screen flex-col bg-base-100">
      {/* Public Booking Navbar */}
      <CustomerNav isLoggedIn={false} />

      {/* Booking Progress */}
      {!isConfirmation && (
        <motion.section
          variants={progressVariants}
          initial="hidden"
          animate="visible"
          className="sticky top-0 z-50 border-b border-base-200 bg-white px-4 py-5 shadow-sm"
        >
          <div className="mx-auto max-w-4xl">
            <div className="flex items-center justify-between">
              {bookingSteps.map((step, index) => {
                const isCompleted = currentStep > step.number;
                const isActive = currentStep === step.number;
                const isLast = index === bookingSteps.length - 1;

                return (
                  <div key={step.number} className="flex flex-1 items-center">
                    {/* Step */}
                    <div className="flex items-center gap-2">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.05,
                        }}
                        className={[
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                          isCompleted
                            ? "bg-primary text-white"
                            : isActive
                            ? "bg-secondary text-white"
                            : "bg-base-200 text-gray-400",
                        ].join(" ")}
                      >
                        {isCompleted ? "✓" : step.number}
                      </motion.div>

                      <span
                        className={[
                          "hidden text-sm font-medium sm:block",
                          isActive
                            ? "text-ink"
                            : isCompleted
                            ? "text-primary"
                            : "text-gray-400",
                        ].join(" ")}
                      >
                        {step.label}
                      </span>
                    </div>

                    {/* Connector */}
                    {!isLast && (
                      <div className="mx-3 hidden h-px flex-1 bg-base-200 sm:block">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: isCompleted ? "100%" : "0%",
                          }}
                          transition={{
                            duration: 0.4,
                            ease: "easeOut",
                          }}
                          className="h-full bg-primary"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.section>
      )}

      {/* Booking Page Content */}
      <main className="flex-1 px-6 py-8">
        <div className="mx-auto max-w-5xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default BookingLayout;
