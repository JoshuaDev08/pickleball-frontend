import { motion, type Variants } from "framer-motion";
import { Plus, Pencil, Wrench, Users, Clock3, MapPin } from "lucide-react";

type CourtStatus = "available" | "occupied" | "reserved" | "maintenance";

type Court = {
  id: string;
  name: string;
  type: string;
  status: CourtStatus;
  rate: number;
  capacity: number;
  occupant?: string;
  reservedFor?: string;
  maintenanceNote?: string;
  lastSession?: string;
  features: string[];
};

const courts: Court[] = [
  {
    id: "A1",
    name: "Court A1",
    type: "Indoor Standard",
    status: "available",
    rate: 25,
    capacity: 4,
    lastSession: "2:30 PM",
    features: ["Climate Control", "LED Lighting", "Seating"],
  },
  {
    id: "A2",
    name: "Court A2",
    type: "Indoor Standard",
    status: "occupied",
    rate: 25,
    capacity: 4,
    occupant: "Garcia Family · 4:15 PM",
    features: ["Climate Control", "LED Lighting"],
  },
  {
    id: "A3",
    name: "Court A3",
    type: "Indoor Standard",
    status: "available",
    rate: 25,
    capacity: 4,
    lastSession: "1:00 PM",
    features: ["Climate Control", "LED Lighting"],
  },
  {
    id: "A4",
    name: "Court A4",
    type: "Indoor Premium",
    status: "reserved",
    rate: 30,
    capacity: 4,
    reservedFor: "S. Chen · 5:00 PM",
    features: ["Climate Control", "Pro Surface", "Scoreboard"],
  },
  {
    id: "B1",
    name: "Court B1",
    type: "Outdoor",
    status: "occupied",
    rate: 20,
    capacity: 4,
    occupant: "Chen Party · 4:00 PM",
    features: ["Natural Light", "Covered Seating"],
  },
  {
    id: "B2",
    name: "Court B2",
    type: "Outdoor",
    status: "available",
    rate: 20,
    capacity: 4,
    lastSession: "1:30 PM",
    features: ["Natural Light"],
  },
  {
    id: "B3",
    name: "Court B3",
    type: "Outdoor",
    status: "maintenance",
    rate: 20,
    capacity: 4,
    maintenanceNote: "Net repair — est. 2h",
    features: ["Natural Light"],
  },
  {
    id: "B4",
    name: "Court B4",
    type: "Outdoor",
    status: "available",
    rate: 20,
    capacity: 4,
    lastSession: "12:00 PM",
    features: ["Natural Light", "Equipment Rental"],
  },
  {
    id: "C1",
    name: "Court C1",
    type: "Premium Indoor",
    status: "occupied",
    rate: 40,
    capacity: 4,
    occupant: "Rodriguez Group · 4:45 PM",
    features: ["VIP Locker", "Video System", "Coach Ready"],
  },
  {
    id: "C2",
    name: "Court C2",
    type: "Premium Indoor",
    status: "available",
    rate: 40,
    capacity: 4,
    lastSession: "11:00 AM",
    features: ["VIP Locker", "Video System"],
  },
  {
    id: "C3",
    name: "Court C3",
    type: "Premium Indoor",
    status: "occupied",
    rate: 40,
    capacity: 4,
    occupant: "Kim Tournament · 5:00 PM",
    features: ["VIP Locker", "Video System"],
  },
  {
    id: "C4",
    name: "Court C4",
    type: "Premium Indoor",
    status: "reserved",
    rate: 40,
    capacity: 4,
    reservedFor: "Tournament · 5:30 PM",
    features: ["VIP Locker", "Video System", "Coach Ready"],
  },
];

const statusConfig: Record<
  CourtStatus,
  {
    label: string;
    dot: string;
    badge: string;
    cardBorder: string;
    iconBg: string;
    iconText: string;
  }
> = {
  available: {
    label: "Available",
    dot: "bg-primary",
    badge: "bg-primary/10 text-primary",
    cardBorder: "border-primary/20",
    iconBg: "bg-primary/10",
    iconText: "text-primary",
  },
  occupied: {
    label: "Occupied",
    dot: "bg-amber-500",
    badge: "bg-amber-50 text-amber-600",
    cardBorder: "border-amber-200",
    iconBg: "bg-amber-50",
    iconText: "text-amber-600",
  },
  reserved: {
    label: "Reserved",
    dot: "bg-indigo-500",
    badge: "bg-indigo-50 text-indigo-600",
    cardBorder: "border-indigo-200",
    iconBg: "bg-indigo-50",
    iconText: "text-indigo-600",
  },
  maintenance: {
    label: "Maintenance",
    dot: "bg-gray-400",
    badge: "bg-gray-100 text-gray-500",
    cardBorder: "border-gray-200",
    iconBg: "bg-gray-100",
    iconText: "text-gray-500",
  },
};

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
    y: 15,
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

