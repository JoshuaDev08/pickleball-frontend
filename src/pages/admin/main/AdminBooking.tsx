import { useMemo, useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Download,
  Plus,
  Search,
  Pencil,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type BookingStatus =
  | "confirmed"
  | "active"
  | "pending"
  | "completed"
  | "cancelled";

type Booking = {
  id: string;
  customer: string;
  email: string;
  court: string;
  date: string;
  time: string;
  duration: string;
  players: number;
  amount: number;
  status: BookingStatus;
};

const bookings: Booking[] = [
  {
    id: "BK-2847",
    customer: "Sarah Chen",
    email: "sarah.chen@email.com",
    court: "Court A4",
    date: "Aug 27, 2026",
    time: "5:00 PM",
    duration: "1h",
    players: 2,
    amount: 32.84,
    status: "confirmed",
  },
  {
    id: "BK-2846",
    customer: "Mike Rodriguez",
    email: "mike.r@email.com",
    court: "Court C1",
    date: "Aug 27, 2026",
    time: "2:45 PM",
    duration: "2h",
    players: 4,
    amount: 87.36,
    status: "active",
  },
  {
    id: "BK-2845",
    customer: "Emma Thompson",
    email: "emma.t@email.com",
    court: "Court C2",
    date: "Aug 27, 2026",
    time: "6:00 PM",
    duration: "1h",
    players: 2,
    amount: 43.84,
    status: "confirmed",
  },
  {
    id: "BK-2844",
    customer: "James Liu",
    email: "james.l@email.com",
    court: "Court A1",
    date: "Aug 28, 2026",
    time: "9:00 AM",
    duration: "1.5h",
    players: 4,
    amount: 37.5,
    status: "confirmed",
  },
  {
    id: "BK-2843",
    customer: "Priya Patel",
    email: "priya.p@email.com",
    court: "Court B2",
    date: "Aug 27, 2026",
    time: "7:00 PM",
    duration: "1h",
    players: 2,
    amount: 23.24,
    status: "pending",
  },
  {
    id: "BK-2841",
    customer: "David Okafor",
    email: "d.okafor@email.com",
    court: "Court A2",
    date: "Aug 27, 2026",
    time: "3:15 PM",
    duration: "1h",
    players: 4,
    amount: 27.34,
    status: "active",
  },
  {
    id: "BK-2839",
    customer: "Lisa Kim",
    email: "lisa.k@email.com",
    court: "Court B1",
    date: "Aug 27, 2026",
    time: "1:00 PM",
    duration: "2h",
    players: 2,
    amount: 46.6,
    status: "completed",
  },
  {
    id: "BK-2835",
    customer: "Robert Walsh",
    email: "r.walsh@email.com",
    court: "Court A3",
    date: "Aug 26, 2026",
    time: "4:30 PM",
    duration: "1h",
    players: 4,
    amount: 29.05,
    status: "cancelled",
  },
];

const statuses: Array<"all" | BookingStatus> = [
  "all",
  "confirmed",
  "active",
  "pending",
  "completed",
  "cancelled",
];

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
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

const statusStyles: Record<
  BookingStatus,
  {
    label: string;
    className: string;
  }
> = {
  confirmed: {
    label: "Confirmed",
    className: "bg-primary/10 text-primary",
  },
  active: {
    label: "Active",
    className: "bg-blue-50 text-blue-600",
  },
  pending: {
    label: "Pending",
    className: "bg-amber-50 text-amber-600",
  },
  completed: {
    label: "Completed",
    className: "bg-base-200 text-gray-600",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-50 text-red-500",
  },
};

const Badge = ({ status }: { status: BookingStatus }) => {
  const style = statusStyles[status];

  return (
    <span
      className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold ${style.className}`}
    >
      {style.label}
    </span>
  );
};

function AdminBookings() {
  const [statusFilter, setStatusFilter] = useState<"all" | BookingStatus>(
    "all"
  );
  const [search, setSearch] = useState("");

  const counts = useMemo(() => {
    const result: Record<string, number> = {
      all: bookings.length,
    };

    bookings.forEach((booking) => {
      result[booking.status] = (result[booking.status] || 0) + 1;
    });

    return result;
  }, []);

  const filteredBookings = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesStatus =
        statusFilter === "all" || booking.status === statusFilter;

      const matchesSearch =
        !searchValue ||
        booking.customer.toLowerCase().includes(searchValue) ||
        booking.id.toLowerCase().includes(searchValue) ||
        booking.email.toLowerCase().includes(searchValue) ||
        booking.court.toLowerCase().includes(searchValue);

      return matchesStatus && matchesSearch;
    });
  }, [search, statusFilter]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Page Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h2 className="font-display text-xl font-bold text-ink">Bookings</h2>

          <p className="mt-0.5 text-sm text-gray-400">
            Manage all court reservations and sessions
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            className="btn btn-ghost border border-base-200 bg-white px-4 text-sm font-medium text-gray-600 hover:border-primary/30 hover:bg-base-100"
          >
            <Download className="h-4 w-4" />
            Export
          </button>

          <button
            type="button"
            className="btn border-none bg-primary px-4 text-sm font-semibold text-white shadow-none hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            New Booking
          </button>
        </div>
      </motion.div>

      {/* Booking Card */}
      <motion.div
        variants={itemVariants}
        className="overflow-hidden rounded-2xl border border-base-200 bg-white"
      >
        {/* Filters */}
        <div className="flex flex-col gap-4 border-b border-base-200 px-5 py-4 xl:flex-row xl:items-center xl:justify-between">
          {/* Search */}
          <label className="input flex w-full items-center gap-2 border-base-200 bg-white xl:max-w-md focus-within:border-primary">
            <Search className="h-4 w-4 text-gray-400" />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search bookings, customers..."
              className="grow text-sm text-ink outline-none"
            />
          </label>

          {/* Status Filters */}
          <div className="flex flex-wrap gap-1.5">
            {statuses.map((status) => {
              const isActive = statusFilter === status;

              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={[
                    "rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-colors",
                    isActive
                      ? "bg-secondary text-white"
                      : "bg-base-100 text-gray-500 hover:bg-base-200",
                  ].join(" ")}
                >
                  {status}

                  {counts[status] > 0 && (
                    <span className="ml-1">({counts[status]})</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table w-full min-w-[1100px]">
            <thead>
              <tr className="border-b border-base-200 bg-secondary">
                {[
                  "Booking ID",
                  "Customer",
                  "Court",
                  "Date & Time",
                  "Dur.",
                  "Players",
                  "Amount",
                  "Status",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredBookings.map((booking, index) => (
                <motion.tr
                  key={booking.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.2,
                    delay: index * 0.03,
                  }}
                  className="border-b border-base-100 last:border-none hover:bg-base-100/60"
                >
                  {/* Booking ID */}
                  <td className="px-4 py-3">
                    <span className="font-mono-data text-xs font-semibold text-primary">
                      {booking.id}
                    </span>
                  </td>

                  {/* Customer */}
                  <td className="px-4 py-3">
                    <div className="text-sm font-semibold text-ink">
                      {booking.customer}
                    </div>

                    <div className="text-xs text-gray-400">{booking.email}</div>
                  </td>

                  {/* Court */}
                  <td className="px-4 py-3">
                    <span className="font-mono-data rounded-lg bg-base-100 px-2 py-1 text-xs font-semibold text-secondary">
                      {booking.court}
                    </span>
                  </td>

                  {/* Date & Time */}
                  <td className="px-4 py-3">
                    <div className="text-xs font-medium text-ink">
                      {booking.date}
                    </div>

                    <div className="text-xs text-gray-400">{booking.time}</div>
                  </td>

                  {/* Duration */}
                  <td className="px-4 py-3 text-xs text-gray-500">
                    {booking.duration}
                  </td>

                  {/* Players */}
                  <td className="px-4 py-3 text-center text-xs text-gray-500">
                    {booking.players}
                  </td>

                  {/* Amount */}
                  <td className="px-4 py-3 text-sm font-semibold text-ink">
                    ₱{booking.amount.toFixed(2)}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <Badge status={booking.status} />
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        className="btn btn-soft btn-xs rounded-box"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </button>

                      <button
                        type="button"
                        className="btn btn-soft btn-xs btn-error rounded-box"
                      >
                        <XCircle className="h-3.5 w-3.5" />
                        Cancel
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredBookings.length === 0 && (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <Search className="mb-3 h-8 w-8 text-gray-300" />

            <p className="text-sm font-medium text-ink">No bookings found</p>

            <p className="mt-1 text-xs text-gray-400">
              Try adjusting your search or status filter.
            </p>
          </div>
        )}

        {/* Footer / Pagination */}
        <div className="flex flex-col gap-4 border-t border-base-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs text-gray-400">
            Showing {filteredBookings.length} of {bookings.length} bookings
          </span>

          <div className="join">
            <button
              type="button"
              className="btn join-item btn-sm border-base-200 bg-white text-gray-500 hover:bg-base-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {[1, 2, 3].map((page) => (
              <button
                key={page}
                type="button"
                className={[
                  "btn join-item btn-sm border-base-200",
                  page === 1
                    ? "bg-secondary text-white hover:bg-secondary"
                    : "bg-white text-gray-500 hover:bg-base-100",
                ].join(" ")}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              className="btn join-item btn-sm border-base-200 bg-white text-gray-500 hover:bg-base-100"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AdminBookings;
