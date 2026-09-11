import { motion, type Variants } from "framer-motion";

const features = [
  {
    icon: "📅",
    title: "Easy Court Booking",
    desc: "Reserve your preferred court in just a few clicks with real-time availability.",
  },
  {
    icon: "🎾",
    title: "Open Play Sessions",
    desc: "Join scheduled games, meet new players, and enjoy competitive matches.",
  },
  {
    icon: "📱",
    title: "Digital Queue",
    desc: "Track your queue position and know when it is your turn to play.",
  },
  {
    icon: "💳",
    title: "Secure Payments",
    desc: "Pay conveniently through online payment options for a smooth booking experience.",
  },
  {
    icon: "🔔",
    title: "Smart Notifications",
    desc: "Receive updates about bookings, queue movement, payments, and sessions.",
  },
  {
    icon: "📊",
    title: "Activity Tracking",
    desc: "View your booking history, active sessions, and personal playing activity.",
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
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

const iconVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.7,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const PlatformFeatures = () => {
  return (
    <section className="w-full bg-base-200 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12 text-center"
        >
          <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
            Platform Features
          </div>

          <h2 className="font-display text-3xl font-bold text-base-content">
            Everything You Need to Play More
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-base-content/60">
            From booking your favorite court to tracking your session, PicklePro
            makes every part of your playing experience simple and convenient.
          </p>
        </motion.div>

        <motion.div
          variants={cardsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover={{
                y: -6,
                boxShadow: "0 18px 40px rgba(26, 56, 40, 0.10)",
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="rounded-2xl border border-secondary/5 bg-white p-6 shadow-sm"
            >
              <motion.div
                variants={iconVariants}
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-2xl"
              >
                {feature.icon}
              </motion.div>

              <h3 className="mb-2 font-display text-base font-bold text-base-content">
                {feature.title}
              </h3>

              <p className="text-sm leading-relaxed text-base-content/60">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformFeatures;
