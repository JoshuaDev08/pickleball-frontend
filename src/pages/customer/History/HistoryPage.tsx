import { motion, type Variants } from "framer-motion";

type HistoryBooking = {
  id: string;
  court: string;
  date: string;
  time: string;
  duration: string;
  players: number;
  total: number;
  status: "completed" | "cancelled";
};

const historyBookings: HistoryBooking[] = [
  {
    id: "BK-20260824-001",
    court: "Court A1",
    date: "Aug 24, 2026",
    time: "4:00 PM",
    duration: "1 hour",
    players: 2,
    total: 25,
    status: "completed",
  },
  {
    id: "BK-20260818-002",
    court: "Court B1",
    date: "Aug 18, 2026",
    time: "6:00 PM",
    duration: "2 hours",
    players: 4,
    total: 48,
    status: "completed",
  },
  {
    id: "BK-20260810-003",
    court: "Court A2",
    date: "Aug 10, 2026",
    time: "5:00 PM",
    duration: "1 hour",
    players: 3,
    total: 25,
    status: "completed",
  },
  {
    id: "BK-20260805-004",
    court: "Court B1",
    date: "Aug 5, 2026",
    time: "7:00 PM",
    duration: "1 hour",
    players: 2,
    total: 0,
    status: "cancelled",
  },
];

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

const statusStyles = {
  completed: "badge-success",
  cancelled: "badge-error",
};

const statusLabels = {
  completed: "Completed",
  cancelled: "Cancelled",
};

const SessionHistoryPage = () => {
  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <h2 className="font-display text-2xl font-bold text-ink">
          Session History
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Review your previous bookings and completed sessions.
        </p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="card overflow-hidden border border-base-200 bg-white shadow-sm"
      >
        <div className="overflow-x-auto">
          <table className="table w-full text-sm">
            <thead>
              <tr className="border-b border-base-200 bg-secondary">
                {[
                  "Booking ID",
                  "Court",
                  "Date",
                  "Time",
                  "Duration",
                  "Players",
                  "Total",
                  "Status",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {historyBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b border-base-100 last:border-b-0 hover:bg-base-100"
                >
                  <td className="whitespace-nowrap px-4 py-4 font-mono text-xs text-gray-400">
                    {booking.id}
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 font-semibold text-ink">
                    {booking.court}
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 text-gray-500">
                    {booking.date}
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 text-gray-500">
                    {booking.time}
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 text-gray-500">
                    {booking.duration}
                  </td>

                  <td className="px-4 py-4 text-center text-gray-500">
                    {booking.players}
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 font-semibold text-ink">
                    {booking.status === "cancelled"
                      ? "—"
                      : `$${booking.total.toFixed(2)}`}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`badge ${
                        statusStyles[booking.status]
                      } badge-outline whitespace-nowrap`}
                    >
                      {statusLabels[booking.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SessionHistoryPage;
