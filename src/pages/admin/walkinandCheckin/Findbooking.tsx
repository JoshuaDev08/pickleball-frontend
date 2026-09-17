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

export default function FindBooking() {
  return (
    <motion.div
      variants={contentVariants}
      initial="hidden"
      animate="visible"
      className="rounded-2xl border border-base-200 bg-base-100 p-8"
    >
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-bold font-display text-base-content">
          Find Your Booking
        </h2>

        <p className="text-sm font-body text-base-content/50">
          Enter your booking reference, email, or phone number to check in.
        </p>
      </div>

      {/* Search Form */}
      <form className="mb-6 space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-base-content/50">
            Booking Reference / Email / Phone
          </label>

          <input
            type="text"
            placeholder="BK-2847 or sarah@email.com"
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

        <motion.button
          type="submit"
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
          Search Booking
        </motion.button>
      </form>

      {/* Empty State */}
      <div className="flex items-center justify-center gap-4 text-sm font-body text-base-content/50">
        <span>No booking?</span>

        <motion.span
          whileHover={{ x: 3 }}
          className="cursor-pointer font-semibold text-primary transition-colors hover:text-accent"
        >
          Join the walk-in queue →
        </motion.span>
      </div>
    </motion.div>
  );
}
