import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  Minus,
  Plus,
  User,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

type Court = {
  id: string;
  name: string;
  rate: number;
  capacity: number;
};

const COURTS: Court[] = [
  {
    id: "a1",
    name: "Court A1",
    rate: 30,
    capacity: 4,
  },
  {
    id: "a2",
    name: "Court A2",
    rate: 25,
    capacity: 4,
  },
  {
    id: "a3",
    name: "Court A3",
    rate: 25,
    capacity: 4,
  },
  {
    id: "b1",
    name: "Court B1",
    rate: 20,
    capacity: 4,
  },
  {
    id: "b2",
    name: "Court B2",
    rate: 20,
    capacity: 4,
  },
  {
    id: "c1",
    name: "Court C1",
    rate: 40,
    capacity: 4,
  },
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

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

const BookingDetailsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const courtId = searchParams.get("court");
  const dateParam = searchParams.get("date");
  const timeParam = searchParams.get("time");
  const durationParam = searchParams.get("duration");

  const selectedCourt = COURTS.find((court) => court.id === courtId);

  const [playerCount, setPlayerCount] = useState(1);
  const [notes, setNotes] = useState("");

  const [playerNames, setPlayerNames] = useState<string[]>(["Sarah Chen"]);

  if (!selectedCourt || !dateParam || !timeParam || !durationParam) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-xl font-bold text-ink">
            Booking information is missing
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Please go back and select your court and schedule.
          </p>

          <button
            onClick={() => navigate("/booking/court")}
            className="btn btn-primary mt-5"
          >
            Back to Court Selection
          </button>
        </div>
      </div>
    );
  }

  const duration = Number(durationParam);

  const total = selectedCourt.rate * (duration / 60);

  const formattedDate = new Date(`${dateParam}T00:00:00`).toLocaleDateString(
    "en-US",
    {
      weekday: "short",
      month: "short",
      day: "numeric",
    }
  );

  const handlePlayerCountChange = (count: number) => {
    const newCount = Math.min(selectedCourt.capacity, Math.max(1, count));

    setPlayerCount(newCount);

    setPlayerNames((current) => {
      const updated = [...current];

      while (updated.length < newCount) {
        updated.push("");
      }

      return updated.slice(0, newCount);
    });
  };

  const handlePlayerNameChange = (index: number, value: string) => {
    setPlayerNames((current) => {
      const updated = [...current];
      updated[index] = value;
      return updated;
    });
  };

  const handleBack = () => {
    navigate(`/booking/schedule?court=${selectedCourt.id}&date=${dateParam}`);
  };

  const handleContinue = () => {
    const params = new URLSearchParams({
      court: selectedCourt.id,
      date: dateParam,
      time: timeParam,
      duration: durationParam,
    });

    navigate(`/booking/payment?${params.toString()}`);
  };

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="visible">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-ink">
          Player Details
        </h1>

        <p className="mt-1 text-sm text-gray-400">
          Who's playing? Add player information to complete your booking.
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* LEFT — Player Form */}
        <div className="space-y-3 lg:col-span-2">
          {/* Number of Players */}
          <motion.div
            variants={cardVariants}
            className="rounded-2xl border border-base-200 bg-white p-6"
          >
            <div className="mb-5">
              <h2 className="text-sm font-semibold text-ink">
                Number of Players
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Select how many players will be joining this booking.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => handlePlayerCountChange(playerCount - 1)}
                disabled={playerCount <= 1}
                className="btn btn-square btn-outline h-10 min-h-10 w-10 rounded-xl border-base-200 text-ink hover:border-primary hover:bg-primary hover:text-white disabled:opacity-40"
              >
                <Minus size={17} />
              </button>

              <div className="w-12 text-center">
                <span className="font-display text-3xl font-bold text-ink">
                  {playerCount}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handlePlayerCountChange(playerCount + 1)}
                disabled={playerCount >= selectedCourt.capacity}
                className="btn btn-square btn-outline h-10 min-h-10 w-10 rounded-xl border-base-200 text-ink hover:border-primary hover:bg-primary hover:text-white disabled:opacity-40"
              >
                <Plus size={17} />
              </button>

              <span className="text-sm text-gray-400">
                Max {selectedCourt.capacity} players per court
              </span>
            </div>
          </motion.div>

          {/* Player Names */}
          <motion.div
            variants={cardVariants}
            className="rounded-2xl border border-base-200 bg-white p-6"
          >
            <div className="mb-5">
              <h2 className="text-sm font-semibold text-ink">
                Player Names
                <span className="ml-2 font-normal badge badge-success badge-sm badge-soft">Optional</span>
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Add the names of everyone joining the session.
              </p>
            </div>

            <div className="space-y-3">
              {Array.from({ length: playerCount }).map((_, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div
                    className={[
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                      index === 0
                        ? "bg-primary text-white"
                        : "bg-base-200 text-gray-500",
                    ].join(" ")}
                  >
                    {index === 0 ? <User size={15} /> : `P${index + 1}`}
                  </div>

                  <input
                    type="text"
                    value={playerNames[index] ?? ""}
                    onChange={(event) =>
                      handlePlayerNameChange(index, event.target.value)
                    }
                    placeholder={
                      index === 0 ? "Your name" : `Player ${index + 1} name`
                    }
                    className="input h-11 flex-1 rounded-xl border-base-200 bg-base-100 text-sm text-ink outline-none focus:border-primary focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Special Requests */}
          <motion.div
            variants={cardVariants}
            className="rounded-2xl border border-base-200 bg-white p-6"
          >
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-ink">
                Special Requests
                <span className="ml-2 font-normal text-gray-400">Optional</span>
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Let us know if you need anything before your session.
              </p>
            </div>

            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={4}
              placeholder="Equipment rental, warm-up balls, accessibility needs..."
              className="textarea w-full resize-none rounded-xl border-base-200 bg-base-100 text-sm text-ink outline-none focus:border-primary focus:outline-none"
            />
          </motion.div>

          {/* Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleBack}
              className="btn btn-outline rounded-xl border-base-200 px-5 text-gray-500 hover:border-primary hover:bg-white hover:text-primary"
            >
              <ArrowLeft size={17} />
              Back
            </button>

            <button
              type="button"
              onClick={handleContinue}
              className="btn btn-primary rounded-xl px-6 text-white shadow-none"
            >
              Review & Pay
              <ArrowRight size={17} />
            </button>
          </div>
        </div>

        {/* RIGHT — Booking Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-base-200 bg-white p-6">
            <div className="mb-5">
              <h2 className="font-display text-lg font-bold text-ink">
                Booking Summary
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Review your selected booking
              </p>
            </div>

            {/* Court */}
            <div className="rounded-xl bg-base-100 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Court
              </p>

              <p className="mt-1 font-display text-lg font-bold text-ink">
                {selectedCourt.name}
              </p>
            </div>

            {/* Date & Time */}
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <CalendarDays size={17} />
                </div>

                <div>
                  <p className="text-xs text-gray-400">Date</p>

                  <p className="text-sm font-semibold text-ink">
                    {formattedDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Clock3 size={17} />
                </div>

                <div>
                  <p className="text-xs text-gray-400">Start Time</p>

                  <p className="text-sm font-semibold text-ink">{timeParam}</p>
                </div>
              </div>
            </div>

            <div className="my-5 border-t border-base-200" />

            {/* Details */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Duration</span>

                <span className="font-medium text-ink">
                  {duration >= 60
                    ? `${duration / 60} ${
                        duration / 60 === 1 ? "Hour" : "Hours"
                      }`
                    : `${duration} Minutes`}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Players</span>

                <span className="font-medium text-ink">{playerCount}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Court Rate</span>

                <span className="font-medium text-ink">
                  ${selectedCourt.rate}/hr
                </span>
              </div>
            </div>

            <div className="my-5 border-t border-base-200" />

            {/* Total */}
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-gray-400">Estimated Total</p>

                <p className="mt-1 text-xs text-gray-400">
                  Before additional charges
                </p>
              </div>

              <span className="font-display text-2xl font-bold text-primary">
                ${total.toFixed(2)}
              </span>
            </div>

            {/* Players indicator */}
            <div className="mt-5 rounded-xl border border-primary/10 bg-primary/5 p-3">
              <div className="flex items-center gap-2">
                <User size={15} className="text-primary" />

                <span className="text-xs text-gray-500">
                  {playerCount} {playerCount === 1 ? "player" : "players"}{" "}
                  selected
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingDetailsPage;
