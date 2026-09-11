import { motion, type Variants } from "framer-motion";

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Regular Player",
    rating: 5,
    quote:
      "Booking a court has never been this easy. I can check availability and reserve my favorite court in seconds.",
  },
  {
    name: "Jamie Cruz",
    role: "Club Member",
    rating: 5,
    quote:
      "I love how simple everything is. The queue system makes open play much more organized.",
  },
  {
    name: "Taylor Morgan",
    role: "Weekend Player",
    rating: 5,
    quote:
      "Great courts, easy booking, and a really smooth experience from start to finish.",
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

const starsVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
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

const Testimonials = () => {
  return (
    <section className="w-full bg-base-100 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12 text-center"
        >
          <h2 className="font-display text-3xl font-bold text-base-content">
            Loved by 2,400+ Players
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-base-content/60">
            See why players choose PicklePro for their games, bookings, and open
            play sessions.
          </p>
        </motion.div>

        <motion.div
          variants={cardsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-6 md:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={cardVariants}
              whileHover={{
                y: -6,
                boxShadow: "0 18px 40px rgba(26, 56, 40, 0.10)",
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="rounded-2xl border border-base-200 bg-white p-6 shadow-sm"
            >
              <motion.div
                variants={starsVariants}
                className="mb-4 flex gap-0.5"
              >
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <span key={index} className="text-warning" aria-hidden="true">
                    ★
                  </span>
                ))}
              </motion.div>

              <p className="mb-5 text-sm leading-relaxed text-[#2E4040]">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {testimonial.name[0]}
                </div>

                <div>
                  <div className="text-sm font-semibold text-base-content">
                    {testimonial.name}
                  </div>

                  <div className="text-xs text-base-content/40">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
