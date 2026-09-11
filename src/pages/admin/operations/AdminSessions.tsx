import { motion, type Variants } from "framer-motion";
import {
  Plus,
  Users,
  Clock3,
  Timer,
  AlertTriangle,
  PlayCircle,
} from "lucide-react";

type SessionStatus = "active" | "overtime" | "completed";

type Session = {
  id: string;
  court: string;
  customer: string;
  players: number;
  start: string;
  end: string;
  elapsed: string;
  remaining: string;
  type: string;
  status: SessionStatus;
};

const sessions: Session[] = [
  {
    id: "S-1042",
    court: "Court A2",
    customer: "Garcia Family",
    players: 4,
    start: "3:15 PM",
    end: "4:15 PM",
    elapsed: "47m",
    remaining: "13m",
    type: "Indoor",
    status: "active",
  },
  {
    id: "S-1041",
    court: "Court B1",
    customer: "Chen Party",
    players: 3,
    start: "3:00 PM",
    end: "4:00 PM",
    elapsed: "1h 02m",
    remaining: "Overtime",
    type: "Outdoor",
    status: "overtime",
  },
  {
    id: "S-1040",
    court: "Court C1",
    customer: "Rodriguez Group",
    players: 4,
    start: "2:45 PM",
    end: "4:45 PM",
    elapsed: "1h 17m",
    remaining: "43m",
    type: "Premium",
    status: "active",
  },
  {
    id: "S-1039",
    court: "Court C3",
    customer: "Kim Tournament",
    players: 4,
    start: "3:00 PM",
    end: "5:00 PM",
    elapsed: "1h 02m",
    remaining: "58m",
    type: "Premium",
    status: "active",
  },
  {
    id: "S-1038",
    court: "Court A2",
    customer: "Williams Team",
    players: 2,
    start: "1:00 PM",
    end: "2:30 PM",
    elapsed: "1h 30m",
    remaining: "Ended",
    type: "Indoor",
    status: "completed",
  },
  {
    id: "S-1037",
    court: "Court B4",
    customer: "Solo Practice — David M.",
    players: 1,
    start: "12:00 PM",
    end: "1:30 PM",
    elapsed: "1h 30m",
    remaining: "Ended",
    type: "Outdoor",
    status: "completed",
  },
];

const activeSessions = sessions.filter(
  (session) => session.status === "active" || session.status === "overtime"
);

