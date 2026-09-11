import { ArrowRight, CalendarDays, Clock3, MapPin, Users } from "lucide-react";
import { motion, type Variants } from "framer-motion";

interface Booking {
  id: number;
  court: string;
  date: string;
  time: string;
  duration: string;
  status: "Confirmed" | "Pending" | "Cancelled";
  total: number;
}

const upcomingBookings: Booking[] = [
  {
    id: 1,
    court: "Court A2 — Indoor Premium",
    date: "Sep 12",
    time: "6:00 PM",
    duration: "1 hour",
    status: "Confirmed",
    total: 24,
  },
  {
    id: 2,
    court: "Court B1 — Indoor Premium",
    date: "Sep 14",
    time: "5:30 PM",
    duration: "1 hour",
    status: "Confirmed",
    total: 24,
  },
  {
    id: 3,
    court: "Court A1 — Indoor Premium",
    date: "Sep 18",
    time: "7:00 PM",
    duration: "2 hours",
    status: "Pending",
    total: 48,
  },
];

const statusClasses: Record<Booking["status"], string> = {
  Confirmed: "badge-success",
  Pending: "badge-warning",
  Cancelled: "badge-error",
};

/* =========================
   FRAMER MOTION VARIANTS
========================= */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
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

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
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

const CustomerOverview = () => {
  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* =========================
          ACTIVE SESSION
      ========================== */}
      <motion.section
        variants={itemVariants}
        className="card overflow-hidden border border-primary/30 bg-secondary text-white shadow-sm"
      >
        <div className="card-body p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Session Information */}
            <div>
              <motion.div
                variants={cardVariants}
                className="mb-1 flex items-center gap-2"
              >
                <span className="status status-success animate-pulse" />

                <span className="text-xs font-semibold uppercase tracking-wide text-success">
                  Active Session
                </span>
              </motion.div>

              <motion.h2
                variants={cardVariants}
                className="font-display text-xl font-bold"
              >
                Court A1 — Indoor Premium
              </motion.h2>

              <motion.p
                variants={cardVariants}
                className="mt-1 text-sm text-white/60"
              >
                Started 4:05 PM · 2 players · Ends at 5:05 PM
              </motion.p>
            </div>

            {/* Session Timer */}
            <motion.div
              variants={cardVariants}
              className="flex items-center gap-4"
            >
              <div className="text-center">
                <div className="font-mono text-3xl font-bold">47:22</div>

                <div className="text-xs text-white/50">Time remaining</div>
              </div>

              {/* Button intentionally NOT animated */}
              <button
                type="button"
                className="btn btn-warning btn-sm rounded-xl border-warning/30 bg-warning/20 text-warning shadow-none hover:bg-warning/30"
              >
                End Session
              </button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* =========================
          QUICK STATS
      ========================== */}
      <motion.section
        variants={itemVariants}
        className="grid grid-cols-2 gap-4 sm:grid-cols-4"
      >
        {/* Upcoming */}
        <motion.div
          variants={cardVariants}
          className="card border border-base-200 bg-white shadow-sm"
        >
          <div className="card-body p-5">
            <div className="text-xs text-gray-400">Upcoming</div>

            <div className="font-display text-2xl font-bold text-primary">
              3
            </div>

            <div className="text-xs text-gray-400">bookings</div>
          </div>
        </motion.div>

        {/* This Month */}
        <motion.div
          variants={cardVariants}
          className="card border border-base-200 bg-white shadow-sm"
        >
          <div className="card-body p-5">
            <div className="text-xs text-gray-400">This Month</div>

            <div className="font-display text-2xl font-bold text-secondary">
              8
            </div>

            <div className="text-xs text-gray-400">sessions played</div>
          </div>
        </motion.div>

        {/* Total Hours */}
        <motion.div
          variants={cardVariants}
          className="card border border-base-200 bg-white shadow-sm"
        >
          <div className="card-body p-5">
            <div className="text-xs text-gray-400">Total Hours</div>

            <div className="font-display text-2xl font-bold text-warning">
              24.5
            </div>

            <div className="text-xs text-gray-400">played all time</div>
          </div>
        </motion.div>

        {/* Points */}
        <motion.div
          variants={cardVariants}
          className="card border border-base-200 bg-white shadow-sm"
        >
          <div className="card-body p-5">
            <div className="text-xs text-gray-400">Points</div>

            <div className="font-display text-2xl font-bold text-[#E06020]">
              1,240
            </div>

            <div className="text-xs text-gray-400">loyalty points</div>
          </div>
        </motion.div>
      </motion.section>

      {/* =========================
          UPCOMING BOOKINGS
      ========================== */}
      <motion.section variants={itemVariants}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-ink">
            Upcoming Bookings
          </h2>

          {/* Button intentionally NOT animated */}
          <button
            type="button"
            className="btn btn-ghost btn-sm text-primary hover:bg-primary/10"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <motion.div variants={containerVariants} className="space-y-3">
          {upcomingBookings.map((booking) => (
            <motion.div
              key={booking.id}
              variants={cardVariants}
              className="card border border-base-200 bg-white shadow-sm"
            >
              <div className="card-body p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  {/* Court */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xs font-bold text-primary">
                      {booking.court.slice(-2)}
                    </div>

                    <div>
                      <div className="text-sm font-semibold text-ink">
                        {booking.court}
                      </div>

                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {booking.date}
                        </span>

                        <span>·</span>

                        <span className="flex items-center gap-1">
                          <Clock3 className="h-3.5 w-3.5" />
                          {booking.time}
                        </span>

                        <span>·</span>

                        <span>{booking.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <span
                      className={`badge ${
                        statusClasses[booking.status]
                      } badge-sm`}
                    >
                      {booking.status}
                    </span>

                    <span className="text-sm font-semibold text-ink">
                      ${booking.total.toFixed(2)}
                    </span>

                    {/* Button intentionally NOT animated */}
                    <button
                      type="button"
                      className="btn btn-outline btn-sm rounded-lg border-base-300 text-gray-600 hover:border-primary hover:bg-primary hover:text-white"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* =========================
          ACTIONS
      ========================== */}
      <motion.section
        variants={itemVariants}
        className="grid gap-3 sm:grid-cols-2"
      >
        {/* Button intentionally NOT animated */}
        <button
          type="button"
          className="btn btn-primary h-auto min-h-12 rounded-xl text-sm font-semibold text-white shadow-none"
        >
          <CalendarDays className="h-4 w-4" />
          Book a Court
        </button>

        {/* Button intentionally NOT animated */}
        <button
          type="button"
          className="btn btn-outline h-auto min-h-12 rounded-xl border-secondary text-sm font-semibold text-secondary hover:border-secondary hover:bg-secondary hover:text-white"
        >
          <MapPin className="h-4 w-4" />
          Walk-In Check-In
        </button>
      </motion.section>
    </motion.div>
  );
};

export default CustomerOverview;
