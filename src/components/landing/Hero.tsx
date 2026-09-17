import { motion, type Variants } from "framer-motion";
import HERO_IMG from "../../assets/hero.jpg";
import { useCourts, type CourtStatus } from "../../context/courtContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

type CourtAvailability = {
  id: number;
  court: string;
  type: string;
  status: string;
  time: string;
};

const stats = [
  {
    value: "12",
    label: "Premium Courts",
  },
  {
    value: "2,400+",
    label: "Active Members",
  },
  {
    value: "4.9★",
    label: "Average Rating",
  },
];

const contentContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut",
    },
  },
};

const badgeVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 15,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const headingVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: "easeOut",
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 50,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.25,
    },
  },
};

const listContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.4,
    },
  },
};

const listItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 15,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const statusBadgeClasses: Record<CourtStatus, string> = {
  available: "badge-success text-success-content",
  occupied: "badge-warning text-warning-content",
  reserved: "badge-info text-info-content",
  maintenance: "badge-neutral text-neutral-content",
};

export default function Hero() {
  const navigate = useNavigate();
  const { courts, loading, error } = useCourts();

  const availableCourts = courts.filter(
    (court) => court.status === "available"
  ).length;

  const useCountUp = (target: number, duration = 900) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let animationFrame: number;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease-out animation
        const easedProgress = 1 - Math.pow(1 - progress, 3);

        setCount(Math.round(target * easedProgress));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => {
        cancelAnimationFrame(animationFrame);
      };
    }, [target, duration]);

    return count;
  };

  const animatedAvailableCourts = useCountUp(availableCourts, 900);

  return (
    <section className="relative isolate min-h-[620px] overflow-hidden bg-secondary">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <motion.img
          src={HERO_IMG}
          alt="Pickleball court"
          className="h-full w-full object-cover opacity-25"
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.25 }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-forest-dark/95 via-forest/85 to-forest-dark/95" />
      </div>

      {/* Hero Content */}
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        {/* Left Content */}
        <motion.div
          className="max-w-2xl"
          variants={contentContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Availability Badge */}
          <motion.div
            variants={badgeVariants}
            className="badge badge-warning badge-lg mb-6 gap-2 border border-warning/30 bg-warning/10 px-4 py-3 text-warning-content"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-warning opacity-60" />

              <span className="relative inline-flex h-2 w-2 rounded-full bg-warning" />
            </span>

            {loading ? (
              "Checking availability..."
            ) : (
              <>
                <motion.span
                  key={availableCourts}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                >
                  {animatedAvailableCourts}
                </motion.span>

                {animatedAvailableCourts === 1
                  ? " Court Available Now"
                  : " Courts Available Now"}
              </>
            )}
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={headingVariants}
            className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Serve Up the
            <br />
            <span className="text-primary">Perfect Game.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUpVariants}
            className="mt-6 max-w-xl text-base leading-7 text-white/65 sm:text-lg"
          >
            Premium indoor and outdoor pickleball courts with instant online
            booking, real-time availability, and seamless QR check-in.
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={fadeUpVariants}
            className="mt-8 flex flex-wrap gap-3"
          >
            <button
              className="btn btn-primary btn-lg rounded-xl px-7 shadow-lg shadow-primary/20"
              onClick={() => navigate("/booking")}
            >
              Book a Court
              <span aria-hidden="true">→</span>
            </button>

            <button
              className="btn btn-outline btn-lg rounded-xl border-white/20 bg-white/5 px-7 text-white hover:border-white/30 hover:bg-white/10 hover:text-white"
              onClick={() => navigate("/staff")}
            >
              Walk-In Check-In
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUpVariants}
            className="mt-10 grid max-w-lg grid-cols-3 border-t border-white/10 pt-7"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="pr-4">
                <div className="font-display text-2xl font-bold text-white sm:text-3xl">
                  {stat.value}
                </div>

                <div className="mt-1 text-[11px] leading-4 text-white/40 sm:text-xs">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Availability Card */}
        <motion.div
          className="hidden lg:flex lg:justify-end"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-xl"
            whileHover={{
              borderColor: "rgba(45, 134, 83, 0.35)",
            }}
          >
            {/* Card Header */}
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="font-display text-lg font-semibold text-white">
                  Today's Availability
                </p>

                <p className="mt-0.5 text-xs text-white/40">
                  Check court status in real time
                </p>
              </div>

              <div className="badge badge-error badge-outline gap-1.5 text-xs">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-error opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-error" />
                </span>
                Live
              </div>
            </div>

            {/* Court List */}
            <motion.div
              className="space-y-2.5"
              variants={listContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {loading ? (
                [1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.045] px-4 py-3.5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="skeleton h-9 w-9 rounded-xl bg-white/10" />

                      <div className="space-y-2">
                        <div className="skeleton h-3 w-24 bg-white/10" />
                        <div className="skeleton h-2 w-32 bg-white/10" />
                      </div>
                    </div>

                    <div className="skeleton h-6 w-20 rounded-full bg-white/10" />
                  </div>
                ))
              ) : error ? (
                <div className="rounded-2xl border border-error/20 bg-error/10 px-4 py-4 text-sm text-error-content">
                  {error}
                </div>
              ) : courts.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-4 text-sm text-white/60">
                  No courts are currently available.
                </div>
              ) : (
                courts.map((court) => (
                  <motion.div
                    key={court.id}
                    variants={listItemVariants}
                    className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.045] px-4 py-3.5 transition-colors hover:bg-white/[0.08]"
                  >
                    <div className="flex items-center gap-3">
                      {/* Court Indicator */}
                      <motion.div
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15"
                        whileHover={{
                          scale: 1.08,
                          rotate: -3,
                        }}
                        transition={{
                          duration: 0.2,
                        }}
                      >
                        <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                      </motion.div>

                      <div>
                        <p className="text-sm font-semibold text-white">
                          {court.name}
                        </p>

                        <p className="mt-0.5 text-xs text-white/40">
                          {court.type} · {court.availability_label}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`badge badge-sm border-0 px-2.5 ${
                        statusBadgeClasses[court.status] ??
                        "badge-ghost text-white/70"
                      }`}
                    >
                      {court.status.charAt(0).toUpperCase() +
                        court.status.slice(1)}
                    </span>
                  </motion.div>
                ))
              )}
            </motion.div>

            {/* Card Footer */}
            <motion.div
              className="mt-5 border-t border-white/10 pt-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.9,
              }}
            >
              <div className="mb-4 flex items-center justify-between text-xs">
                <span className="text-white/40">Next available court</span>

                {loading ? (
                  <span className="text-white/40">Loading...</span>
                ) : error ? (
                  <span className="text-white/40">Unavailable</span>
                ) : (
                  <span className="font-mono-data font-medium text-primary">
                    {courts.find((court) => court.status === "available")
                      ?.name ?? "No court available"}
                  </span>
                )}
              </div>

              <button className="btn btn-primary w-full rounded-xl">
                View All Courts
                <span aria-hidden="true">→</span>
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-34 bg-gradient-to-t from-base-100/30 to-transparent" />
    </section>
  );
}
