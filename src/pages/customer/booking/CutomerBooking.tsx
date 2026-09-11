import { CalendarDays, Clock3, Users } from "lucide-react";
import { motion, type Variants } from "framer-motion";

interface Booking {
  id: string;
  court: string;
  date: string;
  time: string;
  duration: string;
  players: number;
  status: "Confirmed" | "Pending" | "Cancelled";
  total: number;
}

const upcomingBookings: Booking[] = [
  {
    id: "BK-20260912-A2",
    court: "Court A2 — Indoor Premium",
    date: "Sep 12",
    time: "6:00 PM",
    duration: "1 hour",
    players: 2,
    status: "Confirmed",
    total: 24,
  },
  {
    id: "BK-20260914-B1",
    court: "Court B1 — Indoor Premium",
    date: "Sep 14",
    time: "5:30 PM",
    duration: "1 hour",
    players: 4,
    status: "Confirmed",
    total: 24,
  },
  {
    id: "BK-20260918-A1",
    court: "Court A1 — Indoor Premium",
    date: "Sep 18",
    time: "7:00 PM",
    duration: "2 hours",
    players: 4,
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
   FRAMER MOTION
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

const CustomerBookings = () => {
  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >

      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between gap-4"
      >
        <div>
          <h2 className="font-display text-xl font-bold text-ink">
            My Bookings
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Manage your upcoming court reservations.
          </p>
        </div>

        {/* Button intentionally NOT animated */}
        <button
          type="button"
          className="btn btn-primary rounded-xl text-sm font-semibold text-white shadow-none"
        >
          + New Booking
        </button>
      </motion.div>

      {/* =========================
          BOOKINGS
      ========================== */}
      <motion.div variants={containerVariants} className="space-y-3">
        {upcomingBookings.map((booking) => (
          <motion.div
            key={booking.id}
            variants={itemVariants}
            className="card border border-base-200 bg-white shadow-sm"
          >
            <div className="card-body p-5">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                {/* Booking Information */}
                <div className="flex gap-4">
                  {/* Court Badge */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                    {booking.court.slice(-2)}
                  </div>

                  {/* Details */}
                  <div className="min-w-0">
                    <h3 className="font-semibold text-ink">{booking.court}</h3>

                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {booking.date}
                      </span>

                      <span className="hidden sm:inline">·</span>

                      <span className="flex items-center gap-1">
                        <Clock3 className="h-3.5 w-3.5" />
                        {booking.time}
                      </span>

                      <span className="hidden sm:inline">·</span>

                      <span>{booking.duration}</span>

                      <span className="hidden sm:inline">·</span>

                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {booking.players} players
                      </span>
                    </div>

                    {/* Booking Number */}
                    <div className="mt-2 font-mono text-xs text-gray-400">
                      {booking.id}
                    </div>
                  </div>
                </div>

                {/* Status + Price */}
                <div className="flex items-center justify-between gap-4 lg:justify-end">
                  <span
                    className={`badge ${
                      statusClasses[booking.status]
                    } badge-sm`}
                  >
                    {booking.status}
                  </span>

                  <div className="font-display text-lg font-bold text-primary">
                    ${booking.total.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="divider my-0" />

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                {/* Buttons intentionally NOT animated */}
                <button
                  type="button"
                  className="btn btn-outline btn-sm rounded-lg border-base-300 text-gray-600 hover:border-primary hover:bg-primary hover:text-white"
                >
                  View Details
                </button>

                <button
                  type="button"
                  className="btn btn-outline btn-sm rounded-lg border-base-300 text-gray-600 hover:border-primary hover:bg-primary hover:text-white"
                >
                  Reschedule
                </button>

                <button
                  type="button"
                  className="btn btn-outline btn-sm rounded-lg border-error/30 text-error hover:border-error hover:bg-error hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* =========================
          EMPTY STATE
      ========================== */}
      {upcomingBookings.length === 0 && (
        <motion.div
          variants={itemVariants}
          className="card border border-base-200 bg-white shadow-sm"
        >
          <div className="card-body items-center py-12 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CalendarDays className="h-6 w-6" />
            </div>

            <h3 className="font-display text-lg font-bold text-ink">
              No upcoming bookings
            </h3>

            <p className="max-w-sm text-sm text-gray-400">
              You don't have any upcoming court reservations yet.
            </p>

            {/* Button intentionally NOT animated */}
            <button
              type="button"
              className="btn btn-primary mt-3 rounded-xl text-white shadow-none"
            >
              Book a Court
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CustomerBookings;