function AdminCourts() {
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
        className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between"
      >
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />

            <h2 className="font-display text-xl font-bold text-ink">Courts</h2>
          </div>

          <p className="mt-0.5 text-sm text-gray-400">
            Manage court status, pricing, and settings
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Status Summary */}
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-base-200 bg-white px-3 py-2">
            <StatusLegend color="bg-primary" label="4 Available" />

            <StatusLegend color="bg-amber-500" label="4 Occupied" />

            <StatusLegend color="bg-indigo-500" label="2 Reserved" />

            <StatusLegend color="bg-gray-400" label="1 Maintenance" />
          </div>

          {/* Add Court */}
          <button
            type="button"
            className="btn border-none bg-primary px-4 text-sm font-semibold text-white shadow-none hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            Add Court
          </button>
        </div>
      </motion.div>

      {/* Court Grid */}
      <motion.div
        variants={containerVariants}
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        {courts.map((court) => {
          const config = statusConfig[court.status];

          return (
            <motion.div
              key={court.id}
              variants={cardVariants}
              whileHover={{
                y: -2,
                transition: { duration: 0.2 },
              }}
              className={`card border bg-white shadow-none ${config.cardBorder}`}
            >
              <div className="card-body p-5">
                {/* Court Header */}
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl font-mono-data text-sm font-bold ${config.iconBg} ${config.iconText}`}
                    >
                      {court.id}
                    </div>

                    <div>
                      <div className="text-sm font-bold text-ink">
                        {court.name}
                      </div>

                      <div className="text-xs text-gray-400">{court.type}</div>
                    </div>
                  </div>

                  <span
                    className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${config.badge}`}
                  >
                    {config.label}
                  </span>
                </div>

                {/* Rate / Capacity */}
                <div className="mb-3 grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-base-100 p-2.5">
                    <div className="text-xs text-gray-400">Rate</div>

                    <div className="mt-0.5 font-display text-sm font-bold text-primary">
                      ₱{court.rate}/hr
                    </div>
                  </div>

                  <div className="rounded-lg bg-base-100 p-2.5">
                    <div className="text-xs text-gray-400">Capacity</div>

                    <div className="mt-0.5 flex items-center gap-1 font-display text-sm font-bold text-ink">
                      <Users className="h-3.5 w-3.5 text-gray-400" />
                      {court.capacity} players
                    </div>
                  </div>
                </div>

                {/* Occupied */}
                {court.status === "occupied" && (
                  <div className="mb-3 flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs">
                    <span className="h-2 w-2 rounded-full bg-amber-500" />

                    <span className="text-ink">{court.occupant}</span>
                  </div>
                )}

                {/* Reserved */}
                {court.status === "reserved" && (
                  <div className="mb-3 flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 p-3 text-xs">
                    <span className="text-indigo-500">◆</span>

                    <span>
                      <span className="font-semibold text-indigo-600">
                        Reserved:
                      </span>{" "}
                      <span className="text-ink">{court.reservedFor}</span>
                    </span>
                  </div>
                )}

                {/* Maintenance */}
                {court.status === "maintenance" && (
                  <div className="mb-3 flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-100 p-3 text-xs">
                    <Wrench className="h-3.5 w-3.5 text-gray-400" />

                    <span className="text-gray-600">
                      {court.maintenanceNote}
                    </span>
                  </div>
                )}

                {/* Available */}
                {court.status === "available" && court.lastSession && (
                  <div className="mb-3 flex items-center gap-1.5 text-xs text-gray-400">
                    <Clock3 className="h-3.5 w-3.5" />

                    <span>Last session ended {court.lastSession}</span>
                  </div>
                )}

                {/* Features */}
                <div className="mb-4 flex min-h-[42px] flex-wrap content-start gap-1">
                  {court.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-md bg-base-100 px-2 py-0.5 text-xs text-gray-500"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-auto flex gap-2">
                  <button
                    type="button"
                    className={[
                      "btn flex-1 border-none text-xs font-semibold shadow-none",
                      court.status === "available"
                        ? "bg-primary text-white hover:bg-primary/90"
                        : "bg-base-100 text-gray-600 hover:bg-base-200",
                    ].join(" ")}
                  >
                    {court.status === "available"
                      ? "Book Now"
                      : court.status === "occupied"
                      ? "End Session"
                      : court.status === "maintenance"
                      ? "Mark Available"
                      : "View Booking"}
                  </button>

                  <button
                    type="button"
                    className="btn btn-ghost border border-base-200 bg-white px-3 text-xs font-semibold text-gray-500 shadow-none hover:border-primary/30 hover:bg-base-100 hover:text-primary"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

function StatusLegend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-xs text-gray-500">
      <span className={`h-2 w-2 rounded-full ${color}`} />
      {label}
    </span>
  );
}

export default AdminCourts;
