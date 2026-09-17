import { useState } from "react";
import { motion, type Variants } from "framer-motion";

const contentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
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

export default function WalkIn() {
  const [playerCount, setPlayerCount] = useState(1);
  const [courtPref, setCourtPref] = useState("Any");

  return (
    <motion.div
      variants={contentVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Join Queue */}
      <div className="rounded-2xl border border-base-200 bg-base-100 p-6">
        <div className="mb-5">
          <h2 className="mb-1 text-lg font-bold font-display text-base-content">
            Join the Walk-In Queue
          </h2>

          <p className="text-sm font-body text-base-content/50">
            No booking? Join the queue and we'll assign the next available
            court.
          </p>
        </div>

        {/* Players + Court Preference */}
        <div className="mb-5 grid grid-cols-2 gap-4">
          {/* Players */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide font-body text-base-content/50">
              Players
            </label>

            <div className="flex items-center gap-3">
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={() => setPlayerCount(Math.max(1, playerCount - 1))}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-base-200
                  bg-base-100
                  text-lg
                  font-bold
                  text-base-content
                  transition-colors
                  hover:bg-base-200
                "
              >
                −
              </motion.button>

              <span className="w-6 text-center text-xl font-bold font-display text-base-content">
                {playerCount}
              </span>

              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={() => setPlayerCount(Math.min(4, playerCount + 1))}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-base-200
                  bg-base-100
                  text-lg
                  font-bold
                  text-base-content
                  transition-colors
                  hover:bg-base-200
                "
              >
                +
              </motion.button>
            </div>
          </div>

          {/* Court Preference */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide font-body text-base-content/50">
              Court Preference
            </label>

            <select
              value={courtPref}
              onChange={(e) => setCourtPref(e.target.value)}
              className="
                select
                select-bordered
                w-full
                rounded-xl
                bg-base-100
                text-sm
                text-base-content
                font-body
                focus:border-primary
                focus:outline-none
              "
            >
              <option>Any</option>
              <option>Indoor</option>
              <option>Outdoor</option>
              <option>Premium Indoor</option>
            </select>
          </div>
        </div>

        {/* Name */}
        <div className="mb-5">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide font-body text-base-content/50">
            Your Name
          </label>

          <input
            type="text"
            placeholder="Full name"
            className="
              input
              input-bordered
              w-full
              rounded-xl
              bg-base-100
              text-sm
              text-base-content
              placeholder:text-base-content/30
              font-body
              focus:border-primary
              focus:outline-none
            "
          />
        </div>

        {/* Join Button */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="
            btn
            btn-primary
            w-full
            rounded-xl
            border-none
            py-3.5
            text-sm
            font-semibold
            font-body
          "
        >
          Join Queue Now
        </motion.button>
      </div>

      {/* Live Queue */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-bold font-display text-base-content">
            Live Queue
          </h3>

          <span className="text-xs font-mono-data text-base-content/40">
            Queue information
          </span>
        </div>

        {/* Empty Queue UI */}
        <div className="rounded-2xl border border-base-200 bg-base-100 p-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-base-200">
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 text-base-content/40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>

          <p className="text-sm font-medium font-body text-base-content/60">
            Live queue will appear here
          </p>

          <p className="mt-1 text-xs font-body text-base-content/40">
            Queue data will be connected later.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
