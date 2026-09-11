import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Court = {
  id: string;
  name: string;
  type: string;
  rate: number;
  capacity: number;
  features: string[];
  available: boolean;
};

const COURTS: Court[] = [
  {
    id: "a1",
    name: "Court A1",
    type: "Indoor Premium",
    rate: 30,
    capacity: 4,
    features: ["Climate Controlled", "Pro Surface", "Scoreboard"],
    available: true,
  },
  {
    id: "a2",
    name: "Court A2",
    type: "Indoor Standard",
    rate: 25,
    capacity: 4,
    features: ["Climate Controlled", "LED Lighting"],
    available: true,
  },
  {
    id: "a3",
    name: "Court A3",
    type: "Indoor Standard",
    rate: 25,
    capacity: 4,
    features: ["Climate Controlled", "LED Lighting"],
    available: false,
  },
  {
    id: "b1",
    name: "Court B1",
    type: "Outdoor",
    rate: 20,
    capacity: 4,
    features: ["Natural Light", "Covered Seating"],
    available: true,
  },
  {
    id: "b2",
    name: "Court B2",
    type: "Outdoor",
    rate: 20,
    capacity: 4,
    features: ["Natural Light", "Equipment Rental"],
    available: true,
  },
  {
    id: "c1",
    name: "Court C1",
    type: "Premium Indoor",
    rate: 40,
    capacity: 4,
    features: ["VIP Locker Room", "Video Recording", "Coach Ready"],
    available: true,
  },
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const generateDays = () => {
  const today = new Date(2026, 7, 27);

  return Array.from({ length: 28 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);
    return date;
  });
};

const pageVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

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

const BookingCourtPage = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate(
      `/booking/schedule?court=${selectedCourt.id}&date=${
        selectedDate.toISOString().split("T")[0]
      }`
    );
  };
  const days = generateDays();

  const [selectedCourt, setSelectedCourt] = useState<Court>(COURTS[0]);

  const [selectedDate, setSelectedDate] = useState<Date>(days[2]);

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="visible">
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-primary" />

          <h1 className="font-display text-2xl font-bold text-ink">
            Choose Your Court
          </h1>
        </div>

        <p className="mt-1 text-sm text-gray-400">
          Select a court and your preferred date
        </p>
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 lg:grid-cols-3"
      >
        {/* Courts */}
        <div
          className={[
            "grid gap-3 lg:col-span-2",
            COURTS.length > 6 ? "sm:grid-cols-2" : "grid-cols-1",
          ].join(" ")}
        >
          {COURTS.map((court) => {
            const isSelected = selectedCourt.id === court.id;

            return (
              <motion.div key={court.id} variants={itemVariants}>
                <button
                  type="button"
                  disabled={!court.available}
                  onClick={() => {
                    if (court.available) {
                      setSelectedCourt(court);
                    }
                  }}
                  className={[
                    "card w-full text-left transition-all duration-200",
                    "border bg-white shadow-sm",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    isSelected
                      ? "border-2 border-primary bg-primary/5"
                      : "border-base-200",
                    court.available
                      ? "cursor-pointer hover:border-primary/40 hover:shadow-md"
                      : "cursor-not-allowed opacity-50",
                  ].join(" ")}
                >
                  <div className="card-body p-2">
                    <div className="flex items-center justify-between gap-4">
                      {/* Court Information */}
                      <div className="flex min-w-0 items-center gap-4">
                        <div
                          className={[
                            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                            "font-mono text-sm font-bold",
                            isSelected
                              ? "bg-primary/15 text-primary"
                              : "bg-base-100 text-gray-400",
                          ].join(" ")}
                        >
                          {court.id.toUpperCase()}
                        </div>

                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-ink">
                            {court.name}
                          </div>

                          <div className="mt-0.5 text-xs text-gray-400">
                            {court.type} · Max {court.capacity} players
                          </div>

                          <div className="mt-1.5 flex flex-wrap gap-1.5">
                            {court.features.slice(0, 2).map((feature) => (
                              <span
                                key={feature}
                                className="badge badge-ghost h-6 border-0 bg-base-100 px-2 text-[11px] text-gray-500"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Rate */}
                      <div className="shrink-0 text-right">
                        <div className="font-display text-lg font-bold text-primary">
                          ${court.rate}
                          <span className="text-xs font-normal text-gray-400">
                            /hr
                          </span>
                        </div>

                        <div
                          className={[
                            "badge mt-1 border-0 text-xs font-semibold",
                            court.available
                              ? "badge-success bg-primary/10 text-primary"
                              : "badge-ghost bg-base-200 text-gray-400",
                          ].join(" ")}
                        >
                          {court.available ? "Available" : "Occupied"}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
        {/* Date Picker */}
        <motion.div
          variants={itemVariants}
          className="card border border-base-200 bg-white shadow-sm"
        >
          <div className="card-body p-5">
            {/* Month */}
            <div className="mb-4 flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary" />

              <div className="font-semibold text-sm text-ink">
                {MONTHS[selectedDate.getMonth()]} {selectedDate.getFullYear()}
              </div>
            </div>

            {/* Week Days */}
            <div className="mb-2 grid grid-cols-7 gap-1">
              {DAYS.map((day) => (
                <div
                  key={day}
                  className="py-1 text-center text-xs font-semibold text-gray-400"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((date, index) => {
                const isSelected =
                  date.toDateString() === selectedDate.toDateString();

                const isToday =
                  date.toDateString() === new Date(2026, 7, 27).toDateString();

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedDate(date)}
                    className={[
                      "btn btn-ghost h-8 min-h-8 w-full rounded-lg p-0 text-xs",
                      "font-medium transition-colors",
                      isSelected
                        ? "bg-primary text-white hover:bg-primary"
                        : isToday
                        ? "border border-primary bg-base-100 text-primary hover:bg-primary/10"
                        : "text-ink hover:bg-base-100",
                    ].join(" ")}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>

            {/* Selected Date */}
            <div className="mt-4 border-t border-base-200 pt-4">
              <div className="text-xs text-gray-400">Selected date:</div>

              <div className="mt-0.5 text-sm font-semibold text-ink">
                {DAYS[selectedDate.getDay()]}, {MONTHS[selectedDate.getMonth()]}{" "}
                {selectedDate.getDate()}, {selectedDate.getFullYear()}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Continue */}
      <motion.div variants={itemVariants} className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={handleContinue}
          className="btn btn-primary rounded-xl px-8 text-sm font-semibold text-white"
        >
          Continue to Time Selection
          <ArrowRight className="h-4 w-4" />
        </button>
      </motion.div>
    </motion.div>
  );
};

export default BookingCourtPage;
