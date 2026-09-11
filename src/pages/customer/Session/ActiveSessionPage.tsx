import { Play } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const ActiveSessionPage = () => {
  return (
    <motion.div
      className="mx-auto max-w-lg text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Session Icon */}
      <motion.div
        variants={itemVariants}
        className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary">
          <Play className="ml-1 h-8 w-8 fill-primary text-primary" />
        </div>
      </motion.div>

      {/* Session Information */}
      <motion.div variants={itemVariants}>
        <h2 className="font-display text-2xl font-bold text-ink">
          Court A1 — Live Session
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          Indoor Premium · Started 4:05 PM · 2 players
        </p>
      </motion.div>

      {/* Timer */}
      <motion.div variants={itemVariants} className="mt-8">
        <div className="font-mono text-7xl font-bold tracking-tight text-secondary">
          47:22
        </div>

        <div className="mt-2 text-sm text-gray-400">
          Time remaining (of 1 hour)
        </div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div variants={itemVariants} className="mt-8">
        <progress
          className="progress progress-primary h-3 w-full"
          value={21}
          max={100}
        />
      </motion.div>

      {/* Session Details */}
      <motion.div
        variants={itemVariants}
        className="mt-8 grid grid-cols-2 gap-4"
      >
        {/* Elapsed */}
        <div className="card border border-base-200 bg-white shadow-sm">
          <div className="card-body items-center p-4">
            <div className="mb-1 text-xs text-gray-400">Elapsed</div>

            <div className="font-mono text-xl font-bold text-ink">12:38</div>
          </div>
        </div>

        {/* Ends At */}
        <div className="card border border-base-200 bg-white shadow-sm">
          <div className="card-body items-center p-4">
            <div className="mb-1 text-xs text-gray-400">Ends At</div>

            <div className="font-display text-xl font-bold text-ink">
              5:05 PM
            </div>
          </div>
        </div>
      </motion.div>

      {/* End Session Button */}
      {/* Button intentionally NOT animated */}
      <motion.div variants={itemVariants} className="mt-6">
        <button
          type="button"
          className="btn btn-outline btn-error w-full rounded-xl text-sm font-semibold"
        >
          End Session Early
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ActiveSessionPage;