const completedSessions = sessions.filter(
  (session) => session.status === "completed"
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

function AdminSessions() {
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
          <div className="flex items-center gap-2">
            <PlayCircle className="h-5 w-5 text-primary" />

            <h2 className="font-display text-xl font-bold text-ink">
              Sessions
            </h2>
          </div>

          <p className="mt-0.5 text-sm text-gray-400">
            Monitor active court sessions and history
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Active Count */}
          <div className="flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-3 py-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
            </span>

            <span className="text-sm font-semibold text-primary">
              {activeSessions.length} Active Sessions
            </span>
          </div>

          {/* Start Session */}
          <button
            type="button"
            className="btn border-none bg-primary px-4 text-sm font-semibold text-white shadow-none hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            Start Session
          </button>
        </div>
      </motion.div>

      {/* Active Sessions */}
      <motion.section variants={itemVariants}>
        <div className="mb-3 flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Active Now
          </span>

          <span className="badge badge-sm border-none bg-primary/10 text-primary">
            {activeSessions.length}
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {activeSessions.map((session) => {
            const isOvertime = session.status === "overtime";

            return (
              <motion.div
                key={session.id}
                variants={cardVariants}
                whileHover={{
                  y: -2,
                  transition: { duration: 0.2 },
                }}
                className={[
                  "card border bg-white shadow-none",
                  isOvertime ? "border-orange-300" : "border-primary/25",
                ].join(" ")}
              >
                <div className="card-body p-5">
                  {/* Court / Status */}
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-base font-bold text-ink">
                        {session.court}
                      </h3>

                      <p className="mt-0.5 text-xs text-gray-400">
                        {session.type}
                      </p>
                    </div>

                    {isOvertime ? (
                      <span className="badge badge-sm border-none bg-orange-50 text-orange-600">
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        Overtime
                      </span>
                    ) : (
                      <span className="badge badge-sm border-none bg-primary/10 text-primary">
                        <span className="mr-1 h-1.5 w-1.5 rounded-full bg-primary" />
                        Live
                      </span>
                    )}
                  </div>

                  {/* Customer */}
                  <div className="mb-3">
                    <div className="text-sm font-semibold text-ink">
                      {session.customer}
                    </div>

                    <div className="mt-0.5 flex items-center gap-1 text-xs text-gray-400">
                      <Users className="h-3.5 w-3.5" />
                      {session.players} players
                      <span>·</span>
                      Session {session.id}
                    </div>
                  </div>

                  {/* Time Stats */}
                  <div className="mb-4 grid grid-cols-2 gap-2">
                    <div className="rounded-lg bg-base-100 p-2">
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Timer className="h-3 w-3" />
                        Elapsed
                      </div>

                      <div className="mt-0.5 font-mono-data text-sm font-bold text-ink">
                        {session.elapsed}
                      </div>
                    </div>

                    <div
                      className={[
                        "rounded-lg p-2",
                        isOvertime ? "bg-orange-50" : "bg-base-100",
                      ].join(" ")}
                    >
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock3 className="h-3 w-3" />
                        Remaining
                      </div>

                      <div
                        className={[
                          "mt-0.5 font-mono-data text-sm font-bold",
                          isOvertime ? "text-orange-600" : "text-ink",
                        ].join(" ")}
                      >
                        {session.remaining}
                      </div>
                    </div>
                  </div>

                  {/* Schedule */}
                  <div className="mb-3 text-xs text-gray-400">
                    {session.start} → {session.end}
                  </div>

                  {/* Actions */}
                  <div className="mt-auto flex gap-2">
                    <button
                      type="button"
                      className="btn flex-1 border-none bg-orange-50 text-xs font-semibold text-orange-600 shadow-none hover:bg-orange-100"
                    >
                      End Session
                    </button>

                    <button
                      type="button"
                      className="btn flex-1 border border-base-200 bg-white text-xs font-semibold text-gray-500 shadow-none hover:bg-base-100"
                    >
                      Extend
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Session History */}
      <motion.section
        variants={itemVariants}
        className="overflow-hidden rounded-2xl border border-base-200 bg-white"
      >
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-base-200 px-5 py-4">
          <div>
            <h3 className="text-sm font-bold text-ink">
              Today's Session History
            </h3>

            <p className="mt-0.5 text-xs text-gray-400">
              Recently completed sessions
            </p>
          </div>

          <span className="badge badge-sm border-none bg-base-100 text-gray-500">
            {completedSessions.length} Completed
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table w-full min-w-[850px]">
            <thead>
              <tr className="border-b border-base-200 bg-base-100">
                {[
                  "Session ID",
                  "Court",
                  "Customer",
                  "Players",
                  "Start",
                  "End",
                  "Duration",
                  "Status",
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
              {completedSessions.map((session, index) => (
                <motion.tr
                  key={session.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.25,
                    delay: index * 0.05,
                  }}
                  className="border-b border-base-100 last:border-none hover:bg-base-100/60"
                >
                  {/* Session ID */}
                  <td className="px-4 py-3">
                    <span className="font-mono-data text-xs text-gray-400">
                      {session.id}
                    </span>
                  </td>

                  {/* Court */}
                  <td className="px-4 py-3">
                    <span className="text-sm font-semibold text-ink">
                      {session.court}
                    </span>
                  </td>

                  {/* Customer */}
                  <td className="px-4 py-3">
                    <span className="text-sm text-ink">{session.customer}</span>
                  </td>

                  {/* Players */}
                  <td className="px-4 py-3 text-center">
                    <span className="text-xs text-gray-500">
                      {session.players}
                    </span>
                  </td>

                  {/* Start */}
                  <td className="px-4 py-3">
                    <span className="font-mono-data text-xs text-gray-500">
                      {session.start}
                    </span>
                  </td>

                  {/* End */}
                  <td className="px-4 py-3">
                    <span className="font-mono-data text-xs text-gray-500">
                      {session.end}
                    </span>
                  </td>

                  {/* Duration */}
                  <td className="px-4 py-3">
                    <span className="text-xs text-gray-500">
                      {session.elapsed}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <span className="badge badge-sm border-none bg-base-100 text-gray-500">
                      Completed
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>
    </motion.div>
  );
}

export default AdminSessions;
