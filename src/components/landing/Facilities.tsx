import { motion, type Variants } from "framer-motion";

import COURT_INDOOR from "../../assets/court-indoor.jpg";
import COURT_OUTDOOR from "../../assets/court-outdoor.jpg";
import COURT_PREMIUM from "../../assets/court-premium.jpg";
import { useCourts, type CourtStatus } from "../../context/courtContext";

const courtImages: Record<string, string> = {
  indoor: COURT_INDOOR,
  outdoor: COURT_OUTDOOR,
  premium: COURT_PREMIUM,
};

const statusConfig: Record<
  CourtStatus,
  {
    label: string;
    badgeClass: string;
    dotClass: string;
    buttonLabel: string;
  }
> = {
  available: {
    label: "Available",
    badgeClass: "badge-success",
    dotClass: "bg-success-content",
    buttonLabel: "Book This Court",
  },
  occupied: {
    label: "Occupied",
    badgeClass: "badge-warning",
    dotClass: "bg-warning-content",
    buttonLabel: "Currently Occupied",
  },
  reserved: {
    label: "Reserved",
    badgeClass: "badge-info",
    dotClass: "bg-info-content",
    buttonLabel: "Currently Reserved",
  },
  maintenance: {
    label: "Maintenance",
    badgeClass: "badge-neutral",
    dotClass: "bg-neutral-content",
    buttonLabel: "Under Maintenance",
  },
};

const headerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const cardsContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const Facilities = () => {
  const { courts, loading, error } = useCourts();
  return (
    <section className="w-full bg-base-100 px-6 py-20">
      <div className="mx-auto w-full max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="mb-10 flex items-end justify-between gap-6"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.3,
          }}
        >
          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Our Facilities
            </div>

            <h2 className="font-display text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
              Courts Built for Serious Play
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-base-content/60">
              Choose from premium indoor and outdoor courts designed to give
              every game the playing experience it deserves.
            </p>
          </div>

          {/* Desktop Link */}
          <button className="btn btn-ghost btn-sm hidden text-primary hover:bg-primary/10 hover:text-primary sm:flex">
            View all courts
            <span aria-hidden="true">→</span>
          </button>
        </motion.div>

        {/* Court Cards */}
        {error && !loading && (
          <div className="mb-6 rounded-2xl border border-error/20 bg-error/10 px-5 py-4 text-sm text-error-content">
            {error}
          </div>
        )}

        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={cardsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
        >
          {loading
            ? [1, 2, 3].map((item) => (
                <motion.div
                  key={item}
                  variants={cardVariants}
                  className="card overflow-hidden border border-base-200 bg-white shadow-sm"
                >
                  <div className="skeleton h-56 w-full rounded-none bg-base-200" />

                  <div className="card-body p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <div className="skeleton h-5 w-28 bg-base-200" />
                        <div className="skeleton h-3 w-40 bg-base-200" />
                      </div>

                      <div className="space-y-2">
                        <div className="skeleton h-6 w-16 bg-base-200" />
                        <div className="skeleton h-3 w-14 bg-base-200" />
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <div className="skeleton h-6 w-24 bg-base-200" />
                      <div className="skeleton h-6 w-20 bg-base-200" />
                    </div>

                    <div className="skeleton mt-5 h-10 w-full bg-base-200" />
                  </div>
                </motion.div>
              ))
            : courts.slice(0, 3).map((court) => {
                const status = statusConfig[court.status];

                const image =
                  courtImages[court.image_key?.toLowerCase() ?? ""] ??
                  (court.type.toLowerCase() === "outdoor"
                    ? COURT_OUTDOOR
                    : court.type.toLowerCase() === "premium"
                    ? COURT_PREMIUM
                    : COURT_INDOOR);

                return (
                  <motion.div
                    key={court.id}
                    variants={cardVariants}
                    className="group card overflow-hidden border border-base-200 bg-white shadow-sm"
                    whileHover={{
                      y: -2,
                      boxShadow: "0 20px 40px rgba(27, 43, 43, 0.12)",
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                  >
                    {/* Image */}
                    <figure className="relative h-56 overflow-hidden bg-base-200">
                      <motion.img
                        src={court.image_url ?? image}
                        alt={`${court.name} ${court.type} pickleball court`}
                        className="h-full w-full object-cover"
                        whileHover={{
                          scale: 1.06,
                        }}
                        transition={{
                          duration: 0.6,
                          ease: "easeOut",
                        }}
                      />

                      {/* Image Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                      {/* Availability */}
                      <motion.div
                        className="absolute right-4 top-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: 0.25,
                        }}
                      >
                        <span
                          className={`badge border-0 px-3 py-3 font-semibold ${status.badgeClass}`}
                        >
                          <span
                            className={`mr-1.5 h-1.5 w-1.5 rounded-full ${status.dotClass}`}
                          />

                          {status.label}
                        </span>
                      </motion.div>

                      {/* Court Type */}
                      <div className="absolute bottom-4 left-4">
                        <span className="badge border-0 bg-secondary/90 px-3 py-3 text-secondary-content backdrop-blur-sm">
                          {court.type}
                        </span>
                      </div>
                    </figure>

                    {/* Content */}
                    <div className="card-body flex flex-col p-5">
                      {/* Name + Price */}
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-display text-lg font-bold text-base-content">
                            {court.name}
                          </h3>

                          <p className="mt-1 text-xs text-base-content/50">
                            {court.description ||
                              "Professional pickleball court"}
                          </p>
                        </div>

                        <div className="shrink-0 text-right">
                          <div className="font-display text-xl font-bold text-primary">
                            ₱{court.rate.toLocaleString()}
                          </div>

                          <div className="text-xs text-base-content/40">
                            per hour
                          </div>
                        </div>
                      </div>

                      {/* Features */}
                      <motion.div
                        className="mt-4 flex flex-wrap gap-1.5"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                          hidden: {},
                          visible: {
                            transition: {
                              staggerChildren: 0.06,
                            },
                          },
                        }}
                      >
                        {court.features.map((feature) => (
                          <motion.span
                            key={feature}
                            variants={{
                              hidden: {
                                opacity: 0,
                                scale: 0.9,
                              },
                              visible: {
                                opacity: 1,
                                scale: 1,
                                transition: {
                                  duration: 0.3,
                                  ease: "easeOut",
                                },
                              },
                            }}
                            className="badge badge-sm border-0 bg-base-200 px-2.5 text-base-content/70"
                          >
                            {feature}
                          </motion.span>
                        ))}
                      </motion.div>

                      {/* Action */}
                      <div className="mt-auto pt-5">
                        {court.status === "available" ? (
                          <button className="btn btn-primary w-full rounded-box">
                            Book This Court
                            <span aria-hidden="true">→</span>
                          </button>
                        ) : (
                          <button
                            className="btn w-full rounded-xl border-base-200 bg-base-200 text-base-content/40"
                            disabled
                          >
                            {status.buttonLabel}
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
        </motion.div>

        {!loading && !error && courts.length === 0 && (
          <div className="mt-6 rounded-2xl border border-base-200 bg-base-200/50 px-6 py-10 text-center text-sm text-base-content/60">
            No courts are available at the moment.
          </div>
        )}

        {/* Mobile View All */}
        <motion.div
          className="mt-8 sm:hidden"
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          <motion.button
            className="btn btn-outline btn-primary w-full rounded-xl"
            whileTap={{
              scale: 0.98,
            }}
          >
            View All Courts
            <span aria-hidden="true">→</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Facilities;
