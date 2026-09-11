import { CalendarDays, CreditCard, QrCode, Trophy } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Choose Your Court",
    description:
      "Browse available courts and pick a date and time that works for you.",
    icon: CalendarDays,
  },
  {
    number: "02",
    title: "Make Your Booking",
    description:
      "Select your preferred session and reserve your court in just a few clicks.",
    icon: CreditCard,
  },
  {
    number: "03",
    title: "Check In",
    description:
      "Arrive at the venue and scan your QR code for a fast and seamless check-in.",
    icon: QrCode,
  },
  {
    number: "04",
    title: "Play & Enjoy",
    description: "Grab your paddle, step onto the court, and enjoy your game.",
    icon: Trophy,
  },
];


const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
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

const headerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
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

const lineVariants: Variants = {
  hidden: {
    scaleX: 0,
    opacity: 0,
  },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const HowItWorks = () => {
  return (
    <section className="relative overflow-hidden bg-secondary px-6 py-20 lg:py-24">
      {/* Decorative Background */}
      <motion.div
        className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />

      <motion.div
        className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-6xl">
        {/* Header */}
        <motion.div
          className="mx-auto mb-14 max-w-2xl text-center"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Simple Process
          </div>

          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            From Zero to Playing in Minutes
          </h2>

          <p className="mt-4 text-sm leading-6 text-white/50 sm:text-base">
            We've made booking your next pickleball session simple, convenient,
            and completely hassle-free.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="group relative"
              >
                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="absolute left-[calc(100%_-_1rem)] top-9 hidden h-px w-[calc(100%_-_2rem)] origin-left bg-gradient-to-r from-primary/40 to-primary/5 lg:block"
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.7,
                      delay: 0.4 + index * 0.15,
                      ease: "easeOut",
                    }}
                  />
                )}

                {/* Step Card */}
                <motion.div
                  className="relative h-full rounded-2xl border border-white/8 bg-white/[0.035] p-6"
                  whileHover={{
                    y: -6,
                    backgroundColor: "rgba(255,255,255,0.06)",
                    borderColor: "rgba(45,134,83,0.25)",
                  }}
                  transition={{
                    duration: 0.25,
                    ease: "easeOut",
                  }}
                >
                  {/* Number + Icon */}
                  <div className="mb-6 flex items-center justify-between">
                    <motion.div
                      className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary"
                      whileHover={{
                        scale: 1.08,
                        rotate: -3,
                        backgroundColor: "rgba(45,134,83,0.2)",
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                    >
                      <Icon size={23} strokeWidth={1.8} />
                    </motion.div>

                    <span className="font-mono-data text-xs font-medium tracking-wider text-white/20">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-lg font-bold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-white/45">
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Note */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.5,
          }}
        >
          <div className="flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs text-white/50">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            No complicated setup. Just pick, book, and play.
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
