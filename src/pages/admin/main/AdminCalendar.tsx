import { motion, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

type CalendarEvent = {
  day: number;
  start: number;
  duration: number;
  court: string;
  customer: string;
  color: string;
};

const hours = Array.from({ length: 16 }, (_, index) => `${6 + index}:00`);

const days = [
  "Mon Aug 25",
  "Tue Aug 26",
  "Wed Aug 27",
  "Thu Aug 28",
  "Fri Aug 29",
  "Sat Aug 30",
  "Sun Aug 31",
];

const events: CalendarEvent[] = [
  {
    day: 2,
    start: 8,
    duration: 1,
    court: "A1",
    customer: "Garcia Family",
    color: "#2D8653",
  },
  {
    day: 2,
    start: 10,
    duration: 2,
    court: "B1",
    customer: "Chen Party",
    color: "#6366F1",
  },
  {
    day: 2,
    start: 13,
    duration: 1.5,
    court: "C1",
    customer: "Rodriguez",
    color: "#E8A020",
  },
  {
    day: 3,
    start: 7,
    duration: 1,
    court: "A2",
    customer: "Sarah Chen",
    color: "#2D8653",
  },
  {
    day: 3,
    start: 9,
    duration: 2,
    court: "B2",
    customer: "Kim Tournament",
    color: "#E06020",
  },
  {
    day: 3,
    start: 15,
    duration: 1,
    court: "A1",
    customer: "Priya Patel",
    color: "#6366F1",
  },
  {
    day: 4,
    start: 6,
    duration: 1,
    court: "C2",
    customer: "James Liu",
    color: "#2D8653",
  },
  {
    day: 4,
    start: 11,
    duration: 3,
    court: "A3",
    customer: "Club Practice",
    color: "#E8A020",
  },
  {
    day: 5,
    start: 8,
    duration: 2,
    court: "B1",
    customer: "Emma Thompson",
    color: "#2D8653",
  },
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

function AdminCalendar() {
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
            <CalendarDays className="h-5 w-5 text-primary" />

            <h2 className="font-display text-xl font-bold text-ink">
              Calendar View
            </h2>
          </div>

          <p className="mt-0.5 text-sm text-gray-400">
            Week of Aug 25 – 31, 2026
          </p>
        </div>

        {/* Calendar Navigation */}
        <div className="flex gap-2">
          <button
            type="button"
            className="btn btn-ghost border border-base-200 bg-white px-3 text-sm font-medium text-gray-600 shadow-none hover:border-primary/30 hover:bg-base-100"
          >
            <ChevronLeft className="h-4 w-4" />
            Prev
          </button>

          <button
            type="button"
            className="btn border-none bg-secondary px-4 text-sm font-semibold text-white shadow-none hover:bg-secondary/90"
          >
            Today
          </button>

          <button
            type="button"
            className="btn btn-ghost border border-base-200 bg-white px-3 text-sm font-medium text-gray-600 shadow-none hover:border-primary/30 hover:bg-base-100"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </motion.div>

      {/* Calendar */}
      <motion.div
        variants={itemVariants}
        className="overflow-hidden rounded-2xl border border-base-200 bg-white"
      >
        {/* Horizontal Scroll Container */}
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            {/* Header */}
            <div className="grid grid-cols-[60px_repeat(7,minmax(120px,1fr))]">
              {/* Empty time column */}
              <div className="border-b border-base-200 bg-white px-2 py-3" />

              {days.map((day, index) => {
                const isToday = index === 2;

                return (
                  <div
                    key={day}
                    className={[
                      "border-b border-l border-base-200 px-2 py-3 text-center",
                      isToday ? "bg-primary/[0.04]" : "bg-white",
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "text-xs font-semibold",
                        isToday ? "text-primary" : "text-gray-400",
                      ].join(" ")}
                    >
                      {day.slice(0, 3)}
                    </div>

                    <div
                      className={[
                        "mt-0.5 font-display text-sm font-bold",
                        isToday ? "text-primary" : "text-ink",
                      ].join(" ")}
                    >
                      {day.slice(4)}
                    </div>

                    {isToday && (
                      <span className="mt-1 inline-block rounded-full bg-primary px-2 py-0.5 text-[9px] font-semibold text-white">
                        TODAY
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Time Rows */}
            {hours.map((hour, hourIndex) => {
              const currentHour = 6 + hourIndex;

              return (
                <div
                  key={hour}
                  className="grid grid-cols-[60px_repeat(7,minmax(120px,1fr))]"
                >
                  {/* Time */}
                  <div className="min-h-12 border-b border-base-100 px-2 py-4 text-right font-mono-data text-xs text-gray-400">
                    {hour}
                  </div>

                  {/* Days */}
                  {days.map((_, dayIndex) => {
                    const cellEvents = events.filter(
                      (event) =>
                        event.day === dayIndex && event.start === currentHour
                    );

                    const isToday = dayIndex === 2;

                    return (
                      <div
                        key={`${hourIndex}-${dayIndex}`}
                        className={[
                          "relative min-h-12 border-b border-l border-base-100 px-1 py-1",
                          isToday ? "bg-primary/[0.02]" : "bg-white",
                        ].join(" ")}
                      >
                        {cellEvents.map((event, eventIndex) => (
                          <motion.div
                            key={`${event.court}-${eventIndex}`}
                            initial={{
                              opacity: 0,
                              scale: 0.98,
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                            }}
                            transition={{
                              duration: 0.25,
                              delay: (event.day + event.start) * 0.01,
                            }}
                            className="absolute left-1 right-1 top-1 z-10 cursor-pointer overflow-hidden rounded-lg px-2 py-1 transition-opacity hover:opacity-80"
                            style={{
                              height: `${event.duration * 48 - 4}px`,
                              backgroundColor: `${event.color}18`,
                              border: `1.5px solid ${event.color}40`,
                            }}
                          >
                            <div
                              className="truncate text-xs font-bold"
                              style={{
                                color: event.color,
                              }}
                            >
                              {event.court}
                            </div>

                            <div
                              className="truncate text-xs"
                              style={{
                                color: event.color,
                                opacity: 0.75,
                              }}
                            >
                              {event.customer}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Legend */}
      <motion.div
        variants={itemVariants}
        className="flex flex-wrap items-center gap-5 rounded-xl border border-base-200 bg-white px-4 py-3"
      >
        <span className="text-xs font-semibold text-gray-400">
          BOOKING TYPES
        </span>

        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
          <span className="text-xs text-gray-500">Regular Booking</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
          <span className="text-xs text-gray-500">Group Booking</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
          <span className="text-xs text-gray-500">Reserved</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
          <span className="text-xs text-gray-500">Tournament</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AdminCalendar;
