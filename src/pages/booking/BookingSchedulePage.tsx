import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";

type TimeSlot = {
  time: string;
  available: boolean;
};

type Duration = {
  value: number;
  label: string;
};

type Court = {
  id: string;
  name: string;
  rate: number;
};

const COURTS: Court[] = [
  {
    id: "a1",
    name: "Court A1",
    rate: 30,
  },
  {
    id: "a2",
    name: "Court A2",
    rate: 25,
  },
  {
    id: "a3",
    name: "Court A3",
    rate: 25,
  },
  {
    id: "b1",
    name: "Court B1",
    rate: 20,
  },
  {
    id: "b2",
    name: "Court B2",
    rate: 20,
  },
  {
    id: "c1",
    name: "Court C1",
    rate: 40,
  },
];

const TIME_SLOTS: TimeSlot[] = [
  { time: "8:00 AM", available: true },
  { time: "8:30 AM", available: true },
  { time: "9:00 AM", available: false },
  { time: "9:30 AM", available: true },
  { time: "10:00 AM", available: true },
  { time: "10:30 AM", available: true },
  { time: "11:00 AM", available: false },
  { time: "11:30 AM", available: true },
  { time: "12:00 PM", available: true },
  { time: "12:30 PM", available: false },
  { time: "1:00 PM", available: true },
  { time: "1:30 PM", available: true },
  { time: "2:00 PM", available: true },
  { time: "2:30 PM", available: false },
  { time: "3:00 PM", available: true },
  { time: "3:30 PM", available: true },
  { time: "4:00 PM", available: true },
  { time: "4:30 PM", available: true },
  { time: "5:00 PM", available: false },
  { time: "5:30 PM", available: true },
];

const DURATIONS: Duration[] = [
  { value: 60, label: "1 Hour" },
  { value: 90, label: "1.5 Hours" },
  { value: 120, label: "2 Hours" },
  { value: 180, label: "3 Hours" },
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

const BookingSchedulePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Get parameters from URL
  const courtId = searchParams.get("court");
  const dateParam = searchParams.get("date");

  // Find selected court
  const selectedCourt = COURTS.find((court) => court.id === courtId);

  // Convert date parameter back to Date
  const selectedDate = dateParam ? new Date(`${dateParam}T00:00:00`) : null;

  // Schedule selections
  const [selectedTime, setSelectedTime] = useState<TimeSlot>(
    TIME_SLOTS.find((slot) => slot.available) ?? TIME_SLOTS[0]
  );

  const [selectedDuration, setSelectedDuration] = useState<Duration>(
    DURATIONS[0]
  );

  // Prevent invalid URL parameters
  if (!selectedCourt || !selectedDate) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-xl font-bold text-ink">
            Booking information is missing
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Please select a court and date first.
          </p>

          <button
            type="button"
            onClick={() => navigate("/booking/court")}
            className="btn btn-primary mt-5 rounded-xl text-white"
          >
            Back to Court Selection
          </button>
        </div>
      </div>
    );
  }

  const total = selectedCourt.rate * (selectedDuration.value / 60);

  const handleBack = () => {
    navigate("/booking/court");
  };

  const handleContinue = () => {
    navigate(
      `/booking/details?court=${
        selectedCourt.id
      }&date=${dateParam}&time=${encodeURIComponent(
        selectedTime.time
      )}&duration=${selectedDuration.value}`
    );
  };

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="visible">
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center gap-2">
          <Clock3 className="h-5 w-5 text-primary" />

          <h1 className="font-display text-2xl font-bold text-ink">
            Pick Your Time
          </h1>
        </div>

        <p className="mt-1 text-sm text-gray-400">
          {selectedCourt.name} · {DAYS[selectedDate.getDay()]},{" "}
          {MONTHS[selectedDate.getMonth()]} {selectedDate.getDate()}
        </p>
      </motion.div>

      {/* Your existing time-slot UI goes here */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-8 lg:grid-cols-3"
      >
        {/* Time Slots */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Available Time Slots
          </div>

          <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
            {TIME_SLOTS.map((slot) => {
              const isSelected = selectedTime.time === slot.time;

              return (
                <button
                  key={slot.time}
                  type="button"
                  disabled={!slot.available}
                  onClick={() => {
                    if (slot.available) {
                      setSelectedTime(slot);
                    }
                  }}
                  className={[
                    "rounded-xl px-2 py-2.5 text-xs font-medium transition-colors",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    isSelected
                      ? "bg-primary text-white"
                      : slot.available
                      ? "border border-base-200 bg-white text-ink hover:border-primary/40 hover:bg-primary/5"
                      : "cursor-not-allowed border border-transparent bg-base-100 text-gray-300 line-through",
                  ].join(" ")}
                >
                  {slot.time}
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 rounded border border-gray-200 bg-white" />
              Available
            </span>

            <span className="flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 rounded bg-primary" />
              Selected
            </span>

            <span className="flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 rounded border border-gray-200 bg-base-100" />
              Taken
            </span>
          </div>
        </motion.div>

        {/* Duration + Summary */}
        <motion.div variants={itemVariants} className="space-y-5">
          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Duration
            </div>

            <div className="grid grid-cols-2 gap-2">
              {DURATIONS.map((duration) => {
                const isSelected = selectedDuration.value === duration.value;

                return (
                  <button
                    key={duration.value}
                    type="button"
                    onClick={() => setSelectedDuration(duration)}
                    className={[
                      "rounded-xl px-3 py-3 text-sm font-medium transition-colors",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                      isSelected
                        ? "bg-primary text-white"
                        : "border border-base-200 bg-white text-ink hover:border-primary/40 hover:bg-primary/5",
                    ].join(" ")}
                  >
                    {duration.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="card border border-base-200 bg-white shadow-sm">
            <div className="card-body p-4">
              <div className="mb-3 text-xs font-semibold text-gray-400">
                Booking Summary
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Court</span>
                  <span className="font-medium text-ink">
                    {selectedCourt.name}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Start</span>
                  <span className="font-medium text-ink">
                    {selectedTime.time}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-medium text-ink">
                    {selectedDuration.label}
                  </span>
                </div>

                <div className="flex justify-between border-t border-base-200 pt-2">
                  <span className="text-gray-500">Estimated total</span>

                  <span className="font-display font-bold text-primary">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Navigation */}
      <motion.div variants={itemVariants} className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={handleBack}
          className="btn btn-outline rounded-xl border-base-200 px-6 text-sm font-semibold text-gray-500 hover:border-primary hover:bg-primary/5 hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <button
          type="button"
          onClick={handleContinue}
          className="btn btn-primary rounded-xl px-8 text-sm font-semibold text-white"
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </button>
      </motion.div>
    </motion.div>
  );
};

export default BookingSchedulePage;
