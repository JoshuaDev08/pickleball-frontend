import { motion, type Variants } from "framer-motion";
import { Plus, Clock3, Users, Phone, UserPlus, X } from "lucide-react";

type QueueItem = {
  pos: number;
  id: string;
  name: string;
  players: number;
  waited: number;
  preference: "Any" | "Indoor" | "Outdoor";
  phone: string;
};

const queue: QueueItem[] = [
  {
    pos: 1,
    id: "Q-087",
    name: "Marcus Johnson",
    players: 2,
    waited: 23,
    preference: "Any",
    phone: "(415) 555-0187",
  },
  {
    pos: 2,
    id: "Q-088",
    name: "Williams Family",
    players: 4,
    waited: 18,
    preference: "Indoor",
    phone: "(415) 555-0188",
  },
  {
    pos: 3,
    id: "Q-089",
    name: "Alex Kim",
    players: 2,
    waited: 12,
    preference: "Any",
    phone: "(415) 555-0189",
  },
  {
    pos: 4,
    id: "Q-090",
    name: "Laura Martinez",
    players: 3,
    waited: 7,
    preference: "Outdoor",
    phone: "(415) 555-0190",
  },
  {
    pos: 5,
    id: "Q-091",
    name: "David Okafor",
    players: 2,
    waited: 4,
    preference: "Any",
    phone: "(415) 555-0191",
  },
];

const averageWait = Math.round(
  queue.reduce((total, item) => total + item.waited, 0) / queue.length
);

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

const rowVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -8,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
};

const getWaitTimeClass = (waited: number) => {
  if (waited > 20) {
    return "text-orange-600";
  }

  if (waited > 10) {
    return "text-amber-600";
  }

  return "text-primary";
};

const getPositionClass = (position: number) => {
  if (position === 1) {
    return "bg-amber-500 text-white";
  }

  if (position === 2) {
    return "bg-gray-400 text-white";
  }

  return "bg-base-200 text-gray-500";
};

function AdminQueue() {
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
        className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <div className="flex items-center gap-2">
            <Clock3 className="h-5 w-5 text-primary" />

            <h2 className="font-display text-xl font-bold text-ink">
              Walk-In Queue
            </h2>
          </div>

          <p className="mt-0.5 text-sm text-gray-400">
            Manage walk-in customers waiting for available courts
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Queue Summary */}
          <div className="flex items-center gap-2 rounded-xl border border-amber-500/25 bg-amber-500/10 px-4 py-2.5">
            <Clock3 className="h-4 w-4 text-amber-600" />

            <span className="text-sm font-semibold text-amber-600">
              {queue.length} Waiting · Avg {averageWait} min
            </span>
          </div>

          {/* Add Button */}
          <button
            type="button"
            className="btn border-none bg-primary px-4 text-sm font-semibold text-white shadow-none hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            Add to Queue
          </button>
        </div>
      </motion.div>

      {/* Queue Table */}
      <motion.div
        variants={itemVariants}
        className="overflow-hidden rounded-2xl border border-base-200 bg-white"
      >
        <div className="overflow-x-auto">
          <table className="table w-full min-w-[1050px] text-sm">
            <thead>
              <tr className="border-b border-base-200 bg-base-100">
                {[
                  "Position",
                  "Queue ID",
                  "Customer",
                  "Players",
                  "Wait Time",
                  "Preference",
                  "Contact",
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
              {queue.map((item, index) => (
                <motion.tr
                  key={item.id}
                  variants={rowVariants}
                  className={[
                    "border-b border-base-100 last:border-none",
                    item.pos === 1
                      ? "bg-primary/[0.02]"
                      : "hover:bg-base-100/60",
                  ].join(" ")}
                >
                  {/* Position */}
                  <td className="px-4 py-4">
                    <div
                      className={[
                        "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold",
                        getPositionClass(item.pos),
                      ].join(" ")}
                    >
                      #{item.pos}
                    </div>
                  </td>

                  {/* Queue ID */}
                  <td className="px-4 py-4">
                    <span className="font-mono-data text-xs font-medium text-primary">
                      {item.id}
                    </span>
                  </td>

                  {/* Customer */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <UserPlus className="h-4 w-4" />
                      </div>

                      <span className="font-semibold text-ink">
                        {item.name}
                      </span>
                    </div>
                  </td>

                  {/* Players */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <Users className="h-3.5 w-3.5" />
                      <span>{item.players}</span>
                    </div>
                  </td>

                  {/* Wait Time */}
                  <td className="px-4 py-4">
                    <span
                      className={[
                        "font-mono-data text-xs font-bold",
                        getWaitTimeClass(item.waited),
                      ].join(" ")}
                    >
                      {item.waited}m
                    </span>
                  </td>

                  {/* Preference */}
                  <td className="px-4 py-4">
                    <span className="badge badge-sm border-none bg-base-100 text-gray-500">
                      {item.preference}
                    </span>
                  </td>

                  {/* Contact */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-gray-400" />

                      <span className="font-mono-data text-xs text-gray-500">
                        {item.phone}
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="btn btn-sm border-none bg-primary text-xs font-semibold text-white shadow-none hover:bg-primary/90"
                      >
                        Assign
                      </button>

                      <button
                        type="button"
                        className="btn btn-sm border border-base-200 bg-white text-xs font-medium text-gray-500 shadow-none hover:bg-base-100"
                      >
                        <X className="h-3.5 w-3.5" />
                        Remove
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Queue Information */}
      <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-base-200 bg-white p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            Total Waiting
          </div>

          <div className="mt-1 font-display text-2xl font-bold text-ink">
            {queue.length}
          </div>
        </div>

        <div className="rounded-2xl border border-base-200 bg-white p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            Total Players
          </div>

          <div className="mt-1 font-display text-2xl font-bold text-ink">
            {queue.reduce((total, item) => total + item.players, 0)}
          </div>
        </div>

        <div className="rounded-2xl border border-base-200 bg-white p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            Average Wait
          </div>

          <div className="mt-1 font-display text-2xl font-bold text-primary">
            {averageWait} min
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AdminQueue;
