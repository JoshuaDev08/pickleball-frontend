import { motion, type Variants } from "framer-motion";

import COURT_INDOOR from "../../assets/court-indoor.jpg";
import COURT_OUTDOOR from "../../assets/court-outdoor.jpg";
import COURT_PREMIUM from "../../assets/court-premium.jpg";

const courts = [
  {
    name: "Court A1",
    type: "Indoor",
    rate: 25,
    available: true,
    img: COURT_INDOOR,
    features: ["Climate Controlled", "LED Lighting", "Premium Surface"],
  },
  {
    name: "Court B1",
    type: "Outdoor",
    rate: 18,
    available: true,
    img: COURT_OUTDOOR,
    features: ["Open Air", "Professional Net", "Night Lighting"],
  },
  {
    name: "Court A2",
    type: "Indoor",
    rate: 25,
    available: false,
    img: COURT_PREMIUM,
    features: ["Climate Controlled", "LED Lighting", "Premium Surface"],
  },
];

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
          {courts.map((court) => (
            <motion.div
              key={court.name}
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
                  src={court.img}
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
                    className={`badge border-0 px-3 py-3 font-semibold ${
                      court.available ? "badge-success" : "badge-neutral"
                    }`}
                  >
                    <span
                      className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                        court.available
                          ? "bg-success-content"
                          : "bg-neutral-content"
                      }`}
                    />

                    {court.available ? "Available" : "Occupied"}
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
                      Professional pickleball court
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <div className="font-display text-xl font-bold text-primary">
                      ${court.rate}
                    </div>

                    <div className="text-xs text-base-content/40">per hour</div>
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
                  {court.available ? (
                    <button className="btn btn-primary w-full rounded-box">
                      Book This Court
                      <span aria-hidden="true">→</span>
                    </button>
                  ) : (
                    <button
                      className="btn w-full rounded-xl border-base-200 bg-base-200 text-base-content/40"
                      disabled
                    >
                      Currently Occupied
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

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
