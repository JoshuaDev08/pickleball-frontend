import { motion, type Variants } from "framer-motion";
import { Check } from "lucide-react";

const pricing = [
  {
    name: "Outdoor Court",
    price: 18,
    period: "/ hour",
    note: "Enjoy the game under the open sky",
    popular: false,
    features: [
      "Open-air court",
      "Professional net system",
      "Night lighting available",
      "Equipment rental available",
    ],
  },
  {
    name: "Indoor Court",
    price: 25,
    period: "/ hour",
    note: "Perfect for comfortable year-round play",
    popular: true,
    features: [
      "Climate-controlled court",
      "Premium playing surface",
      "Professional LED lighting",
      "Equipment rental available",
    ],
  },
  {
    name: "Open Play",
    price: 10,
    period: "/ session",
    note: "Meet players and enjoy casual games",
    popular: false,
    features: [
      "Access to open play sessions",
      "Join other players",
      "Flexible session schedule",
      "Great for all skill levels",
    ],
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

const featureContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const featureVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -10,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

const Pricing = () => {
  return (
    <section className="w-full bg-base-100 px-6 py-20">
      <div className="mx-auto w-full max-w-5xl">
        <motion.div
          className="mb-14 text-center"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.3,
          }}
        >
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Transparent Pricing
          </div>

          <h2 className="font-display text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
            No Surprises. Just Great Courts.
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-base-content/60">
            Simple and flexible pricing designed to make every game worth
            playing.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-3"
          variants={cardsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
        >
          {pricing.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              className={`relative flex flex-col rounded-2xl p-7 ${
                plan.popular
                  ? "bg-secondary text-secondary-content shadow-[0_20px_60px_rgba(26,56,40,0.25)]"
                  : "border border-base-200 bg-white text-base-content shadow-sm"
              }`}
              whileHover={{
                y: -2,
                boxShadow: plan.popular
                  ? "0 25px 65px rgba(26, 56, 40, 0.3)"
                  : "0 20px 40px rgba(27, 43, 43, 0.12)",
              }}
             
            >
              {plan.popular && (
                <motion.div
                  className="absolute -top-3 left-1/2 -translate-x-1/2"
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: 0.3,
                  }}
                >
                  <span className="badge border-0 bg-warning px-3 py-3 font-bold text-neutral">
                    Most Popular
                  </span>
                </motion.div>
              )}

              <div className="mb-6">
                <div
                  className={`mb-1 text-xs font-semibold uppercase tracking-wider ${
                    plan.popular ? "text-white/50" : "text-base-content/40"
                  }`}
                >
                  {plan.name}
                </div>

                <div className="mb-1 flex items-baseline gap-1">
                  <span
                    className={`font-display text-4xl font-bold ${
                      plan.popular ? "text-white" : "text-base-content"
                    }`}
                  >
                    ${plan.price}
                  </span>

                  <span
                    className={`text-sm ${
                      plan.popular ? "text-white/50" : "text-base-content/40"
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>

                <div
                  className={`text-xs ${
                    plan.popular ? "text-white/45" : "text-base-content/40"
                  }`}
                >
                  {plan.note}
                </div>
              </div>

              <motion.ul
                className="mb-7 space-y-2.5"
                variants={featureContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                }}
              >
                {plan.features.map((feature) => (
                  <motion.li
                    key={feature}
                    variants={featureVariants}
                    className={`flex items-start gap-2.5 text-sm ${
                      plan.popular ? "text-white/75" : "text-base-content/75"
                    }`}
                  >
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        plan.popular ? "text-accent" : "text-primary"
                      }`}
                      strokeWidth={2.5}
                    />

                    <span>{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="mt-auto">
                <motion.button
                  className={`btn w-full rounded-xl ${
                    plan.popular ? "btn-primary" : "btn-outline btn-primary"
                  }`}
                 
                >
                  Book Now
                  <span aria-hidden="true">→</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
