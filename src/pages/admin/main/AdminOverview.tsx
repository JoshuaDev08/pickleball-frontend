import { motion, type Variants } from "framer-motion";
import {
  CalendarCheck,
  Play,
  Clock3,
  MapPin,
  PhilippinePeso,
  AlertTriangle,
  ArrowRight,
  Activity,
  CheckCircle2,
  CreditCard,
  Wrench,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type CourtStatus = "available" | "occupied" | "reserved" | "maintenance";

type BookingStatus = "confirmed" | "active" | "pending";

interface Court {
  id: string;
  type: string;
  status: CourtStatus;
  occupant: string | null;
  until: string | null;
}

interface Booking {
  id: string;
  customer: string;
  court: string;
  time: string;
  duration: string;
  amount: number;
  status: BookingStatus;
}

interface ActivityItem {
  time: string;
  message: string;
  type: "checkin" | "booking" | "end" | "queue" | "payment" | "maintenance";
}

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

const courts: Court[] = [
  {
    id: "A1",
    type: "Indoor",
    status: "available",
    occupant: null,
    until: null,
  },
  {
    id: "A2",
    type: "Indoor",
    status: "occupied",
    occupant: "Garcia Family",
    until: "4:15 PM",
  },
  {
    id: "A3",
    type: "Indoor",
    status: "available",
    occupant: null,
    until: null,
  },
  {
    id: "A4",
    type: "Indoor",
    status: "reserved",
    occupant: "S. Chen @ 5PM",
    until: null,
  },
  {
    id: "B1",
    type: "Outdoor",
    status: "occupied",
    occupant: "Chen Party",
    until: "4:00 PM",
  },
  {
    id: "B2",
    type: "Outdoor",
    status: "available",
    occupant: null,
    until: null,
  },
  {
    id: "B3",
    type: "Outdoor",
    status: "maintenance",
    occupant: "Net repair",
    until: null,
  },
  {
    id: "B4",
    type: "Outdoor",
    status: "available",
    occupant: null,
    until: null,
  },
  {
    id: "C1",
    type: "Premium",
    status: "occupied",
    occupant: "Rodriguez Group",
    until: "4:45 PM",
  },
  {
    id: "C2",
    type: "Premium",
    status: "available",
    occupant: null,
    until: null,
  },
  {
    id: "C3",
    type: "Premium",
    status: "occupied",
    occupant: "Kim Tournament",
    until: "5:00 PM",
  },
  {
    id: "C4",
    type: "Premium",
    status: "reserved",
    occupant: "Booking @ 5:30PM",
    until: null,
  },
];

const recentBookings: Booking[] = [
  {
    id: "BK-2847",
    customer: "Sarah Chen",
    court: "A4",
    time: "Today 5:00 PM",
    duration: "1h",
    amount: 32.84,
    status: "confirmed",
  },
  {
    id: "BK-2846",
    customer: "Mike Rodriguez",
    court: "C1",
    time: "Active now",
    duration: "2h",
    amount: 65.68,
    status: "active",
  },
  {
    id: "BK-2845",
    customer: "Emma Thompson",
    court: "C2",
    time: "Today 6:00 PM",
    duration: "1h",
    amount: 43.84,
    status: "confirmed",
  },
  {
    id: "BK-2844",
    customer: "James Liu",
    court: "A1",
    time: "Tomorrow 9AM",
    duration: "1.5h",
    amount: 37.5,
    status: "confirmed",
  },
  {
    id: "BK-2843",
    customer: "Priya Patel",
    court: "B2",
    time: "Today 7:00 PM",
    duration: "1h",
    amount: 23.24,
    status: "pending",
  },
];

const activities: ActivityItem[] = [
  {
    time: "3:15 PM",
    message: "Garcia Family checked in — Court A2",
    type: "checkin",
  },
  {
    time: "3:08 PM",
    message: "BK-2847 confirmed — Sarah Chen",
    type: "booking",
  },
  {
    time: "2:55 PM",
    message: "Session ended — Court B4",
    type: "end",
  },
  {
    time: "2:45 PM",
    message: "Q-087 joined queue — 2 players",
    type: "queue",
  },
  {
    time: "2:40 PM",
    message: "Payment received — $65.68",
    type: "payment",
  },
  {
    time: "2:30 PM",
    message: "Court B3 set to Maintenance",
    type: "maintenance",
  },
  {
    time: "2:20 PM",
    message: "Rodriguez Group checked in — Court C1",
    type: "checkin",
  },
];

/* -------------------------------------------------------------------------- */
/* Framer Motion                                                             */
/* -------------------------------------------------------------------------- */

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,

    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
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

const cardVariants: Variants = {
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

/* -------------------------------------------------------------------------- */
/* Dashboard                                                                  */
/* -------------------------------------------------------------------------- */

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* ------------------------------------------------------------------ */}
      {/* Stats                                                              */}
      {/* ------------------------------------------------------------------ */}

      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6"
      >
        <Stat
          label="Today's Bookings"
          value="34"
          sub="↑ 12% from yesterday"
          icon={<CalendarCheck />}
          iconClass="bg-secondary text-white"
        />

        <Stat
          label="Active Sessions"
          value="8"
          sub="on 8 courts right now"
          icon={<Play />}
          iconClass="bg-primary text-white"
        />

        <Stat
          label="Queue Waiting"
          value="12"
          sub="avg wait 18 min"
          icon={<Clock3 />}
          iconClass="bg-[#E8A020] text-[#0F2218]"
        />

        <Stat
          label="Available Courts"
          value="4/12"
          sub="8 occupied/reserved"
          icon={<MapPin />}
          iconClass="bg-indigo-500 text-white"
        />

        <Stat
          label="Revenue Today"
          value="₱2,840"
          sub="↑ ₱340 from target"
          icon={<PhilippinePeso />}
          iconClass="bg-primary text-white"
        />

        <Stat
          label="Pending Payments"
          value="₱480"
          sub="6 invoices pending"
          icon={<AlertTriangle />}
          iconClass="bg-[#E06020] text-white"
        />
      </motion.div>

      {/* ------------------------------------------------------------------ */}
      {/* Court Status + Live Activity                                      */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Court Status */}
        <motion.div
          variants={cardVariants}
          className="rounded-2xl border border-base-200 bg-white p-5 shadow-sm lg:col-span-2"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-display text-base font-bold text-ink">
                Court Status
              </h3>

              <p className="mt-0.5 text-xs text-gray-400">
                Current availability across all courts
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/courts")}
              className="flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-primary/70"
            >
              Manage Courts
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Courts */}
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {courts.map((court) => (
              <CourtCard key={court.id} court={court} />
            ))}
          </div>

          {/* Legend */}
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-400">
            <Legend color="bg-primary" label="Available" />

            <Legend color="bg-[#E8A020]" label="Occupied" />

            <Legend color="bg-indigo-500" label="Reserved" />

            <Legend color="bg-gray-400" label="Maintenance" />
          </div>
        </motion.div>

        {/* Live Activity */}
        <motion.div
          variants={cardVariants}
          className="rounded-2xl border border-base-200 bg-white p-5 shadow-sm"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-display text-base font-bold text-ink">
                Live Activity
              </h3>

              <p className="mt-0.5 text-xs text-gray-400">
                Recent system activity
              </p>
            </div>

            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />

              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
            </span>
          </div>

          <div className="space-y-3">
            {activities.map((activity, index) => (
              <ActivityRow
                key={`${activity.time}-${index}`}
                activity={activity}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Recent Bookings                                                    */}
      {/* ------------------------------------------------------------------ */}

      <motion.div
        variants={cardVariants}
        className="overflow-hidden rounded-2xl border border-base-200 bg-white shadow-sm"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-base-200 px-5 py-4">
          <div>
            <h3 className="font-display text-base font-bold text-ink">
              Recent Bookings
            </h3>

            <p className="mt-0.5 text-xs text-gray-400">
              Latest booking activity
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/bookings")}
            className="flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-primary/70"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="border-b border-base-200 bg-base-100">
                <th className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  ID
                </th>

                <th className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Customer
                </th>

                <th className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Court
                </th>

                <th className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Time
                </th>

                <th className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Duration
                </th>

                <th className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Amount
                </th>

                <th className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Status
                </th>

                <th />
              </tr>
            </thead>

            <tbody>
              {recentBookings.map((booking) => (
                <BookingRow key={booking.id} booking={booking} />
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/* Stat Card                                                                  */
/* -------------------------------------------------------------------------- */

interface StatProps {
  label: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  iconClass: string;
}

const Stat = ({ label, value, sub, icon, iconClass }: StatProps) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{
        y: -3,
        transition: {
          duration: 0.2,
        },
      }}
      className="rounded-2xl border border-base-200 bg-white p-4 shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-gray-400">{label}</p>

          <p className="mt-1 font-display text-2xl font-bold text-ink">
            {value}
          </p>

          <p className="mt-1 truncate text-[11px] text-gray-400">{sub}</p>
        </div>

        <div
          className={[
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
            iconClass,
          ].join(" ")}
        >
          <span className="[&>svg]:h-4 [&>svg]:w-4">{icon}</span>
        </div>
      </div>
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/* Court Card                                                                 */
/* -------------------------------------------------------------------------- */

const courtStatusClasses: Record<
  CourtStatus,
  {
    text: string;
    bg: string;
    border: string;
    dot: string;
  }
> = {
  available: {
    text: "text-primary",
    bg: "bg-primary/5",
    border: "border-primary/20",
    dot: "bg-primary",
  },

  occupied: {
    text: "text-[#E8A020]",
    bg: "bg-[#E8A020]/5",
    border: "border-[#E8A020]/20",
    dot: "bg-[#E8A020]",
  },

  reserved: {
    text: "text-indigo-500",
    bg: "bg-indigo-500/5",
    border: "border-indigo-500/20",
    dot: "bg-indigo-500",
  },

  maintenance: {
    text: "text-gray-400",
    bg: "bg-gray-400/5",
    border: "border-gray-400/20",
    dot: "bg-gray-400",
  },
};

const CourtCard = ({ court }: { court: Court }) => {
  const status = courtStatusClasses[court.status];

  return (
    <motion.div
      whileHover={{
        y: -3,
        scale: 1.02,
      }}
      transition={{
        duration: 0.2,
      }}
      className={[
        "cursor-pointer rounded-xl border p-3",
        status.bg,
        status.border,
      ].join(" ")}
    >
      <div className="mb-1 flex items-center justify-between">
        <span
          className={["font-mono-data text-sm font-bold", status.text].join(
            " "
          )}
        >
          {court.id}
        </span>

        <span className={["h-2 w-2 rounded-full", status.dot].join(" ")} />
      </div>

      <div className="text-xs text-gray-400">{court.type}</div>

      <div className="mt-1 truncate text-[10px] font-medium text-ink">
        {court.occupant || court.until || "Open"}
      </div>
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/* Legend                                                                     */
/* -------------------------------------------------------------------------- */

const Legend = ({ color, label }: { color: string; label: string }) => {
  return (
    <span className="flex items-center gap-1.5">
      <span className={["h-2.5 w-2.5 rounded-full", color].join(" ")} />

      {label}
    </span>
  );
};

/* -------------------------------------------------------------------------- */
/* Activity Row                                                               */
/* -------------------------------------------------------------------------- */

const activityStyles: Record<
  ActivityItem["type"],
  {
    color: string;
    icon: React.ReactNode;
  }
> = {
  checkin: {
    color: "bg-primary",
    icon: <CheckCircle2 />,
  },

  booking: {
    color: "bg-indigo-500",
    icon: <CalendarCheck />,
  },

  end: {
    color: "bg-gray-400",
    icon: <Activity />,
  },

  queue: {
    color: "bg-[#E8A020]",
    icon: <Users />,
  },

  payment: {
    color: "bg-primary",
    icon: <CreditCard />,
  },

  maintenance: {
    color: "bg-[#E06020]",
    icon: <Wrench />,
  },
};

const ActivityRow = ({ activity }: { activity: ActivityItem }) => {
  const style = activityStyles[activity.type];

  return (
    <motion.div variants={itemVariants} className="flex gap-3 text-xs">
      {/* Time */}
      <span className="mt-0.5 shrink-0 font-mono-data text-[10px] text-gray-400">
        {activity.time}
      </span>

      {/* Activity */}
      <div className="flex min-w-0 items-start gap-2">
        <span
          className={[
            "mt-1 flex h-1.5 w-1.5 shrink-0 rounded-full",
            style.color,
          ].join(" ")}
        />

        <span className="leading-relaxed text-ink">{activity.message}</span>
      </div>
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/* Booking Row                                                                */
/* -------------------------------------------------------------------------- */

const BookingRow = ({ booking }: { booking: Booking }) => {
  return (
    <motion.tr
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.25,
      }}
      className="border-b border-base-200 last:border-b-0 hover:bg-base-100"
    >
      {/* ID */}
      <td>
        <span className="font-mono-data text-xs text-gray-400">
          {booking.id}
        </span>
      </td>

      {/* Customer */}
      <td>
        <span className="font-semibold text-ink">{booking.customer}</span>
      </td>

      {/* Court */}
      <td>
        <span className="rounded-lg bg-base-100 px-2 py-1 font-mono-data text-xs font-bold text-primary">
          Court {booking.court}
        </span>
      </td>

      {/* Time */}
      <td>
        <span className="text-xs text-gray-500">{booking.time}</span>
      </td>

      {/* Duration */}
      <td>
        <span className="text-xs text-gray-500">{booking.duration}</span>
      </td>

      {/* Amount */}
      <td>
        <span className="font-semibold text-ink">
          ₱{booking.amount.toFixed(2)}
        </span>
      </td>

      {/* Status */}
      <td>
        <Badge status={booking.status} />
      </td>

      {/* Action */}
      <td>
        <button
          type="button"
          className="btn btn-ghost btn-xs border border-base-200 bg-white text-gray-500 hover:border-primary hover:bg-primary/5 hover:text-primary"
        >
          View
        </button>
      </td>
    </motion.tr>
  );
};

/* -------------------------------------------------------------------------- */
/* Badge                                                                      */
/* -------------------------------------------------------------------------- */

const badgeStyles: Record<BookingStatus, string> = {
  confirmed: "bg-primary/10 text-primary border-primary/20",

  active: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",

  pending: "bg-[#E8A020]/10 text-[#B87800] border-[#E8A020]/20",
};

const Badge = ({ status }: { status: BookingStatus }) => {
  const labels: Record<BookingStatus, string> = {
    confirmed: "Confirmed",
    active: "Active",
    pending: "Pending",
  };

  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-2 py-1",
        "text-[10px] font-semibold",
        badgeStyles[status],
      ].join(" ")}
    >
      {labels[status]}
    </span>
  );
};

export default AdminDashboard;
